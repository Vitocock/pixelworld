// app/api/contact/route.js
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  const { name, email, content } = await request.json()

  if (!name || !email || !content) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // o smtp de tu proveedor
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    })

    await transporter.sendMail({
      from: `"Formulario Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER, // destino del mensaje
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong><br/>${content}</p>
      `
    })

    return NextResponse.json({ message: 'Correo enviado con éxito' }, { status: 200 })
  } catch (error) {
    console.error('Error al enviar correo:', error)
    return NextResponse.json({ error: 'Error al enviar correo' }, { status: 500 })
  }
}
