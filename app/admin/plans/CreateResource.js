'use client'
import { useState } from 'react'

export default function CreateResource({ onClose }) {
  const [name, setName] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/admin/plans/createResource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al crear el recurso')
      }
      alert("Recurso creado correctamente.")
      onClose()
    } catch (err) {
      alert("Error al crear recurso.")
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white">

      <div className="mb-4">
        <label className="block mb-1">Nombre del recurso</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div className='flex flex-row-reverse'>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Crear
        </button>
      </div>
    </form>
  )
}
