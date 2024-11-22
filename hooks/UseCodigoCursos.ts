import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";

// Hook personalizado para obtener los códigos y títulos
const useCodigoCursos = () => {
  const fetcher = async () => {
    const { data, error } = await supabase.rpc(
      "mapear_id_a_certificados_cursos"
    );
    if (error) {
      console.error("Error obteniendo los datos:", error);
      throw error;
    }
    return data;
  };

  const { data, error, isLoading } = useSWR(
    "mapear_id_a_certificados_cursos",
    fetcher
  );

  return { data, error, isLoading };
};

export default useCodigoCursos;
