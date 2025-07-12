import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 12;
    const offset = (page - 1) * limit;

    const result = await pool.query(
      `SELECT id, name, brand, base_price, description, image
       FROM product
       WHERE active = true
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await pool.query(`SELECT COUNT(*) FROM product`);
    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({
      products: result.rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
      },
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

