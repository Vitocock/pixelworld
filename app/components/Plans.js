import { PricingCard1, PricingCard2, PricingCard3 } from "./PricingCard"

export default function Plans() {
    return (
      <div className="my-6 flex flex-col bg-blue-600 rounded-xl px-2 py-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold" id="plans">Nuestros planes</h2>
          </div>
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold  ">Nuestros precios no incluyen traslado, consultar valor segun tu comuna.</h2>
            <p><a href="" target="_blank">Consulta por el catalogo de juegos haciendo click aqui.</a></p>
          </div >
          <div className="mt-4 flex flex-row flex-wrap flex-between">
            <PricingCard1 />
            <PricingCard2 />
            <PricingCard3 />
          </div>
      </div>
    )
}