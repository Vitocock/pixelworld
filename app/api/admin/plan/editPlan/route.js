import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(req) {
  try {
    const body = await req.json()
    const { id, name, base_price, resources } = body

    const client = await pool.connect()

    try {
      await client.query('BEGIN')

      // 1. Actualizar el plan
      const updatePlanQuery = `
        UPDATE plan
        SET name = $1, base_price = $2
        WHERE id = $3
      `
      await client.query(updatePlanQuery, [name, base_price, id])

      // 2. Eliminar recursos anteriores
      await client.query('DELETE FROM plan_resource WHERE plan_id = $1', [id])

      // 3. Insertar nuevos recursos
      for (const resource of resources) {
        const insertResourceQuery = `
          INSERT INTO plan_resource (plan_id, resource_id, quantity)
          VALUES ($1, $2, $3)
        `
        await client.query(insertResourceQuery, [id, resource.id, resource.quantity])
      }

      await client.query('COMMIT')
      return NextResponse.json({ message: 'Plan actualizado correctamente' }, { status: 200 })

    } catch (err) {
      await client.query('ROLLBACK')
      console.error('Error en la transacción:', err)
      return NextResponse.json({ message: 'Error al actualizar el plan' }, { status: 500 })
    } finally {
      client.release()
    }

  } catch (err) {
    console.error('Error en la solicitud:', err)
    return NextResponse.json({ message: 'Datos inválidos o error interno' }, { status: 500 })
  }
}
