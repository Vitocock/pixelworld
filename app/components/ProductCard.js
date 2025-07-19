export default function ProductCard ({Product}){
    const {name, image} = Product

    return(
        <a className="w-full h-64 sm:h-full transform overflow-hidden" href="/products" target="_blank">
            <img
            src={image}
            alt={`${name} image`}
            className="w-full h-full object-cover hover:scale-105 will-change-transform transition-all duration-300"
        />
        </a>
    )
}