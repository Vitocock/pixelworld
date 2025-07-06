'use client'
import { useState } from 'react'
import ActivePlans from "./ActivePlans"
import CreatePlanModal from "./CreatePlanModal"
import CreateResourceModal from "./CreateResourceModal"
import HistoryPlans from "./HistoryPlans"

export default function Home() {
  const [showCreatePlan, setShowCreatePlan] = useState(false)
  const [showCreateResource, setShowCreateResource] = useState(false)
  const [refreshPlans, setRefreshPlans] = useState(false)

  const handlePlanCreated = () => {
    setShowCreatePlan(false)
    setRefreshPlans(prev => !prev)
  }

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Panel de Gestión de Planes</h1>

      <div className="flex flex-row justify-start">
        <div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => setShowCreatePlan(true)}
          >
            Crear Plan
          </button>
        </div>
        <div className="ml-5">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowCreateResource(true)}
          >
            Crear Recurso
          </button>
        </div>
      </div>

      <div>
        <h2 className="my-4 text-2xl font-semibold">Planes activos:</h2>
        <ActivePlans refreshKey={refreshPlans} />
      </div>

      <div>
        <h2 className="my-4 text-2xl font-semibold">Ver planes históricos:</h2>
        <HistoryPlans />
      </div>

      {showCreatePlan && (
        <CreatePlanModal
          onClose={() => setShowCreatePlan(false)}
          onPlanCreated={handlePlanCreated}
        />
      )}

      {showCreateResource && (
        <CreateResourceModal
          onClose={() => setShowCreateResource(false)}
        />
      )}
    </div>
  )
}
