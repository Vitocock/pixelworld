// app/api/admin/plans/removeResource/route.js
import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

export const POST = requireAdmin(async (request) => {
  try {
    const { plan_id, resource_id } = await request.json()

    if (!plan_id || !resource_id) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 })
    }

    const result = await pool.query(
      `DELETE FROM plan_resource WHERE plan_id = $1 AND resource_id = $2`,
      [plan_id, resource_id]
    )

    return NextResponse.json({ message: 'Recurso eliminado correctamente del plan' }, { status: 200 })
  } catch (error) {
    console.error('Error al eliminar recurso del plan:', error)
    return NextResponse.json({ error: 'Error al eliminar recurso' }, { status: 500 })
  }
}
)