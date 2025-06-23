export default function Product (){
    return(
        <section className="w-full lg:w-5/6 flex flex-col justify-self-center justify-center">
            <p className="self-center transform hover:scale-105 transition-all duration-300"><a className="text-center text-white text-3xl lg:text-5xl font-bold font-['Orbitron'] [text-shadow:_0px_0px_33px_rgb(21_101_185_/_1.00)]" href="">Haz click aqui para ver nuestros productos</a></p>
            <div className="mt-4 mb-8 w-5/6 h-2.5 flex self-center bg-white rounded-[10px] shadow-[0px_0px_7.900000095367432px_7px_rgba(21,101,185,1.00)] border-4 border-sky-500"></div>
            <div class="flex flex-col lg:flex-row w-full lg:w-4/5 lg:h-96 px-14 py-6 self-center items-center gap-8 lg:gap-44 overflow-hidden bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] scroll-stroke transition-all duration-300 backdrop-blur-2xl">
                <img class="w-64 h-64 transform hover:scale-105 transition-all duration-300" src="https://placehold.co/270x270" />
                <img class="w-64 h-64 transform hover:scale-105 transition-all duration-300" src="https://placehold.co/270x270" />
                <img class="w-64 h-64 transform hover:scale-105 transition-all duration-300" src="https://placehold.co/270x270" />
            </div>
        </section>
    )
}