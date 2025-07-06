'use client'
import CreateResource from "./CreateResource"

export default function CreateResourceModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Crear Recurso</h2>
          <button onClick={onClose} className="text-red-600 font-bold">X</button>
        </div>
        <CreateResource />
      </div>
    </div>
  )
}