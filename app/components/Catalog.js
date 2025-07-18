"use client"

export default function Catalog({catalogUrl}) {
 
  return (
    <a 
      href={catalogUrl}
      target="_blank"
      className="h-[36rem] lg:h-dvh py-12 grid grid-cols-4 sm:grid-cols-5 grid-rows-1 overflow-hidden">
      <img className="col-span-2 object-cover w-full h-full transform hover:scale-105 hover:z-10 transition-all duration-300" src="./Catalog-Pic1(FC25).jpg" />
      <div className="col-span-2 hover:z-10">
        <img className="object-cover object-top w-full h-1/2 transform hover:scale-105 transition-all duration-300" src="./Catalog-Pic2(Halo).jpg" />
        <img className="object-cover object-top w-full h-1/2 transform hover:scale-105 transition-all duration-300" src="./Catalog-Pic3(MK11).jpg" />
      </div>
      <div className="hidden sm:block">
        <img className="object-cover object-top w-full h-1/3 transform hover:scale-105 transition-all duration-300" src="./Catalog-Pic4(GOWR).jpg" />
        <img className="object-cover object-top w-full h-1/3 transform hover:scale-105 transition-all duration-300" src="./Catalog-Pic5(NBA2K24).jpg" />
        <img className="object-cover object-top w-full h-1/3 transform hover:scale-105 transition-all duration-300" src="./Catalog-Pic6(RL).jpg" />
      </div>

      <div className="bg-black bg-opacity-20 px-2 mb-4 absolute flex justify-self-center self-end transform hover:scale-105 transition-all duration-300 z-20">
        <p
          className="text-center text-white text-3xl lg:text-5xl font-bold font-['Orbitron'] [text-shadow:_0px_0px_65px_rgb(0_0_0_/_1.00)]"
        >
          Haz click para ver nuestro catálogo de juegos
        </p>
      </div>

    </a>
)
}
