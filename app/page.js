"use client"
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import Banner from "./components/Banner";
import Plans from "./components/Plans";
import Offer from "./components/Offer";
import Contact from "./components/Contact";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    const shadows = document.querySelectorAll(".scroll-shadow");
    const stroke = document.querySelectorAll(".scroll-stroke");
    const font = document.querySelectorAll(".scroll-font");

    const palette = [
      "#00ff00",
      "#33ff66",
      "#00ccff",
      "#0099ff",
      "#0066ff",
      "#0033ff",
      "#0000ff",
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
    <div className="w-full ">
      <Header />
      <div
        className="scroll-shadow fixed top-3 w-full h-[3rem] transition-all duration-300"
        style={{
          filter: "blur(20px)",
        }}
      ></div>
      <div
        className="scroll-shadow fixed bottom-0 w-full h-[10px] transition-all duration-300"
        style={{
          filter: "blur(20px)",
        }}
      ></div>
      <Banner />
      <main className="p-6">
        <AboutUs />
        <Offer />
        <Plans />
        <Contact />
      </main>
    </div>
  );
}