import {
  BuscarEgresado,
  DataRegistroEmpresa,
  DataRegistroNatural,
  Verificacion,
} from "@/interfaces/Verificacion";
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
      _formacion_academica_egresado: dataBusqueda.formacionAcademica,
    }
  );
  if (error) throw error; // Lanza el error para que se maneje en el
  return data; // Devuelve los datos
};

// Función para registrar la consulta con el egresado
export const registrarConsultaConEgresado = async (
  dataRegistro: DataRegistroNatural
) => {
  try {
    const { data, error } = await supabase.rpc(
      "registrar_consulta_persona_natural",
      {
        p_nombres_solicitante: dataRegistro.nombresSolicitante,
        p_apellidos_solicitante: dataRegistro.apellidosSolicitante,
        p_tipo_identificacion_solicitante:
          dataRegistro.tipoIdentificacionSolicitante,
        p_numero_identificacion_solicitante:
          dataRegistro.numeroIdentificacionSolicitante,
        p_telefono_solicitante: dataRegistro.telefonoSolicitante,
        p_correo_electronico_solicitante:
          dataRegistro.correoElectronicoSolicitante,
        p_pais_solicitante: dataRegistro.paisSolicitante,
        p_region_solicitante: dataRegistro.regionSolicitante,
        p_ciudad_solicitante: dataRegistro.ciudadSolicitante,
        p_formacion_academica_egresado: dataRegistro.formacionAcademicaEgresado,
        p_numero_identificacion_egresado:
          dataRegistro.numeroIdentificacionEgresado,
      }
    );

    // Manejo de errores
    if (error) {
      console.error("Error al registrar la consulta:", error);
      throw new Error(error.message);
    }

    return data; // Retornar los datos de la respuesta
  } catch (err) {
    console.error("Error en la función registrarConsultaConEgresado:", err);
    throw err; // Propagar el error para manejarlo en el componente que llama a esta función
  }
};

// Función para registrar la consulta con el egresado
export const registrarConsultaConEgresadoEmpresas = async (
  dataRegistro: DataRegistroEmpresa
) => {
  try {
    const { data, error } = await supabase.rpc("registrar_consulta_empresa", {
      p_apellidos_solicitante: dataRegistro.apellidosSolicitante,
      p_cargo_solicitante: dataRegistro.cargo,
      p_correo_electronico_solicitante:
        dataRegistro.correoElectronicoSolicitante,
      p_formacion_academica_egresado: dataRegistro.formacionAcademicaEgresado,
      p_nit_empresa: dataRegistro.nit,
      p_nombres_solicitante: dataRegistro.nombresSolicitante,
      p_numero_identificacion_egresado:
        dataRegistro.numeroIdentificacionEgresado,
      p_razon_social_empresa: dataRegistro.razon,
      p_telefono_solicitante: dataRegistro.telefonoSolicitante,
    });

    // Manejo de errores
    if (error) {
      console.error("Error al registrar la consulta:", error);
      throw new Error(error.message);
    }

    return data; // Retornar los datos de la respuesta
  } catch (err) {
    console.error("Error en la función registrarConsultaConEgresado:", err);
    throw err; // Propagar el error para manejarlo en el componente que llama a esta función
  }
};
