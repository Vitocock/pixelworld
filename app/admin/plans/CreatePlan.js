"use client"

import { useState } from "react"


export default function CreatePlan () {
    const [ resources, setResources ] = useState()
    const [ addedResources, setAddedResources ] = useState([]) 
    const [ planForm, setPlanForm ] = useState()

    return (
        <div className="bg-white p-4 mx-4 w-1/5">
            <form>
                <div className="border-b-2 border-black " >
                    <label className="my-2 flex flex-row justify-between">Nombre: 
                        <input  className={`p-1 bg-slate-200`} 
                        type="text" 
                        />
                    </label>
                </div>
                <div className="border-b-2 border-black" >
                    <label className="my-2 flex flex-row justify-between">Precio: 
                        <input  className={`p-1 bg-slate-200`} 
                        type="text" 
                        />
                    </label>
                </div>
                <div className="flex flex-row border-b-2 border-black justify-between" >
                    <div className="inline">
                        <button className="bg-red-600 p-1">x</button>
                        <input className="my-2 w-2/3 p-1 bg-slate-200" list="resources"/>
                    </div>
                    <input className="my-2 w-1/2 p-1 bg-slate-200" type="text"/>
                </div>
                <div className="mt-4 flex flex-row justify-between text-white">  
                    <div>
                        <button className="bg-yellow-400 p-1">Agregar recurso</button>
                    </div>
                    <div>
                        <button className={`p-1 bg-green-600 `}>Enviar</button>
                    </div>
                </div>

                                    
            </form>
        </div>
    )
}