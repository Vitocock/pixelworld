"use client"
import { useState, useEffect } from "react"

function Resource({ resource, planForm, setPlanForm }) {
  const { name, id } = resource
  const quantity = planForm.resources.find(r => r.id === id)?.quantity || 0

  const onChange = (event) => {
    const newQuantity = parseInt(event.target.value) || 0
    const updatedResources = planForm.resources.map(r =>
      r.id === id ? { ...r, quantity: newQuantity } : r
    )
    setPlanForm({ ...planForm, resources: updatedResources })
  }

  return (
    <div className="my-2">
      <label>{name}</label>
      <input
        type="number"
        className="ml-2 p-1 border"
        value={quantity}
        onChange={onChange}
        min={0}
      />
    </div>
  )
}

const formSchema = {
  name: "",
  base_price: 0,
  resources: [] // [{ id, quantity }]
}

export default function CreatePlan({ onCreated }) {
  const [resources, setResources] = useState([])
  const [planForm, setPlanForm] = useState(formSchema)
  const [selectedResourceId, setSelectedResourceId] = useState("")

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch("/api/plans/getResources")
        if (!res.ok) throw new Error("Error al obtener los recursos")
        const data = await res.json()
        setResources(data)
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchResources()
  }, [])

  const handleAddResource = () => {
    const id = parseInt(selectedResourceId)
    if (!id || planForm.resources.find(r => r.id === id)) return

    setPlanForm({
      ...planForm,
      resources: [...planForm.resources, { id, quantity: 1 }]
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPlanForm({
      ...planForm,
      [name]: name === "base_price" ? parseInt(value) || 0 : value
    })
  }

  const submitForm = async (event) => {
    event.preventDefault()
    try {
      const data = await fetch("/api/admin/plans/createPlan", {
        method: "POST",
        body: JSON.stringify(planForm)
      })
      const res = await data.json()
      alert("Plan creado con éxito")
      if (onCreated) onCreated()
    } catch (error) {
      console.error(error)
      alert("Error al crear el plan.")
    }
  }

  return (
    <div className="bg-white">
      <form onSubmit={submitForm}>
        <div className="border-b-2 border-black mb-4">
          <label className="my-2 flex flex-row justify-between">
            Nombre:
            <input
              name="name"
              className="p-1 bg-slate-200 ml-2"
              type="text"
              value={planForm.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="border-b-2 border-black mb-4">
          <label className="my-2 flex flex-row justify-between">
            Precio:
            <input
              name="base_price"
              className="p-1 bg-slate-200 ml-2"
              type="text"
              value={planForm.base_price}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="border-b-2 border-black mb-4">
          <h3 className="font-semibold mb-2">Recursos:</h3>
          {planForm.resources.map(({ id }) => {
            const resource = resources.find(r => r.id === id)
            if (!resource) return null
            return (
              <Resource
                key={id}
                resource={resource}
                planForm={planForm}
                setPlanForm={setPlanForm}
              />
            )
          })}
          <div className="flex flex-row mt-2 pb-2">
            <select
              className="p-1 border mr-2"
              value={selectedResourceId}
              onChange={(e) => setSelectedResourceId(e.target.value)}
            >
              <option value="">Selecciona un recurso</option>
              {resources.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="bg-yellow-400 text-white px-2 rounded"
              onClick={handleAddResource}
            >
              Agregar
            </button>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button type="submit" className="p-2 bg-green-600 text-white rounded">
            Enviar
          </button>
        </div>
      </form>
    </div>
  )
}
