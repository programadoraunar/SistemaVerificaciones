"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formularioPersonaSchema,
  FormularioPersonaType,
} from "../../validations/validationSchema";

interface FormularioPersonaProps {
  onSubmit: (data: FormularioPersonaType) => void;
}
const FormularioPersona: React.FC<FormularioPersonaProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormularioPersonaType>({
    resolver: zodResolver(formularioPersonaSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/* Tipo Identificación del Solicitante */}
        <div className="pb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tipo Identificación del Solicitante
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            {...register("tipoIdentificacion")}
          >
            <option value="">Seleccione una identificación</option>
            <option value="Cedula de Ciudadania">Cédula de Ciudadanía</option>
            <option value="Cedula de Extranjeria">Cédula de Extranjería</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
          {errors.tipoIdentificacion && (
            <p className="text-red-600">{errors.tipoIdentificacion.message}</p>
          )}
        </div>

        {/* Número de Documento */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Número de Documento
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            {...register("numeroDocumento")}
          />
          {errors.numeroDocumento && (
            <p className="text-red-600">{errors.numeroDocumento.message}</p>
          )}
        </div>

        {/* Nombres del Solicitante */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Nombres del Solicitante
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            {...register("nombres")}
          />
          {errors.nombres && (
            <p className="text-red-600">{errors.nombres.message}</p>
          )}
        </div>

        {/* Apellidos del Solicitante */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Apellidos del Solicitante
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            {...register("apellidos")}
          />
          {errors.apellidos && (
            <p className="text-red-600">{errors.apellidos.message}</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            {...register("telefono")}
          />
          {errors.telefono && (
            <p className="text-red-600">{errors.telefono.message}</p>
          )}
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            {...register("correoElectronico")}
          />
          {errors.correoElectronico && (
            <p className="text-red-600">{errors.correoElectronico.message}</p>
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full p-2 bg-blue-950 text-white rounded-md text-center"
          >
            Verificar
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormularioPersona;
