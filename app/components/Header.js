export default function Header () {
    return (
        <header className="flex w-full flex-row justify-center lg:py-1 bg-black fixed top-0 transition-all z-10">
            <nav className="flex w-[90%] sm:w-2/3 justify-between">
                <a className="flex flex-row items-start lg:items-center transform hover:scale-110 transition-all duration-300" href="#home">
                    <img className= "size-16" src={"/logo-redondo.png"}/>
                </a>
                <div className="flex lg:align-center items-center justify-center">
                    <ul className="hidden xl:flex text-base flex-row press-start-2p-regular uppercase">
                        <li className="mx-8 whitespace-nowrap transition-all duration-300 hover:mt-3">
                            <a href="#about-us">Quienes somos</a>
                        </li>
                        <li className="mx-8 transition-all duration-300 hover:mt-3">
                            <a href='#plans'>Planes</a>
                        </li>
                        <li className="mx-8 transition-all duration-300 hover:mt-3">
                            <a href="" target="_blank">Catalogo</a>
                        </li>
                    </ul>
                </div>
                <a className="hidden w-52 h-10 px-9 py-3 rounded-md scroll-stroke sm:inline-flex flex-col justify-center items-center self-center transform hover:scale-105 transition-all duration-300" href='#contact'>
                    <div className="text-center justify-center scroll-font text-sm press-start-2p-regular uppercase transition-all duration-300 mt-1">Contacto</div>
                </a>
            </nav>
        </header>
    )
}