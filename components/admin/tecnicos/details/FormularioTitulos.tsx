"use client";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
interface TecnicoTitulo {
  id: number;
  id_tecnico: number; // Esta propiedad se mantiene pero no se utiliza en la función
  id_titulo: number;
  acta_grado: string;
  folio: string;
  fecha_grado: string;
  libro_registro_grado: string;
  numero_diploma: string;
  siet: string;
  numero_certificado: string;
}
interface FormularioTitulosProps {
  titulos: TecnicoTitulo[];
  tipoIdentificacion: string; // Agregar esta línea
  numeroIdentificacion: string; // Agregar esta línea
  nombre: string; // Agregar esta línea
  apellido: string; // Agregar esta línea
  extension: number; // Agregar esta línea
}
// Define el tipo para los valores del formulario
interface FormValues {
  [key: string]: string | number;
}

// Función para obtener los nombres de los títulos
const fetcher = async (url: string) => {
  const { data, error } = await supabase.from(url).select();
  if (error) throw new Error(error.message);
  return data;
};
const FormularioTitulos: React.FC<FormularioTitulosProps> = ({
  titulos,
  tipoIdentificacion,
  numeroIdentificacion,
  nombre,
  apellido,
  extension,
}) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  // Obtiene los nombres de los títulos
  const { data: titulosNombres } = useSWR("titulos", fetcher);
  // Crea un objeto de referencia para los nombres de los títulos
  const titulosMap = titulosNombres?.reduce(
    (
      acc: { [key: number]: string },
      titulo: { id: number; nombre: string }
    ) => {
      acc[titulo.id] = titulo.nombre; // Suponiendo que los títulos tienen 'id' y 'nombre'
      return acc;
    },
    {}
  );

  useEffect(() => {
    reset({
      ...titulos.reduce((acc, titulo, index) => {
        acc[`id_${index}`] = titulo.id;
        acc[`id_titulo_${index}`] = titulo.id_titulo;
        acc[`acta_grado_${index}`] = titulo.acta_grado;
        acc[`folio_${index}`] = titulo.folio;
        acc[`fecha_grado_${index}`] = titulo.fecha_grado;
        acc[`libro_registro_grado_${index}`] = titulo.libro_registro_grado;
        acc[`numero_diploma_${index}`] = titulo.numero_diploma;
        acc[`siet_${index}`] = titulo.siet;
        acc[`numero_certificado_${index}`] = titulo.numero_certificado;
        return acc;
      }, {} as FormValues),
    });
  }, [titulos, reset]);
  console.log(titulos);
  return (
    <form className="py-4">
      {titulos.map((titulo, index) => (
        <div key={index} className="mb-6 border-b-2 pb-4">
          {/* Muestra el nombre del título en lugar del índice */}
          <h3 className="font-semibold mb-2">
            {titulosMap?.[titulo.id_titulo] || "Título desconocido"}
          </h3>
          <input type="hidden" {...register(`id_${index}`)} />
          <div className="flex flex-col lg:flex-row w-full lg:gap-8">
            <div className="mb-4 w-full lg:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Acta de Grado:
              </label>
              <input
                type="text"
                {...register(`acta_grado_${index}`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4 w-full lg:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Folio:
              </label>
              <input
                type="text"
                {...register(`folio_${index}`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full lg:gap-8">
            <div className="mb-4 w-full lg:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Grado:
              </label>
              <input
                type="date"
                {...register(`fecha_grado_${index}`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4 w-full lg:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Libro Registro Grado:
              </label>
              <input
                type="text"
                {...register(`libro_registro_grado_${index}`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full lg:gap-8">
            <div className="mb-4 w-full lg:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Número de Diploma:
              </label>
              <input
                type="text"
                {...register(`numero_diploma_${index}`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full lg:gap-8">
            <div className="mb-4 w-full lg:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Número de Certificado:
              </label>
              <input
                type="text"
                {...register(`numero_certificado_${index}`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row w-full lg:gap-8">
            <div className="mb-4 w-full lg:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Número de Diploma
              </label>
              <input
                type="text"
                {...register(`numero_diploma_${index}`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
          <div className="flex justify-end"></div>
        </div>
      ))}
    </form>
  );
};

export default FormularioTitulos;
