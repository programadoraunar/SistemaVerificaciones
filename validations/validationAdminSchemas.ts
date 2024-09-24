import { z } from "zod";

import { identificationOptionsFormulario } from "@/constants/options";

export const formularioRegistroSchema = z.object({
  tipo_identificacion: z.enum(
    identificationOptionsFormulario as [string, ...string[]]
  ),
  numero_identificacion: z
    .string()
    .min(1, "El número de documento es requerido")
    .regex(/^\d+$/, "El número de documento debe contener solo dígitos")
    .refine((val) => val.length >= 5 && val.length <= 20, {
      message: "El número de documento debe tener entre 5 y 20 dígitos",
    }),
  nombre: z.string().min(1, "El nombre es requerido"),
  apellido: z.string().min(1, "El apellido es requerido"),
  numero_diploma: z.string().min(1, "El Numero de diploma es requerido"),
  id_titulo: z.string().min(1, "Debe seleccionar un título"),
  acta_grado: z.string().min(1, "El acta de grado es requerida"),
  folio: z.string().min(1, "El folio es requerido"),
  fecha_grado: z.string().min(1, "La fecha de grado es requerida"),
  libro_registro_grado: z
    .string()
    .min(1, "El libro de registro de grado es requerido"),
});

export type FormularioRegistroSchema = z.infer<typeof formularioRegistroSchema>;
