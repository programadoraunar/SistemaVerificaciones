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
  const [datosAdicionales, setDatosAdicionales] = useState({
    tipoIdentificacionEgresado: "",
    numeroIdentificacionEgresado: "",
    formacionAcademicaEgresado: "",
  });

  const handleTipoSolicitanteChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTipoSolicitante(e.target.value);
  };

  const handleDatosAdicionalesChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDatosAdicionales((prev) => ({ ...prev, [name]: value }));
  };

  const handlePersonaSubmit = (data: FormularioPersonaType) => {
    console.log("Datos Persona desde el layout:", data);
    const datosCompletos = { ...data, ...datosAdicionales };
    console.log("Datos completos Persona:", datosCompletos);
    // Maneja los datos completos aquí
  };

  const handleEmpresaSubmit = (data: FormularioEmpresaType) => {
    console.log("Datos Empresa desde el layout:", data);
    const datosCompletos = { ...data, ...datosAdicionales };
    console.log("Datos completos Empresa:", datosCompletos);
    // Maneja los datos completos aquí
  };

  return (
    <div className="p-6 lg:w-[40%] bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Datos del Egresado</h2>
      {/* Tipo de Identificación */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Tipo de Identificación
        </label>
        <select
          name="tipoIdentificacion"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
          required
          onChange={handleDatosAdicionalesChange}
          value={datosAdicionales.tipoIdentificacionEgresado}
        >
          <option disabled value="">
            Seleccione una identificación
          </option>
          <option value="Targeta de Identidad">Targeta de Identidad</option>
          <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
          <option value="Cédula de Extranjería">Cédula de Extranjería</option>
          <option value="Pasaporte">Pasaporte</option>
        </select>
      </div>
      {/* Número de Identificación */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Número de Identificación
        </label>
        <input
          type="text"
          name="numeroIdentificacion"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
          required
          onChange={handleDatosAdicionalesChange}
          value={datosAdicionales.numeroIdentificacionEgresado}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Formación Académica
        </label>
        <select
          name="formacionAcademica"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
          required
          onChange={handleDatosAdicionalesChange}
          value={datosAdicionales.formacionAcademicaEgresado}
        >
          <option disabled value="">
            Seleccione una formación
          </option>
          <option value="Profesional">Profesional</option>
          <option value="Técnico Laboral">Técnico Laboral</option>
          <option value="Curso de Extensión">Curso de Extensión</option>
        </select>
      </div>
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
