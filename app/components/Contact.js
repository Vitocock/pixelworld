import Form from "./Form"
import SocialMediaIcons from "./SocialMediaIcons"

export default function () {
    return (
        <section className="flex flex-col lg:flex-row flex-wrap justify-center mt-36">
            <div className="w-full lg:w-3/5 mb-28 lg:p-4 ">
                <a id="contact" className="scroll-mt-24">
                    <h4 className="lg:mb-12 text-center justify-start text-white text-4xl lg:text-6xl font-bold font-['Orbitron'] leading-loose [text-shadow:_0px_0px_30px_rgb(47_106_255_/_1.00)]">Contactanos</h4>
                </a>
                <Form/>
            </div>
            <div className="h-2.5 w-2/3 lg:w-2.5 lg:h-[31.5rem] self-center bg-white rounded-[10px] shadow-[0px_0px_31.700000762939453px_6px_rgba(29,44,243,1.00)] border-4 border-blue-700"></div>
            <div className="w-1/5 lg:ml-8 my-6 lg:p-4 lg:self-center">
                <SocialMediaIcons />
            </div>
        </section>
    )
}