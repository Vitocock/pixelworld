export default function ProductCatalog({ Product, onOpen, color }) {
  const { name, brand, base_price, image } = Product;
  const borderColor = color;
  return (
    <div
      style={{ borderColor }}
      className="flex flex-col xs:w-[44%] sm:w-[30%] lg:w-1/5 p-4 lg:h-[32rem] border-2 transition-colors duration-500 
        bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)]
        shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] scroll-stroke backdrop-blur-2xl"
    >
      <img
        src={image}
        alt={`${name} principal`}
        className="w-full h-1/2 object-cover justify-self-center rounded-sm transition-all duration-300 mx-auto"
      />
      <div className="mt-4">
        <h2 className="font-['exo'] text-xs sm:text-base">{brand}</h2>
        <h1 className="font-['orbitron'] leading-none text-base sm:text-2xl line-clamp-2 break-words min-h-[1.5rem] sm:min-h-[3rem]">{name}</h1>
      </div>
      <div className="w-4/5 h-[0.0625rem] my-2 self-center bg-slate-700"></div>
      <div className="font-['exo'] text-base sm:text-2xl">${base_price}</div>
      
      <div className="w-full mt-4 flex lg:fixed left-7 bottom-4">
        <button
          onClick={onOpen}
          style={{ backgroundColor: borderColor }}
          className="w-full lg:w-4/5 h-10 px-4 py-1 hover:scale-105 text-white text-sm rounded-md transition-all duration-500 hover:brightness-70"
        >
          Ver más
        </button>
      </div>
    </div>
  );
}