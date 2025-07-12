'use client'

import { useEffect, useState } from 'react'
import CardImage from './CardImage'

export default function EditImageCarousel() {
  const [images, setImages] = useState([])
  const [newImage, setNewImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/images/getCarousel')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al cargar imágenes')
      setImages(data)
    } catch (err) {
      console.error('Error al cargar imágenes:', err)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleSortChange = (id, newOrder) => {
    setImages(prev =>
      prev.map(img => img.id === id ? { ...img, sort_order: parseInt(newOrder) || 0 } : img)
    )
  }

  const handleSaveOrder = async () => {
    try {
      const res = await fetch('/api/admin/images/updateOrderImageCarousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates: images.map(({ id, sort_order }) => ({ id, sort_order })) })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      alert('Orden actualizado con éxito')
      fetchImages()
    } catch (err) {
      console.error(err)
      alert('Error al actualizar el orden')
    }
  }

  const handleUpload = async () => {
    if (!newImage) return alert('Selecciona una imagen')

    const formData = new FormData()
    formData.append('image', newImage)

    try {
      setLoading(true)
      const res = await fetch('/api/admin/images/uploadImageCarousel', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      alert('Imagen subida correctamente')
      setNewImage(null)
      setShowModal(false)
      fetchImages()
    } catch (err) {
      console.error(err)
      alert('Error al subir imagen')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, image_url) => {
    if (!confirm('¿Estás seguro de eliminar esta imagen?')) return

    try {
      const res = await fetch('/api/admin/images/deleteImageCarousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, image_url })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      alert('Imagen eliminada')
      fetchImages()
    } catch (err) {
      console.error(err)
      alert('Error al eliminar imagen')
    }
  }

  return (
    <div>
      <div className='my-2'>
        <h2 className="my-4 text-2xl font-semibold">Listado de imágenes</h2>
        <div className='w-fit'>
          <table className="bg-white">
            <thead>
              <tr>
                <th className="border px-2 py-1">Imagen</th>
                <th className="border px-2 py-1">URL</th>
                <th className="border px-2 py-1">Posición</th>
                <th className="border px-2 py-1">Acción</th>
              </tr>
            </thead>
            <tbody>
              {images.map(image => (
                <CardImage
                  key={image.id}
                  image={image}
                  handleDelete={handleDelete}
                  handleSortChange={handleSortChange}
                />
              ))}
            </tbody>
          </table>
          <div className='text-right my-4'>
            <button
              onClick={() => setShowModal(true)}
              className='bg-blue-600 text-white px-2 py-1 mr-2 rounded'
            >
              Subir imagen
            </button>
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded"
              onClick={handleSaveOrder}
            >
              Guardar Orden
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-[400px]">
            <h3 className="text-lg font-semibold mb-4">Subir nueva imagen</h3>
            <input
              className="mb-4"
              type="file"
              accept="image/*"
              onChange={e => setNewImage(e.target.files[0])}
            />
            <div className="flex justify-between gap-2">
              <button
                className="bg-gray-500 text-white px-4 py-1 rounded"
                onClick={() => {
                  setShowModal(false)
                  setNewImage(null)
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? 'Subiendo...' : 'Subir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
