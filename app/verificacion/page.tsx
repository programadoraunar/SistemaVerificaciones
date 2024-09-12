import React from "react";

function Verificacion() {
  const datosGraduado = {
    nombre: "Juan",
    apellido: "Pérez",
    programa: "Ingeniería Informatica",
    titulo: "Ingeniero Informatico",
    fechaGrado: "2023-06-15",
    actaGrado: "ACTA-12345",
  };
  return (
    <div className="flex justify-center items-center lg:py-36 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Verificación de Graduado
        </h2>
        <div className="space-y-4 text-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center gap-7">
            <label className="block text-gray-700 font-semibold mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={`${datosGraduado.nombre} ${datosGraduado.apellido}`}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
            />
            <label className="block text-gray-700 font-semibold mb-2">
              Programa
            </label>
            <input
              type="text"
              value={datosGraduado.programa}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Título
            </label>
            <input
              type="text"
              value={datosGraduado.titulo}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Fecha de Grado
            </label>
            <input
              type="text"
              value={new Date(datosGraduado.fechaGrado).toLocaleDateString()}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Acta de Grado
            </label>
            <input
              type="text"
              value={datosGraduado.actaGrado}
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
            />
          </div>
          <div className="flex justify-center">
            <button className="p-2 bg-blueBase text-white rounded-md hover:bg-blue-800 text-center">
              Solicitar Verificacion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verificacion;
