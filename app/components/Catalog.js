export default function Catalog() {
    return(
        <section className="h-dvh py-12 grid grid-cols-4 lg:grid-cols-5 grid-rows-1 overflow-hidden">
            <img className="col-span-2 object-cover h-full transform hover:scale-105 transition-all duration-300" src="./Catalog-Pic1(FC25).jpg"></img>
            <div className="col-span-2">
                <img className="object-cover object-top h-1/2 transform hover:scale-105 transition-all duration-300" src="./Catalog-Pic2(Halo).jpg"></img>
                <img className="object-cover object-top h-1/2 transform hover:scale-105 transition-all duration-300" src="./Catalog-Pic3(MK11).jpg"></img>
            </div>
            <div className="hidden lg:block">
                <img className="object-cover object-top w-full h-1/3 transform hover:scale-105 transition-all duration-300" src="./Catalog-Pic4(GOWR).jpg"></img>
                <img className="object-cover object-top w-full h-1/3 transform hover:scale-105 transition-all duration-300" src="./Catalog-Pic5(NBA2K24).jpg"></img>
                <img className="object-cover object-top w-full h-1/3 transform hover:scale-105 transition-all duration-300" src="./Catalog-Pic6(RL).jpg"></img>
            </div>
            <p className="mb-4 absolute lg:justify-self-center self-end transform hover:scale-105 transition-all duration-300">
                <a className="text-center text-white text-3xl lg:text-5xl font-bold font-['Orbitron'] leading-loose [text-shadow:_0px_0px_45px_rgb(0_0_0_/_1.00)]" href="">Haz click para ver nuestro catalogo de juegos</a>
            </p>
        </section>
    )
}