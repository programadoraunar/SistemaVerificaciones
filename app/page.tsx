import FormularioVerificacion from "@/components/FormularioVerificacion";
import Hero from "@/components/hero";
export default async function Index() {
  return (
    <div className="flex flex-col lg:flex-row px-5 w-full">
      <Hero />
      <FormularioVerificacion />
    </div>
  );
}
