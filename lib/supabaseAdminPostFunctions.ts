// src/lib/supabaseFunctions.ts
import { ProfesionalRegistro } from "@/interfaces/Profesionales";
import { supabase } from "@/utils/supabase/client"; // Asegúrate de importar tu cliente Supabase
import { da } from "date-fns/locale";

export const registrarProfesionalConTitulo = async (
  data: ProfesionalRegistro
) => {
  console.log("Formato de titulos:", JSON.stringify(data.titulos));

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
  console.log("Formato de titulos:", JSON.stringify(data.titulos));

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
