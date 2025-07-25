"use client"
import { useState } from "react"

export default function Form () {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [content, setContent] = useState("")
    const [motivo, setMotivo] = useState("Particular") // nuevo estado

    const onSubmit = async (event) => {
        event.preventDefault()

        try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, content, motivo }), // incluimos "motivo"
        })

        const data = await res.json()

        if (!res.ok) throw new Error(data.error || 'Error al enviar')

        alert('Mensaje enviado con éxito.')
        setName('')
        setEmail('')
        setContent('')
        setMotivo('Particular')
        } catch (err) {
        console.error(err)
        alert('Hubo un error al enviar el mensaje.')
        }
    }

    const onChange = (event) => {
        const { name, value } = event.target
        if (name === "name") setName(value)
        else if (name === "email") setEmail(value)
        else if (name === "content") setContent(value)
        else if (name === "motivo") setMotivo(value)
    }

    const Asterisco = () =>
        <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
        </svg>

    return (
        <form className="p-6 transition-all w-full lg:w-4/5 duration-300 justify-self-center scroll-stroke bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] backdrop-blur-2xl" onSubmit={onSubmit}>
            <div className="relative mb-6">
                <label className="flex items-center mb-2 font-[Exo] text-gray-600 text-sm font-medium">
                    Nombre completo
                    <Asterisco />
                </label>
                <input onChange={onChange} name="name" type="text" id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal font-[Exo] text-white-300 bg-transparent rounded-[5px] shadow-xs placeholder-gray-400 focus:outline-none bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] backdrop-blur-2xl " placeholder="Nombre completo" required=""/>
            </div>
            <div className="relative mb-6">
                <label className="flex  items-center mb-2 font-[Exo] text-gray-600 text-sm font-medium">
                    Email 
                    <Asterisco />
                </label>
                <input onChange={onChange} name="email" type="text" id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal font-[Exo] text-white-300 bg-transparent rounded-[5px] shadow-xs placeholder-gray-400 focus:outline-none bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] backdrop-blur-2xl" placeholder="correo@gmail.com" required=""/>
            </div>
            <div className="relative mb-6">
                <label className="flex items-center mb-2 font-[Exo] text-gray-600 text-sm font-medium">
                    Motivo
                    <Asterisco />
                </label>
                <select
                    name="motivo"
                    value={motivo}
                    onChange={onChange}
                    className="block w-full h-11 px-4 py-2.5 leading-7 text-base font-normal font-[Exo] text-white-300 bg-transparent rounded-[5px] shadow-xs placeholder-gray-400 focus:outline-none bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] backdrop-blur-2xl "
                >
                    <option className="text-black" value="Particular">Particular</option>
                    <option className="text-black" value="Colegio">Colegio</option>
                    <option className="text-black" value="Empresas">Empresas</option>
                    <option className="text-black" value="Otro">Otro</option>
                </select>
            </div>
            <div className="relative mb-6">
                <label className="flex items-center mb-2 font-[Exo] text-gray-600 text-sm font-medium">Mensaje
                    <Asterisco />
                </label>
                <div className="flex">
                    <div className="relative w-full">
                        <textarea onChange={onChange} name="content" className="block w-full h-40 px-4 py-2.5 text-base leading-7 font-normal font-[Exo] text-white-300 bg-transparent rounded-[5px] shadow-xs placeholder-gray-400 focus:outline-none resize-none bg-[radial-gradient(ellipse_127.02%_151.92%_at_15.32%_21.04%,_rgba(164.69,_238.74,_255,_0.20)_0%,_rgba(109.97,_190.80,_244.37,_0.04)_77%,_rgba(69.95,_144.07,_212.50,_0)_100%)] shadow-[2px_16px_19px_0px_rgba(0,0,0,0.09)] backdrop-blur-2xl" placeholder="Escribe tu mensaje..."></textarea>
                    </div>
                </div>
            </div>
            <button type="submit" className="flex w-full sm:w-2/3 justify-self-center place-content-center items-center h-12 bg-gradient-to-l from-blue-600 to-blue-700 hover:bg-gradient-to-l hover:from-blue-700 hover:to-blue-800 transition-all duration-700 rounded-[10px] shadow-xs text-white text-2xl font-[Exo] font-semibold leading-6">Enviar</button>
        </form>
    )
}