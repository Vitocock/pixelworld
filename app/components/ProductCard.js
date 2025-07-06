export default function ProductCard ({Product}){
    const {name, brand, base_price, image} = Product

    return(
        <a className="w-1/3 h-full hover:scale-105 transform transition-all duration-300 overflow-hidden" href="/products" target="_blank">
            <img
            src={image}
            alt={`${name} image`}
            className="h-full object-cover will-change-transform"
        />
        </a>
    )
}