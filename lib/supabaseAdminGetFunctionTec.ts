import {
  ProfecionalBusquedaDocumento,
  ProfecionalBusquedaNombres,
} from "@/interfaces/Profesionales";
import { supabase } from "@/utils/supabase/client";

export const obtenerInformacionTecnicos = async () => {
  const { data, error } = await supabase.rpc(
    "obtener_informacion_tecnicos_laborales"
  );

  if (error) throw error; // Lanza el error para que se maneje en el componente
  return data; // Devuelve los datos
};

export const obtenerTecnicoPorDocumento = async (
  data: ProfecionalBusquedaDocumento
) => {
  const { data: result, error } = await supabase.rpc(
    "obtener_tecnico_por_numero_identificacion",
    {
      p_numero_identificacion: data.numero_identificacion,
    }
  );
  if (error) throw error;
  return result;
};
export const obtnerTecnicoPorNombreApellido = async (
  data: ProfecionalBusquedaNombres
) => {
  const { data: result, error } = await supabase.rpc(
    "obtener_tecnico_por_nombre_apellido",
    {
      p_apellido: data.apellidos || null,
      p_nombre: data.nombres || null,
    }
  );
  if (error) throw error;
  return result;
};
