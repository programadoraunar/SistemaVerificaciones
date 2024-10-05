"use client";
import React from "react";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formularioEmpresaSchema,
  FormularioEmpresaType,
} from "../../validations/validationSchema";
interface FormularioEmpresaProps {
  onSubmit: (data: FormularioEmpresaType) => void;
}
const FormularioEmpresa: FC<FormularioEmpresaProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormularioEmpresaType>({
    resolver: zodResolver(formularioEmpresaSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pl-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
        <div>
          <label
            htmlFor="nit"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            NIT
          </label>
          <input
            id="nit"
            type="text"
            className={`w-full p-2 border ${
              errors.nit ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring focus:ring-indigo-200`}
            {...register("nit")}
          />
          {errors.nit && (
            <p className="text-red-600 text-sm">{errors.nit.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="razonSocial"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Razón Social
          </label>
          <input
            id="razonSocial"
            type="text"
            className={`w-full p-2 border ${
              errors.razonSocial ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring focus:ring-indigo-200`}
            {...register("razonSocial")}
          />
          {errors.razonSocial && (
            <p className="text-red-600 text-sm">{errors.razonSocial.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5">
        <div>
          <label
            htmlFor="nombresSolicitante"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Nombres del Solicitante
          </label>
          <input
            id="nombresSolicitante"
            type="text"
            className={`w-full p-2 border ${
              errors.nombresSolicitante ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring focus:ring-indigo-200`}
            {...register("nombresSolicitante")}
          />
          {errors.nombresSolicitante && (
            <p className="text-red-600 text-sm">
              {errors.nombresSolicitante.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="apellidosSolicitante"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Apellidos del Solicitante
          </label>
          <input
            id="apellidosSolicitante"
            type="text"
            className={`w-full p-2 border ${
              errors.apellidosSolicitante ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring focus:ring-indigo-200`}
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
          <label
            htmlFor="cargoSolicitante"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Cargo del Solicitante
          </label>
          <input
            id="cargoSolicitante"
            type="text"
            className={`w-full p-2 border ${
              errors.cargoSolicitante ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring focus:ring-indigo-200`}
            {...register("cargoSolicitante")}
          />
          {errors.cargoSolicitante && (
            <p className="text-red-600 text-sm">
              {errors.cargoSolicitante.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="telefono"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Teléfono
          </label>
          <input
            id="telefono"
            type="text"
            className={`w-full p-2 border ${
              errors.telefono ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring focus:ring-indigo-200`}
            {...register("telefono")}
          />
          {errors.telefono && (
            <p className="text-red-600 text-sm">{errors.telefono.message}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="correoElectronico"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Correo Electrónico
        </label>
        <input
          id="correoElectronico"
          type="email"
          className={`w-full p-2 border ${
            errors.correoElectronico ? "border-red-500" : "border-gray-300"
          } rounded-md focus:ring focus:ring-indigo-200`}
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
          disabled={isSubmitting}
          className="w-full p-2 bg-blue-zodiac-950 text-white rounded-md hover:bg-blue-800 text-center disabled:bg-gray-400"
        >
          {isSubmitting ? "Validando..." : "Verificar"}
        </button>
      </div>
    </form>
  );
};

export default FormularioEmpresa;
