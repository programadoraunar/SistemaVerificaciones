import LayoutFormularioSoli from "@/components/Formulario/LayoutFormularioSoli";
import Hero from "@/components/hero";

export default async function Index() {
  return (
    <div className="flex flex-col lg:flex-row px-5 w-full bg-hero">
      <div className="flex flex-col px-5 py-10 lg:flex-row">
        <div className="flex flex-col lg:w-[60%] ">
          <Hero />
        </div>
        <LayoutFormularioSoli />
      </div>
    </div>
  );
}
