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
