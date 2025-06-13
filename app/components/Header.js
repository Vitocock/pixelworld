import Image from "next/image"

export default function Header () {
    return (
        <header className="flex w-full flex-row justify-center lg:py-1 bg-black fixed top-0 transition-all z-10">
            <nav className="flex w-[90%] sm:w-2/3 justify-between">
                <div className="flex flex-row items-start lg:items-center">
                    <img className= "size-16" src={"/logo-redondo.png"}/>
                </div>
                <div className="flex lg:align-center items-center justify-center">
                    <ul className="hidden xl:flex text-base flex-row press-start-2p-regular uppercase">
                        <li className="mx-8 whitespace-nowrap">
                            <a href="#about-us">Quienes somos</a>
                        </li>
                        <li className="mx-8">
                            <a href='#plans'>Planes</a>
                        </li>
                        <li className="mx-8">
                            <a href="" target="_blank">Catalogo</a>
                        </li>
                    </ul>
                </div>
                <a className="w-50 h-10 px-9 py-3 rounded-md scroll-stroke inline-flex flex-col justify-center items-center mt-4 hover:scroll-shadow transition-all duration-300" href='#plans'>
                    <div className="text-center justify-center scroll-font text-sm press-start-2p-regular uppercase tracking-wide transition-all duration-300 mt-1 hover:text-black">Contacto</div>
                </a>
            </nav>
        </header>
    )
}