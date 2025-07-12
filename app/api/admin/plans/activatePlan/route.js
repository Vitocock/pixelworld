import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(req) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del plan' }, { status: 400 })
    }

    const result = await pool.query(
      `UPDATE plan SET active = true WHERE id = $1 RETURNING *`,
      [id]
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Plan no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Plan desactivado exitosamente' })
  } catch (error) {
    console.error('Error al desactivar el plan:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
