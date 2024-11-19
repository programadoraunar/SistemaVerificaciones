import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";

// Hook personalizado para obtener los códigos y títulos
const useCodigosSNIESProfesionales = () => {
  const fetcher = async () => {
    const { data, error } = await supabase.rpc(
      "mapear_codigos_snies_a_titulos_profesionales"
    );
    if (error) {
      console.error("Error obteniendo los datos:", error);
      throw error;
    }
    return data;
  };

  const { data, error, isLoading } = useSWR(
    "mapear_codigos_snies_a_titulos_profesionales",
    fetcher
  );

  return { data, error, isLoading };
};

export default useCodigosSNIESProfesionales;
