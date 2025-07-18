import { NextResponse } from 'next/server';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import pool from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET
  }
});

function extractKeyFromUrl(url) {
  const parts = url.split('/');
  return parts.slice(3).join('/');
}

export const POST = requireAdmin(async (req) => {
  try {
    const { id, image_url } = await req.json();

    if (!id || !image_url) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }

    const key = extractKeyFromUrl(image_url);

    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key
    }));

    await pool.query('DELETE FROM carousel_image WHERE id = $1', [id]);

    return NextResponse.json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    return NextResponse.json({ error: 'Error al eliminar imagen' }, { status: 500 });
  }
}
)