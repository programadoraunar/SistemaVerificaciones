import {
  CursoExtensionBusquedaDocumento,
  CursoExtensionBusquedaNombres,
} from "@/interfaces/CursosExtension";
import {
  ProfecionalBusquedaDocumento,
  ProfecionalBusquedaNombres,
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

export const obtenerDetallesActualizacionTecnico = async (
  data: ProfecionalBusquedaActualizacion
) => {
  const { data: result, error } = await supabase.rpc(
    "obtener_detalles_actualizacion_tecnico_laboral",
    {
      p_numero_identificacion: data.numero_identificacion,
    }
  );
  if (error) throw error;
  return result;
};

export const obtenerDetallesActualizacionCursosExtension = async (
  data: ProfecionalBusquedaActualizacion
) => {
  const { data: result, error } = await supabase.rpc(
    "obtener_detalles_actualizacion_curso_extension",
    {
      p_numero_identificacion: data.numero_identificacion,
    }
  );
  if (error) throw error;
  return result;
};
export const fetchTitulos = async (categoria: string) => {
  const { data, error } = await supabase
    .from("titulos") // Tabla "titulos"
    .select() // Seleccionar todas las columnas necesarias
    .eq("categoria", categoria); // Filtrar por la categoría seleccionada

  if (error) throw new Error(error.message);
  return data;
};

export const obtenerInformacionCursosExtension = async () => {
  const { data, error } = await supabase.rpc(
    "obtener_informacion_cursos_extension"
  );

  if (error) {
    console.error("Error en Supabase RPC:", error);
    throw error;
  }
  return data;
};

export const obtenerCursosExtensionPorDocumento = async (
  data: CursoExtensionBusquedaDocumento
) => {
  const { data: result, error } = await supabase.rpc(
    "obtener_cursosexension_por_numero_identificacion",
    {
      p_numero_identificacion: data.numero_identificacion,
    }
  );
  if (error) throw error;
  return result;
};
export const obtnerCursosExtensionPorNombreApellido = async (
  data: CursoExtensionBusquedaNombres
) => {
  const { data: result, error } = await supabase.rpc(
    "obtener_curso_extension_por_nombre_apellido",
    {
      p_apellido: data.apellidos || null,
      p_nombre: data.nombres || null,
    }
  );
  if (error) throw error;
  return result;
};
