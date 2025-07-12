import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(req) {
  try {
    const { id } = await req.json()

    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      // Eliminar primero de plan_resource (por la FK)
      await client.query('DELETE FROM plan_resource WHERE plan_id = $1', [id])
      
      // Luego eliminar el plan
      await client.query('DELETE FROM plan WHERE id = $1', [id])

      await client.query('COMMIT')

      return NextResponse.json({ message: 'Plan eliminado exitosamente' }, { status: 200 })
    } catch (err) {
      await client.query('ROLLBACK')
      console.error('Error al eliminar plan:', err)
      return NextResponse.json({ error: 'Error al eliminar el plan' }, { status: 500 })
    } finally {
      client.release()
    }

  } catch (err) {
    console.error('Error al procesar solicitud:', err)
    return NextResponse.json({ error: 'Solicitud inválida o error interno' }, { status: 500 })
  }
}
