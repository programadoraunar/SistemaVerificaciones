import { obtenerDetallesActualizacionCursosExtension } from "@/lib/supabaseAdminGetFunctionsProfe";
import useSWR from "swr";
import FormularioDatosPersonales from "./FormularioDatosPersonales";
import { supabase } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { CursoExtensionActualizar } from "@/interfaces/CursosExtension";
import ExpandingButton from "@/components/ui/ExpandingButton";
import FormularioCursosExtension from "./FormularioCursosExtension";

interface FormularioActualizacionProps {
  numeroIdentificacion: string; // Prop para recibir solo el número de identificación
  onSuccess: () => void;
}
// Fetcher para usar con SWR
const fetchCursoExtension = async (numeroIdentificacion: string) => {
  const result = await obtenerDetallesActualizacionCursosExtension({
    numero_identificacion: numeroIdentificacion,
  });
  return result;
};

const FormActualizacionCursosExtension: React.FC<
  FormularioActualizacionProps
> = ({ numeroIdentificacion, onSuccess }) => {
  const { data, error, isLoading, mutate } = useSWR(
    numeroIdentificacion
      ? ["cursoExtensionActualizacion", numeroIdentificacion]
      : null,
    () => fetchCursoExtension(numeroIdentificacion)
  );
  const cursoExtensionData = data ? data[0] : null;
  const titulos = data ? data.filter((item: any) => item.id_titulo) : [];

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos</p>;

  const onSubmit = async (data: CursoExtensionActualizar) => {
    if (data.nombre_cursoextension) {
      try {
        const { error } = await supabase.rpc("actualizar_cursoextensiondatos", {
          p_numero_identificacion: data.numero_identificacion,
          p_tipo_identificacion: data.tipo_identificacion,
          p_nombre: data.nombre_cursoextension,
          p_apellido: data.apellido_cursoextension,
          p_id_extension: data.id_extension,
        });

        if (error) throw error;
        console.log(error);

        toast.success("Datos actualizados correctamente");
        onSuccess();
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
        alert("Hubo un error al actualizar los datos");
      }
    } else {
      // si no hay es para actualizar los títulos del profesional
    }
  };
  //Función que permite elimina un titulo en especifico, se lo hace directamente aquí para tener la posibilidad de revalidar datos
  const eliminarTitulo = async (idEliminar: any) => {};

  return (
    <div className="max-w-2xl mx-auto bg-white p-5 lg:p-4 rounded-lg shadow-lg">
      {cursoExtensionData && (
        <>
          <FormularioDatosPersonales
            tipoIdentificacion={cursoExtensionData.tipo_identificacion}
            numeroIdentificacion={cursoExtensionData.numero_identificacion}
            nombre={cursoExtensionData.nombre_cursoextension}
            apellido={cursoExtensionData.apellido_cursoextension}
            extension={cursoExtensionData.id_extension}
            onSubmit={onSubmit} // Puedes pasar el onSubmit si necesitas manejar el envío desde aquí
          />
          <div className="py-4">
            <ExpandingButton
              buttonText="Titulo(s)"
              expandedContent={
                <FormularioCursosExtension
                  cursos={titulos}
                  tipoIdentificacion={cursoExtensionData.tipo_identificacion}
                  numeroIdentificacion={
                    cursoExtensionData.numero_identificacion
                  }
                  nombre={cursoExtensionData.nombre_cursoextension}
                  apellido={cursoExtensionData.apellido_cursoextension}
                  extension={cursoExtensionData.id_extension}
                  eliminarCurso={eliminarTitulo}
                />
              }
            />
          </div>
        </>
      )}
    </div>
  );
};
export default FormActualizacionCursosExtension;
