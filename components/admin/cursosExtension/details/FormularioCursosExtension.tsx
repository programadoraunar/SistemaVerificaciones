"use client";
import { supabase } from "@/utils/supabase/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";
import GenerarDocumentoWord from "../VerficacionWord/GenerarDocumentoWord";

interface CursoExtension {
  id: number;
  id_curso_extension: number;
  tipo_identificacion: string;
  numero_identificacion: string;
  nombre_cursoextension: string;
  apellido_cursoextension: string;
  id_titulo: number;
  periodo_formacion: string;
  fecha_entrega: string;
  id_extension: number;
}

interface FormularioCursosExtensionProps {
  cursos: CursoExtension[];
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  nombre: string;
  apellido: string;
  eliminarCurso: (id: number) => void;
}

interface FormValues {
  [key: string]: string | number;
}

// Función para obtener los títulos de los cursos
const fetcher = async (url: string) => {
  const { data, error } = await supabase.from(url).select();
  if (error) throw new Error(error.message);
  return data;
};
const FormularioCursosExtension: React.FC<FormularioCursosExtensionProps> = ({
  cursos,
  tipoIdentificacion,
  numeroIdentificacion,
  nombre,
  apellido,
  eliminarCurso,
}) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  // Obtiene los nombres de los cursos
  const { data: cursosNombres } = useSWR("tituloscursos", fetcher);
  // Crea un objeto de referencia para los nombres de los cursos
  const cursosMap = cursosNombres?.reduce(
    (
      acc: { [key: number]: string },
      curso: { id: number; nombre_certificado: string }
    ) => {
      acc[curso.id] = curso.nombre_certificado;
      return acc;
    },
    {}
  );
  useEffect(() => {
    const resetValues = cursos.reduce((acc, curso, index) => {
      acc[`id_${index}`] = curso.id;
      acc[`id_curso_${index}`] = curso.id_titulo;
      acc[`periodo_formacion_${index}`] = curso.periodo_formacion;
      acc[`fecha_entrega_${index}`] = curso.fecha_entrega;
      acc[`id_extension_${index}`] = curso.id_extension;
      return acc;
    }, {} as FormValues);

    reset(resetValues);
  }, [cursos, reset]);
  const onSubmit = async (data: FormValues, index: number) => {
    try {
      const idEditar = Number(data[`id_${index}`]);
      const idCurso = Number(data[`id_curso_${index}`]);
      const periodoFormacion = data[`periodo_formacion_${index}`];
      const fechaEntrega = data[`fecha_entrega_${index}`];
      const id_extension = data[`id_extension_${index}`];
      console.log(id_extension);
      if (isNaN(idEditar) || isNaN(idCurso)) {
        throw new Error(
          `Los IDs deben ser números válidos para el curso ${index + 1}`
        );
      }

      const { error } = await supabase.rpc("actualizar_titulo_cursoextension", {
        p_id: idEditar,
        p_titulo_curso_id: idCurso,
        p_periodo_formacion: periodoFormacion || null,
        p_fecha_entrega: fechaEntrega || null,
        p_id_extension: id_extension || null,
      });

      if (error) throw new Error(error.message);
      toast.success("Curso actualizado correctamente");
    } catch (error) {
      console.error(`Error al actualizar el curso ${index + 1}:`, error);
    }
  };
  const { data: extensiones, isLoading } = useSWR("extension", fetcher);

  return (
    <form className="py-4">
      {cursos.map((curso, index) => (
        <div key={index} className="mb-6 border-b-2 pb-4">
          {/* Muestra el nombre del curso */}
          <h3 className="font-semibold mb-2">
            {cursosMap?.[curso.id_titulo] || "Curso desconocido"}
          </h3>
          <input type="hidden" {...register(`id_${index}`)} />
          <div className="flex flex-col lg:flex-row w-full lg:gap-8">
            <div className="mb-4 w-full lg:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Período de Formación:
              </label>
              <input
                type="text"
                {...register(`periodo_formacion_${index}`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="mb-4 w-full lg:w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Entrega:
              </label>
              <input
                type="date"
                {...register(`fecha_entrega_${index}`)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>
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

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit((data) => onSubmit(data, index))}
              className="bg-blue-zodiac-950 text-white p-2 rounded"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => eliminarCurso(curso.id_curso_extension)} // Llamada a la función de eliminación
              className="bg-red-600 text-white p-2 rounded"
            >
              Eliminar Curso
            </button>
          </div>
          <GenerarDocumentoWord
            persona={{
              tipoIdentificacion,
              numeroIdentificacion,
              nombre,
              apellido,
              titulo_nombre: cursosMap?.[curso.id_titulo] || "",
              periodo_formacion: curso.periodo_formacion,
              fecha_entrega: curso.fecha_entrega,
            }}
          />
        </div>
      ))}
    </form>
  );
};

export default FormularioCursosExtension;
