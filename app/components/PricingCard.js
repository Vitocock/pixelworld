
import Image from "next/image"

function PricingCard1 () {
    return (
        <div className="m-1 group relative flex flex-col mx-auto w-full max-w-xs bg-white rounded-2xl shadow-2xl transition-all duration-300  p-8 xl:p-12  ">
            <div className="border-b border-solid border-gray-200 pb-9 mb-9">
                <div className="w-16 h-16 rounded-full bg-blue-50 mx-auto flex justify-center items-center transition-all duration-300 group-hover:bg-blue-600">
                    <Image
                        src={"/control.png"}
                        width={24}
                        height={24}
                        alt='control'
                    />
                </div>
                <h3 className="font-manrope text-2xl font-bold my-7 text-center text-blue-600">Promo 1 - Pixel Basico</h3>
                <div className="flex items-center justify-center">
                    <span className="font-manrope text-4xl font-medium text-gray-900">$60.000</span>
                </div>
            </div>

            <ul className="mb-12 space-y-6 text-left text-lg text-gray-600 group-hover:text-gray-900">
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Tiempo: 4 Horas.</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>1 Consola a eleccion (PS5 o Xbox Series).</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>2 Controles + 2 Headsets.</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>1 Pantalla gamer.</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Mesa + 2 sillas.</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Juegos a eleccion.</span>
                </li>
            </ul>
        </div> 
    )
}

function PricingCard2 () {
    return (
        <div className="m-1 group relative flex flex-col mx-auto w-full max-w-xs bg-white rounded-2xl shadow-2xl transition-all duration-300  p-8 xl:p-12  ">
            <div className="border-b border-solid border-gray-200 pb-9 mb-9">
                <div className="w-16 h-16 rounded-full bg-blue-50 mx-auto flex justify-center items-center transition-all duration-300 group-hover:bg-blue-600">
                    <Image
                        src={"/espadas.png"}
                        width={24}
                        height={24}
                        alt='espadas'
                    />
                </div>
            <h3 className="font-manrope text-2xl font-bold my-7 text-center text-blue-600">Promo 2 - Intermedio</h3>
            <div className="flex items-center justify-center">
                <span className="font-manrope text-4xl font-medium text-gray-900">$100.000</span>
            </div>
        </div>

            <ul className="mb-12 space-y-6 text-left text-lg text-gray-600 group-hover:text-gray-900">
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Tiempo: 4 Horas.</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>2 Consolas a eleccion (PS5 o Xbox Series).</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>4 Controles + 4 Headsets.</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>2 Pantallas gamer.</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Mesa + 4 sillas.</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Juegos a eleccion.</span>
                </li>
            </ul>
            
        </div> 
    )
}
function PricingCard3 () {
    return (
        <div className="m-1 group relative flex flex-col mx-auto w-full max-w-xs bg-white rounded-2xl shadow-2xl transition-all duration-300  p-8 xl:p-12  ">
            <div className="border-b border-solid border-gray-200 pb-9 mb-9">
                <div className="w-16 h-16 rounded-full bg-blue-50 mx-auto flex justify-center items-center transition-all duration-300 group-hover:bg-blue-600">
                    <Image
                        src={"/planeta.png"}
                        width={24}
                        height={24}
                        alt='planeta'
                    />
            </div>
            <h3 className="font-manrope text-2xl font-bold my-7 text-center text-blue-600">Promo 3 - PixelWorld</h3>
            <div className="flex items-center justify-center">
                <span className="font-manrope text-4xl font-medium text-gray-900">$180.000</span>
            </div>
        </div>

            <ul className="mb-12 space-y-6 text-left text-lg text-gray-600 group-hover:text-gray-900">
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Tiempo: 4 Horas.</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>4 Consola a eleccion (PS5 o Xbox Series).</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>8 Controles + 5 Headsets.</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>4 Pantalla gamer.</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Mesa + 8 sillas.</span>
                </li>
                <li className="flex items-center space-x-3.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Juegos a eleccion.</span>
                </li>
            </ul>
          
        </div> 
    )
}

export {PricingCard1, PricingCard2, PricingCard3}