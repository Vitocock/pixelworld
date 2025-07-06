import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = parseInt(searchParams.get('id'));

    if (isNaN(productId)) {
      return NextResponse.json({ error: 'ID de producto inválido' }, { status: 400 });
    }

    const result = await pool.query(
      `SELECT image FROM product_image WHERE product_id = $1`,
      [productId]
    );

    return NextResponse.json({ images: result.rows.map(row => row.image) });
  } catch (error) {
    console.error('Error al obtener imágenes del producto:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
