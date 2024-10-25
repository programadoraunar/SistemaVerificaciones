/**
 * Interfaz que representa un técnico con título.
 * @interface TecnicoConTitulo
 */
export interface TecnicoConTitulo {
  /**
   * Identificador único del profesional.
   * @type {number}
   */
  id_tecnico: number;

  /**
   * Tipo de identificación del profesional.
   * @type {string}
   */
  tipo_identificacion: string;

  /**
   * Número de identificación del profesional.
   * Asegurarse de usar "numero_identificacion".
   * @type {string}
   */
  numero_identificacion: string;

  /**
   * Nombre del profesional.
   * @type {string}
   */
  nombre_tecnico: string;

  /**
   * Apellido del profesional.
   * @type {string}
   */
  apellido_tecnico: string;

  /**
   * Nombre del título del profesional.
   * @type {string}
   */
  titulo_nombre: string;

  /**
   * Nombre de la extensión del título.
   * @type {string}
   */
  nombre_extension: string;

  /**
   * Número de diploma del profesional.
   * @type {string}
   */
  numero_diploma: string;

  /**
   * Acta de grado del profesional.
   * @type {string}
   */
  acta_grado: string;

  /**
   * Folio del registro del profesional.
   * @type {string}
   */
  folio: string;

  /**
   * Fecha de grado del profesional. Puede ser null si no hay fecha.
   * @type {Date|null}
   */
  fecha_grado: Date | null;

  /**
   * Libro de registro de grado del profesional.
   * @type {string}
   */
  libro_registro_grado: string;
  id_titulo: number;
}
