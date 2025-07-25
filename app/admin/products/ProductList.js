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

  const handleDelete = async (productId) => {
    const confirmDelete = confirm("¿Estás seguro que deseas eliminar este producto?");
    if (!confirmDelete) return;

    try {
      const res = await fetch('/api/admin/products/deleteProduct', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al eliminar producto')

      alert("Producto eliminado correctamente")
      fetchProducts()
    } catch (err) {
      console.error(err)
      alert("Hubo un error al eliminar el producto")
    }
  }

  const handleActivate = async (productId) => {
    try {
      const res = await fetch('/api/admin/products/activateProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      fetchProducts()
    } catch (err) {
      console.error(err)
      alert("Error al activar el producto")
    }
  }

  const handleDeactivate = async (productId) => {
    try {
      const res = await fetch('/api/admin/products/deactivateProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      fetchProducts()
    } catch (err) {
      console.error(err)
      alert("Error al desactivar el producto")
    }
  }

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

      <div className='bg-white w-3/4 p-2 rounded'>
        <div className="py-2 mb-2 border-b-2 border-black">
          <button className='bg-blue-600 px-2 py-1 text-white rounded' onClick={goToPreviousPage} disabled={page === 1}>
            Anterior
          </button>
          <span className="mx-2">Página {page} de {totalPages}</span>
          <button className='bg-blue-600 px-2 py-1 text-white rounded' onClick={goToNextPage} disabled={page === totalPages}>
            Siguiente
          </button>
        </div>

        <table className="w-full border border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1">Id</th>
              <th className="border px-2 py-1">Imagen</th>
              <th className="border px-2 py-1">Nombre</th>
              <th className="border px-2 py-1">Marca</th>
              <th className="border px-2 py-1">Precio</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr className={p.active ? "" : "bg-slate-300"} key={p.id}>
                <td className="border px-2 py-1 text-center">{p.id}</td>
                <td className='text-center'><img className="w-24 mx-auto" src={p.image} alt={p.name} /></td>
                <td className="border px-2 py-1 text-center">{p.name}</td>
                <td className="border px-2 py-1 text-center">{p.brand}</td>
                <td className="border px-2 py-1 text-center">${p.base_price}</td>
                <td className="border py-1 text-center ">
                  <div className="flex justify-center space-x-2">
                    <button className='bg-blue-600 text-white px-2 py-1 rounded' onClick={() => setEditProductId(p.id)}>Editar</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(p.id)}>Eliminar</button>
                    {p.active ? (
                      <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleDeactivate(p.id)}>Desactivar</button>
                    ) : (
                      <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={() => handleActivate(p.id)}>Activar</button>
                    )}
                  </div>
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

