export interface Titulos {
  id_titulo: number;
  acta_grado: string;
  folio: string;
  fecha_grado: Date;
  libro_registro_grado: string;
  numero_diploma: string;
}
export interface TitulosTecnico extends Titulos {
  numero_certificado: string;
}
export interface Titulo {
  titulo_id: number;
  nombre: string;
  codigos: string[];
  categoria: string;
}

//hare otra interfaz para el mddelo de curso en extension  que difiere mucho
// Interfaz para la tabla cursosextensiontitulos
export interface CursoExtensionTitulos {
  titulo_curso_id: number;
  periodo_formacion?: string; // Periodo de formación (opcional)
  fecha_entrega: Date; // Fecha de entrega del título (opcional)
}
