import EditImageCarousel from "./EditImageCarousel";

export default function Home() {
    return (
        <div>
            <h1 className="mb-4 text-3xl font-bold">
                Panel de Imagenes
            </h1>
            <div>
                <EditImageCarousel />
            </div>
        </div>
    )
}