import { supabase } from "@/utils/supabase/client";
import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
interface FormularioTitulosProps {
  idTitulo?: number;
  actaGrado?: string;
  folio?: string;
  fechaGrado?: string;
  libroRegistroGrado?: string;
  numeroDiploma?: string;
  onSubmit: (data: any) => void; // Asegúrate de definir un tipo adecuado para los datos
}

const FormularioTitulos: React.FC<FormularioTitulosProps> = ({
  idTitulo,
  actaGrado,
  folio,
  fechaGrado,
  libroRegistroGrado,
  numeroDiploma,
  onSubmit,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const fetcher = async (url: string) => {
    const { data, error } = await supabase.from(url).select();
    if (error) throw new Error(error.message);
    return data;
  };
  const { data: titulos } = useSWR("titulos", fetcher);

  // Resetea el formulario cuando se reciben nuevas propiedades
  React.useEffect(() => {
    reset({
      id_titulo: idTitulo,
      acta_grado: actaGrado,
      folio: folio,
      fecha_grado: fechaGrado,
      libro_registro_grado: libroRegistroGrado,
      numero_diploma: numeroDiploma,
    });
  }, [
    idTitulo,
    actaGrado,
    folio,
    fechaGrado,
    libroRegistroGrado,
    numeroDiploma,
    reset,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <h2 className="font-bold mb-2">Títulos</h2>
      <div className="flex flex-col lg:flex-row w-full lg:gap-8">
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Titulo
          </label>
          <select
            {...register("id_titulo")}
            className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring`}
          >
            <option>Seleccionar Título</option>
            {titulos &&
              titulos.map((titulo: any) => (
                <option key={titulo.id} value={titulo.id}>
                  {titulo.nombre}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Acta de Grado:
          </label>
          <input
            type="text"
            {...register("acta_grado", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:gap-8">
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Folio:
          </label>
          <input
            type="text"
            {...register("folio", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Grado:
          </label>
          <input
            type="date"
            {...register("fecha_grado", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:gap-8">
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Libro Registro Grado:
          </label>
          <input
            type="text"
            {...register("libro_registro_grado", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-sm font-medium text-gray-700">
            Número de Diploma:
          </label>
          <input
            type="text"
            {...register("numero_diploma", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-zodiac-950 text-white p-2 rounded"
        >
          Actualizar Títulos
        </button>
      </div>
    </form>
  );
};

export default FormularioTitulos;
