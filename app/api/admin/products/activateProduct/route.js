import { NextResponse } from 'next/server'
import pool  from '@/lib/db' 
import { requireAdmin } from '@/lib/requireAdmin'

export const POST = requireAdmin(async (request) => {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Falta el ID del producto' }, { status: 400 })
    }

    await pool.query('UPDATE product SET active = true WHERE id = $1', [id])

    return NextResponse.json({ message: 'Producto activado correctamente' }, { status: 200 })
  } catch (err) {
    console.error('Error al activar producto:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
)