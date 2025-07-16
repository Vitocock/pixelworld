import { useEffect, useState, useRef } from "react";
import ProductCatalog from "./ProductCatalog";
import ProductWindow from "./ProductWindow";
export default function ProductCatalogGrid({ color, productsData, setCurrentPage, currentPage }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const modalRef = useRef(null);

  const allProducts = productsData?.products || [];

  // Modal cierre externo
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setSelectedProduct(null);
      }
    };

    if (selectedProduct) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedProduct]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (!productsData) {
    return <div className="text-white text-center">Cargando productos...</div>;
  }

  return (
    <>
      <div className="w-full flex flex-wrap gap-8 justify-center">
        {allProducts.map((product) => (
          <ProductCatalog
            key={product.id}
            Product={product}
            onOpen={() => setSelectedProduct(product)}
            color={color}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div ref={modalRef} className="relative w-11/12 lg:w-2/3 h-dvh mt-10 lg:mt-72">
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