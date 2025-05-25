import Form from "./Form"
import SocialMediaIcons from "./SocialMediaIcons"

export default function () {
    return (
        <div className="flex flex-row flex-wrap text-black">
            <div className="flex-grow my-6 p-4 ">
                <div className="my-2" id="contact">
                    <h4 className="text-3xl font-bold ">Contactanos</h4>
                </div>
                <Form/>
            </div>
            <div className="min-w-96 my-6 p-4 ">
                <div className="my-2">
                    <h4 className="text-2xl font-bold ">O comunicate con nosotros <br/> por nuestras redes sociales:</h4>
                </div>
                <div>
                    <SocialMediaIcons />
                </div>
            </div>
        </div>
       
    )
}