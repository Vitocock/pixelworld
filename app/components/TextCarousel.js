import { useEffect, useState } from "react";

export default function TextCarousel({ items, interval }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const autoplay = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(autoplay);
  }, [currentIndex, interval]);

  const Arrow = () =>
    <svg width="16px" height="22px" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
      <path fill="none" stroke="#ffffff" strokeWidth="2" d="M3,22.0000002 L21,12 L3,2 L3,22.0000002 Z M5,19 L17.5999998,11.9999999 L5,5 L5,19 Z M7,16 L14.1999999,12 L7,8 L7,16 Z M9,13 L10.8,12 L9,11 L9,13 Z"></path>
    </svg>
  return (
    <div className="w-full overflow-hidden h-60 text-white rounded-lg shadow-md">
      <div
        className="flex transition-transform duration-500 ease-in-out w-full h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="whitespace-normal w-full flex-shrink-0 flex flex-col justify-center items-center text-center p-6">
            <h2 className="text-3xl font-['exo'] font-bold mb-2">{item.title}</h2>
            <p className="text-2xl font-['exo']">{item.content}</p>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute rotate-180 left-4 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition">
        <Arrow/>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition">
        <Arrow/>
      </button>
    </div>
  );
}
