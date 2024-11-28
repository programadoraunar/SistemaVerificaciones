import { identificationOptionsFormulario } from "@/constants/options";
import { CursoExtensionTitulos } from "@/interfaces/Titulos";
import { registrarCursoExtensionConTitulos } from "@/lib/supabaseAdminPostFunctions";
import { supabase } from "@/utils/supabase/client";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";
interface FormularioRegistroCursoExtensionProps {
  onSuccess: () => void; // Nueva prop para cerrar el modal
}
const FormularioRegistroCurso = ({
  onSuccess,
}: FormularioRegistroCursoExtensionProps) => {
  const { register, handleSubmit, control, reset } = useForm<{
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    nombre: string;
    apellido: string;
    idExtension: number | string;
    titulos: CursoExtensionTitulos[];
  }>({
    defaultValues: {
      titulos: [
        {
          titulo_curso_id: 0,
          periodo_formacion: "",
          fecha_entrega: new Date(),
          id_extension: 0,
        },
      ],
    },
  });
  const fetcher = async (url: string) => {
    const { data, error } = await supabase.from(url).select();
    if (error) throw new Error(error.message);
    return data;
  };
  // Fetch para obtener los títulos
  const { data: titulos, error: titulosError } = useSWR(
    "tituloscursos",
    fetcher
  );
  const { data: extensiones } = useSWR("extension", fetcher);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "titulos", // Nombre del campo del arreglo
  });
  const onSubmit = async (data: any) => {
    const titulosJson = data.titulos.map((titulo: CursoExtensionTitulos) => ({
      ...titulo,
      titulo_curso_id: Number(titulo.titulo_curso_id),
      // Formatear la fecha al formato yyyy-mm-dd
      fecha_entrega: new Date(titulo.fecha_entrega).toISOString().split("T")[0], // Obtener solo la parte de la fecha
    }));
    const cursoData = {
      tipoIdentificacion: data.tipoIdentificacion,
      numeroIdentificacion: data.numeroIdentificacion,
      nombre: data.nombre,
      apellido: data.apellido,
      id_extension: Number(data.idExtension),
      titulos: titulosJson,
    };
    console.log(cursoData);
    try {
      await registrarCursoExtensionConTitulos(cursoData);
      toast.success(
        "El Egresado curso en extension ah sido registrado con exito"
      );
      onSuccess();
      reset();
    } catch (err) {
      // Hacer cast explícito a Error
      const error = err as Error; // Cast a tipo Error
      toast.error(
        `Error: ${error.message || "Error desconocido al registrar el egresado."}`
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Tipo de Identificación
        </label>

        <select
          {...register("tipoIdentificacion")}
          className="w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring"
        >
          <option disabled selected>
            Seleccione una identificación
          </option>
          {identificationOptionsFormulario.map((option, index) => (
            <option key={index} value={option.id}>
              {option.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Número de Identificación
        </label>
        <input
          type="text"
          {...register("numeroIdentificacion", { required: true })}
          placeholder="Número de Identificación"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          {...register("nombre", { required: true })}
          placeholder="Nombre"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Apellido
        </label>
        <input
          type="text"
          {...register("apellido", { required: true })}
          placeholder="Apellido"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <h3 className="text-xl font-semibold mb-2">Títulos</h3>
      {fields.map((item, index) => (
        <div key={item.id} className="mb-4 p-4 border rounded-md bg-gray-50">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <select
              {...register(`titulos.${index}.titulo_curso_id`, {
                required: true,
              })}
              className="w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring"
            >
              <option value="">Seleccionar Título</option>
              {titulos &&
                titulos.map((titulo: any) => (
                  <option key={titulo.id} value={titulo.id}>
                    {titulo.nombre_certificado}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Grado
            </label>
            <input
              type="date"
              {...register(`titulos.${index}.fecha_entrega`)}
              placeholder="Fecha de Grado"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Seleccionar Extension
            </label>

            <select
              {...register(`titulos.${index}.id_extension`)}
              className="w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
      "
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

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Periodo De Formacion
            </label>
            <input
              type="text"
              {...register(`titulos.${index}.periodo_formacion`)}
              placeholder="Número de Certificado"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          {fields.length > 1 && ( // Verifica si hay más de un título para mostrar el botón "Eliminar"
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
            >
              Eliminar Título
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            titulo_curso_id: 0,
            fecha_entrega: new Date(), // Inicializa con la fecha actual
            periodo_formacion: "",
            id_extension: 0,
          })
        }
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      >
        Agregar Título
      </button>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
      >
        Registrar
      </button>
    </form>
  );
};

export default FormularioRegistroCurso;
