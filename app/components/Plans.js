import PricingCard from "./PricingCard"

export default function Plans() {
    return (
      <div className="my-6 flex flex-col bg-blue-600 rounded-xl px-2 py-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold  ">Nuestros planes</h2>
          </div>
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold  ">Nuestros precios no incluyen traslado, consultar valor segun tu comuna.</h2>
            <p><a>Consulta por el catalogo de juegos haciendo click aqui.</a></p>
          </div >
          <div className="mt-4 flex flex-row flex-wrap flex-between">
            <PricingCard />
            <PricingCard />
            <PricingCard />
          </div>
      </div>
    )
}