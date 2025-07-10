'use client'
import { useState, useRef } from "react"

export default function Plan({ plan, onRemove }) {
  const { id, name, base_price, resources, created_at } = plan
  const [isDisabled, setIsDisabled] = useState(true)

  const nameRef = useRef(null)
  const priceRef = useRef(null)
  const resourceRefs = useRef([])

  const handleSubmit = async () => {
    const updatedPlan = {
      id,
      name: nameRef.current.value,
      base_price: parseInt(priceRef.current.value),
      resources: resources.map((res, index) => ({
        id: res.id,
        quantity: parseInt(resourceRefs.current[index].value)
      }))
    }

    try {
      const res = await fetch('/api/admin/plan/editPlan', {
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
    } catch (err) {
      console.error("Error:", err)
      alert("Hubo un problema al guardar los cambios.")
    }
  }

  const handleDeactivate = async () => {
    if (!confirm("¿Estás seguro que deseas desactivar este plan?")) return

    try {
      const res = await fetch('/api/admin/plan/deactivatePlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Error al desactivar el plan")
      }

      alert("Plan desactivado con éxito")
      if (onRemove) onRemove(id)
    } catch (err) {
      console.error("Error:", err)
      alert("Hubo un problema al desactivar el plan.")
    }
  }

  return (
    <div className="bg-white p-4 mx-4 w-1/5">
      <div className="text-xl">
        <h3>{name}</h3>
      </div>

      <div className="border-b-2 border-black">
        <label className="my-2 flex flex-row justify-between">Nombre:
          <input
            ref={nameRef}
            className={`p-1 ${isDisabled ? 'bg-slate-400' : 'bg-slate-200'}`}
            type="text"
            defaultValue={name}
            disabled={isDisabled}
          />
        </label>
      </div>

      <div className="border-b-2 border-black">
        <label className="my-2 flex flex-row justify-between">Precio:
          <input
            ref={priceRef}
            className={`p-1 ${isDisabled ? 'bg-slate-400' : 'bg-slate-200'}`}
            type="number"
            defaultValue={base_price}
            disabled={isDisabled}
          />
        </label>
      </div>

      <div className="border-b-2 border-black">
        <label className="my-2 flex flex-row justify-between">Fecha de creación:
          <input
            className="p-1 bg-slate-400"
            type="text"
            defaultValue={new Date(created_at).toLocaleDateString()}
            disabled
          />
        </label>
      </div>

      {resources.map((r, i) => (
        <div className="border-b-2 border-black" key={r.name}>
          <label className="my-2 flex flex-row justify-between">{r.name}:
            <input
              ref={el => resourceRefs.current[i] = el}
              className={`p-1 ${isDisabled ? 'bg-slate-400' : 'bg-slate-200'}`}
              type="number"
              defaultValue={r.quantity}
              disabled={isDisabled}
            />
          </label>
        </div>
      ))}

      <div className="mt-4 flex flex-row justify-between text-white">
        <div>
          <button className="bg-blue-600 p-1 rounded" onClick={handleDeactivate}>Desactivar</button>
        </div>
        <div>
          <button className="bg-yellow-400 p-1 rounded" onClick={() => setIsDisabled(!isDisabled)}>Editar</button>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className={`p-1 rounded ${isDisabled ? 'bg-gray-800' : 'bg-green-600'}`}
            disabled={isDisabled}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
