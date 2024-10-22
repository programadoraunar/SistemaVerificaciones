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
}
export interface BuscarEgresado {
  numero_documento: string;
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
