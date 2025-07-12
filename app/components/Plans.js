"use client"

import { useEffect, useState, useRef } from "react"
import PricingCard from "./PricingCard"

export default function Plans() {
  const [plans, setPlans] = useState([])
  const scrollRef = useRef(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/plans/getAllActivePlans")
        if (!res.ok) throw new Error("Error al obtener los planes")
        const data = await res.json()
        setPlans(data)
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchPlans()
  }, [])

  // Detecta el tamaño de pantalla
  const checkScreenSize = () => {
    setIsLargeScreen(window.innerWidth >= 1024)
  }

  const updateScrollButtons = () => {
    const container = scrollRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
  }

  const scroll = (direction) => {
    const container = scrollRef.current
    const cardWidth = container.offsetWidth / (isLargeScreen ? 3 : 1)
    container.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" })
  }

  useEffect(() => {
    checkScreenSize()
    updateScrollButtons()

    const handleResize = () => {
      checkScreenSize()
      updateScrollButtons()
    }

    const container = scrollRef.current
    container?.addEventListener("scroll", updateScrollButtons)
    window.addEventListener("resize", handleResize)

    return () => {
      container?.removeEventListener("scroll", updateScrollButtons)
      window.removeEventListener("resize", handleResize)
    }
  }, [plans])

  return (
    <div className="my-16 flex flex-col justify-self-center w-5/6 py-4">
      <div className="mb-4 text-center font-[Orbitron] text-white [text-shadow:_0px_0px_33px_rgb(21_101_185_/_1.00)]">
        <h2 id="plans" className="scroll-mt-24 text-4xl lg:text-5xl font-bold">Nuestros planes</h2>
      </div>

      <div className="mt-4 mb-8 w-5/6 h-2.5 flex flex-row self-center bg-white rounded-[10px] shadow-[0px_0px_7.9px_7px_rgba(21,101,185,1.00)] border-4 border-sky-500"></div>

      <a href="#contact" className="text-lg underline font-[Orbitron] self-center">
        Si eres una empresa, un colegio o necesitas atención personalizada, contáctanos
      </a>

      {/* Contenedor de scroll y botones */}
      <div className="relative w-full mt-8">
        {isLargeScreen && plans.length > 3 && canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-full"
          >
            ◀
          </button>
        )}

        {/* Scroll horizontal de planes */}
        <div
          ref={scrollRef}
          className="scroll-smooth overflow-x-auto scrollbar-hide flex flex-row snap-x gap-5 px-10"
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="snap-center flex justify-center min-w-full lg:min-w-[33%]" // 👈 1 plan en móvil, 3 en desktop
            >
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>

        {/* Botón derecha solo en pantallas grandes */}
        {isLargeScreen && plans.length > 3 && canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 px-3 py-2 transition-all duration-300 bg-sky-600 hover:bg-sky-700 text-white rounded-full"
          >
            ▶
          </button>
        )}
      </div>

      <div className="text-center text-white/70 mt-8">
        <h2 className="text-lg lg:text-2xl font-bold font-[Orbitron] text-white/90">
          Nuestros precios no incluyen traslado, consultar valor según tu comuna.
        </h2>
        <p>
          <a className="text-base font-[Orbitron] hover:underline" href="/Lista-de-juegos.pdf" target="_blank">
            Consulta por el catálogo de juegos haciendo click aquí.
          </a>
        </p>
      </div>
    </div>
  )
}
