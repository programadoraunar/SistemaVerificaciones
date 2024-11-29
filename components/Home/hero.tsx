"use client";
import Carousel from "@/components/Home/Carousel";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.div
      className="lg:px-8 lg:mx-8 lg:pt-8 pb-10 text-gray-200"
      initial={{ x: "-100vw" }} // Inicia fuera de la pantalla a la izquierda
      animate={{ x: 0 }} // Se mueve a su posición original
      transition={{ type: "spring", stiffness: 50, duration: 1.7, delay: 1.7 }}
    >
      <div className="flex flex-col">
        <h2 className="text-3xl font-semibold mt-8 mb-4">Bienvenido(a)</h2>
        <p className="text-justify">
          {" "}
          A través de esta plataforma, se podrá verificar la existencia y
          autenticidad de los títulos y/o certificados de nuestros egresados.
          Ten en cuenta que la información disponible es de acceso público e
          incluye detalles sobre el título obtenido por el graduado. Si no eres
          el titular de los datos, al utilizar esta plataforma, declaras que lo
          harás únicamente con fines lícitos, específicos a ámbitos académicos o
          laborales. Para obtener más detalles, consulta nuestra{" "}
          <a
            target="_blank"
            href="https://www.aunar.edu.co/politicas-de-proteccion-de-datos/"
            className="text-blue-500 underline font-bold"
          >
            {" "}
            Política de Protección de Datos Personales{" "}
          </a>
          .{" "}
        </p>
        <Carousel />
      </div>
    </motion.div>
  );
}
