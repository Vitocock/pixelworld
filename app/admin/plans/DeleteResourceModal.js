'use client'

import { useEffect, useState } from 'react'

export default function DeleteResourceModal({ onClose, onDeleteResource }) {
  const [resources, setResources] = useState([])
  const [selectedResourceId, setSelectedResourceId] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch('/api/plans/getResources')
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Error al cargar recursos')
        setResources(data)
      } catch (err) {
        console.error('Error:', err)
        alert('No se pudieron cargar los recursos')
      }
    }

    fetchResources()
  }, [])

  const handleDelete = async () => {
    if (!selectedResourceId) return alert('Selecciona un recurso')

    if (!confirm('¿Estás seguro de eliminar este recurso? Esta acción es irreversible.')) return

    try {
      setLoading(true)
      const res = await fetch('/api/admin/plans/deleteResource', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedResourceId })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      alert('Recurso eliminado correctamente')
      onDeleteResource()
    } catch (err) {
      console.error('Error al eliminar recurso:', err)
      alert('Hubo un error al eliminar el recurso')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded w-80">
        <h2 className="text-lg font-semibold mb-2">Eliminar recurso</h2>

        <label className="block mb-2">Selecciona un recurso:</label>
        <select
          value={selectedResourceId}
          onChange={e => setSelectedResourceId(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">-- Selecciona --</option>
          {resources.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>

        <div className="flex justify-end space-x-2">
          <button className="px-3 py-1 bg-gray-300 rounded" onClick={onClose}>Cancelar</button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}
