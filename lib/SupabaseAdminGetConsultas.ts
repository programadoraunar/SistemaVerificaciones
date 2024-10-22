import { ConsultaBusquedaId } from "@/interfaces/Verificacion";
import { supabase } from "@/utils/supabase/client";

export const obtenerDetallesConsultaId = async (data: ConsultaBusquedaId) => {
  const { data: result, error } = await supabase.rpc(
    "obtener_consulta_por_id",
    {
      id_consulta: data.id,
    }
  );
  if (error) throw error;
  return result;
};
