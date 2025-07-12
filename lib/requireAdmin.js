import { NextResponse } from 'next/server'
import { verifyJWT } from './auth'

export function requireAdmin(handler) {
  return async function (req, ...args) {
    try {
      const token = req.cookies?.get?.('token')?.value || req.headers.get('Authorization')?.replace('Bearer ', '')

      if (!token) {
        return NextResponse.json({ error: 'No autorizado: token ausente' }, { status: 401 })
      }

      const user = await verifyJWT(token)
      if (!user || user.role !== 'admin') {
        return NextResponse.json({ error: 'No autorizado: sin permisos' }, { status: 403 })
      }

      // Ejecutar handler (puede ser tipo GET sin argumentos o POST con `req`)
      return handler.length === 0 ? handler() : handler(req, ...args)

    } catch (err) {
      console.error('Error en requireAdmin:', err)
      return NextResponse.json({ error: 'Error de autenticación' }, { status: 500 })
    }
  }
}
