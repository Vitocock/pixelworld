import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import pool from '@/lib/db';
import { requireAdmin } from '@/lib/requireAdmin';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const POST = requireAdmin(async (req) => {
  try {
    const formData = await req.formData();

    const name = formData.get('name');
    const brand = formData.get('brand');
    const price = parseInt(formData.get('price'));
    const description = formData.get('description');
    const imageFile = formData.get('image'); // banner
    const additionalImages = formData.getAll('additionalImages'); // Array<File>

    if (!imageFile || typeof imageFile === 'string') {
      return NextResponse.json({ error: 'Imagen principal no válida' }, { status: 400 });
    }

    // 1. Crear producto en la base de datos (sin imagen aún)
    const insertResult = await pool.query(
      `INSERT INTO product (name, brand, base_price, description, image, created_at, active)
       VALUES ($1, $2, $3, $4, '', NOW(), false) RETURNING *`,
      [name, brand, price, description]
    );

    const product = insertResult.rows[0];
    const productId = product.id;

    // 2. Subir imagen principal (banner)
    const bannerBuffer = Buffer.from(await imageFile.arrayBuffer());
    const bannerKey = `products/${productId}/banner.jpg`;

    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: bannerKey,
      Body: bannerBuffer,
      ContentType: imageFile.type,
    }));

    const bannerUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${bannerKey}`;

    // 3. Subir imágenes adicionales y guardar en product_image
    for (let i = 0; i < Math.min(5, additionalImages.length); i++) {
      const img = additionalImages[i];
      if (!img || typeof img === 'string') continue;

      const buffer = Buffer.from(await img.arrayBuffer());
      const key = `products/${productId}/additional_${i + 1}.jpg`;

      await s3.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: img.type,
      }));

      const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

      // Guardar URL en product_image
      await pool.query(
        `INSERT INTO product_image (product_id, image) VALUES ($1, $2)`,
        [productId, imageUrl]
      );
    }

    // 4. Actualizar el producto con la URL del banner
    await pool.query(
      `UPDATE product SET image = $1 WHERE id = $2`,
      [bannerUrl, productId]
    );

    return NextResponse.json({ message: 'Producto creado', product: { ...product, image_url: bannerUrl } }, { status: 201 });
  } catch (err) {
    console.error('Error al crear producto:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
)