"use client"

import { useEffect, useState } from "react"
import  PricingCard  from "./PricingCard"

export default function Plans() {
  const [plans, setPlans] = useState([])

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/plans/getAllActivePlans")
        if (!res.ok) throw new Error("Error al obtener los planes")
        const data = await res.json()
        console.log(data)
        setPlans(data)
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchPlans()
  }, [])

  return (
    <div className="my-6 flex flex-col bg-blue-600 rounded-xl px-2 py-4">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold" id="plans">Nuestros planes</h2>
        </div>
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold  ">Nuestros precios no incluyen traslado, consultar valor segun tu comuna.</h2>
          <p><a href="" target="_blank">Consulta por el catalogo de juegos haciendo click aqui.</a></p>
        </div >
        <div className="mt-4 flex flex-row flex-wrap flex-between">
        {plans.map(plan => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
        </div>
    </div>
  )
}