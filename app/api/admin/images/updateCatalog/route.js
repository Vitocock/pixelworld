import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import pool from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

// Configurar S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET
  }
})

export const POST = requireAdmin(async (req) => {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Archivo inválido' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const fileName = `catalogs/catalog-${Date.now()}.pdf`

    // Obtener catálogo anterior (si existe)
    const oldCatalogResult = await pool.query(`SELECT catalog_url FROM catalog ORDER BY last_update DESC LIMIT 1`)
    const oldCatalog = oldCatalogResult.rows[0]

    // Subir nuevo archivo
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: 'application/pdf'
      })
    )

    const newUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`

    // Eliminar archivo anterior si existe
    if (oldCatalog?.catalog_url) {
      const oldKey = oldCatalog.catalog_url.split('.amazonaws.com/')[1]
      if (oldKey) {
        await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: oldKey
          })
        )
      }

      // Reemplazar registro existente
      await pool.query(`
        UPDATE catalog SET catalog_url = $1, last_update = CURRENT_DATE
      `, [newUrl])
    } else {
      // Insertar nuevo si no había catálogo anterior
      await pool.query(`
        INSERT INTO catalog (catalog_url, last_update)
        VALUES ($1, CURRENT_DATE)
      `, [newUrl])
    }

    return NextResponse.json({ message: 'Catálogo actualizado correctamente', url: newUrl })
  } catch (err) {
    console.error('Error al subir catálogo:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
)