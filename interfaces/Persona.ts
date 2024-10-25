// persona.ts
export interface PersonaConTitulo {
  tipo_identificacion: string;
  numero_identificacion: string;
  titulo_nombre: string;
  nombre_extension: string;
  numero_diploma: string;
  acta_grado: string;
  folio: string;
  fecha_grado: Date | null;
  libro_registro_grado: string;
  id_titulo: number;
}

export interface ProfesionalConTitulo extends PersonaConTitulo {
  id_profesional: number;
  nombre_profesional: string;
  apellido_profesional: string;
}

export interface TecnicoConTitulo extends PersonaConTitulo {
  id_tecnico: number;
  nombre_tecnico: string;
  apellido_tecnico: string;
}

export type Persona = ProfesionalConTitulo | TecnicoConTitulo;
