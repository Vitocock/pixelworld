'use client'
import { useState, useRef } from "react"
import AddResourceModal from "./AddResourceModal"

export default function InactivePlan({ plan, onRemove, onRefresh }) {
  const { id, name, base_price, resources, created_at, sort } = plan
  const [isDisabled, setIsDisabled] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const nameRef = useRef(null)
  const priceRef = useRef(null)
  const sortRef = useRef(null)
  const resourceRefs = useRef([])

  const handleSubmit = async () => {
    const updatedPlan = {
      id,
      name: nameRef.current.value,
      base_price: parseInt(priceRef.current.value),
      sort: parseInt(sortRef.current.value),
      resources: resources.map((res, index) => ({
        id: res.id,
        quantity: parseInt(resourceRefs.current[index].value)
      }))
    }

    try {
      const res = await fetch('/api/admin/plans/editPlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlan)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Error al actualizar el plan")
      }

      alert("Plan actualizado con éxito")
      setIsDisabled(true)
      if (onRefresh) onRefresh()
    } catch (err) {
      console.error("Error:", err)
      alert("Hubo un problema al guardar los cambios.")
    }
  }

  const handleActivate = async () => {
    if (!confirm("¿Estás seguro que deseas activar este plan?")) return

    try {
      const res = await fetch('/api/admin/plans/activatePlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Error al activar el plan")
      }

      alert("Plan activado con éxito")
      onRefresh()
    } catch (err) {
      console.error("Error:", err)
      alert("Hubo un problema al activar el plan.")
    }
  }

  const handleRemoveResource = async (resourceId, resourceName) => {
    const confirmDelete = confirm(`¿Eliminar recurso "${resourceName}" del plan?`)
    if (!confirmDelete) return

    try {
      const res = await fetch('/api/admin/plans/removeResource', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_id: id, resource_id: resourceId })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      alert('Recurso eliminado del plan')
      if (onRefresh) onRefresh()
    } catch (err) {
      console.error('Error al eliminar recurso:', err)
      alert('No se pudo eliminar el recurso')
    }
  }

  const handleDelete = async () => {
    const confirmDelete = confirm(`¿Estás seguro que deseas eliminar el plan "${name}"? Esta acción no se puede deshacer.`)
    if (!confirmDelete) return

    try {
      const res = await fetch('/api/admin/plans/deletePlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      alert('Plan eliminado correctamente')
      if (onRemove) onRemove(id)
    } catch (err) {
      console.error('Error al eliminar plan:', err)
      alert('No se pudo eliminar el plan')
    }
  }


  return (
    <div className="bg-white p-4 m-4 w-1/5">
      <div className="text-xl">
        <h3>{name}</h3>
      </div>

      <div className="border-b-2 border-black">
        <label className="my-2 flex flex-row justify-between">Nombre:
          <input ref={nameRef} className={`p-1 ${isDisabled ? 'bg-slate-400' : 'bg-slate-200'}`} type="text" defaultValue={name} disabled={isDisabled} />
        </label>
      </div>
      <div className="border-b-2 border-black">
        <label className="my-2 flex flex-row justify-between">Precio:
          <input ref={priceRef} className={`p-1 ${isDisabled ? 'bg-slate-400' : 'bg-slate-200'}`} type="number" defaultValue={base_price} disabled={isDisabled} />
        </label>
      </div>
      <div className="border-b-2 border-black">
        <label className="my-2 flex flex-row justify-between">Fecha de creación:
          <input className="p-1 bg-slate-400" type="text" defaultValue={new Date(created_at).toLocaleDateString()} disabled />
        </label>
      </div>
      <div className="border-b-2 border-black">
        <label className="my-2 flex flex-row justify-between">Orden:
          <input
            ref={sortRef}
            className={`p-1 ${isDisabled ? 'bg-slate-400' : 'bg-slate-200'}`}
            type="number"
            defaultValue={sort}
            disabled={isDisabled}
          />
        </label>
      </div>

      {resources.map((r, i) => (
        <div className="border-b-2 border-black flex items-center justify-between" key={r.id}>
          <label className="my-2 flex flex-row justify-between w-full mr-2">{r.name}:
            <input
              ref={el => resourceRefs.current[i] = el}
              className={`p-1 ${isDisabled ? 'bg-slate-400' : 'bg-slate-200'}`}
              type="number"
              defaultValue={r.quantity}
              disabled={isDisabled}
            />
          </label>
          <button
            className="text-red-600 text-xl font-bold ml-2"
            title="Eliminar recurso"
            onClick={() => handleRemoveResource(r.id, r.name)}
          >
            ❌
          </button>
        </div>
      ))}

      <div className="mt-4 flex flex-row flex-wrap justify-between text-white">
        <button className="bg-green-600 p-1 rounded" onClick={handleActivate}>Activar</button>
        <button className="bg-yellow-400 p-1 rounded" onClick={() => setIsDisabled(!isDisabled)}>Editar</button>
        <button className="bg-blue-600 p-1 rounded" onClick={() => setShowModal(true)}>Agregar recurso</button>
        <button className="bg-red-600 p-1 rounded" onClick={handleDelete}>Eliminar</button>
        <button onClick={handleSubmit} className={`p-1 mt-4 flex-grow rounded ${isDisabled ? 'bg-gray-800' : 'bg-green-600'}`} disabled={isDisabled}>Enviar</button>
      </div>

      {showModal && (
        <AddResourceModal
          planId={id}
          onClose={() => setShowModal(false)}
          onAdded={() => {
            setShowModal(false)
            if (onRefresh) onRefresh()
          }}
        />
      )}
    </div>
  )
}
