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
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition">
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition">
        ▶
      </button>
    </div>
  );
}
