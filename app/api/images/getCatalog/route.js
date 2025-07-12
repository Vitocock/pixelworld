import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT catalog_url FROM catalog'
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error al obtener imágenes del carrusel:', error)
    return NextResponse.json({ error: 'Error al obtener imágenes' }, { status: 500 })
  }
}
