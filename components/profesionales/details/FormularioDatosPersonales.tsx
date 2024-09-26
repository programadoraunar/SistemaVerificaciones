import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
interface FormularioDatosPersonalesProps {
  numeroIdentificacion: string;
  tipoIdentificacion: string; // Nuevo prop para el tipo de identificación
  nombre: string;
  apellido: string;
  extension: number;
  onSubmit: (data: any) => void; // Asegúrate de definir un tipo adecuado para los datos
}
const FormularioDatosPersonales: React.FC<FormularioDatosPersonalesProps> = ({
  numeroIdentificacion,
  tipoIdentificacion, // Añade este prop
  extension,
  nombre,
  apellido,
  onSubmit,
}) => {
  const { register, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    reset({
      nombre_profesional: nombre,
      apellido_profesional: apellido,
      numero_identificacion: numeroIdentificacion, // Añade este campo
      tipo_identificacion: tipoIdentificacion, // Añade este campo
      extension_profesional: extension,
    });
  }, [
    nombre,
    apellido,
    numeroIdentificacion,
    tipoIdentificacion,
    extension,
    reset,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col lg:flex-row w-full lg:gap-8">
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Identificación:
          </label>
          <input
            type="text"
            {...register("tipo_identificacion", { required: true })} // Registra este campo
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            defaultValue={tipoIdentificacion} // Asigna el valor por defecto
          />
        </div>
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Número de Identificación:
          </label>
          <input
            type="text"
            {...register("numero_identificacion", { required: true })} // Registra este campo
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            defaultValue={numeroIdentificacion} // Asigna el valor por defecto
            disabled
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:gap-8">
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            {...register("nombre_profesional", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Apellido:
          </label>
          <input
            type="text"
            {...register("apellido_profesional", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:gap-8">
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Extension:
          </label>
          <input
            type="text"
            {...register("extension_profesional", { required: true })} // Registra este campo
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            defaultValue={extension} // Asigna el valor por defecto
            disabled
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-zodiac-950 text-white p-2 rounded "
        >
          Actualizar Datos Personales
        </button>
      </div>
    </form>
  );
};

export default FormularioDatosPersonales;
