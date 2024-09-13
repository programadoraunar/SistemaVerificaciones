"use client";
import Link from "next/link";
import { useState } from "react";
import departamentos from "../../utils/ciudadesColombia/colombia.json"; // Ruta relativa al archivo JSON
import FormularioPersona from "./FormularioPersona";
import FormularioEmpresa from "./FormularioEmpresa";
import {
  FormularioEmpresaType,
  FormularioPersonaType,
} from "../../validations/validationSchema";
const LayoutFormularioSoli: React.FC = () => {
  const [tipoSolicitante, setTipoSolicitante] = useState("persona");

  const handleTipoSolicitanteChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTipoSolicitante(e.target.value);
  };

  const handlePersonaSubmit = (data: FormularioPersonaType) => {
    console.log("Datos Persona desde el layout:", data);
    // Maneja los datos del formulario aquí
  };
  const handleEmpresaSubmit = (data: FormularioEmpresaType) => {
    console.log("Datos Empresa desde el layout:", data);
    // Maneja los datos del formulario aquí
  };

  return (
    <div className="p-6 lg:w-[40%]  bg-white shadow-md rounded-md">
      {/* Datos del Solicitante */}
      <h2 className="text-xl font-semibold mt-8 mb-4">Datos del Solicitante</h2>

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

      {/* Formulario según tipo de solicitante */}
      {tipoSolicitante === "persona" && (
        <FormularioPersona onSubmit={handlePersonaSubmit} />
      )}

      {tipoSolicitante === "empresa" && (
        <FormularioEmpresa onSubmit={handleEmpresaSubmit} />
      )}
    </div>
  );
};

export default LayoutFormularioSoli;
