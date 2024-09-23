import {
  ProfecionalBusqueda,
  ProfesionalRegistro,
} from "@/interfaces/Profesionales";
import { supabase } from "@/utils/supabase/client";

export const obtenerInformacionProfesionales = async () => {
  const { data, error } = await supabase.rpc(
    "obtener_informacion_profesionales"
  );

  if (error) throw error; // Lanza el error para que se maneje en el componente
  return data; // Devuelve los datos
};

export const obtenerProfesionalPorDocumento = async (
  data: ProfecionalBusqueda
) => {
  const { data: result, error } = await supabase.rpc(
    "obtener_profesional_por_numero_identificacion",
    {
      numero_identificacion: data.numero,
    }
  );
  if (error) throw error;
  return result;
};
