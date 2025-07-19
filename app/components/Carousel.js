import { useEffect, useRef, useState } from "react";

export default function ImageCarousel({ images, interval }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const resetInterval = () => {
    clearInterval(timeoutRef.current);
    timeoutRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
    resetInterval();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    resetInterval();
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    resetInterval();
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(timeoutRef.current);
  }, [images, interval]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) nextSlide();
    else if (diff < -40) prevSlide();
  };

  const Arrow = () =>
    <svg width="16px" height="22px" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
      <path fill="none" stroke="#ffffff" strokeWidth="2" d="M3,22.0000002 L21,12 L3,2 L3,22.0000002 Z M5,19 L17.5999998,11.9999999 L5,5 L5,19 Z M7,16 L14.1999999,12 L7,8 L7,16 Z M9,13 L10.8,12 L9,11 L9,13 Z"></path>
    </svg>

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Imágenes */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Imagen ${index}`}
            className="w-full max-h-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      {/* Botones flecha */}
      <button
        onClick={prevSlide}
        className="absolute rotate-180 hidden sm:block left-4 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition"
      >
        <Arrow/>
      </button>
      <button
        onClick={nextSlide}
        className="absolute hidden sm:block right-4 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition"
      >
        <Arrow/>
      </button>

      {/* Puntos indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 sm:gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}