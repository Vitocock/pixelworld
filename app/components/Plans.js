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
      <div className="my-16 flex flex-col justify-self-center w-5/6 py-4">
          <div className="mb-4 text-center font-[Orbitron] text-white [text-shadow:_0px_0px_33px_rgb(21_101_185_/_1.00)]">
            <h2 id="plans" className="scroll-mt-24 text-4xl lg:text-5xl font-bold">Nuestros planes</h2>
          </div>
          <div className="mt-4 mb-8 w-5/6 h-2.5 flex flex-row self-center bg-white rounded-[10px] shadow-[0px_0px_7.900000095367432px_7px_rgba(21,101,185,1.00)] border-4 border-sky-500"></div>
          <a className="text-lg font-[Orbitron] self-center">Si eres una empresa, un colegio o necesitas atención personalizada, contactanos</a>
          <div className="my-4 min-w-full overflow-x-auto scrollbar-hide snap-x flex flex-row gap-4 px-2">
            {plans.map(plan => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
          <div className="text-center text-white/70">
            <h2 className="text-lg lg:text-2xl font-bold font-[Orbitron] text-white/90">Nuestros precios no incluyen traslado, consultar valor segun tu comuna.</h2>
            <p><a className="text-base font-[Orbitron] hover:underline" href="/Lista-de-juegos.pdf" target="_blank">Consulta por el catalogo de juegos haciendo click aqui.</a></p>
          </div >
      </div>
    )
  }