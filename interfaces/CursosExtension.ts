import { CursoExtensionTitulos } from "./Titulos";

/*interfaces que representan los egresados de extension */
export interface Extension {
  id_cursos_extension: number;
  tipo_identificacion: string;
  numero_identificacion: string;
  nombre_cursoextension: string;
  apellido_cursoextension: string;
  nombre_extension: number | null;
}

/**
 * Interfaz que representa una curso de extension con título.
 * @interface ExtensionConTitulo
 */
export interface ExtensionConTituloImport {
  tipo_identificacion: string;
  numero_identificacion: string;
  nombre_cursoextension: string;
  apellido_cursoextension: string;
  nombre_extension: string | null;
  periodo_formacion: string;
  fecha_entrega: Date | null;
  titulo_nombre: string;
  alianza: string;
  tipo: string;
  intensidadHoraria: string;
}

export interface CursosExtensionRegistro {
  /**
   * Tipo de identificación del profesional.
   * @type {string}
   */
  tipoIdentificacion: string;

  /**
   * Número de identificación del profesional.
   * @type {string}
   */
  numeroIdentificacion: string;

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
   * ID de la extensión del título.
   * @type {number}
   */
  id_extension: number;
  titulos: CursoExtensionTitulos[];
}

export interface InformacionCursoExtension {
  id_cursoExtension: number;
  tipo_identificacion: string;
  numero_identificacion: string;
  nombre_cursoextension: string;
  apellido_cursoextension: string;
  nombre_extension: number | null;
}

export interface CursoExtensionBusquedaDocumento {
  /**
   * Número de identificación del profesional.
   * @type {string}
   */
  numero_identificacion: string;
}

export interface CursoExtensionBusquedaNombres {
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

export interface CursoExtensionActualizar {
  /**
   * Identificador único del profesional.
   * @type {number}
   */
  id_cursoExtension: number;

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
  nombre_cursoextension: string;

  /**
   * Apellido del profesional.
   * @type {string}
   */
  apellido_cursoextension: string;

  id_extension: number;
}
export interface DatosProcesadosCursos {
  tipo_identificacion: string;
  numero_identificacion: string; // Cambiado a string
  nombre_cursoextension: string;
  apellido_cursoextension: string;
  titulo_nombre: string | number | null;
  nombre_extension: string | number | null;
  periodo_formacion: string;
  fecha_entrega: Date | null;
  alianza: string;
  tipo: string;
  intensidadHoraria: string;
}
