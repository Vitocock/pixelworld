import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Obtener todos los planes activos
    const planQuery = `
      SELECT id, name, base_price, created_at
      FROM plan
      WHERE active = TRUE
    `;
    const planResult = await pool.query(planQuery);
    const plans = planResult.rows;

    if (plans.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Obtener todos los recursos de todos los planes activos
    const planIds = plans.map(p => p.id);
    const placeholders = planIds.map((_, idx) => `$${idx + 1}`).join(',');

    const resourceQuery = `
      SELECT pr.plan_id, r.id AS resource_id, r.name AS resource_name, pr.quantity
      FROM plan_resource pr
      JOIN resource r ON pr.resource_id = r.id
      WHERE pr.plan_id IN (${placeholders})
    `;
    const resourceResult = await pool.query(resourceQuery, planIds);

    // Agrupar recursos por plan
    const resourcesByPlan = {};
    for (const row of resourceResult.rows) {
      if (!resourcesByPlan[row.plan_id]) {
        resourcesByPlan[row.plan_id] = [];
      }
      resourcesByPlan[row.plan_id].push({
        id: row.resource_id,
        name: row.resource_name,
        quantity: row.quantity,
      });
    }

    // Asociar recursos a cada plan
    const enrichedPlans = plans.map(plan => ({
      ...plan,
      resources: resourcesByPlan[plan.id] || [],
    }));

    return NextResponse.json(enrichedPlans);
  } catch (error) {
    console.error('Error al obtener los planes activos:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
