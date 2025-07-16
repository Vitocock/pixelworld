import { NextResponse } from 'next/server'
import pool from '@/lib/db' 
import { requireAdmin } from '@/lib/requireAdmin'

export const POST = requireAdmin(async (req) => {
  try {
    const { planId, resourceId, quantity } = await req.json()

    if (!planId || !resourceId || !quantity || quantity <= 0) {
      return NextResponse.json({ error: 'Datos incompletos o inválidos' }, { status: 400 })
    }

    // Verificar si el recurso ya está asignado al plan
    const check = await pool.query(
      'SELECT * FROM plan_resource WHERE plan_id = $1 AND resource_id = $2',
      [planId, resourceId]
    )

    if (check.rowCount > 0) {
      return NextResponse.json({ error: 'El recurso ya está asignado al plan' }, { status: 400 })
    }

    // Insertar el recurso
    await pool.query(
      'INSERT INTO plan_resource (plan_id, resource_id, quantity) VALUES ($1, $2, $3)',
      [planId, resourceId, quantity]
    )

    return NextResponse.json({ message: 'Recurso agregado con éxito' }, { status: 200 })
  } catch (error) {
    console.error('Error al agregar recurso al plan:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
)