'use client'

import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }) {
  const router = useRouter()

  const handleLogout = () => {
    // Elimina la cookie "token" estableciendo su expiración en el pasado
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    router.push('/admin/login')
  }

  return (
    <div className="bg-gray-100 w-screen">
      <nav className="bg-blue-800 text-white p-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">Panel de Administración</h1>
          <ul className="flex flex-row gap-4">
            <li><a href="/admin/plans">Planes</a></li>
            <li><a href="/admin/products">Productos</a></li>
            <li><a href="/admin/images">Imágenes</a></li>
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-white"
        >
          Cerrar sesión
        </button>
      </nav>
      <main className="p-6 text-black">{children}</main>
    </div>
  )
}