import { useState } from "react";

export default function Header({ catalogUrl }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="flex w-full flex-row justify-center lg:py-2 bg-black fixed top-0 transition-all z-30">
      <nav className="flex w-[90%] sm:w-2/3 justify-between items-center">
        <a className="flex items-start lg:items-center transform hover:scale-110 transition-all duration-300" href="">
          <img className="size-16" src={"/logo-redondo.png"} />
        </a>

        <div className="flex lg:align-center items-center justify-center">
          <ul className="hidden xl:flex text-sm flex-row press-start-2p-regular uppercase">
            <li className="mx-8 whitespace-nowrap transition-all duration-300 hover:mt-2">
              <a href="#about-us">Quienes somos</a>
            </li>
            <li className="mx-8 transition-all duration-300 hover:mt-2">
              <a href="#gallery">Galeria</a>
            </li>
            <li className="mx-8 transition-all duration-300 hover:mt-2">
              <a href={catalogUrl} target="_blank">Catalogo</a>
            </li>
            <li className="mx-8 transition-all duration-300 hover:mt-2">
              <a href="#plans">Planes</a>
            </li>
            <li className="mx-8 transition-all duration-300 hover:mt-2">
              <a href="/products" target="_blank">Productos</a>
            </li>
          </ul>
        </div>

        <a className="hidden w-52 h-10 px-9 py-3 rounded-md scroll-stroke sm:inline-flex flex-col justify-center items-center self-center transform hover:scale-105 transition-all duration-300" href="#contact">
          <div className="text-center justify-center scroll-font text-sm press-start-2p-regular uppercase transition-all duration-300 mt-1">Contacto</div>
        </a>

        <button
          className="flex w-12 h-full items-center lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="scroll-svg path z-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 18L20 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12L20 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 6L20 6" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      <nav className={`lg:hidden fixed right-0 h-full bg-black/90 mt-16 z-20 transition-all duration-500 overflow-hidden ${mobileOpen ? "max-w-[32rem]" : "max-w-0"}`}>
        <ul className="flex flex-col items-center gap-8 p-6 press-start-2p-regular uppercase text-sm">
          <li><a className="whitespace-nowrap" href="#about-us" onClick={() => setMobileOpen(false)}>Quienes somos</a></li>
          <li><a href="#gallery" onClick={() => setMobileOpen(false)}>Galeria</a></li>
          <li><a href="/Lista-de-juegos.pdf" target="_blank" onClick={() => setMobileOpen(false)}>Catalogo</a></li>
          <li><a href="#plans" onClick={() => setMobileOpen(false)}>Planes</a></li>
          <li><a href="#contact" onClick={() => setMobileOpen(false)}>Contacto</a></li>
          <li><a href="/products" onClick={() => setMobileOpen(false)}>Productos</a></li>
        </ul>
      </nav>
    </header>
  );
}