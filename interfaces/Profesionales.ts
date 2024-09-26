export interface ProfesionalConTitulo {
  id_profesional: number;
  tipo_identificacion: string;
  numero_identificacion: string; // Asegurarse de usar "numero_identificacion"
  nombre_profesional: string;
  apellido_profesional: string;
  titulo_nombre: string;
  nombre_extension: string;
  numero_diploma: string;
  acta_grado: string;
  folio: string;
  fecha_grado: Date | null; // Puede ser null si no hay fecha
  libro_registro_grado: string;
}
// interfaz para importar excel con los datos de los profesionales
export interface ProfesionalConTituloImport {
  tipo_identificacion: string;
  numero_identificacion: string; // Asegurarse de usar "numero_identificacion"
  nombre_profesional: string;
  apellido_profesional: string;
  titulo_nombre: string;
  numero_diploma: string;
  acta_grado: string;
  folio: string;
  fecha_grado: Date | null; // Puede ser null si no hay fecha
  libro_registro_grado: string;
  nombre_extension: string;
}
//interfaz para registrar un nuevo profesional con titulo
export interface ProfesionalRegistro {
  tipo_identificacion: string;
  numero_identificacion: string;
  nombre: string;
  apellido: string;
  id_titulo?: number | null; // Puede ser null si no hay título
  descripcion_titulo?: string; // Asegúrate de que este campo esté presente en la respuesta
  fecha_grado?: Date | null; // Puede ser null si no hay fecha
  numero_diploma: string;
  acta_grado: string;
  folio: string;
  libro_registro_grado: string;
  id_extension: number;
}
export interface ProfecionalBusquedaDocumento {
  numero_identificacion: string;
}
export interface ProfecionalBusquedaNombres {
  nombres: string | null;
  apellidos: string | null;
}

export interface ProfecionalBusquedaFechas {
  fechaInicio: string | null;
  fechaFin: string | null;
}

export interface ProfesionalActualizar {
  id_profesional: number;
  tipo_identificacion: string;
  numero_identificacion: string;
  nombre_profesional: string;
  apellido_profesional: string;
  titulo_nombre: string;
  id_titulo: number; // Incluye el ID del título
  acta_grado: string;
  folio: string;
  fecha_grado: string;
  libro_registro_grado: string;
  numero_diploma: string;
  id_extension: number;
}
