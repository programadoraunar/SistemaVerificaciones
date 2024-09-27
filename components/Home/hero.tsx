"use client";
import Carousel from "@/components/Home/Carousel";
export default function Header() {
  return (
    <div className="lg:px-8 lg:mx-8 lg:pt-8 pb-10 text-gray-200">
      <div className="flex flex-col">
        <h2 className="text-3xl font-semibold mt-8 mb-4">Bienvenido</h2>
        <p>
          A través de esta plataforma, podrás verificar la existencia y
          autenticidad de los títulos profesionales de nuestros graduados desde
          el año "" hasta la fecha. Recuerda que la información proporcionada es
          pública, ya que incluye el nombre, número de documento y título
          obtenido por el graduado. Si no eres el titular de los datos, al
          acceder a esta plataforma declaras que utilizarás la información solo
          con fines lícitos, específicamente académicos o laborales.
        </p>
        <Carousel />
      </div>
    </div>
  );
}
