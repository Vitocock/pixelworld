import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

export const GET = requireAdmin(async (request) => {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Falta el parámetro id' }, { status: 400 })
    }

    // Consultar producto principal
    const productResult = await pool.query(
      `SELECT id, name, brand, base_price, description, image
       FROM product
       WHERE id = $1`,
      [id]
    )

    if (productResult.rows.length === 0) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }

    const product = productResult.rows[0]

    // Consultar imágenes secundarias
    const imagesResult = await pool.query(
      `SELECT image
       FROM product_image
       WHERE product_id = $1`,
      [id]
    )

    const secondaryImages = imagesResult.rows.map(r => r.image)

    // Respuesta en el formato esperado por el front
    const response = {
      name: product.name,
      brand: product.brand,
      base_price: product.base_price,
      description: product.description,
      image: product.image,
      images: secondaryImages
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    console.error('Error al obtener el producto por ID:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
})
