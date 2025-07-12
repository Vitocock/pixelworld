"use client"
import ProductCatalogGrid from "./ProductCatalogGrid";
import { useEffect, useState } from "react";
export default function Home (){
  const colors = [
  "#00ff00",
  "#01F540",
  "#02EC80",
  "#03E3BF",
  "#04D9FF",
  "#0AAEFC",
  "#1182F9",
  "#1757F6",
  "#1D2CF3",
];
const [borderColorIndex, setBorderColorIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setBorderColorIndex((prev) => (prev + 1) % colors.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);

const borderColor = colors[borderColorIndex];
  return(
    <section className="w-full lg:w-4/5 p-3 lg:p-8">
      <a className="w-fit pb-4 flex font-['orbitron'] hover:-translate-x-8 transition-all duration-300" href="/#home">◀ Volver a la pagina principal</a>
      <div className="mb-8 text-center font-['orbitron'] text-white">
        <h1 className="scroll-mt-24 text-4xl lg:text-5xl font-bold" style={{textShadow: `0px 0px 18px ${borderColor}`,}}>Nuestros Productos</h1>
      </div>
      <ProductCatalogGrid color={borderColor}/>
    </section>
    )
}