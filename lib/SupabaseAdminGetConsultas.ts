import {
  ConsultaBusquedaId,
  ConsultaTipoFecha,
} from "@/interfaces/Verificacion";
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

export const obtenerConsultasPorTipoFecha = async (data: ConsultaTipoFecha) => {
  const { data: result, error } = await supabase.rpc(
    "obtenerconsultasportipoyfecha",
    {
      p_tipo_solicitante: data.tipo,
      p_fecha_inicio: data.fechaInicio,
      p_fecha_fin: data.fechaHasta,
    }
  );
  if (error) throw error;
  return result;
};
