// Definición de la interfaz para los egresados
export interface Registros {
  id: number;
  tipo: "Profesional" | "Técnico Laboral" | "Curso de Extensión";
  nombre: string;
  apellido: string;
  numero_identificacion: string;
}
