export default function PricingCard ({plan}) {
    const { name, base_price, resources } = plan

    // Buscar cantidades específicas
    const getResourceQty = (resourceName) => {
        const found = resources.find((r) => r.name.toLowerCase() === resourceName.toLowerCase())
        return found ? found.quantity : 0
    }

    const tiempo = getResourceQty("Tiempo")
    const consolas = getResourceQty("Consolas")
    const controles = getResourceQty("Controles")
    const headsets = getResourceQty("Headsets")
    const monitores = getResourceQty("Monitores")
    const sillas = getResourceQty("Sillas")
    const mesas = getResourceQty("Mesas")
    return (
        <div className="m-1 group mx-auto max-w-[22.688rem] w-full p-4 xl:p-[1.375rem] relative transform hover:scale-105 bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] scroll-stroke transition-all duration-300 backdrop-blur-2xl inline-flex flex-col gap-5 overflow-hidden">
            <div className="text-center">
                <img className="size-14 relative" src="./SVGRepo_iconCarrier.svg"></img> 
                <h3 className="pb-5 text-white text-3xl font-['Orbitron'] uppercase leading-tight tracking-wide [text-shadow:_0px_0px_8px_rgb(0_124_255_/_0.60)]"> {name} </h3>
                <span className="py-5 self-stretch  justify-center text-white text-3xl font-['Exo'] uppercase leading-tight tracking-wide"> ${base_price} </span>
                <div className="pt-5 justify-between flex flex-row">
                    <div className="flex flex-row w-2/5 h-2.5 bg-white rounded-[10px] shadow-[0px_0px_7.900000095367432px_7px_rgba(21,101,185,1.00)] border-4 border-sky-500"></div>
                    <div className="flex flex-row w-2/5 h-2.5 justify-right bg-white rounded-[10px] shadow-[0px_0px_7.900000095367432px_7px_rgba(21,101,185,1.00)] border-4 border-sky-500"></div>
                </div>
            </div>
            <ul className="mb-10 space-y-6 justify-start text-white text-xl orbitron">
                <li className="flex items-center space-x-3">
                    <span className="size-1 rounded-full bg-white"></span>
                    <span>Tiempo: {tiempo} Hora(s)</span>
                </li>
                <li className="flex items-center space-x-3">
                    <span className="size-1 rounded-full bg-white"></span>
                    <span>{consolas} consola(s) a elección (PS5 o Xbox Series)</span>
                </li>
                <li className="flex items-center space-x-3">
                    <span className="size-1 rounded-full bg-white"></span>
                    <span>{controles} control(es) + {headsets} headset(s)</span>
                </li>
                <li className="flex items-center space-x-3">
                    <span className="size-1 rounded-full bg-white"></span>
                    <span>{monitores} pantalla(s) gamer</span>
                </li>
                <li className="flex items-center space-x-3">
                    <span className="size-1 rounded-full bg-white"></span>
                    <span>{mesas} mesa(s) + {sillas} silla(s)</span>
                </li>
                <li className="flex items-center space-x-3">
                    <span className="size-1 rounded-full bg-white"></span>
                    <span>juegos a elección</span>
                </li>
            </ul>
        </div>
    )
}