export interface Tecnico {
  id_tecnico_laboral: number;
  tipo_identificacion: string;
  numero_identificacion: string;
  nombre_tecnico: string;
  apellido_tecnico: string;
  nombre_extension: number | null;
}
export interface TecnicoLaboralActualizar {
  id_tecnico: number;
  tipo_identificacion: string;
  numero_identificacion: string;
  nombre_tecnico: string;
  apellido_tecnico: string;
  id: number;
  id_titulo: number;
  acta_grado: string;
  folio: string;
  fecha_grado: Date;
  libro_registro_grado: string;
  numero_diploma?: string | null;
  siet?: string | null;
  numero_certificado?: string | null;
  id_extension: number;
}

export interface TecnicoConTituloImport {
  tipo_identificacion: string;
  numero_identificacion: string; // Mantener como string
  nombre_tecnico: string;
  apellido_tecnico: string;
  siet: Number; // Convertido a number
  titulo_nombre: string;
  nombre_extension: string;
  acta_grado: string;
  numero_certificado: string | null;
  folio: string;
  fecha_grado: string | null;
  libro_registro_grado: string;
}

//interfaz la funcion para devolver los datos procesados
export interface DatosProcesados {
  tipo_identificacion: string;
  numero_identificacion: string; // Cambiado a string
  nombre_tecnico: string;
  apellido_tecnico: string;
  siet: Number;
  titulo_nombre: string | number | null;
  nombre_extension: string | number | null;
  acta_grado: string;
  numero_certificado: string | null;
  folio: string;
  fecha_grado: string | null;
  libro_registro_grado: string;
}
