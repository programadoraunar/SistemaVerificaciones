import { BuscarEgresado, Verificacion } from "@/interfaces/Verificacion";
import { supabase } from "@/utils/supabase/client";

export const verificarEgresado = async (dataBusqueda: Verificacion) => {
  const { data, error } = await supabase.rpc("verificar_egresado", {
    _tipo_identificacion_egresado: dataBusqueda.tipoIdentificacionEgresado, // Tipo de identificación del egresado
    _numero_identificacion_egresado: dataBusqueda.numeroIdentificacionEgresado, // Número de identificación
    _formacion_academica_egresado: dataBusqueda.formacionAcademicaEgresado, // 1 para profesionales, 2 para técnicos, 3 para cursos de extensión
  });
  if (error) throw error; // Lanza el error para que se maneje en el componente
  return data; // Devuelve los datos
};

export const obtenerInformacionEgresado = async (
  dataBusqueda: BuscarEgresado
) => {
  const { data, error } = await supabase.rpc(
    "obtener_informacion_egresados_verificacion",
    {
      p_numero_identificacion: dataBusqueda.numero_documento,
    }
  );
  if (error) throw error; // Lanza el error para que se maneje en el
  return data; // Devuelve los datos
};
