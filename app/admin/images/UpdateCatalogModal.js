"use client"

import { useState } from "react"

export default function UpdateCatalogModal({ onClose }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected && selected.type === "application/pdf") {
      setFile(selected)
    } else {
      alert("Por favor selecciona un archivo PDF válido.")
      e.target.value = null
      setFile(null)
    }
  }

  const handleSubmit = async () => {
    if (!file) {
      alert("Debes seleccionar un archivo PDF")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    setUploading(true)
    try {
      const res = await fetch("/api/admin/images/updateCatalog", {
        method: "POST",
        body: formData
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      alert("Catálogo actualizado exitosamente")
      onClose()
    } catch (err) {
      console.error("Error al subir catálogo:", err)
      alert("Error al subir el catálogo")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[400px]">
        <h3 className="text-lg font-semibold mb-4">Subir nuevo catálogo PDF</h3>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-500 text-white px-4 py-1 rounded"
            onClick={onClose}
            disabled={uploading}
          >
            Cancelar
          </button>
          <button
            className="bg-green-600 text-white px-4 py-1 rounded"
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? "Subiendo..." : "Enviar"}
          </button>
        </div>
      </div>
    </div>
  )
}
