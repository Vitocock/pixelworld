export default function AboutUs () {
    return (
        <section className="my-12 flex flex-wrap flex-col w-full lg:w-4/5 justify-self-center text-white">
            <div className="flex">
                <h2 id="about-us" className="scroll-mt-24 w-full mb-8 text-center justify-start text-white text-4xl lg:text-5xl font-bold font-['Orbitron'] [text-shadow:_0px_0px_30px_rgb(0_255_0_/_1.00)]">Quienes Somos</h2>
            </div >
            <div className="flex flex-wrap flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-2/3 px-7 py-5 bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] backdrop-blur-2xl inline-flex justify-center items-center scroll-stroke transition-all duration-300">
                    <div className="lg:w-4/5 xl:text-center justify-start text-white text-lg 2xl:text-3xl font-normal font-['Exo'] xl:leading-10"> <b>PIXELWORLD</b> es el nombre de fantasia de nuestra empresa <b>Paty y Ángel inversiones SPA.</b><br/>Nos dedicamos al entretenimiento y disfrute por medio de renta de consolas y equipos que permiten transportar a una nueva experiencia de juego.</div>
                </div>
                <img className="lg:w-1/3 object-cover scroll-stroke self-center transition-all duration-300" src="/AboutUs-Pic1.jpg"></img>
            </div>
        </section>
    )
}