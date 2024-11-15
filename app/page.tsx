import LayoutFormularioSoli from "@/components/Formulario/LayoutFormularioSoli";
import Hero from "@/components/Home/hero";
import Footer from "@/components/Home/Footer";
import NavBar from "@/components/Home/NavBar";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Tets from "@/components/Home/Tets";
import { Toaster } from "react-hot-toast";
export default async function Index() {
  return (
    <div className="relative">
      {/* Cortina que cubre la página al cargar */}
      <LoadingScreen />

      {/* Contenido de la página */}
      <NavBar />
      <div className="flex flex-col lg:flex-row px-5 w-full bg-hero">
        <div className="flex flex-col px-5 py-10 lg:flex-row">
          <div className="flex flex-col lg:w-[60%]">
            <Hero />
          </div>
          <LayoutFormularioSoli />
        </div>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}
