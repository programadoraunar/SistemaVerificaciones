export interface Verificacion {
  id: number; // Identificador único para la verificación
  tipoSolicitante: string; // Tipo de solicitante (ej. "Persona natural", "Empresa")
  nombresSolicitante: string; // Nombres del solicitante
  apellidosSolicitante: string; // Apellidos del solicitante (puede estar vacío)
  fechaConsulta: string; // Fecha de la consulta en formato "YYYY-MM-DD"
}
