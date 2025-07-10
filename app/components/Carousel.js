import { useEffect, useState } from "react";

export default function ImageCarousel({ images , interval}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(()=> {
    const autoplay = setInterval(()=> {
        nextSlide();
    }, interval)

    return () => clearInterval(autoplay);
  }, [currentIndex, interval])

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Imagen ${index}`}
            className="w-full flex-shrink-0 object-cover object-center"
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute lg:left-4 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition"
      >
        ▶
      </button>
    </div>
  );
}
