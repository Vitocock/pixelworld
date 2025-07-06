'use client'

import { useEffect, useState } from 'react'

export default function EditImageCarousel() {
  const [images, setImages] = useState([])
  const [newImage, setNewImage] = useState(null)
  const [loading, setLoading] = useState(false)

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
      <h3>Listado de imágenes</h3>
      <div className="flex flex-col space-y-2">
        {images.map(img => (
          <div key={img.id} className="flex items-center justify-between border p-2">
            <span>{img.image_url}</span>
            <button onClick={() => handleDelete(img.id, img.image_url)}>Eliminar</button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3>Subir nueva imagen</h3>
        <input type="file" accept="image/*" onChange={e => setNewImage(e.target.files[0])} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Subiendo...' : 'Subir Imagen'}
        </button>
      </div>
    </div>
  )
}
