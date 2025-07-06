'use client'

import { useState, useEffect } from 'react'
import EditProductModal from './EditProductModal'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [editProductId, setEditProductId] = useState(null)

  const fetchProducts = async () => {
    const res = await fetch(`/api/admin/products/getProductsByPage?page=${page}`)
    const data = await res.json()
    setProducts(data.products)
    setTotalPages(data.totalPages)
  }

  useEffect(() => {
    fetchProducts()
  }, [page])

  const onSave = () => {
    fetchProducts()
  }

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  return (
    <div className='my-2'>
      <div className="my-4 text-2xl font-semibold">
        <h2>Lista de productos</h2>
      </div>

      <div className='bg-white w-1/3 p-2 rounded'>
        <div className="py-2 mb-2 border-b-2 border-black">
          <button className='underline' onClick={goToPreviousPage} disabled={page === 1}>
            Anterior
          </button>
          <span className="mx-2">Página {page} de {totalPages}</span>
          <button className='underline' onClick={goToNextPage} disabled={page === totalPages}>
            Siguiente
          </button>
        </div>

        <table className="w-full border border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1">Id</th>
              <th className="border px-2 py-1">Nombre</th>
              <th className="border px-2 py-1">Marca</th>
              <th className="border px-2 py-1">Precio</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td className="border px-2 py-1">{p.id}</td>
                <td className="border px-2 py-1">{p.name}</td>
                <td className="border px-2 py-1">{p.brand}</td>
                <td className="border px-2 py-1">${p.base_price}</td>
                <td className="border px-2 py-1 flex flex-row justify-between">
                  <button className='underline text-blue-600' onClick={() => setEditProductId(p.id)}>Editar</button>
                  <button className="underline text-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editProductId && (
        <EditProductModal
          productId={editProductId}
          onClose={() => setEditProductId(null)}
          onSave={onSave}
        />
      )}
    </div>
  )
}
