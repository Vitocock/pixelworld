import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT id, image_url, sort_order FROM carousel_image ORDER BY sort_order ASC'
    )
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error al obtener imágenes del carrusel:', error)
    return NextResponse.json({ error: 'Error al obtener imágenes' }, { status: 500 })
  }
}