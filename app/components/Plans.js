"use client"

import { useEffect, useState } from "react"
import  PricingCard  from "./PricingCard"


export default function Plans() {
  /*const [plans, setPlans] = useState([])
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch("/api/plans/getAllActivePlans")
        if (!res.ok) throw new Error("Error al obtener los planes")
        const data = await res.json()
        setPlans(data)
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchPlans()
  }, [])*/

  const plans =[
    {
        "id": 1,
        "name": "Pixel Basico",
        "base_price": 60000,
        "created_at": "2025-06-04T04:00:00.000Z",
        "resources": [
            {
                "id": 1,
                "name": "Monitores",
                "quantity": 1
            },
            {
                "id": 2,
                "name": "Consolas",
                "quantity": 1
            },
            {
                "id": 3,
                "name": "Controles",
                "quantity": 2
            },
            {
                "id": 4,
                "name": "Headsets",
                "quantity": 2
            },
            {
                "id": 5,
                "name": "Sillas",
                "quantity": 2
            },
            {
                "id": 6,
                "name": "Mesas",
                "quantity": 1
            },
            {
                "id": 7,
                "name": "Tiempo",
                "quantity": 4
            }
        ]
    },
    {
        "id": 2,
        "name": "Intermedio",
        "base_price": 100000,
        "created_at": "2025-06-04T04:00:00.000Z",
        "resources": [
            {
                "id": 1,
                "name": "Monitores",
                "quantity": 2
            },
            {
                "id": 2,
                "name": "Consolas",
                "quantity": 2
            },
            {
                "id": 3,
                "name": "Controles",
                "quantity": 4
            },
            {
                "id": 4,
                "name": "Headsets",
                "quantity": 4
            },
            {
                "id": 5,
                "name": "Sillas",
                "quantity": 4
            },
            {
                "id": 6,
                "name": "Mesas",
                "quantity": 1
            },
            {
                "id": 7,
                "name": "Tiempo",
                "quantity": 4
            }
        ]
    },
    {
        "id": 3,
        "name": "Pixelworld",
        "base_price": 180000,
        "created_at": "2025-06-04T04:00:00.000Z",
        "resources": [
            {
                "id": 1,
                "name": "Monitores",
                "quantity": 4
            },
            {
                "id": 2,
                "name": "Consolas",
                "quantity": 4
            },
            {
                "id": 3,
                "name": "Controles",
                "quantity": 8
            },
            {
                "id": 4,
                "name": "Headsets",
                "quantity": 5
            },
            {
                "id": 5,
                "name": "Sillas",
                "quantity": 8
            },
            {
                "id": 6,
                "name": "Mesas",
                "quantity": 1
            },
            {
                "id": 7,
                "name": "Tiempo",
                "quantity": 4
            }
        ]
    }
  ]

  return (
      <div className="my-6 flex flex-col px-2 py-4">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold" id="plans">Nuestros planes</h2>
          </div>
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold  ">Nuestros precios no incluyen traslado, consultar valor segun tu comuna.</h2>
            <p><a href="" target="_blank">Consulta por el catalogo de juegos haciendo click aqui.</a></p>
          </div >
          <div className="mt-4 flex flex-row flex-wrap flex-between">
            {plans.map(plan => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
      </div>
    )
  }