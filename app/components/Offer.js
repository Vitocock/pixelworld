import TextCarousel from "./TextCarousel";

const offer= [
    {
        title: "Diversion",
        content: "Tenemos consolas de última generación de Xbox y Playstation 5, además de monitores gamer, controles y audifonos especiales para una mejor experiencia."
    },
    {
        title: "¡Llevamos la experiencia gamer a cualquier lugar!",
        content: "En PixelWorld transformamos cualquier espacio en una sala gamer con módulos a domicilio para hogares, eventos, colegios, empresas y celebraciones."
    },
    {
        title: "Personal de apoyo",
        content: "Nuestro equipo técnico asegura la instalación rápida, segura y la asistencia durante tu evento."
    }
]

function Cards ({ items }) {
    return (
        <>
        {
            items.map((item, index) =>

                <div key={index} className="w-full text-lg text-center flex-col px-7 py-3 bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] backdrop-blur-2xl inline-flex justify-center items-center scroll-stroke transition-all duration-300">
                    <h2 className="text-lg font-['exo'] font-bold mb-2">{ item.title }</h2>
                    <p className="text-md font-['exo']">{ item.content }</p>
                </div>
            )
        }
        </>
    )
}

export default function Offer () {
    return (
      <section className="my-12 flex flex-wrap flex-col w-full lg:w-4/5 justify-self-center text-white">
        <div className="flex">
                <h2 id="about-us" className="w-full mb-8 text-center justify-start text-white text-4xl lg:text-5xl font-bold font-['Orbitron'] [text-shadow:_0px_0px_30px_rgb(0_255_0_/_1.00)]">Que Ofrecemos</h2>
            </div >
            <div className="justify-center hidden lg:flex">
                <div className="w-full text-lg text-center px-7 py-3 bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] backdrop-blur-2xl inline-flex justify-center items-center scroll-stroke transition-all duration-300">
                    <TextCarousel items={offer} interval={10000}/>
                </div>
            </div>
            <div className="flex justify-center flex-col lg:hidden">
                <Cards items={offer}/>
            </div>
      </section>
    )
}