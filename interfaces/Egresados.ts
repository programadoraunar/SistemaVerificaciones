export interface Egresado {
  id: number;
  tipo_identificacion: string; // Hasta 50 caracteres
  numero_identificacion: string; // Hasta 50 caracteres, único
  nombre: string; // Hasta 100 caracteres
  apellido: string; // Hasta 100 caracteres
  id_extension?: number | null; // Puede ser nulo
}
export interface EgresadoTitulo {
  id: number;
  id_egresado: number; // Foreign key a 'egresados'
  id_titulo: number; // Foreign key a 'titulos'
  acta_grado: string; // Hasta 100 caracteres
  folio: string; // Hasta 100 caracteres
  fecha_grado: string; // Date en formato 'YYYY-MM-DD'
  libro_registro_grado: string; // Hasta 100 caracteres
  numero_diploma: string; // Hasta 100 caracteres
}
export interface EgresadoConTitulos {
  egresado: Egresado;
  titulos: EgresadoTitulo[]; // Un array de títulos
}
export interface EgresadosPorExtension {
  tipo: string;
  ciudad: string;
  cantidad_egresados: number;
}
export interface EgresadosPorAnio {
  anio: number; // El año
  cantidad_egresados: number; // El número de egresados por ese año
}
