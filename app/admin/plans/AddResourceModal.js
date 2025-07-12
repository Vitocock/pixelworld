"use client"

import { useState, useEffect } from "react"

export default function AddResourceModal({ planId, onClose, onAdded }) {
  const [resources, setResources] = useState([])
  const [selectedResource, setSelectedResource] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch('/api/plans/getResources')
        const data = await res.json()
        setResources(data)
      } catch (err) {
        console.error("Error al cargar recursos:", err)
      }
    }

    fetchResources()
  }, [])

  const handleAdd = async () => {
    if (!selectedResource || quantity <= 0) {
      alert("Selecciona un recurso y una cantidad válida.")
      return
    }

    try {
      const res = await fetch('/api/admin/plans/addResource', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          resourceId: selectedResource,
          quantity: parseInt(quantity)
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      alert("Recurso agregado correctamente")
      onAdded()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[400px]">
        <h3 className="text-lg font-semibold mb-4">Agregar recurso al plan</h3>

        <div className="mb-2">
          <label>Recurso:</label>
          <select
            className="w-full bg-slate-200 p-2"
            value={selectedResource}
            onChange={e => setSelectedResource(e.target.value)}
          >
            <option value="">Seleccione un recurso</option>
            {resources.map(res => (
              <option key={res.id} value={res.id}>{res.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label>Cantidad:</label>
          <input
            className="w-full bg-slate-200 p-2"
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button className="bg-gray-500 text-white px-4 py-1 rounded" onClick={onClose}>Cancelar</button>
          <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={handleAdd}>Agregar</button>
        </div>
      </div>
    </div>
  )
}