'use client'
import CreatePlan from "./CreatePlan"

export default function CreatePlanModal({ onClose, onPlanCreated }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Crear Plan</h2>
          <button onClick={onClose} className="text-red-600 font-bold">X</button>
        </div>
        <CreatePlan onCreated={onPlanCreated} />
      </div>
    </div>
  )
}