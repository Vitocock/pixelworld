import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Falta el parámetro id' }, { status: 400 })
    }

    const result = await pool.query(
      `SELECT id, name, brand, base_price, description FROM product WHERE id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
