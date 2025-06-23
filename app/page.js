"use client"
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import Banner from "./components/Banner";
import Galery from "./components/Galery";
import Plans from "./components/Plans";
import Offer from "./components/Offer";
import Contact from "./components/Contact";
import { useEffect } from "react";
import Catalog from "./components/Catalog";
import Product from "./components/Product";



export default function Home() {
  useEffect(() => {
    const shadows = document.querySelectorAll(".scroll-shadow");
    const stroke = document.querySelectorAll(".scroll-stroke");
    const font = document.querySelectorAll(".scroll-font");

    const palette = [
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

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const ratio = scrollTop / maxScroll;
      const index = Math.min(
        palette.length - 1,
        Math.floor(ratio * palette.length)
      );
      const color = palette[index];

      shadows.forEach((el) => {
        el.style.backgroundColor = color;
      });
      stroke.forEach((el) => {
        el.style.border = `solid 2px ${color}`;
      });
      font.forEach((el) => {
        el.style.color = color;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full">
      <Header />
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
      <main className="p-6">
        <AboutUs />
        <div class="mx-12 my-8 w-3/5 h-2.5 justify-self-center bg-white rounded-[10px] shadow-[0px_0px_31.700000762939453px_6px_rgba(4,217,255,1.00)] transition-all duration-300 scroll-stroke"></div>
        <Offer />
        <Galery />
        <Catalog />
        <Product />
        <Plans />
        <Contact />
      </main>
    </div>
  );
}