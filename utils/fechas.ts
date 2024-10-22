// formatearFecha.js
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Formatea una fecha en formato "MMMM dd 'del' yyyy"
 * @param {string} fecha - Fecha en formato 'YYYY-MM-DD'
 * @returns {string} - Fecha formateada
 */
export const formatearFecha = (fecha: any) => {
  const fechaISO = parseISO(fecha);
  return format(fechaISO, "MMMM dd 'del' yyyy", { locale: es });
};

/**
 * Convierte una fecha en formato ISO 8601 a la hora en la zona horaria de Colombia (COT).
 * @param fechaIso - La fecha en formato ISO 8601.
 * @returns La fecha formateada en horario colombiano.
 */
export function convertirAHoraColombiana(fechaIso: string): string {
  const fechaUTC = new Date(fechaIso); // Crea un objeto Date en UTC

  // Verificar si la fecha fue creada correctamente
  if (isNaN(fechaUTC.getTime())) {
    throw new Error("Fecha inválida");
  }

  // Restar 5 horas para ajustar a la hora colombiana
  const fechaColombiana = new Date(fechaUTC.getTime() - 5 * 60 * 60 * 1000);

  // Formatear la fecha a string legible (DD/MM/YYYY, HH:mm:ss)
  const dia = String(fechaColombiana.getDate()).padStart(2, "0");
  const mes = String(fechaColombiana.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
  const anio = fechaColombiana.getFullYear();
  const horas = String(fechaColombiana.getHours()).padStart(2, "0");
  const minutos = String(fechaColombiana.getMinutes()).padStart(2, "0");
  const segundos = String(fechaColombiana.getSeconds()).padStart(2, "0");

  return `${dia}/${mes}/${anio}, ${horas}:${minutos}:${segundos}`;
}
