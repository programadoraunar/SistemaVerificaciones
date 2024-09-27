import { identificationOptionsFormulario } from "@/constants/options";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
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
  // Fetcher usando Supabase
  const fetcher = async (url: string) => {
    const { data, error } = await supabase.from(url).select();
    if (error) throw new Error(error.message);
    return data;
  };
  // Usamos SWR para obtener las extensiones desde la tabla "Extension"
  const { data: extensiones } = useSWR("extension", fetcher);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col lg:flex-row w-full lg:gap-8">
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Identificación:
          </label>
          <select
            {...register("tipo_identificacion", { required: true })} // Registra el campo
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            defaultValue={tipoIdentificacion} // Valor por defecto
          >
            {identificationOptionsFormulario.map((option) => (
              <option key={option.id} value={option.id}>
                {option.nombre}
              </option>
            ))}
          </select>
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
          <label className="block text-gray-700 text-md font-bold mb-2">
            Extension
          </label>
          <select
            {...register("id_extension")}
            defaultValue={extension}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring"
          >
            <option value="">Seleccionar la Extension</option>
            {extensiones &&
              extensiones.map((extension: any) => (
                <option key={extension.id} value={extension.id}>
                  {extension.nombre}
                </option>
              ))}
          </select>
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
