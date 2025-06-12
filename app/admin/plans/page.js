import ActivePlans from "./ActivePlans";
import CreatePlan from "./CreatePlan";
import HistoryPlans from "./HistoryPlans";

export default function Home() {
    return (
        <div className="h-screen">
            <h1 className="mb-4 text-3xl">
                Panel de Gestión de Planes
            </h1>
            <div>
                <h2 className="my-2 text-2xl">Planes activos:</h2>
                <ActivePlans />
            </div>
            <div>
                <h2 className="my-2 text-2xl">Agregar un plan nuevo:</h2>
                <CreatePlan />
            </div>
            <div>
                <h2 className="my-2 text-2xl">Ver planes historicos:</h2>
                <HistoryPlans />
            </div>
        </div>
    )
}