import React from "react";

function page() {
  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-lg px-6 py-5 flex flex-col space-x-4">
        <h2 className="text-2xl font-bold">Modulo de Administración</h2>
        <p className="py-5">
          A continuación encontrarás diversas opciones para administrar el
          sistema. Podrás agregar, modificar o actualizar los diferentes campos
          de la base de datos. Este módulo está diseñado para mantener el
          sistema actualizado y adaptado a los nuevos requerimientos que puedan
          surgir en el futuro
        </p>
      </div>
    </div>
  );
}

export default page;
