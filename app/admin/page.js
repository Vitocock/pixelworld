'use client'
import { useState } from 'react'
import ActivePlans from "./plans/ActivePlans"
import CreatePlanModal from "./plans/CreatePlanModal"
import CreateResourceModal from "./plans/CreateResourceModal"
import DeleteResourceModal from "./plans/DeleteResourceModal"
import InactivePlans from './plans/InactivePlans'

export default function Home() {
  const [showCreatePlan, setShowCreatePlan] = useState(false)
  const [showCreateResource, setShowCreateResource] = useState(false)
  const [showDeleteResource, setShowDeleteResource] = useState(false)
  const [refreshPlans, setRefreshPlans] = useState(false)

  const handlePlanCreated = () => {
    setShowCreatePlan(false)
    setRefreshPlans(prev => !prev)
  }

  const handlePlanUpdated = () => {
    setRefreshPlans(prev => !prev)
  }

  const handleDeleteRersource = () => {
    setShowDeleteResource(false)
    setRefreshPlans(prev => !prev)
  }

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Panel de Gestión de Planes</h1>

      <div className="flex flex-row justify-start">
        <div>
          <button
            className="bg-green-600 text-white px-2 py-1 rounded"
            onClick={() => setShowCreatePlan(true)}
          >
            Crear Plan
          </button>
        </div>
        <div className="ml-5">
          <button
            className="bg-blue-600 text-white px-2 py-1 rounded"
            onClick={() => setShowCreateResource(true)}
          >
            Crear Recurso
          </button>
        </div>
        <div className="ml-5">
          <button
            className="bg-red-600 text-white px-2 py-1 rounded"
            onClick={() => setShowDeleteResource(true)}
          >
            Eliminar Recurso
          </button>
        </div>
      </div>

      <div>
        <h2 className="my-4 text-2xl font-semibold">Planes activos:</h2>
        <ActivePlans onRefresh={handlePlanUpdated} refreshKey={refreshPlans} />
      </div>

      <div>
        <h2 className="my-4 text-2xl font-semibold">Planes Inactivos:</h2>
        <InactivePlans onRefresh={handlePlanUpdated} refreshKey={refreshPlans} />
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

      {showDeleteResource && (
        <DeleteResourceModal
          onClose={() => setShowDeleteResource(false)}
          onDeleteResource={handleDeleteRersource}
        />
      )}
    </div>
  )
}
