import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

export const POST = requireAdmin(async (req) => {
  try {
    const { name } = await req.json()

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Nombre inválido' }, { status: 400 })
    }

    // Revisar si ya existe el recurso
    const checkQuery = 'SELECT id FROM resource WHERE LOWER(name) = LOWER($1)'
    const checkResult = await pool.query(checkQuery, [name.trim()])

    if (checkResult.rows.length > 0) {
      return NextResponse.json({ error: 'Ya existe un recurso con ese nombre' }, { status: 409 })
    }

    // Insertar nuevo recurso
    const insertQuery = 'INSERT INTO resource (name) VALUES ($1) RETURNING *'
    const insertResult = await pool.query(insertQuery, [name.trim()])

    return NextResponse.json({ message: 'Recurso creado exitosamente', resource: insertResult.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Error al crear el recurso:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
)