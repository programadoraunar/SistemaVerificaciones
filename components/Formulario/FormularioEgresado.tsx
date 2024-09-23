import {
  formaciones,
  identificationOptionsFormulario,
} from "@/constants/options";
import React from "react";

function FormularioEgresado() {
  return (
    <div className="px-8 lg:mx-8 lg:w-[50%]">
      <h2 className="text-xl font-semibold mb-4">Datos del Egresado</h2>
      {/* Tipo de Identificación */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Tipo de Identificación
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
          required
        >
          <option disabled>Seleccione una identificación</option>
          {identificationOptionsFormulario.map((option, index) => (
            <option key={index} disabled={index === 0}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {/* Número de Identificación */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Número de Identificación
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Formación Académica
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
          required
        >
          <option disabled>Seleccione una identificación</option>
          {formaciones.map((option, index) => (
            <option key={index} disabled={index === 0}>
              {option.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FormularioEgresado;
