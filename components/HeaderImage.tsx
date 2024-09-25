import Image from "next/image";
import React from "react";

function HeaderImage() {
  return (
    <div className="relative w-full h-40">
      <Image
        src="/pixelcut-export.png" // Asegúrate de que la imagen esté en la carpeta public
        alt="Descripción de la imagen"
        layout="fill" // Hace que la imagen ocupe todo el contenedor
        objectFit="cover" // Asegura que la imagen cubra todo el contenedor sin distorsionarse
        className="rounded-lg" // Añade clases de Tailwind aquí si lo deseas
      />
    </div>
  );
}

export default HeaderImage;
