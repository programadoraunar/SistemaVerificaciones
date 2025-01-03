"use client";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";
import GenerarDocumentoWord from "../UploadExcel/GenerarDocumentoWord";
import VentanaConfirmacion from "@/components/ui/Modal/ModalConfirmacion/VentanaConfirmacion";
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
  id_extension: number;
}
interface FormularioTitulosProps {
  titulos: TecnicoTitulo[];
  tipoIdentificacion: string; // Agregar esta línea
  numeroIdentificacion: string; // Agregar esta línea
  nombre: string; // Agregar esta línea
  apellido: string; // Agregar esta línea
  eliminarTitulo: (data: any) => void;
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
  eliminarTitulo,
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
        acc[`numero_certificado_${index}`] = titulo.numero_certificado;
        acc[`id_extension_${index}`] = titulo.id_extension;
        return acc;
      }, {} as FormValues),
    });
  }, [titulos, reset]);
  const onSubmit = async (data: FormValues, index: number) => {
    try {
      const id = Number(data[`id_${index}`]);
      const idTitulo = Number(data[`id_titulo_${index}`]);

      if (isNaN(id) || isNaN(idTitulo)) {
        throw new Error(
          `Los IDs deben ser números válidos para el título ${index + 1}`
        );
      }

      const { error } = await supabase.rpc("actualizar_titulo_tecnico", {
        p_id: id,
        p_id_titulo: idTitulo,
        p_acta_grado: data[`acta_grado_${index}`] || null,
        p_folio: data[`folio_${index}`] || null,
        p_fecha_grado: data[`fecha_grado_${index}`] || null,
        p_libro_registro_grado: data[`libro_registro_grado_${index}`] || null,
        p_numero_certificado: data[`numero_certificado_${index}`],
        p_id_extension: data[`id_extension_${index}`],
      });

      if (error) throw new Error(error.message);
      toast.success("Datos actualizados correctamente");
    } catch (error) {
      console.error(`Error al actualizar el título ${index + 1}:`, error);
      // Mostrar un mensaje al usuario aquí
    }
  };
  // Usamos SWR para obtener las extensiones desde la tabla "Extension"
  const { data: extensiones, isLoading } = useSWR("extension", fetcher);
  return (
    <form className="py-4">
      {titulos.map((titulo, index) => (
        <div key={index} className="mb-6 pb-4">
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
              <label className="block text-gray-700 text-md font-bold mb-2">
                Extension
              </label>
              {!isLoading && extensiones ? (
                <select
                  {...register(`id_extension_${index}`)}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring"
                >
                  {extensiones.map((extension: any) => (
                    <option key={extension.id} value={extension.id}>
                      {extension.nombre}
                    </option>
                  ))}
                </select>
              ) : (
                <p>Cargando extensiones...</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 py-2">
            <button
              type="button" // Cambiado a "button" para manejar el envío por separado
              onClick={handleSubmit((data) => onSubmit(data, index))}
              className="bg-blue-zodiac-950 text-white p-2 rounded"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => eliminarTitulo(titulo.id)} // Llamada a la función de eliminación
              className="bg-red-600 text-white p-2 rounded"
            >
              Eliminar Título
            </button>
          </div>
          <GenerarDocumentoWord
            persona={{
              tipoIdentificacion,
              numeroIdentificacion,
              nombre,
              apellido,
              titulo_nombre: titulosMap?.[titulo.id_titulo] || "",
              fecha_grado: titulo.fecha_grado,
              acta_grado: titulo.acta_grado,
              folio: titulo.folio,
              libro_registro_grado: titulo.libro_registro_grado,
              numero_certificado: titulo.numero_certificado,
            }}
          />
        </div>
      ))}
    </form>
  );
};

export default FormularioTitulos;
