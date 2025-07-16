"use client"

import { useEffect, useState, useRef } from "react"
import PricingCard from "./PricingCard"

export default function Plans({ catalogUrl }) {
  const [plans, setPlans] = useState([])
  const scrollRef = useRef(null)
  const cardRefs = useRef([])

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [visibleIndices, setVisibleIndices] = useState([])

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

  const scrollToIndex = (index) => {
  const container = scrollRef.current;
  const cardWidth = container.offsetWidth / (isLargeScreen ? 3 : 1);
  container.scrollTo({
    left: index * cardWidth,
    behavior: 'smooth',
  });
};


  const updateVisibleCards = () => {
    const container = scrollRef.current
    if (!container) return

    const containerLeft = container.scrollLeft
    const containerRight = containerLeft + container.clientWidth

    const visible = cardRefs.current.map((card, i) => {
      if (!card) return false
      const cardLeft = card.offsetLeft
      const cardRight = cardLeft + card.offsetWidth
      return cardRight > containerLeft && cardLeft < containerRight ? i : false
    }).filter(i => i !== false)

    setVisibleIndices(isLargeScreen ? visible.slice(0, 3) : visible.slice(0, 1))
  }

  useEffect(() => {
    checkScreenSize()
    updateScrollButtons()
    updateVisibleCards()

    const handleResize = () => {
      checkScreenSize()
      updateScrollButtons()
      updateVisibleCards()
    }

    const container = scrollRef.current
    container?.addEventListener("scroll", () => {
      updateScrollButtons()
      updateVisibleCards()
    })
    window.addEventListener("resize", handleResize)

    return () => {
      container?.removeEventListener("scroll", updateScrollButtons)
      window.removeEventListener("resize", handleResize)
    }
  }, [plans])

  return (
    <section className="my-16 flex flex-col justify-self-center w-full max-w-sm sm:max-w-full lg:w-5/6 py-4">
      <div className="mb-4 text-center font-[Orbitron] text-white [text-shadow:_0px_0px_33px_rgb(21_101_185_/_1.00)]">
        <h2 id="plans" className="scroll-mt-24 text-4xl lg:text-5xl font-bold">Nuestros planes</h2>
      </div>

      <div className="mt-4 mb-8 w-5/6 h-2.5 flex flex-row self-center bg-white rounded-[10px] shadow-[0px_0px_7.9px_7px_rgba(21,101,185,1.00)] border-4 border-sky-500"></div>

      <a href="#contact" className="text-lg underline font-[Orbitron] self-center">
        Si eres una empresa, un colegio o necesitas atención personalizada, contáctanos
      </a>

      {/* Contenedor de scroll y botones */}
      <div className="relative w-full mt-2">
        {isLargeScreen && plans.length > 3 && canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 transition-all duration-300 bg-sky-600 hover:bg-sky-700 text-white rounded-xl"
          >
            ◀
          </button>
        )}

        {/* Scroll horizontal de planes */}
        <div
          ref={scrollRef}
          className="scroll-smooth overflow-x-auto scrollbar-hide flex flex-row snap-x gap-5"
        >
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className="snap-center flex justify-center min-w-full sm:min-w-[33%]"
            >
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>

        {isLargeScreen && plans.length > 3 && canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 transition-all duration-300 bg-sky-600 hover:bg-sky-700 text-white rounded-xl"
          >
            ▶
          </button>
        )}
      </div>

      {/* Indicadores */}
      {plans.length > 1 && (
        <div className="flex justify-center mt-2 gap-2">
          {plans.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                visibleIndices.includes(index)
                  ? "bg-sky-500"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>

      )}

      <div className="text-center text-white/70 mt-4">
        <h2 className="text-lg lg:text-2xl font-bold font-[Orbitron] text-white/90">
          Nuestros precios no incluyen traslado, consultar valor según tu comuna.
        </h2>
        <p>
          <a className="text-base font-[Orbitron] hover:underline" href={catalogUrl} target="_blank">
            Consulta por el catálogo de juegos haciendo click aquí.
          </a>
        </p>
      </div>
    </section>
  )
}