import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

export const POST = requireAdmin(async (req) => {
  try {
    const { updates } = await req.json()

    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: 'Formato inválido' }, { status: 400 })
    }

    const client = await pool.connect()

    try {
      await client.query('BEGIN')

      for (const { id, sort_order } of updates) {
        if (typeof id !== 'number' || typeof sort_order !== 'number') {
          throw new Error('Datos inválidos en update')
        }

        await client.query(
          'UPDATE carousel_image SET sort_order = $1 WHERE id = $2',
          [sort_order, id]
        )
      }

      await client.query('COMMIT')
      return NextResponse.json({ message: 'Orden actualizado correctamente' }, { status: 200 })
    } catch (error) {
      await client.query('ROLLBACK')
      console.error('Error al actualizar orden:', error)
      return NextResponse.json({ error: 'Error al actualizar orden' }, { status: 500 })
    } finally {
      client.release()
    }

  } catch (err) {
    console.error('Error en el servidor:', err)
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 })
  }
}
)