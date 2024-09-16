"use client";
import { useState } from "react";
import FormularioPersona from "./FormularioPersona";
import FormularioEmpresa from "./FormularioEmpresa";
import {
  FormularioEmpresaType,
  FormularioPersonaType,
} from "../../validations/validationSchema";
import ExpandingButton from "../ui/ExpandingButton";
const LayoutFormularioSoli: React.FC = () => {
  const [tipoSolicitante, setTipoSolicitante] = useState("persona");
  const [datosAdicionales, setDatosAdicionales] = useState({
    tipoIdentificacionEgresado: "",
    numeroIdentificacionEgresado: "",
    formacionAcademicaEgresado: "",
  });
  const [errors, setErrors] = useState({
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

  const validate = () => {
    const newErrors = {
      tipoIdentificacionEgresado: "",
      numeroIdentificacionEgresado: "",
      formacionAcademicaEgresado: "",
    };

    if (!datosAdicionales.tipoIdentificacionEgresado) {
      newErrors.tipoIdentificacionEgresado =
        "El tipo de identificación es requerido.";
    }

    if (!datosAdicionales.numeroIdentificacionEgresado) {
      newErrors.numeroIdentificacionEgresado =
        "El número de identificación es requerido.";
    } else if (!/^\d+$/.test(datosAdicionales.numeroIdentificacionEgresado)) {
      newErrors.numeroIdentificacionEgresado =
        "El número de identificación debe contener solo números.";
    }

    if (!datosAdicionales.formacionAcademicaEgresado) {
      newErrors.formacionAcademicaEgresado =
        "La formación académica es requerida.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handlePersonaSubmit = (data: FormularioPersonaType) => {
    if (validate()) {
      const datosCompletos = { ...data, ...datosAdicionales };
      console.log("Datos completos Persona:", datosCompletos);
      // Maneja los datos completos aquí
    }
  };

  const handleEmpresaSubmit = (data: FormularioEmpresaType) => {
    if (validate()) {
      const datosCompletos = { ...data, ...datosAdicionales };
      console.log("Datos completos Empresa:", datosCompletos);
      // Maneja los datos completos aquí
    }
  };

  return (
    <div className="p-6 lg:w-[40%] bg-white shadow-md rounded-md">
      <h2 className="text-center text-3xl font-bold">
        Verifica el título académico
      </h2>
      <p className="border-b-2 border-blue-950 py-2 my-2 font-bold">
        <span className="pl-2">Datos del Egresado</span>
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-2">
        {/* Tipo de Identificación */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tipo de Identificación
          </label>
          <select
            name="tipoIdentificacionEgresado"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-sm"
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
          {errors.tipoIdentificacionEgresado && (
            <p className="text-red-500 text-sm">
              {errors.tipoIdentificacionEgresado}
            </p>
          )}
        </div>
        {/* Número de Identificación */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Número de Identificación
          </label>
          <input
            type="text"
            name="numeroIdentificacionEgresado"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-sm"
            required
            onChange={handleDatosAdicionalesChange}
            value={datosAdicionales.numeroIdentificacionEgresado}
          />
          {errors.numeroIdentificacionEgresado && (
            <p className="text-red-500 text-sm">
              {errors.numeroIdentificacionEgresado}
            </p>
          )}
        </div>
      </div>
      <div className="p-2">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Formación Académica
        </label>
        <select
          name="formacionAcademicaEgresado"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-sm"
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
        {errors.formacionAcademicaEgresado && (
          <p className="text-red-500 text-sm">
            {errors.formacionAcademicaEgresado}
          </p>
        )}
      </div>
      {/* Datos del Solicitante */}

      <p className="border-b-2 border-blue-950 py-2 my-2 font-bold">
        <span className="pl-2">Datos del Solicitante</span>
      </p>
      {/* Tipo de Solicitante */}
      <div className="pl-2">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Tipo de Solicitante
        </label>
        <div className="flex space-x-4 py-2">
          <label className="flex items-center text-sm">
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
          <label className="flex items-center text-sm">
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
