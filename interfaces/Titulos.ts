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
