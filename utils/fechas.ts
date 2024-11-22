// formatearFecha.js
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { utcToZonedTime } from "date-fns-tz";

/**
 * Formatea una fecha en formato "MMMM dd 'del' yyyy"
 * @param {string} fecha - Fecha en formato 'YYYY-MM-DD'
 * @returns {string} - Fecha formateada
 */
export const formatearFecha = (fecha: string) => {
  if (!fecha) {
    return "Fecha no disponible"; // O cualquier valor por defecto que desees
  }
  const fechaISO = parseISO(fecha);
  // Devuelve la fecha formateada.
  return format(fechaISO, "MMMM d 'de' yyyy", { locale: es });
};

/**
 * Convierte una fecha en formato ISO 8601 a la hora en la zona horaria de Colombia (COT) en formato de 12 horas.
 * @param fechaIso - La fecha en formato ISO 8601.
 * @returns La fecha formateada en horario colombiano en formato de 12 horas con AM/PM.
 */
export function convertirAHoraColombiana(fechaIso: string): string {
  const fechaUTC = new Date(fechaIso); // Crea un objeto Date en UTC

  // Verificar si la fecha fue creada correctamente
  if (isNaN(fechaUTC.getTime())) {
    throw new Error("Fecha inválida");
  }

  // Restar 5 horas para ajustar a la hora colombiana
  const fechaColombiana = new Date(fechaUTC.getTime() - 5 * 60 * 60 * 1000);

  // Formatear la fecha a string legible (DD/MM/YYYY, hh:mm:ss AM/PM)
  const dia = String(fechaColombiana.getDate()).padStart(2, "0");
  const mes = String(fechaColombiana.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
  const anio = fechaColombiana.getFullYear();

  let horas = fechaColombiana.getHours();
  const minutos = String(fechaColombiana.getMinutes()).padStart(2, "0");
  const segundos = String(fechaColombiana.getSeconds()).padStart(2, "0");

  // Determinar si es AM o PM
  const sufijo = horas >= 12 ? "PM" : "AM";
  horas = horas % 12 || 12; // Convertir a formato de 12 horas y manejar el caso de medianoche

  return `${dia}/${mes}/${anio}, ${horas}:${minutos}:${segundos} ${sufijo}`;
}
