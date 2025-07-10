'use client'

import { useState } from "react"
import CreateProductModal from "./CreateProductModal"
import ProductList from "./ProductList"

export default function Home() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [refreshList, setRefreshList] = useState(false)

  const handleSave = () => {
    setRefreshList(prev => !prev) // trigger de cambio
    setShowCreateModal(false) // cerrar modal
  }

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Panel de Productos</h1>

      <button
        className="mb-2 px-2 py-1 bg-blue-600 text-white rounded"
        onClick={() => setShowCreateModal(true)}
      >
        Crear producto
      </button>

      <ProductList key={refreshList} /> {/* se recarga con el cambio de key */}

      {showCreateModal && (
        <CreateProductModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
