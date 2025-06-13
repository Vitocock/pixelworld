import Image from "next/image"

/* export default function Banner () {
    return (
        <div >
            <Image 
                src={"/banner.jpg"}
                width={1920}
                height={700}
                alt="banner"
                
            />
        </div>
    )
}

export default function Banner () {
    return (
        <section className="flex flex-row justify-around bg-slate-100 flex-wrap align-middle mt-10 px-4 py-8">
            <div className="flex flex-col text-black  text-left ">
                <h2 className="text-3xl font-bold text-left ">
                    Un lugar donde los gamers se unen.<br/> ¡Agenda tu visita y se parte de esta <br/><span className="text-blue-600 bg-gray-200  px-1 rounded-lg">gran aventura</span>!
                </h2>
                <h3 className="my-4">
                    Mira nuestros <span className="text-blue-600 bg-gray-200  px-1 rounded-lg"><a href="#plans">planes</a></span> o 
                    <span className="text-blue-600 bg-gray-200  px-1 rounded-lg"><a href="#contact">agenda nuestra visita.</a></span>
                </h3>
            </div>
            <div className="w-40">
                <Image 
                    src={"/logo-redondo.png"}
                    width={500}
                    height={500}
                    alt="logo"
                    />
            </div>
        </section>
    )
}*/

export default function Banner () {
    return (
        <section className="w-full flex flex-row justify-around align-middle mt-24 md:mt-36 px-4 py-8">
            <div className="w-full xl:w-[64%] xl:h-[30rem] flex-wrap lg:grid lg:grid-cols-3 lg:grid-rows-1 gap-1 md:p-6 bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] scroll-stroke backdrop-blur-2xl">
                <div className="flex flex-col py-4 lg:flex-row justify-center lg:justify-start text-white w-full">
                    <h2 class="text-4xl self-center lg:self-auto lg:text-5xl sm:mt-8 font-bold font-['Orbitron'] [text-shadow:_0px_0px_30px_rgb(0_255_0_/_1.00)]">PIXELWORLD</h2>
                    <h3 class="self-center font-['Exo'] lg:absolute w-4/5 lg:w-2/5 leading-normal text-xl xl:text-3xl">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
                    <a className="w-44 bottom-8 self-center lg:absolute h-10 px-16 py-6 bg-green-500 rounded-[5px] inline-flex justify-center items-center" href="">
                        <div class="justify-center whitespace-nowrap text-zinc-100 text-xl font-semibold font-['Exo']">Ver más</div>
                    </a>
                </div>
                <div className="w-5/6 h-2.5 lg:rotate-90 justify-self-center self-center flex bg-white rounded-[10px] shadow-[0px_0px_31.700000762939453px_6px_rgba(7,202,61,1.00)] border-4 border-green-500"></div>
                <div className="py-2 lg:w-full">
                    <img className="justify-self-center w-2/3 lg:w-full" src={"/logo-redondo.png"}></img>
                </div>
            </div>
        </section>
    )
}