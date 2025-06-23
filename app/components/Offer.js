export default function Offer () {
    return (
      <section className="my-12 flex flex-wrap flex-col w-full lg:w-4/5 justify-self-center text-white">
        <div className="flex">
                <h2 id="about-us" className="w-full mb-8 text-center justify-start text-white text-4xl lg:text-5xl font-bold font-['Orbitron'] [text-shadow:_0px_0px_30px_rgb(4_217_255_/_1.00)]">Que Ofrecemos</h2>
            </div >
            <div className="flex flex-wrap flex-col lg:flex-row justify-between">
                <div className="w-full lg:w-2/3 px-7 py-5 bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] backdrop-blur-2xl inline-flex justify-between items-center scroll-stroke transition-all duration-300">
                    <a>
                        <img className="rotate-180 hidden lg:flex" src="/Arrow 1.svg"></img>
                    </a>
                    <div className="lg:w-4/5 lg:text-center justify-start text-white text-lg lg:text-3xl font-normal font-['Exo'] lg:leading-10">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</div>
                    <a>
                        <img className="hidden lg:flex" src="/Arrow 1.svg"></img>
                    </a>
                </div>
                <img className="lg:w-1/3 object-cover scroll-stroke self-center transition-all duration-300" src="/Pic1.jpg"></img>
            </div>
      </section>
    )
}