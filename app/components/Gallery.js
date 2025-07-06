import ImageCarousel from "./Carousel";

const Images =[
    {
        src: "/Gallery-Pic1.png",
    },
    {
        src: "/AboutUs-Pic1.jpg",
    },
    {
        src: "/Gallery-Pic1.png",
    }
]

export default function Gallery (){
    return (
        <section className="flex flex-col my-16 scroll-mt-18">
            <div className="mb-8 text-center text-white text-5xl font-bold font-['Orbitron']  [text-shadow:_0px_0px_30px_rgb(4_217_255_/_1.00)] scroll-mt-24" id="gallery">Galeria</div>
            <div className="w-full lg:w-4/5 lg:h-[43rem] flex-row justify-center self-center overflow-hidden px-9 py-5 bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] scroll-stroke backdrop-blur-2xl inline-flex items-center transition-all duration-300">
                <ImageCarousel images={Images.map(img => img.src)} interval={5000}/>
            </div>
        </section>
    )
}