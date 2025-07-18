import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET
  }
})

// Extrae la key de S3 desde una URL completa (o devuelve el valor si ya es key)
function extractKeyFromUrl(url) {
  if (!url) return null
  try {
    const u = new URL(url)
    return u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname
  } catch {
    return url
  }
}

function sanitizeFileName(name = '') {
  return name.toLowerCase().replace(/[^a-z0-9.\-_]/gi, '_')
}

export const POST = requireAdmin(async (req) => {
  try {
    const formData = await req.formData()
    console.log(formData)
    const productId = formData.get('id') || formData.get('productId')
    const name = formData.get('name')
    const brand = formData.get('brand')
    const base_price = formData.get('base_price')
    const description = formData.get('description')
    const mainImageFile = formData.get('mainImage')
    const secondaryImagesFiles = formData.getAll('secondaryImages')
    const deletedImagesRaw = formData.get('deletedImages')

    if (!productId || !name || !brand || !base_price || !description) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    // Parsear lista de imágenes secundarias a eliminar (URLs completas)
    let deletedImages = []
    if (deletedImagesRaw) {
      try {
        const parsed = JSON.parse(deletedImagesRaw)
        if (Array.isArray(parsed)) deletedImages = parsed
      } catch {
        /* ignore parse error */
      }
    }

    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      // 1. Actualizar campos base
      await client.query(
        `
          UPDATE product
          SET name = $1,
              brand = $2,
              base_price = $3,
              description = $4
          WHERE id = $5
        `,
        [name.trim(), brand.trim(), parseFloat(base_price), description.trim(), productId]
      )

      // 2. Si viene nueva imagen principal -> borrar la anterior y subir la nueva
      if (mainImageFile && typeof mainImageFile !== 'string') {
        // 2.a Obtener URL actual de la imagen principal
        const currentImgRes = await client.query(
          `SELECT image FROM product WHERE id = $1`,
          [productId]
        )
        const currentImgUrl = currentImgRes.rows?.[0]?.image || null

        // 2.b Si había imagen previa, eliminarla de S3
        if (currentImgUrl) {
          const oldKey = extractKeyFromUrl(currentImgUrl)
          if (oldKey) {
            try {
              await s3.send(new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: oldKey
              }))
            } catch (err) {
              console.error('No se pudo eliminar imagen principal previa en S3:', err)
            }
          }
        }

        // 2.c Subir nueva imagen principal
        const arrayBuffer = await mainImageFile.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const originalName = sanitizeFileName(mainImageFile.name || 'banner')
        const ext = originalName.includes('.') ? originalName.split('.').pop() : 'jpg'
        const key = `products/${productId}/banner.${ext}`

        await s3.send(new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
          Body: buffer,
          ContentType: mainImageFile.type || 'image/jpeg'
        }))

        const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

        await client.query(
          `UPDATE product SET image = $1 WHERE id = $2`,
          [publicUrl, productId]
        )
      }

      // 3. Eliminar imágenes secundarias existentes (si hay seleccionadas)
      if (deletedImages.length > 0) {
        // DB
        await client.query(
          `DELETE FROM product_image WHERE product_id = $1 AND image = ANY($2::text[])`,
          [productId, deletedImages]
        )
        // S3
        for (const url of deletedImages) {
          const key = extractKeyFromUrl(url)
          if (key) {
            try {
              await s3.send(new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key
              }))
            } catch (err) {
              console.error('Error al eliminar imagen secundaria en S3:', key, err)
            }
          }
        }
      }

      // 4. Agregar nuevas imágenes secundarias
      for (const fileObj of secondaryImagesFiles) {
        if (!fileObj || typeof fileObj === 'string') continue
        const arrayBuffer = await fileObj.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const originalName = sanitizeFileName(fileObj.name || 'extra')
        const ext = originalName.includes('.') ? originalName.split('.').pop() : 'jpg'
        const unique = Date.now() + '-' + Math.random().toString(36).slice(2)
        const key = `products/${productId}/extra-${unique}.${ext}`

        await s3.send(new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
          Body: buffer,
          ContentType: fileObj.type || 'image/jpeg',
        }))

        const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

        await client.query(
          `INSERT INTO product_image (product_id, image) VALUES ($1, $2)`,
          [productId, publicUrl]
        )
      }

      await client.query('COMMIT')
      return NextResponse.json({ message: 'Producto actualizado exitosamente' }, { status: 200 })
    } catch (err) {
      await client.query('ROLLBACK')
      console.error('Error transacción editProduct:', err)
      return NextResponse.json({ error: 'Error al editar el producto' }, { status: 500 })
    } finally {
      client.release()
    }

  } catch (error) {
    console.error('Error al editar el producto (nivel superior):', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
})
