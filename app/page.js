import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import Banner from "./components/Banner";
import Plans from "./components/Plans";
import Offer from "./components/Offer";
import Contact from "./components/Contact";


export default function Home() {
  return (
    <div className="w-full sm:w-2/3">
      <Header />
      <Banner /> 
      <main className="py-6 px-6">
        <AboutUs />
        <Offer />
        <Plans />
        <Contact />
      </main>
    </div>
  );
}
