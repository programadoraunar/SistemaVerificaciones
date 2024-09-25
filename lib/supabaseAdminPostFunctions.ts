// src/lib/supabaseFunctions.ts
import { ProfesionalRegistro } from "@/interfaces/Profesionales";
import { supabase } from "@/utils/supabase/client"; // Asegúrate de importar tu cliente Supabase

export const registrarProfesionalConTitulo = async (
  data: ProfesionalRegistro
) => {
  const { data: result, error } = await supabase.rpc(
    "registrar_profesional_con_titulo",
    {
      p_acta_grado: data.acta_grado,
      p_apellido: data.apellido,
      p_fecha_grado: data.fecha_grado,
      p_folio: data.folio,
      p_id_titulo: data.id_titulo,
      p_libro_registro_grado: data.libro_registro_grado,
      p_nombre: data.nombre,
      p_numero_diploma: data.numero_diploma,
      p_numero_identificacion: data.numero_identificacion,
      p_tipo_identificacion: data.tipo_identificacion,
      p_id_extension: data.id_extension,
    }
  );

  if (error) throw error;

  return result; // Devuelve el resultado si no hay error
};
