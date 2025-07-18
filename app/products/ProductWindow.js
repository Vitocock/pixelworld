import { useEffect, useRef, useState } from "react";

export default function ProductWindow({ Product }) {
  const { id, name, brand, base_price, description, image } = Product;
  const scrollRef = useRef(null);

  const [extraImages, setExtraImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(image);
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/products/getAllProductImages?id=${id}`);
        if (!res.ok) throw new Error("Error al obtener imágenes adicionales");
        const data = await res.json();
        setExtraImages((data.images || []).map((url) => ({ dir: url })));
      } catch (error) {
        console.error("Error al obtener imágenes:", error);
      }
    };

    if (id) fetchImages();
  }, [id]);

const allImages = [image, ...extraImages.map((img) => img.dir)];

useEffect(() => {
  const el = scrollRef.current;
  if (!el) return;

  const checkScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScroll(scrollWidth > clientWidth);
    setAtStart(scrollLeft <= 0);
    setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  checkScroll();
  el.addEventListener("scroll", checkScroll);
  window.addEventListener("resize", checkScroll);

  return () => {
    el.removeEventListener("scroll", checkScroll);
    window.removeEventListener("resize", checkScroll);
  };
}, [allImages]);

useEffect(() => {
  // Guardamos estilos originales
  const originalOverflow = document.body.style.overflow;
  const originalPosition = document.body.style.position;
  const originalWidth = document.body.style.width;

  // Bloqueamos el scroll en todos los dispositivos
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';

  return () => {
    // Restauramos estilos al cerrar el modal
    document.body.style.overflow = originalOverflow;
    document.body.style.position = originalPosition;
    document.body.style.width = originalWidth;
  };
}, []);

const scroll = (direction) => {
  const scrollContainer = scrollRef.current;
  if (!scrollContainer) return;
  scrollContainer.scrollBy({
    left: direction === "right" ? 120 : -120,
    behavior: "smooth",
  });
};

return (
  <div className="w-full max-h-min sm:h-[90%] lg:h-2/3 flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-4 p-4 gap-2 sm:gap-4 border border-blue-700 bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] backdrop-blur-3xl">

    {/* Imagen principal */}
    <div className="w-full h-56 sm:h-full row-span-3 overflow-hidden">
      <img
        src={selectedImage}
        alt={`${name} principal`}
        className="w-full h-full object-contain rounded-sm transition-all duration-300"
      />
    </div>

    {/* Título y Marca */}
    <div>
      <h2 className="px-2 sm:pt-2 font-['Exo'] text-lg sm:text-xl lg:text-2xl">{brand}</h2>
      <h1 className="px-2 font-['Orbitron'] text-2xl sm:text-2xl lg:text-5xl">{name}</h1>
    </div>

    {/* Precio y decoraciones */}
    <div className="px-2 font-['Exo'] text-2xl sm:text-3xl lg:text-5xl">
      ${Number(base_price).toLocaleString('es-CL')}
      <div className="pt-2 sm:pt-4 lg:pt-12 flex justify-between gap-4">
        <div className="flex w-2/5 h-1.5 sm:h-2.5 bg-white rounded-[10px] shadow-[0_0_7.9px_7px_rgba(21,101,185,1)] border-2 sm:border-4 border-sky-500"></div>
        <div className="flex w-2/5 h-1.5 sm:h-2.5 bg-white rounded-[10px] shadow-[0_0_7.9px_7px_rgba(21,101,185,1)] border-2 sm:border-4 border-sky-500"></div>
      </div>
    </div>

    {/* Descripción */}
    <div className="px-2 font-['Exo'] text-base lg:text-xl max-h-28 sm:max-h-40 overflow-y-auto scrollbar-dark">
      {description}
    </div>

    {/* Miniaturas scrollables */}
    <div className="relative flex items-center h-24 sm:h-full">
      <button
        onClick={() => scroll("left")}
        className={`hidden sm:block absolute z-10 left-0 px-1 py-1 bg-black/70 hover:bg-black/90 text-white rounded-lg transition-all duration-300 ${
          atStart ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        ◀
      </button>

      <div
        ref={scrollRef}
        className="flex w-full h-full overflow-x-auto gap-2 px-2 py-2 snap-x scroll-smooth scrollbar-dark"
      >
        {allImages.map((dir, index) => (
          <img
            key={index}
            src={dir}
            alt={`${name} imagen ${index}`}
            onClick={() => setSelectedImage(dir)}
            className={`h-full w-24 sm:w-1/4 object-cover rounded-sm snap-start scroll-ml-6 cursor-pointer transition-all duration-200 ${
              selectedImage === dir ? "ring-2 ring-sky-400" : ""
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className={`hidden sm:block absolute z-10 right-0 px-1 py-1 bg-black/70 hover:bg-black/90 text-white rounded-lg transition-all duration-300 ${
          atEnd ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        ▶
      </button>
    </div>

    {/* Botón de contacto */}
    <a
      className="w-full sm:w-4/5 h-12 sm:h-4/5 lg:h-2/5 text-white text-md sm:text-lg lg:text-2xl font-[Exo] whitespace-nowrap font-semibold leading-6 justify-self-center place-content-center items-center self-center bg-gradient-to-l from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-700 rounded-[10px] shadow-xs flex justify-center"
      target="_blank"
      href="https://api.whatsapp.com/send?phone=56966715669"
    >
      Consultar disponibilidad
    </a>
  </div>
);
}