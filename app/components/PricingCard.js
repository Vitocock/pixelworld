import Image from "next/image"

export default function PricingCard1({ plan }) {
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
    <div className="m-1 group relative flex flex-col mx-auto w-full max-w-xs bg-white rounded-2xl shadow-2xl transition-all duration-300 p-8 xl:p-12">
      <div className="border-b border-solid border-gray-200 pb-9 mb-9">
        <div className="w-16 h-16 rounded-full bg-blue-50 mx-auto flex justify-center items-center transition-all duration-300 group-hover:bg-blue-600">
          <Image
            src={"/control.png"}
            width={24}
            height={24}
            alt="control"
          />
        </div>
        <h3 className="font-manrope text-2xl font-bold my-7 text-center text-blue-600">Promo {name}</h3>
        <div className="flex items-center justify-center">
          <span className="font-manrope text-4xl font-medium text-gray-900">${base_price}</span>
        </div>
      </div>

      <ul className="mb-12 space-y-6 text-left text-lg text-gray-600 group-hover:text-gray-900">
        <li className="flex items-center space-x-3.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          <span>Tiempo: {tiempo} hora(s).</span>
        </li>
        <li className="flex items-center space-x-3.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          <span>{consolas} Consola(s) a elección (PS5 o Xbox Series).</span>
        </li>
        <li className="flex items-center space-x-3.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          <span>{controles} Controles + {headsets} Headsets.</span>
        </li>
        <li className="flex items-center space-x-3.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          <span>{monitores} Pantalla(s) gamer.</span>
        </li>
        <li className="flex items-center space-x-3.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          <span>{mesas > 0 ? `${mesas} Mesa(s)` : "Mesa"} + {sillas} silla(s).</span>
        </li>
        <li className="flex items-center space-x-3.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          <span>Juegos a elección.</span>
        </li>
      </ul>
    </div>
  )
}
