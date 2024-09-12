"use client";
import Link from "next/link";
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
    <div className="p-6 lg:w-[40%]  bg-white shadow-md rounded-md">
      <form className="space-y-6">
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
            {/* Tipo Identificación del Solicitante */}
            <div className="pb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Tipo Identificación del Solicitante
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
                required
              >
                <option disabled>Seleccione una identificación</option>
                <option>Targeta de Identidad</option>
                <option>Cédula de Ciudadanía</option>
                <option>Cédula de Extranjería</option>
                <option>Pasaporte</option>
              </select>
            </div>
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
          <Link
            href="/verificacion"
            type="submit"
            className="w-full p-2 bg-blueBase text-white rounded-md hover:bg-blue-800 text-center"
          >
            Verificar
          </Link>
        </div>
        <div className="mt-6">
          <Link
            href="/VerificacionNoEncontrado"
            type="submit"
            className="w-full p-2 bg-blueBase text-white rounded-md hover:bg-blue-800 text-center"
          >
            No encontrado
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormularioVerificacion;
