import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

export const POST = requireAdmin (async (req) => {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del recurso' }, { status: 400 })
    }

    // Primero, eliminar todas las asociaciones del recurso con planes
    await pool.query('DELETE FROM plan_resource WHERE resource_id = $1', [id])

    // Luego, eliminar el recurso de la tabla resource
    await pool.query('DELETE FROM resource WHERE id = $1', [id])

    return NextResponse.json({ message: 'Recurso eliminado correctamente' })
  } catch (error) {
    console.error('Error al eliminar el recurso:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
)