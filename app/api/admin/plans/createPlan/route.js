import pool from "@/lib/db"
import { requireAdmin } from "@/lib/requireAdmin"

export const POST = requireAdmin(async (request) => {
  try {
    const body = await request.json()
    const { name, base_price, resources } = body
    if (!name || !resources || !Array.isArray(resources)) {
      return new Response(JSON.stringify({ error: "Datos inválidos" }), { status: 400 })
    }

    const client = await pool.connect()
    try {
      await client.query("BEGIN")

      // 1. Insertar el plan
      const planInsertQuery = `
        INSERT INTO plan (name, base_price, created_at, active, sort)
        VALUES ($1, $2, NOW(), true, 99)
        RETURNING id
      `
      const result = await client.query(planInsertQuery, [name, base_price])
      const planId = result.rows[0].id

      // 2. Insertar los recursos asociados al plan
      const resourceInsertQuery = `
        INSERT INTO plan_resource (plan_id, resource_id, quantity)
        VALUES ($1, $2, $3)
      `

      for (const resource of resources) {
        const { id, quantity} = resource
        if (!id || quantity == null) continue
        await client.query(resourceInsertQuery, [planId, id, quantity])
      }

      await client.query("COMMIT")

      return new Response(JSON.stringify({ success: true, planId }), { status: 200 })
    } catch (error) {
      await client.query("ROLLBACK")
      console.error("Error en la transacción:", error)
      return new Response(JSON.stringify({ error: "Error al guardar el plan" }), { status: 500 })
    } finally {
      client.release()
    }
  } catch (err) {
    console.error("Error al procesar la solicitud:", err)
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 })
  }
}
)