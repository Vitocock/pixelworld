"use client";
import ProductCatalogGrid from "./ProductCatalogGrid";
import { useEffect, useState } from "react";

export default function Home() {
  const colors = [
    "#00ff00", "#01F540", "#02EC80", "#03E3BF", "#04D9FF",
    "#0AAEFC", "#1182F9", "#1757F6", "#1D2CF3",
  ];

  const [borderColorIndex, setBorderColorIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsData, setProductsData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBorderColorIndex((prev) => (prev + 1) % colors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const borderColor = colors[borderColorIndex];

  // Fetch de productos con paginación
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products/getAllProducts?page=${currentPage}`);
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        setProductsData(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const totalPages = productsData?.pagination?.totalPages || 1;

  const getPageRange = () => {
    const delta = 2;
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    if (currentPage <= 2) end = Math.min(5, totalPages);
    if (currentPage >= totalPages - 1) start = Math.max(1, totalPages - 4);

    const range = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  };

  return (
    <section className="w-full xl:w-4/5 p-3 lg:p-8 mx-auto">
      <a className="w-fit pb-4 flex font-['orbitron'] hover:-translate-x-8 transition-all duration-300" href="/#home">◀ Volver a la pagina principal</a>

      <div className="mb-8 text-center font-['orbitron'] text-white">
        <h1 className="scroll-mt-24 text-4xl lg:text-5xl font-bold" style={{ textShadow: `0px 0px 18px ${borderColor}` }}>
          Nuestros Productos
        </h1>
      </div>

      {/* Productos */}
      <ProductCatalogGrid
        color={borderColor}
        productsData={productsData}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      {/* Paginación */}
      <div className="mt-12 flex justify-center gap-2 flex-wrap">
        {/* Ir a la primera página */}
        {totalPages > 5 && currentPage > 3 && (
          <button
            onClick={() => setCurrentPage(1)}
            className="px-3 py-2 bg-white/10 text-white rounded hover:ring-2 ring-white transition"
          >
            ⏮
          </button>
        )}

        {/* Página anterior */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-white/10 text-white rounded hover:ring-2 ring-white disabled:opacity-40"
        >
          ◀
        </button>

        {/* Botones numéricos */}
        {getPageRange().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            className={`w-10 h-10 rounded font-bold ${
              pageNum === currentPage
                ? "bg-white text-black"
                : "bg-white/10 hover:ring-2 ring-white"
            }`}
          >
            {pageNum}
          </button>
        ))}

        {/* Página siguiente */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 bg-white/10 text-white rounded hover:ring-2 ring-white disabled:opacity-40"
        >
          ▶
        </button>

        {/* Ir a la última página */}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <button
            onClick={() => setCurrentPage(totalPages)}
            className="px-3 py-2 bg-white/10 text-white rounded hover:ring-2 ring-white"
          >
            ⏭
          </button>
        )}
      </div>
    </section>
  );
}
