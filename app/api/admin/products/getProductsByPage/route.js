import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { requireAdmin } from '@/lib/requireAdmin'

const PAGE_SIZE = 10

export const GET = requireAdmin(async (req) => {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page')) || 1
    const offset = (page - 1) * PAGE_SIZE

    // Obtener productos con límite y offset
    const query = `
      SELECT id, name, brand, base_price, image, active
      FROM product
      ORDER BY id
      LIMIT $1 OFFSET $2
    `
    const result = await pool.query(query, [PAGE_SIZE, offset])

    // Obtener total de productos
    const countResult = await pool.query(`SELECT COUNT(*) FROM product`)
    const totalProducts = parseInt(countResult.rows[0].count)
    const totalPages = Math.ceil(totalProducts / PAGE_SIZE)

    return NextResponse.json({
      products: result.rows,
      totalPages,
    })
  } catch (error) {
    console.error('Error al obtener productos paginados:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' ,
      status: 500 }
    )
  }
}
)