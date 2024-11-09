export interface Verificacion {
  tipoIdentificacionEgresado: string;
  numeroIdentificacionEgresado: string;
  formacionAcademicaEgresado: number;
}
export interface EgresadoVerificado {
  nombre: string;
  apellido: string;
  titulo: string;
  fecha_grado: string;
  acta_grado: string;
  folio: string;
  libro_registro_grado: string;
}
export interface BuscarEgresado {
  numero_documento: string;
  formacionAcademica: string;
}

export interface DataRegistroNatural {
  nombresSolicitante: string;
  apellidosSolicitante: string;
  tipoIdentificacionSolicitante: string;
  numeroIdentificacionSolicitante: string;
  telefonoSolicitante: string;
  correoElectronicoSolicitante: string;
  paisSolicitante: string;
  regionSolicitante: string;
  ciudadSolicitante: string;
  formacionAcademicaEgresado: number; // 1 para profesional, 2 para técnico, 3 para curso
  numeroIdentificacionEgresado: string;
}
export interface DataRegistroEmpresa {
  nombresSolicitante: string;
  apellidosSolicitante: string;
  telefonoSolicitante: string;
  correoElectronicoSolicitante: string;
  formacionAcademicaEgresado: number; // 1 para profesional, 2 para técnico, 3 para curso
  numeroIdentificacionEgresado: string;
  cargo: string;
  nit: string;
  razon: string;
}

export interface Consulta {
  id: number;
  tipo_solicitante?: string | null;
  nombres_solicitante?: string | null;
  apellidos_solicitante?: string | null;
  telefono_solicitante?: string | null;
  correo_electronico_solicitante?: string | null;
  fecha_consulta?: string; // Timestamp como string
}
export interface ConsultaDetalles {
  id: number;
  tipo_solicitante: string;
  nombres_solicitante: string;
  apellidos_solicitante: string;
  tipo_identificacion_solicitante: string;
  numero_identificacion_solicitante: string;
  telefono_solicitante: string;
  correo_electronico_solicitante: string;
  pais_solicitante: string;
  region_solicitante: string;
  ciudad_solicitante: string;
  nit_empresa: string;
  razon_social_empresa: string;
  cargo_solicitante: string;
  fecha_consulta: string; // O Date dependiendo de cómo manejes las fechas
  nombre: string;
  apellido: string;
  tipo_identificacion: string;
  numero_identificacion: string;
  tipo: string;
}

export interface ConsultaBusquedaId {
  id: number;
}
export interface ConsultaTipoFecha {
  tipo: string;
  fechaInicio: string;
  fechaHasta: string;
}
