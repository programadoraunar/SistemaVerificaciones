"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formularioEmpresaSchema,
  FormularioEmpresaType,
} from "../../validations/validationSchema";
interface FormularioEmpresaProps {
  onSubmit: (data: FormularioEmpresaType) => void;
}
const FormularioEmpresa: React.FC<FormularioEmpresaProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormularioEmpresaType>({
    resolver: zodResolver(formularioEmpresaSchema),
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            NIT
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            {...register("nit")}
          />
          {errors.nit && (
            <p className="text-red-600  text-sm">{errors.nit.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Razón Social
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            {...register("razonSocial")}
          />
          {errors.razonSocial && (
            <p className="text-red-600 text-sm">{errors.razonSocial.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Nombres del Solicitante
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            {...register("nombresSolicitante")}
          />
          {errors.nombresSolicitante && (
            <p className="text-red-600 text-sm">
              {errors.nombresSolicitante.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Apellidos del Solicitante
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            {...register("apellidosSolicitante")}
          />
          {errors.apellidosSolicitante && (
            <p className="text-red-600 text-sm">
              {errors.apellidosSolicitante.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Cargo del Solicitante
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            {...register("cargoSolicitante")}
          />
          {errors.cargoSolicitante && (
            <p className="text-red-600 text-sm">
              {errors.cargoSolicitante.message}
            </p>
          )}
        </div>

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
            <p className="text-red-600 text-sm">{errors.telefono.message}</p>
          )}
        </div>
      </div>

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
          <p className="text-red-600 text-sm">
            {errors.correoElectronico.message}
          </p>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full p-2 bg-blue-zodiac-950 text-white rounded-md hover:bg-blue-800 text-center"
        >
          Verificar
        </button>
      </div>
    </form>
  );
};

export default FormularioEmpresa;
