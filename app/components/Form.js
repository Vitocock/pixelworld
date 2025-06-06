"use client"
import { useState } from "react"

export default function Form () {
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ content, setContent ] = useState("")

    const onSubmit = (event) => {
        event.preventDefault()
        const data = {
            name,
            email,
            content
        }
        console.log(data)
    }

    const onChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        if (name == "name") {
            setName(value)
        } 
        if (name == "email") {
            setEmail(value)
        }
        if (name == "content") {
            setContent(value)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="relative mb-6">
                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                    Nombre completo
                    <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                    </svg>
                </label>
                <input onChange={onChange} name="name" type="text" id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " placeholder="Nombre completo" required=""/>
            </div>
            <div className="relative mb-6">
                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                    Email 
                    <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444" />
                    </svg>
                </label>
                <input onChange={onChange} name="email" type="text" id="default-search" className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none " placeholder="correo@gmail.com" required=""/>
            </div>
            <div className="relative mb-6">
                <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">Mensaje
                    <svg width="7" height="7" className="ml-1" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z" fill="#EF4444"></path>
                    </svg>
                </label>
            <div className="flex">
                <div className="relative w-full">
                    <textarea onChange={onChange} name="content" className="block w-full h-40 px-4 py-2.5 text-base leading-7 font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none resize-none" placeholder="Escribe tu mensaje..."></textarea>
                </div>
            </div>
            </div>
            <button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6">Enviar</button>
        </form>
    )
}