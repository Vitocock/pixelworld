import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del producto' }, { status: 400 })
    }

    await pool.query('UPDATE product SET active = false WHERE id = $1', [id])

    return NextResponse.json({ message: 'Producto desactivado correctamente' }, { status: 200 })
  } catch (err) {
    console.error('Error al desactivar producto:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
