import {
  ProfecionalBusquedaDocumento,
  ProfesionalRegistro,
  ProfecionalBusquedaNombres,
  ProfesionalActualizar,
  ProfecionalBusquedaActualizacion,
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
  data: ProfecionalBusquedaDocumento
) => {
  const { data: result, error } = await supabase.rpc(
    "obtener_profesional_por_numero_identificacion",
    {
      p_numero_identificacion: data.numero_identificacion,
    }
  );
  if (error) throw error;
  return result;
};

export const obtnerProfesionalPorNombreApellido = async (
  data: ProfecionalBusquedaNombres
) => {
  const { data: result, error } = await supabase.rpc(
    "obtener_profesional_por_nombre_apellido",
    {
      p_apellido: data.apellidos || null,
      p_nombre: data.nombres || null,
    }
  );
  if (error) throw error;
  return result;
};

export const obtenerDetallesActualizacionProfesional = async (
  data: ProfecionalBusquedaActualizacion
) => {
  const { data: result, error } = await supabase.rpc(
    "obtener_detalles_actualizacion_profesional",
    {
      p_numero_identificacion: data.numero_identificacion,
    }
  );
  if (error) throw error;
  return result;
};
