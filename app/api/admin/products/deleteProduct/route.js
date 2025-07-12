import { NextResponse } from 'next/server';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import pool from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

function extractS3KeyFromUrl(url) {
  const parts = url.split('/');
  return parts.slice(3).join('/'); // quita https://bucket.s3.region.amazonaws.com/
}

export const DELETE = requireAdmin(async (req) => {
  try {
    const { id } = await req.json();

    // 1. Obtener imágenes a eliminar
    const mainResult = await pool.query('SELECT image FROM product WHERE id = $1', [id]);
    const extraResult = await pool.query('SELECT image FROM product_image WHERE product_id = $1', [id]);

    if (mainResult.rows.length === 0) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
    }

    const imageUrls = [
      mainResult.rows[0].image,
      ...extraResult.rows.map(row => row.image)
    ];

    // 2. Eliminar imágenes del bucket
    for (const url of imageUrls) {
      const Key = extractS3KeyFromUrl(url);
      try {
        await s3.send(new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key,
        }));
      } catch (err) {
        console.warn('No se pudo eliminar del bucket:', url);
      }
    }

    // 3. Eliminar de las tablas product_image y product
    await pool.query('DELETE FROM product_image WHERE product_id = $1', [id]);
    await pool.query('DELETE FROM product WHERE id = $1', [id]);

    return NextResponse.json({ message: 'Producto eliminado correctamente' }, { status: 200 });
  } catch (err) {
    console.error('Error al eliminar producto:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
)