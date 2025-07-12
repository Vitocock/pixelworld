import EditImageCarousel from "./EditImageCarousel";
import CatalogInfo from "./CatalogInfo";

export default function Home() {
    return (
        <div>
            <h1 className="mb-4 text-3xl font-bold">
                Panel de Imagenes
            </h1>
            <div>
                <CatalogInfo />
            </div>
            <div>
                <EditImageCarousel />
            </div>
        </div>
    )
}