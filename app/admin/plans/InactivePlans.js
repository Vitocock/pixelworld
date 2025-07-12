'use client'
import { useEffect, useState } from "react"
import InactivePlan from "./InactivePlan"

export default function InactivePlans({ refreshKey, onRefresh }) {
  const [plans, setPlans] = useState([])

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/admin/plans/getAllInactivePlans")
        if (!res.ok) throw new Error("Error al obtener los planes")
        const data = await res.json()
        setPlans(data)
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchPlans()
  }, [refreshKey])

  return (
    <div className="flex flex-row flex-wrap">
      {plans.map(plan => (
        <InactivePlan key={plan.id} plan={plan} onRefresh={onRefresh} onRemove={id => setPlans(plans => plans.filter(p => p.id !== id))} />
      ))}
    </div>
  )
}