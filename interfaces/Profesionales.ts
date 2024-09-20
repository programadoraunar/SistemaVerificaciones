export interface ProfesionalConTitulo {
  id_profesional: number;
  tipo_identificacion: string;
  numero: string;
  nombre_profesional: string;
  apellido_profesional: string;
  id_titulo: number | null; // Puede ser null si no hay título
  programa_nombre: string;
  titulo_nombre: string; // Asegúrate de que este campo esté presente en la respuesta
  fecha_grado: Date | null; // Puede ser null si no hay fecha
  acta_grado: string;
  folio: string;
  libro_registro_grado: string;
}

export interface ProfesionalRegistro {
  tipo_identificacion: string;
  numero: string;
  nombre: string;
  apellido: string;
  id_titulo?: number | null; // Puede ser null si no hay título
  id_programa?: number | null; // Puede ser null si no hay programa
  nombre_titulo?: string; // Asegúrate de que este campo esté presente en la respuesta
  descripcion_titulo?: string; // Asegúrate de que este campo esté presente en la respuesta
  fecha_grado?: Date | null; // Puede ser null si no hay fecha
  acta_grado: string;
  folio: string;
  libro_registro_grado: string;
}
