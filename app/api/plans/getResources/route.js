import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Obtener todos los recursos
    const query = `
      SELECT id, name
      FROM resource
    `;
    const resourcesResult = await pool.query(query);
    const resources = resourcesResult.rows;

    if (resources.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(resources, { status : 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
