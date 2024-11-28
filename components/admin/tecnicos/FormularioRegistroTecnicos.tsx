import { identificationOptionsFormulario } from "@/constants/options";
import { TitulosTecnico } from "@/interfaces/Titulos";
import { fetchTitulos } from "@/lib/supabaseAdminGetFunctionsProfe";
import { registrarTecnicoConTitulos } from "@/lib/supabaseAdminPostFunctions";
import { supabase } from "@/utils/supabase/client";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";

interface FormularioRegistroTecnicosProps {
  onSuccess: () => void; // Nueva prop para cerrar el modal
}

const FormularioRegistroTecnicos = ({
  onSuccess,
}: FormularioRegistroTecnicosProps) => {
  const { register, handleSubmit, control, reset } = useForm<{
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    nombre: string;
    apellido: string;
    titulos: TitulosTecnico[];
  }>({
    defaultValues: {
      titulos: [
        {
          id_titulo: 0,
          acta_grado: "",
          folio: "",
          fecha_grado: new Date(), // Inicializa con la fecha actual
          libro_registro_grado: "",
          numero_certificado: "",
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
    ["titulos", "tecnico"],
    ([_, categoria]) => fetchTitulos(categoria)
  );
  const { data: extensiones } = useSWR("extension", fetcher);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "titulos", // Nombre del campo del arreglo
  });
  const onSubmit = async (data: any) => {
    const titulosJson = data.titulos.map((titulo: TitulosTecnico) => ({
      ...titulo,
      // Formatear la fecha al formato yyyy-mm-dd
      fecha_grado: new Date(titulo.fecha_grado).toISOString().split("T")[0], // Obtener solo la parte de la fecha
    }));
    // Preparar el objeto de datos para enviar a la función
    const tecnicoData = {
      tipo_identificacion: data.tipoIdentificacion,
      numero_identificacion: data.numeroIdentificacion,
      nombre: data.nombre,
      apellido: data.apellido,
      titulos: titulosJson,
    };
    try {
      // Llamada a la función de registro de profesional con los datos preparados
      await registrarTecnicoConTitulos(tecnicoData);

      toast.success("Tecnico registrado exitosamente!");
      onSuccess();
      reset();
    } catch (err) {
      // Verifica si el error es una instancia de Error para obtener el mensaje
      if (err instanceof Error) {
        alert(`Error: ${err.message}`);
      } else {
        alert("Error desconocido al registrar el profesional.");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-white rounded-lg"
      >
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
                {...register(`titulos.${index}.id_titulo`, { required: true })}
                className="w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring"
              >
                <option value="">Seleccionar Título</option>
                {titulos &&
                  titulos.map((titulo: any) => (
                    <option key={titulo.id} value={titulo.id}>
                      {titulo.nombre}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Acta de Grado
              </label>
              <input
                type="text"
                {...register(`titulos.${index}.acta_grado`)}
                placeholder="Acta de Grado"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Folio
              </label>
              <input
                type="text"
                {...register(`titulos.${index}.folio`)}
                placeholder="Folio"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Grado
              </label>
              <input
                type="date"
                {...register(`titulos.${index}.fecha_grado`)}
                placeholder="Fecha de Grado"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Libro de Registro de Grado
              </label>
              <input
                type="text"
                {...register(`titulos.${index}.libro_registro_grado`)}
                placeholder="Libro de Registro de Grado"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Número de Certificado
              </label>
              <input
                type="text"
                {...register(`titulos.${index}.numero_certificado`)}
                placeholder="Número de Certificado"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
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
              id_titulo: 0,
              acta_grado: "",
              folio: "",
              fecha_grado: new Date(), // Inicializa con la fecha actual
              libro_registro_grado: "",
              numero_diploma: "",
              numero_certificado: "",
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
          Registrar Profesional
        </button>
      </form>
    </>
  );
};

export default FormularioRegistroTecnicos;
