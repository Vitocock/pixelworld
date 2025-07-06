"use client"
import ProductCatalogGrid from "./ProductCatalogGrid";

export default function Home (){
      const products = [
    {
    "products": [
        {
            "id": 6,
            "name": "Mouse",
            "brand": "Razer",
            "base_price": 45555,
            "description": "mouse gamer",
            "image": ""
        },
        {
            "id": 7,
            "name": "mouse",
            "brand": "razer",
            "base_price": 45556,
            "description": "mouise gaemer",
            "image": "https://pixelworld-images.s3.us-east-2.amazonaws.com/7/banner.jpg"
        },
        {
            "id": 8,
            "name": "Ballistik x HyperSpeed",
            "brand": "Razer",
            "base_price": 45550,
            "description": "Mouse gamer pro",
            "image": "https://pixelworld-images.s3.us-east-2.amazonaws.com/8/banner.jpg"
        },
        {
            "id": 3,
            "name": "Mando Kishi v2",
            "brand": "Razer",
            "base_price": 82500,
            "description": "Control para telefono",
            "image": ""
        },
        {
            "id": 4,
            "name": "Gaming Monitor G27i",
            "brand": "Xiaomi",
            "base_price": 69990,
            "description": "Monitor gamer 27 pulgadas",
            "image": ""
        },
        {
            "id": 2,
            "name": "Headset Cloud 3",
            "brand": "HyperX",
            "base_price": 69990,
            "description": "Audifonos gamer",
            "image": ""
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 1,
        "totalItems": 6
    }
}
  ];
    return(
      <section className="w-4/5 p-8">
        <a className="w-fit pb-4 flex font-['orbitron'] hover:-translate-x-8 transition-all duration-300" href="/#home">◀ Volver a la pagina principal</a>
        <div className="mb-8 text-center font-[Orbitron] text-white">
          <h1 id="plans" className="scroll-mt-24 text-4xl lg:text-5xl font-bold text-shadow-md text-s">Nuestros Productos</h1>
        </div>
        <ProductCatalogGrid products={products.products} />
      </section>
    )
}