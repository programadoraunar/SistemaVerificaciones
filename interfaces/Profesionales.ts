export interface ProfesionalConTitulo {
  id_profesional: number;
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
}

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
}
export interface ProfecionalBusqueda {
  numero_identificacion: string;
}
