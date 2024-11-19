import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";

// Hook personalizado para obtener los códigos y títulos
const useCodigosSIETTecnicos = () => {
  const fetcher = async () => {
    const { data, error } = await supabase.rpc(
      "mapear_codigos_siet_a_titulos_tecnicos"
    );
    if (error) {
      console.error("Error obteniendo los datos:", error);
      throw error;
    }
    return data;
  };

  const { data, error, isLoading } = useSWR(
    "mapear_codigos_siet_a_titulos_tecnicos",
    fetcher
  );

  return { data, error, isLoading };
};

export default useCodigosSIETTecnicos;
