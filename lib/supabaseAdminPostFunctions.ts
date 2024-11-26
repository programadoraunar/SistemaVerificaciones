// src/lib/supabaseFunctions.ts
import { ActividadRegistro } from "@/interfaces/Actividad";
import { CursosExtensionRegistro } from "@/interfaces/CursosExtension";
import { ProfesionalRegistro } from "@/interfaces/Profesionales";
import { supabase } from "@/utils/supabase/client"; // Asegúrate de importar tu cliente Supabase
import { da } from "date-fns/locale";

export const registrarProfesionalConTitulo = async (
  data: ProfesionalRegistro
) => {
  const { data: result, error } = await supabase.rpc(
    "registrar_profesional_con_titulos",
    {
      p_tipo_identificacion: data.tipo_identificacion,
      p_numero_identificacion: data.numero_identificacion,
      p_nombre: data.nombre,
      p_apellido: data.apellido,
      p_id_extension: data.id_extension,
      p_titulos: data.titulos,
    }
  );
  console.log(error);

  if (error) throw error;

  return result; // Devuelve el resultado si no hay error
};

export const registrarTecnicoConTitulos = async (data: ProfesionalRegistro) => {
  const { data: result, error } = await supabase.rpc(
    "registrar_tecnico_con_titulos",
    {
      p_tipo_identificacion: data.tipo_identificacion,
      p_numero_identificacion: data.numero_identificacion,
      p_nombre: data.nombre,
      p_apellido: data.apellido,
      p_id_extension: data.id_extension,
      p_titulos: data.titulos,
    }
  );
  console.log(error);

  if (error) throw error;

  return result; // Devuelve el resultado si no hay error
};

export const registrarCursoExtensionConTitulos = async (
  data: CursosExtensionRegistro
) => {
  const { data: result, error } = await supabase.rpc(
    "registrar_curso_extension_con_titulos",
    {
      p_tipo_identificacion: data.tipoIdentificacion,
      p_numero_identificacion: data.numeroIdentificacion,
      p_nombre: data.nombre,
      p_apellido: data.apellido,
      p_id_extension: data.id_extension,
      p_titulos: data.titulos,
    }
  );

  if (error) throw error;

  return result; // Devuelve el resultado si no hay error
};

export const registrarActividadAdmin = async (data: ActividadRegistro) => {
  const { data: result, error } = await supabase.rpc("registrar_actividad", {
    p_descripcion: data.description,
  });

  if (error) throw error;
  console.log(error);

  return result; // Devuelve el resultado si no hay error
};
