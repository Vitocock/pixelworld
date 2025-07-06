'use client'

import { useState } from 'react'

export default function CreateProductModal({ onClose, onSave }) {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [mainImage, setMainImage] = useState(null)
  const [additionalImages, setAdditionalImages] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!mainImage) {
      alert('Debe seleccionar una imagen principal.')
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('brand', brand)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('image', mainImage) // banner

    additionalImages.forEach((img, index) => {
      formData.append(`additionalImages`, img)
    })

    console.log(additionalImages)

    try {
      const res = await fetch('/api/admin/products/createProduct', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error al crear el producto')

      alert('Producto creado correctamente')
      onSave?.()
      onClose()
    } catch (err) {
      console.error(err)
      alert('Error al crear el producto')
    }
  }

  const handleAdditionalChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5) // máx 5
    setAdditionalImages(files)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-[500px] rounded">
        <h2 className="text-2xl font-semibold mb-4">Crear producto</h2>

        <form onSubmit={handleSubmit}>
          <div className='flex flex-col mb-2'>
            <label>Nombre:</label>
            <input className='bg-slate-200 px-2'
              type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className='flex flex-col mb-2'>
            <label>Marca:</label>
            <input className='bg-slate-200 px-2'
              type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
          </div>
          <div className='flex flex-col mb-2'>
            <label>Precio:</label>
            <input className='bg-slate-200 px-2'
              type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className='flex flex-col mb-2'>
            <label>Descripción:</label>
            <textarea className='bg-slate-200 px-2 h-32'
              value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className='flex flex-col mb-2'>
            <label>Imagen principal (banner):</label>
            <input type="file" onChange={(e) => setMainImage(e.target.files[0])} accept="image/*" required />
          </div>
          <div className='flex flex-col mb-2'>
            <label>Imágenes adicionales (máx 5):</label>
            <input type="file" multiple onChange={handleAdditionalChange} accept="image/*" />
          </div>

          <div className='flex justify-between gap-2 mt-4'>
            <button type="button" className="px-4 py-1 bg-gray-500 text-white" onClick={onClose}>Cancelar</button>
            <button className='px-4 py-1 bg-green-600 text-white' type="submit">Crear</button>
          </div>
        </form>
      </div>
    </div>
  )
}

