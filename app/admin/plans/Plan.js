"use client"
import { useState } from "react"

export default function Plan ({ plan }) {
    const { name, base_price, resources, created_at } = plan
    const [isDisabled, setIsDisabled] = useState(true) 

    return (
        <div className="bg-white p-4 mx-4 w-1/5">
            <div className="text-xl">
                <h3>{name}</h3>
            </div>
            <div className="border-b-2 border-black">
                <label className="my-2 flex flex-row justify-between">Nombre: 
                    <input className={`p-1 ${isDisabled ? 'bg-slate-400 ' : 'bg-slate-200' }`} 
                    type="text" 
                    defaultValue={name}  
                    disabled={isDisabled}
                    />
                </label>
            </div>
            <div className="border-b-2 border-black">
                <label className="my-2 flex flex-row justify-between">Precio: 
                    <input className={`p-1 ${isDisabled ? 'bg-slate-400 ' : 'bg-slate-200' }`} 
                    type="text" 
                    defaultValue={base_price}  
                    disabled={isDisabled}
                    />
                </label>
            </div>
            <div className="border-b-2 border-black">
                <label className="my-2 flex flex-row justify-between">Fecha de creacion: 
                    <input className={`p-1 bg-slate-400`} 
                    type="text" 
                    defaultValue={created_at}  
                    disabled
                    />
                </label>
            </div>
            {resources.map((r) => 
                <div className="border-b-2 border-black " key={r.name}>
                    <label className="my-2 flex flex-row justify-between">{r.name}: 
                        <input  className={`p-1 ${isDisabled ? 'bg-slate-400 ' : 'bg-slate-200' }`} 
                        type="text" 
                        defaultValue={r.quantity}  
                        disabled={isDisabled}
                        />
                    </label>
                </div>
            )}
            <div className="mt-4 flex flex-row justify-between text-white">  
                <div>
                    <button className="bg-blue-600 p-1">Desactivar</button>
                </div>
                <div>
                    <button className="bg-yellow-400 p-1" onClick={() => setIsDisabled(!isDisabled)}>Editar</button>
                </div>
                <div>
                    <button className={`p-1 ${isDisabled ? 'bg-gray-800 ' : 'bg-green-600' } `} disabled={isDisabled}>Enviar</button>
                </div>
                <div>
                    <button className="bg-red-600 p-1">Eliminar</button>
                </div>
            </div>
        </div>
    )
}