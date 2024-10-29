/**
 * Interfaz que representa un profesional con título.
 * @interface ProfesionalConTitulo
 */
export interface ProfesionalConTitulo {
  /**
   * Identificador único del profesional.
   * @type {number}
   */
  id_profesional: number;

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
  nombre_profesional: string;

  /**
   * Apellido del profesional.
   * @type {string}
   */
  apellido_profesional: string;

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

/**
 * Interfaz para importar datos de profesionales desde un archivo Excel.
 * @interface ProfesionalConTituloImport
 */
export interface ProfesionalConTituloImport {
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
  nombre_profesional: string;

  /**
   * Apellido del profesional.
   * @type {string}
   */
  apellido_profesional: string;
  /**
   * snies del título del profesional.
   * @type {string}
   */
  snies: string;

  /**
   * Nombre del título del profesional.
   * @type {string}
   */
  titulo_nombre: string;

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

  /**
   * Nombre de la extensión del título.
   * @type {string}
   */
  nombre_extension: string;
}

/**
 * Interfaz para registrar un nuevo profesional con título.
 * @interface ProfesionalRegistro
 */
export interface ProfesionalRegistro {
  /**
   * Tipo de identificación del profesional.
   * @type {string}
   */
  tipo_identificacion: string;

  /**
   * Número de identificación del profesional.
   * @type {string}
   */
  numero_identificacion: string;

  /**
   * Nombre del profesional.
   * @type {string}
   */
  nombre: string;

  /**
   * Apellido del profesional.
   * @type {string}
   */
  apellido: string;

  /**
   * ID del título del profesional. Puede ser null si no hay título.
   * @type {number|null}
   */
  id_titulo?: number | null;

  /**
   * Descripción del título del profesional.
   * @type {string}
   */
  descripcion_titulo?: string;

  /**
   * Fecha de grado del profesional. Puede ser null si no hay fecha.
   * @type {Date|null}
   */
  fecha_grado?: Date | null;

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
   * Libro de registro de grado del profesional.
   * @type {string}
   */
  libro_registro_grado: string;

  /**
   * ID de la extensión del título.
   * @type {number}
   */
  id_extension: number;
}

/**
 * Interfaz para buscar profesionales por número de identificación.
 * @interface ProfecionalBusquedaDocumento
 */
export interface ProfecionalBusquedaDocumento {
  /**
   * Número de identificación del profesional.
   * @type {string}
   */
  numero_identificacion: string;
}

/**
 * Interfaz para buscar profesionales por nombres y apellidos.
 * @interface ProfecionalBusquedaNombres
 */
export interface ProfecionalBusquedaNombres {
  /**
   * Nombres del profesional. Puede ser null.
   * @type {string|null}
   */
  nombres: string | null;

  /**
   * Apellidos del profesional. Puede ser null.
   * @type {string|null}
   */
  apellidos: string | null;
}

/**
 * Interfaz para buscar profesionales por fechas.
 * @interface ProfecionalBusquedaFechas
 */
export interface ProfecionalBusquedaFechas {
  /**
   * Fecha de inicio para la búsqueda. Puede ser null.
   * @type {string|null}
   */
  fechaInicio: string | null;

  /**
   * Fecha de fin para la búsqueda. Puede ser null.
   * @type {string|null}
   */
  fechaFin: string | null;
}

/**
 * Interfaz para obtener la información de un profesional antes de actualizar.
 * Esta interfaz incluye los campos que se obtienen directamente de la base de datos,
 * incluidos los identificadores y otros datos relevantes.
 * @interface ProfesionalActualizar
 */
export interface ProfesionalActualizar {
  /**
   * Identificador único del profesional.
   * @type {number}
   */
  id_profesional: number;

  /**
   * Tipo de identificación del profesional.
   * @type {string}
   */
  tipo_identificacion: string;

  /**
   * Número de identificación del profesional.
   * @type {string}
   */
  numero_identificacion: string;

  /**
   * Nombre del profesional.
   * @type {string}
   */
  nombre_profesional: string;

  /**
   * Apellido del profesional.
   * @type {string}
   */
  apellido_profesional: string;

  /**
   * Nombre del título del profesional.
   * @type {string}
   */
  titulo_nombre: string;

  /**
   * ID del título del profesional.
   * @type {number}
   */
  id_titulo: number;

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
   * Fecha de grado del profesional.
   * @type {string}
   */
  fecha_grado: string;

  /**
   * Libro de registro de grado del profesional.
   * @type {string}
   */
  libro_registro_grado: string;

  /**
   * Número de diploma del profesional.
   * @type {string}
   */
  numero_diploma: string;

  /**
   * ID de la extensión del título.
   * @type {number}
   */
  id_extension: number;
}

/**
 * Interfaz para la actualización de un profesional.
 * @interface ProfesionalActualizar
 */
export interface ProfesionalActualizarDatos {
  /** Identificador único del profesional. */
  id_profesional: number;

  /** Tipo de identificación del profesional. */
  tipo_identificacion?: string; // Ahora es opcional

  /** Número de identificación del profesional. */
  numero_identificacion?: string; // Ahora es opcional

  /** Nombre del profesional. */
  nombre_profesional?: string; // Ahora es opcional

  /** Apellido del profesional. */
  apellido_profesional?: string; // Ahora es opcional

  /** ID de la extensión del profesional. */
  id_extension?: number; // Ahora es opcional
}
export interface ProfecionalBusquedaActualizacion {
  /**
   * Número de identificación del profesional.
   * @type {string}
   */
  numero_identificacion: string;
}

export interface InformacionProfesional {
  id_profesional: number;
  tipo_identificacion: string;
  numero_identificacion: string;
  nombre_profesional: string;
  apellido_profesional: string;
  nombre_extension: number | null;
}
