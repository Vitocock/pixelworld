'use client'

import UpdateCatalogModal from "./UpdateCatalogModal"
import { useState } from "react"

export default function CatalogInfo() {
  const [showModal, setShowModal] = useState(false)

  const handleViewCatalog = async () => {
    try {
      const res = await fetch("/api/images/getCatalog")
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)
      if (!data.catalog_url) throw new Error("No hay catálogo disponible.")

      window.open(data.catalog_url, "_blank")
    } catch (err) {
      console.error("Error al abrir el catálogo:", err)
      alert("No se pudo abrir el catálogo.")
    }
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={handleViewCatalog}
        className="bg-blue-600 text-white px-2 py-1 rounded"
      >
        Ver Catálogo
      </button>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-2 py-1 rounded"
      >
        Actualizar Catálogo
      </button>


      {showModal && <UpdateCatalogModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
