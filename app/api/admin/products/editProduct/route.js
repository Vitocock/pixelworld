import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(req) {
  try {
    const body = await req.json()
    const { productId, name, brand, base_price, description } = body

    if (!productId || !name || !brand || !base_price || !description) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const updateQuery = `
      UPDATE product
      SET name = $1,
          brand = $2,
          base_price = $3,
          description = $4
      WHERE id = $5
    `

    await pool.query(updateQuery, [name.trim(), brand.trim(), parseFloat(base_price), description.trim(), productId])

    return NextResponse.json({ message: 'Producto actualizado exitosamente' }, { status: 200 })
  } catch (error) {
    console.error('Error al editar el producto:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
