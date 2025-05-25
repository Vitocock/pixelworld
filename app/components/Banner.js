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
} */

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
}