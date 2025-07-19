"use client"
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import Banner from "./components/Banner";
import Galery from "./components/Gallery";
import Plans from "./components/Plans";
import Offer from "./components/Offer";
import Contact from "./components/Contact";
import { useEffect, useState } from "react";
import Catalog from "./components/Catalog";
import Pacman from "./components/Pacman";
import Products from "./components/Product";



export default function Home() {
  const [ catalogUrl, setCatalogUrl ] = useState('')

  useEffect(() => {
    const shadows = document.querySelectorAll(".scroll-shadow");
    const stroke = document.querySelectorAll(".scroll-stroke");
    const font = document.querySelectorAll(".scroll-font");
    const svgIcons = document.querySelectorAll(".scroll-svg path");

    const palette = [
      "#00ff00", "#01F540", "#02EC80", "#03E3BF", "#04D9FF",
      "#0AAEFC", "#1182F9", "#1757F6", "#1D2CF3",
    ];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const ratio = scrollTop / maxScroll;
      const index = Math.min(palette.length - 1, Math.floor(ratio * palette.length));
      const color = palette[index];

      document.querySelectorAll(".scroll-shadow").forEach(el => el.style.backgroundColor = color);
      document.querySelectorAll(".scroll-stroke").forEach(el => el.style.border = `solid 2px ${color}`);
      document.querySelectorAll(".scroll-font").forEach(el => el.style.color = color);
      document.querySelectorAll(".scroll-svg path").forEach(el => el.setAttribute("stroke", color));
    };

    // Ejecutar una vez al montar
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Observer para aplicar estilos a nuevos elementos
    const observer = new MutationObserver(() => handleScroll());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
    
  }, []);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const res = await fetch("/api/images/getCatalog")
        if (!res.ok) throw new Error("Error al obtener el catálogo")
        const data = await res.json()
        setCatalogUrl(data.catalog_url)
      } catch (error) {
        console.error("Error al cargar el catálogo:", error)
      }
    }

    fetchCatalog()
  }, [])

  return (
    <div className="w-full">
      <Header catalogUrl={catalogUrl} />
      <div
        className="scroll-shadow fixed top-3 w-full h-[3rem] transition-all duration-300"
        style={{
          filter: "blur(20px)",
        }}
      ></div>
      <div
        className="scroll-shadow fixed -bottom-2 w-full h-[1rem] z-10 transition-all duration-300"
        style={{
          filter: "blur(20px)",
        }}
      ></div>
      <Banner />
      <main className="p-6 mt-6 lg:mt-28">
        <AboutUs />
        <div className="mx-auto my-16 w-3/5 h-2.5 justify-self-center bg-white rounded-[10px] shadow-[0px_0px_31.700000762939453px_6px_rgba(0,255,0,1.00)] transition-all duration-300 border-4 border-green-500"></div>
        <Offer />
        <Galery />
        {catalogUrl && <Catalog catalogUrl={catalogUrl}/>}
        <Plans catalogUrl={catalogUrl} />
        <Products />
        <Contact />
        <Pacman />
      </main>
    </div>
  );
}