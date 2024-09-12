import FormularioEgresado from "@/components/Formulario/FormularioEgresado";
import FormularioVerificacion from "@/components/Formulario/FormularioVerificacion";
import Hero from "@/components/hero";

export default async function Index() {
  return (
    <div className={`flex flex-col lg:flex-row px-5 w-full`}>
      <div className="flex flex-col lg:w-[60%] ">
        <Hero />
        <FormularioEgresado />
      </div>

      <FormularioVerificacion />
    </div>
  );
}
