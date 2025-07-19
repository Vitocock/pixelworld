"use client"
import { useEffect, useState, useRef } from "react"

export default function ModalEditProduct({ productId, onClose, onSave }) {
  const [loading, setLoading] = useState(true)

  // Datos base del producto
  const [form, setForm] = useState({
    name: "",
    brand: "",
    base_price: "",
    description: "",
    image: "",   // URL imagen principal
    images: []   // URLs imágenes secundarias existentes
  })

  // Archivos nuevos seleccionados
  const [mainImageFile, setMainImageFile] = useState(null)
  const [newSecondaryFiles, setNewSecondaryFiles] = useState([])

  // URLs de imágenes existentes marcadas para eliminar
  const [deletedExisting, setDeletedExisting] = useState([])

  // Para resetear el input multiple cuando agregas imágenes (UI)
  const secondaryInputRef = useRef(null)

  // Cargar producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/getProductById?id=${productId}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Error al obtener producto")

        setForm({
          name: data.name || "",
          brand: data.brand || "",
          base_price: data.base_price || "",
          description: data.description || "",
          image: data.image || "",
          images: data.images || []
        })
      } catch (err) {
        alert("Error al obtener producto")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  // Campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Reemplazar imagen principal
  const handleMainImageChange = (e) => {
    const file = e.target.files[0]
    if (file) setMainImageFile(file)
  }

  // Agregar imágenes secundarias NUEVAS
  const handleSecondaryImagesChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setNewSecondaryFiles((prev) => [...prev, ...files])

    // reset input para poder volver a subir el mismo archivo si se elimina
    if (secondaryInputRef.current) {
      secondaryInputRef.current.value = null
    }
  }

  // Eliminar UNA imagen existente (de BD)
  const handleRemoveExistingSecondary = (url) => {
    if (!confirm("¿Eliminar esta imagen existente?")) return
    setDeletedExisting((prev) => [...prev, url])
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((imgUrl) => imgUrl !== url)
    }))
  }

  // Eliminar UNA imagen NUEVA antes de guardar
  const handleRemoveNewSecondary = (index) => {
    setNewSecondaryFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("id", productId)
    formData.append("name", form.name)
    formData.append("brand", form.brand)
    formData.append("base_price", form.base_price)
    formData.append("description", form.description)

    // Imagen principal (solo si usuario subió una nueva)
    if (mainImageFile) {
      formData.append("mainImage", mainImageFile)
    }

    // Imágenes secundarias nuevas
    newSecondaryFiles.forEach((file) => {
      formData.append("secondaryImages", file)
    })

    // URLs de imágenes existentes que se eliminarán
    if (deletedExisting.length > 0) {
      formData.append("deletedImages", JSON.stringify(deletedExisting))
    }

    try {
      const res = await fetch("/api/admin/products/editProduct", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al editar el producto")

      alert("Producto actualizado correctamente")
      onSave?.()
      onClose?.()
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  if (loading) return <div>Cargando...</div>

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[500px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          {/* Campos de texto */}
          <div className='flex flex-col mb-2'>
            <label>Nombre:</label>
            <input
              className='bg-slate-200 px-2'
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className='flex flex-col mb-2'>
            <label>Marca:</label>
            <input
              className='bg-slate-200 px-2'
              name="brand"
              value={form.brand}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className='flex flex-col mb-2'>
            <label>Precio:</label>
            <input
              className='bg-slate-200 px-2'
              name="base_price"
              value={form.base_price}
              onChange={handleChange}
              type="number"
            />
          </div>
          <div className='flex flex-col mb-2'>
            <label>Descripción:</label>
            <textarea
              className='bg-slate-200 px-2'
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Imagen principal */}
          <div className="mb-4">
            <label>Imagen principal:</label>
            <div className="mb-2">
              {mainImageFile ? (
                <img
                  src={URL.createObjectURL(mainImageFile)}
                  alt="preview"
                  className="w-24 h-24 object-cover"
                />
              ) : (
                form.image && (
                  <img
                    src={form.image}
                    alt="imagen actual"
                    className="w-24 h-24 object-cover"
                  />
                )
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleMainImageChange} />
          </div>

          {/* Imágenes secundarias existentes */}
          <div className="mb-4">
            <label>Imágenes adicionales:</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.images.map((imgUrl) => (
                <div key={imgUrl} className="relative">
                  <img
                    src={imgUrl}
                    alt="secondary"
                    className="w-16 h-16 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5"
                    onClick={() => handleRemoveExistingSecondary(imgUrl)}
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Nuevas imágenes sin guardar aún */}
              {newSecondaryFiles.map((file, i) => (
                <div key={`new-${i}`} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="nuevo"
                    className="w-16 h-16 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5"
                    onClick={() => handleRemoveNewSecondary(i)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <input
              ref={secondaryInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleSecondaryImagesChange}
              className="mt-2"
            />
          </div>

          {/* Botones */}
          <div className="text-white mt-4 flex justify-between">
            <button
              className="bg-gray-400 px-4 py-1"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="bg-green-600 px-4 py-1"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
