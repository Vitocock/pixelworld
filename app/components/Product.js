import ProductCard from "./ProductCard";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Cloud 3",
      brand: "HyperX",
      base_price: 30000,
      description: "Audifonos Gamer",
      image: "/HyperX-1.jpeg",
      images: [
        { id: 1, dir: "/HyperX-2.jpeg" },
        { id: 2, dir: "/HyperX-3.jpeg" },
        { id: 3, dir: "/HyperX-4.jpeg" },
      ],
    },
    {
      id: 2,
      name: "Kishi V2",
      brand: "Razer",
      base_price: 50000,
      description: "Control Gamer para android",
      image: "/KishiV2-1.jpeg",
      images: [
        { id: 1, dir: "/KishiV2-2.jpeg" },
        { id: 2, dir: "/KishiV2-3.jpeg" },
        { id: 3, dir: "/KishiV2-4.jpeg" },
        { id: 4, dir: "/KishiV2-5.jpeg" },
      ],
    },
    {
      id: 3,
      name: "Pan",
      brand: "Cito",
      description: "Pan",
      base_price: 10000,
      image: "/Gallery-Pic1.png",
    },
  ];

  return (
    <section className="w-full lg:w-5/6 my-16 flex flex-col justify-self-center justify-center">
      <p className="self-center text-center transform hover:scale-105 transition-all duration-300">
        <a
          className="text-center text-white text-3xl lg:text-5xl font-bold font-['Orbitron'] [text-shadow:_0px_0px_33px_rgb(21_101_185_/_1.00)]"
          href="/products" target="_blank"
        >
          Haz click aquí para ver nuestros productos
        </a>
      </p>
      <div className="mt-4 mb-8 w-5/6 h-2.5 flex self-center bg-white rounded-[10px] shadow-[0px_0px_7.9px_7px_rgba(21,101,185,1)] border-4 border-sky-500"></div>

      <div className="flex flex-col lg:flex-row w-full lg:w-4/5 lg:h-96 px-14 py-6 self-center items-center gap-4 lg:gap-44 overflow-hidden bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] scroll-stroke transition-all duration-300 backdrop-blur-3xl">
        {products.map((product) => (
          <ProductCard key={product.id} Product={product} />
        ))}
      </div>
    </section>
  );
}
