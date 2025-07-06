"use client"
import { useEffect, useState } from "react"

export default function ModalEditProduct({ productId, onClose, onSave }) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: "",
    brand: "",
    base_price: "",
    description: ""
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/getProductById?id=${productId}`)
        const data = await res.json()
        if (res.ok) {
          setProduct(data)
          setForm({
            name: data.name || "",
            brand: data.brand || "",
            base_price: data.base_price || "",
            description: data.description || ""
          })
        } else {
          alert(data.error || "Error al obtener producto")
        }
      } catch (err) {
        alert("Error al obtener producto")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/admin/products/editProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, ...form })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Error al editar el producto")
      }

      alert("Producto actualizado correctamente")
      onSave() // para refrescar la lista si lo deseas
      onClose()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div>Cargando...</div>

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col mb-2'>
            <label>Nombre:</label>
            <input 
              className='bg-slate-200 px-2'
              name="name" value={form.name} onChange={handleChange} type="text" />
          </div>
          <div className='flex flex-col mb-2'>
            <label>Marca:</label>
            <input
              className='bg-slate-200 px-2'
              name="brand" value={form.brand} onChange={handleChange} type="text" />
          </div>
          <div className='flex flex-col mb-2'>
            <label>Precio:</label>
            <input 
              className='bg-slate-200 px-2'
              name="base_price" value={form.base_price} onChange={handleChange} type="text" />
          </div>
          <div className='flex flex-col mb-2'>
            <label>Descripción:</label>
            <textarea 
              className='bg-slate-200 px-2'
              name="description" value={form.description} onChange={handleChange} />
          </div>
          <div className="text-white mt-4 flex justify-between">
            <button 
              className="bg-gray-400 px-4 py-1 "
              type="button" onClick={onClose}>Cancelar</button>
            <button 
              className="bg-green-600 px-4 py-1"
              type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
