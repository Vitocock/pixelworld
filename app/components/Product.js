import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("/api/products/getAllProducts?page=1");
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        setProducts(data.products.slice(0, 3)); // solo muestra los 3 primeros
      } catch (error) {
        console.error("Error al cargar productos destacados:", error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Manejo de scroll para móviles
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    container.scrollTo({
      left: index * width,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full 2xl:w-5/6 my-16 flex flex-col items-center justify-center place-self-center">
      <p className="text-center transform hover:scale-105 transition-all duration-300">
        <a
          className="text-white text-3xl lg:text-5xl font-bold font-['Orbitron'] [text-shadow:_0px_0px_33px_rgb(21_101_185_/_1.00)]"
          href="/products"
          target="_blank"
        >
          Haz click aquí para ver nuestros productos
        </a>
      </p>

      <div className="mt-4 mb-8 w-5/6 h-2.5 flex self-center bg-white rounded-[10px] shadow-[0px_0px_7.9px_7px_rgba(21,101,185,1)] border-4 border-sky-500"></div>

      {/* Carrusel en móvil, fila normal en escritorio */}
      <div
        ref={containerRef}
        className="flex self-center sm:flex-row flex-nowrap w-full xl:w-4/5 h-80 sm:h-96 px-0 sm:px-14 py-6 sm:gap-8 xl:gap-28 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scroll-smooth scroll-stroke bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] transition-all duration-300 backdrop-blur-3xl"
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={product.id}
              className="w-full sm:w-1/3 flex-shrink-0 sm:flex-shrink snap-center px-4 sm:px-0"
            >
              <ProductCard Product={product} />
            </div>
          ))
        ) : (
          <p className="text-white">Cargando productos...</p>
        )}
      </div>

      {/* Puntos indicadores solo en móvil */}
      <div className="mt-4 flex sm:hidden gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              activeIndex === index ? "bg-sky-400 scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}