import Image from "next/image"

export default function Header () {
    return (
        <header className="px-6 lg:px-18 py-6 bg-black/90 sticky top-0">
            <nav className="flex justify-between">
                <div className="items-center flex flex-row ">
                    <Image
                        src={"/logo-redondo.png"}
                        width={82}
                        height={82}
                        alt="logo"
                    />
                    
                </div>
                <div className="flex align-center items-center justify-center">
                    <ul className="hidden lg:flex text-base flex-row press-start-2p-regular uppercase">
                        <li className="mx-8">
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
                <a className="w-50 h-10 px-9 py-3 rounded-md outline outline-2 outline-offset-[-2px] inline-flex flex-col justify-center items-center mt-4" href='#plans'>
                    <div className="text-center justify-center text-sm press-start-2p-regular uppercase tracking-wide mt-1">Contacto</div>
                </a>
            </nav>
        </header>
    )
}