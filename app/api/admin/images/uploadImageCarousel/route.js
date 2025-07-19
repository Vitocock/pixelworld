import { NextResponse } from 'next/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import pool from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET
  }
});

export const POST = requireAdmin(async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) return NextResponse.json({ error: 'No se recibió ninguna imagen' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `carousel/${uuidv4()}-${file.name}`;
    const bucket = process.env.AWS_BUCKET_NAME;

    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      Body: buffer,
      ContentType: file.type
    }));

    const imageUrl = `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    await pool.query(
      'INSERT INTO carousel_image (image_url, sort_order) VALUES ($1, 99)',
      [imageUrl]
    );

    return NextResponse.json({ message: 'Imagen subida y registrada correctamente', url: imageUrl });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json({ error: 'Error interno al subir imagen' }, { status: 500 });
  }
}
)