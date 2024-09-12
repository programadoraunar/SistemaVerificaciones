import Link from "next/link";
import React from "react";

function VerificacionNoEncontrado() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Graduado no encontrado
        </h2>
        <p className="text-gray-600 mb-4">
          No se ha encontrado ningún registro para el número de documento
          proporcionado.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Intentar de nuevo
        </Link>
      </div>
    </div>
  );
}

export default VerificacionNoEncontrado;
