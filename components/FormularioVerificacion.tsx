"use client";
import { useState } from "react";

const FormularioVerificacion = () => {
  const [tipoSolicitante, setTipoSolicitante] = useState("persona");

  // Declarar el tipo de evento correctamente
  const handleTipoSolicitanteChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTipoSolicitante(e.target.value);
  };

  return (
    <div className="p-6 lg-w-[40] bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Datos del Graduado</h2>
      <form className="space-y-6">
        {/* Tipo de Identificación */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tipo de Identificación
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            required
          >
            <option>Seleccione una identificación</option>
            <option>Cédula de Ciudadanía</option>
            <option>Cédula de Extranjería</option>
            <option>Pasaporte</option>
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

        {/* Datos del Solicitante */}
        <h2 className="text-xl font-semibold mt-8 mb-4">
          Datos del Solicitante
        </h2>

        {/* Tipo de Solicitante */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tipo de Solicitante
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="tipoSolicitante"
                value="persona"
                checked={tipoSolicitante === "persona"}
                onChange={handleTipoSolicitanteChange}
                className="mr-2"
              />
              Persona natural
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="tipoSolicitante"
                value="empresa"
                checked={tipoSolicitante === "empresa"}
                onChange={handleTipoSolicitanteChange}
                className="mr-2"
              />
              Empresa
            </label>
          </div>
        </div>

        {/* Número de Documento */}
        {tipoSolicitante === "persona" && (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Número de Documento
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
              required
            />
          </div>
        )}

        {/* NIT y Razón Social */}
        {tipoSolicitante === "empresa" && (
          <>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                NIT
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Razón Social
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                required
              />
            </div>
          </>
        )}

        {/* Nombres del Solicitante */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Nombres del Solicitante
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        {/* Apellidos del Solicitante */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Apellidos del Solicitante
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        {/* Tipo Identificación del Solicitante */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tipo Identificación del Solicitante
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            required
          >
            <option>Seleccione una identificación</option>
            <option>Cédula de Ciudadanía</option>
            <option>Cédula de Extranjería</option>
            <option>Pasaporte</option>
          </select>
        </div>

        {/* Identificación del Solicitante */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Identificación del Solicitante
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        {/* Cargo del Solicitante */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Cargo del Solicitante
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        {/* Ciudad */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Ciudad
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Enviar Solicitud
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioVerificacion;
