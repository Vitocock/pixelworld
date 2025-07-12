import { useState, useEffect, useRef } from "react";
import ProductCatalog from "./ProductCatalog";
import ProductWindow from "./ProductWindow";

export default function ProductCatalogGrid({ color }) {
  const [productsData, setProductsData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const modalRef = useRef(null);

  // Fetch de productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `/api/products/getAllProducts?page=${currentPage}`
        const res = await fetch(url);
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        console.log(data)
        setProductsData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const allProducts = productsData?.products || [];
  const totalPages = productsData?.pagination?.totalPages || 1;
  const currentProducts = allProducts;

  // Cierre del modal si haces clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setSelectedProduct(null);
      }
    };

    if (selectedProduct) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProduct]);

  // Scroll to top al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (!productsData) {
    return <div className="text-white text-center">Cargando productos...</div>;
  }

  return (
    <>
      <div className="w-full flex flex-wrap gap-8 justify-center">
        {currentProducts.map((product) => (
          <ProductCatalog
            key={product.id}
            Product={product}
            onOpen={() => setSelectedProduct(product)}
            color={color}
            />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="absolute flex flex-wrap justify-center bottom-2 left-[47%] items-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          style={{background: color}}
          className="px-3 py-2 hover:ring-2 ring-current transition-all duration-300 text-white rounded disabled:opacity-50"
        >
          ◀
        </button>
        <span className="text-white text-lg">
        {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          style={{backgroundColor: color}}
          className="px-3 py-2 hover:ring-2 ring-current transition-all duration-300 text-white rounded disabled:opacity-50"
        >
          ▶
        </button>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div ref={modalRef} className="relative w-2/3 h-full mt-72">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute -top-4 -right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 z-10"
            >
              ✕
            </button>
            <ProductWindow Product={selectedProduct} />
          </div>
        </div>
      )}
    </>
  );
}
