import { useEffect, useRef, useState } from "react";

export default function ProductWindow({ Product }) {
  const { name, brand, base_price, description, image, images } = Product;
  const scrollRef = useRef(null);

  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [selectedImage, setSelectedImage] = useState(image); // imagen principal actual

  const allImages = [image, ...(images?.map((img) => img.dir) || [])];

  // Detección de scroll
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

  const scroll = (direction) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    scrollContainer.scrollBy({
      left: direction === "right" ? 120 : -120,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full h-2/3 grid grid-cols-2 grid-rows-4 p-2 border border-blue-700 bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] backdrop-blur-3xl">
      {/* Imagen principal seleccionada */}
      <div className="h-full row-span-3 overflow-hidden">
        <img
          src={selectedImage}
          alt={`${name} principal`}
          className="w-full h-full object-contain rounded-sm transition-all duration-300"
        />
      </div>
      <div>
          <h2 className="px-4 pt-4 font-['exo'] self-end text-2xl">{brand}</h2>
          <h1 className="px-4 font-['orbitron'] text-5xl">{name}</h1>
      </div>
      <div className="px-4 font-['exo'] text-5xl">${base_price}
        <div className="pt-12 justify-between flex flex-row">
        <div className="flex flex-row w-2/5 h-2.5 bg-white rounded-[10px] shadow-[0px_0px_7.900000095367432px_7px_rgba(21,101,185,1.00)] border-4 border-sky-500"></div>
        <div className="flex flex-row w-2/5 h-2.5 justify-right bg-white rounded-[10px] shadow-[0px_0px_7.900000095367432px_7px_rgba(21,101,185,1.00)] border-4 border-sky-500"></div>
      </div>
      </div>
      <div className="px-4 font-['exo'] text-xl">{description}</div>
      {/* Scroll horizontal con miniaturas */}
      <div className="relative flex items-center h-full">
      {/* Flecha izquierda */}
      <button
        onClick={() => scroll("left")}
        className={`absolute z-10 left-0 px-1 py-1 bg-black/70 hover:bg-black/90 text-white rounded-lg transition-all duration-300 ease-in-out ${
        atStart ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        ◀
      </button>

      <div
        ref={scrollRef}
        className="flex h-full overflow-x-auto gap-2 py-2 px-1 snap-x scroll-smooth scrollbar-hide"
      >
      {allImages.map((dir, index) => (
        <img
          key={index}
          src={dir}
          alt={`${name} imagen ${index}`}
          onClick={() => setSelectedImage(dir)} // click cambia imagen
          className={`h-full min-w-20 object-cover rounded-sm snap-start cursor-pointer transition-all duration-200 ${
          selectedImage === dir ? "ring-2 ring-sky-400" : ""
          }`}
        />
        ))}
      </div>

      {/* Flecha derecha */}
      <button
        onClick={() => scroll("right")}
        className={`absolute z-10 right-0 px-1 py-1 bg-black/70 hover:bg-black/90 text-white rounded-lg transition-all duration-300 ease-in-out ${
        atEnd ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        ▶
      </button>
      </div>
      <a className="flex w-4/5 h-2/4 justify-self-center place-content-center items-center self-center bg-gradient-to-l from-blue-600 to-blue-700 hover:bg-gradient-to-l hover:from-blue-700 hover:to-blue-800 transition-all duration-700 rounded-[10px] shadow-xs text-white text-2xl font-[Exo] font-semibold leading-6"  target="_blank" href="https://api.whatsapp.com/send?phone=56966715669">
        <div className="text-2xl font-[Exo] place-self-center whitespace-nowrap">
        Consultar disponibilidad
        </div>
      </a>
    </div>
  );
}
