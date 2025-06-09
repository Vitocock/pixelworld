import Image from "next/image"

export default function PricingCard () {
    return (
        <div class="m-1 group mx-auto max-w-[22.688rem] w-full p-4 xl:p-[1.375rem] relative bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] outline outline-2 outline-offset-[-2px] outline-sky-700 backdrop-blur-2xl inline-flex flex-col gap-5 overflow-hidden">
            <img className="size-14 relative" src="./SVGRepo_iconCarrier.svg"></img>
            <h3 className="self-center text-center justify-center text-white text-3xl font-['Orbitron'] uppercase leading-tight tracking-wide [text-shadow:_0px_0px_8px_rgb(0_124_255_/_0.60)]">Pixel Basico</h3>
            <span className="self-stretch text-center justify-center text-white text-3xl font-['Exo'] uppercase leading-tight tracking-wide">$60.000</span>
            <div className="pt-2">
                <div className="w-2.5 h-32 left-0 origin-top-left -rotate-90 bg-white rounded-[10px] shadow-[0px_0px_7.900000095367432px_7px_rgba(21,101,185,1.00)] border-4 border-sky-500"></div>
                <div className="w-2.5 h-32 right-0 absolute -rotate-90 bg-white rounded-[10px] shadow-[0px_0px_7.900000095367432px_7px_rgba(21,101,185,1.00)] border-4 border-sky-500"></div>
            </div>
        </div>
    )
}