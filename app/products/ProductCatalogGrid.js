import { useState, useRef, useEffect } from "react";
import ProductCatalog from "./ProductCatalog";
import ProductWindow from "./ProductWindow";

export default function ProductCatalogGrid({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const modalRef = useRef(null);

  // Modal: Cierra si haces clic fuera
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

  // Subir scroll al cambiar de página

  return (
    <>
      <div className="w-full flex flex-wrap gap-8 justify-center">
        {currentProducts.map((product) => (
          <ProductCatalog
            key={product.id}
            Product={product}
            onOpen={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
        <button
          className="px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded disabled:hidden"
        >
          ◀
        </button>
        

        <button

          className="px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded disabled:hidden"
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
