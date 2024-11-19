import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";

// Hook para obtener las extensiones desde la base de datos
const useExtensionesId = () => {
  const fetcher = async () => {
    const { data, error } = await supabase
      .from("extension")
      .select("id, nombre");
    if (error) {
      console.error("Error obteniendo las extensiones:", error);
      throw error;
    }
    // Transforma las extensiones en un objeto con el nombre en minúsculas como clave y el id como valor
    const extensionToId = data.reduce(
      (acc: { [key: string]: number }, ext: { id: number; nombre: string }) => {
        acc[ext.nombre.toLowerCase()] = ext.id;
        return acc;
      },
      {}
    );
    return extensionToId;
  };

  const { data, error, isLoading } = useSWR("extensiones", fetcher);

  return { data, error, isLoading };
};

export default useExtensionesId;
