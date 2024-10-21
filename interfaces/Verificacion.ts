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
