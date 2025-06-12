"use client"
import { useEffect, useState } from "react"
import Plan from "./Plan"

export default function ActivePlans () {
    const [plans, setPlans] = useState([])
    
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch("/api/plans/getAllActivePlans")
                if (!res.ok) throw new Error("Error al obtener los planes")
                const data = await res.json()
                console.log(data)
                setPlans(data)
            } catch (error) {
                console.error("Error:", error)
            }
        }
        
        fetchPlans()
    }, [])

    return (
        <div className="flex flex-row flex-wrap">
            {plans.map(plan => (
                <Plan key={plan.id} plan={plan} />
            ))}
        </div>
    )
}