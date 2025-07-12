'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function AdminLayout({ children }) {
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      setHasToken(true)
    }
  })

  return (
    <div className="bg-gray-100 w-screen min-h-screen">
      {hasToken && (
        <nav className="bg-blue-800 text-white p-4 flex flex-row">
          <h1 className="text-xl font-bold mr-4">Panel de Administración</h1>
          <ul className="flex flex-row gap-4">
            <li><a href="/admin">Planes</a></li>
            <li><a href="/admin/products">Productos</a></li>
            <li><a href="/admin/images">Imágenes</a></li>
            <li>
              <button
                onClick={() => {
                  Cookies.remove('token')
                  window.location.href = '/admin/login'
                }}
                className="text-white hover:underline"
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </nav>
      )}
      <main className="p-6 text-black" >{children}</main>
    </div>
  )
}