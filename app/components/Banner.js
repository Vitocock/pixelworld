export default function Banner () {
    return (
        <section className="transition-all duration-300 w-full flex flex-row justify-around align-middle mt-28 md:mt-56 px-4 py-8">
            <div className="w-full lg:w-[64%] sm:h-[20rem] lg:h-[30rem] flex-wrap sm:grid sm:grid-cols-3 sm:grid-rows-1 gap-1 sm:px-12 md:py-6 bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] scroll-stroke backdrop-blur-2xl">
                <div className="flex flex-col py-4 sm:flex-row justify-center sm:justify-start text-white w-full">
                    <h2 className="text-4xl self-center sm:self-auto lg:text-5xl lg:mt-8 font-bold font-['Orbitron'] [text-shadow:_0px_0px_30px_rgb(0_255_0_/_1.00)]">PIXELWORLD</h2>
                    <h3 className="my-5 sm:my-0 self-center font-['Exo'] sm:absolute w-4/5 sm:w-2/5 leading-normal text-xl xl:text-3xl">Un lugar donde los gamers se unen. ¡Agenda tu visita y se parte de esta gran aventura!</h3>
                    <a className="w-44 bottom-14 self-center sm:absolute h-10 px-16 py-2 bg-green-800 hover:bg-green-600 transform hover:scale-105 transition-all duration-300 rounded-[5px] inline-flex justify-center items-center" href="#contact">
                        <div className="justify-center whitespace-nowrap text-xl font-semibold font-['Exo']">Contáctanos</div>
                    </a>
            </div>
            <div className="m-auto w-11/12 h-2.5 sm:rotate-90  justify-self-center self-center flex bg-white rounded-[10px] shadow-[0px_0px_31.700000762939453px_6px_rgba(7,202,61,1.00)] border-4 border-green-500"></div>
                <div className="py-2 sm:w-full self-center">
                    <img className="w-full justify-self-center sm:w-full object-fill" src={"/logo-redondo.png"}></img>
                </div>
            </div>
        </section>
    )
}