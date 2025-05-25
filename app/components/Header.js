import Image from "next/image"

export default function Header () {
    return (
        <header className="py-1">
            <nav className="flex justify-between">
                <div className="flex flex-row ">
                    <Image
                        src={"/logo-redondo.png"}
                        width={40}
                        height={40}
                        alt="logo"
                    />
                    <div className="ml-4 align-middle items-center text-xl text-blue-600 font-bold hidden sm:flex">
                        <h1>PixelWorld</h1>
                    </div>
                </div>
                <div className="flex align-middle items-center justify-center">
                    <ul className="hidden sm:flex flex-row text-black">
                        <li className="mx-4">
                            <a href="#about-us">Quienes somos</a>
                        </li>
                        <li className="mx-4">
                            <a href='#plans'>Planes</a>
                        </li>
                        <li>
                            <a href="">Catalogo</a>
                        </li>
                    </ul>
                </div>
                <div className="flex py-1 px-2  bg-blue-600 align-middle rounded-lg">
                    <a className="flex py-1 px-2" href="#contact">
                        Contactanos
                    </a>
                </div>
            </nav>
        </header>
    )
}