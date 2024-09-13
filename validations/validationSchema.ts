// validationSchema.ts
import { z } from "zod";

export const formularioEgresado = z.object({
  tipoIdentificacion: z.string().min(1, "Seleccione una identificación"), // Reemplaza nonempty() con min(1)
  numeroDocumento: z
    .string()
    .regex(/^\d+$/, "Número de documento debe contener solo números") // Solo números
    .min(1, "Número de documento es requerido"), // Reemplaza nonempty() con min(1)
  formacionAcademica: z.string().min(1, "Seleccione una formacion academica"),
});
export type FormularioEgresadoType = z.infer<typeof formularioEgresado>;

export const formularioPersonaSchema = z.object({
  tipoIdentificacion: z.string().min(1, "Seleccione una identificación"), // Reemplaza nonempty() con min(1)
  numeroDocumento: z
    .string()
    .regex(/^\d+$/, "Número de documento debe contener solo números") // Solo números
    .min(1, "Número de documento es requerido"), // Reemplaza nonempty() con min(1)
  nombres: z.string().min(1, "Nombres del solicitante son requeridos"), // Reemplaza nonempty() con min(1)
  apellidos: z.string().min(1, "Apellidos del solicitante son requeridos"), // Reemplaza nonempty() con min(1)
  telefono: z.string().min(1, "Teléfono es requerido"), // Reemplaza nonempty() con min(1)
  correoElectronico: z
    .string()
    .email("Correo electrónico inválido")
    .min(1, "Correo electrónico es requerido"), // Reemplaza nonempty() con min(1)
});
export type FormularioPersonaType = z.infer<typeof formularioPersonaSchema>;

export const formularioEmpresaSchema = z.object({
  nit: z
    .string()
    .regex(/^\d+$/, "NIT debe contener solo números") // Solo números
    .min(1, "NIT es requerido"), // Reemplaza nonempty() con min(1)
  razonSocial: z.string().min(1, "Razón Social es requerida"), // Reemplaza nonempty() con min(1)
  cargoSolicitante: z.string().min(1, "Cargo del solicitante es requerido"), // Reemplaza nonempty() con min(1)
  nombresSolicitante: z
    .string()
    .min(1, "Nombres del solicitante son requeridos"), // Reemplaza nonempty() con min(1)
  apellidosSolicitante: z
    .string()
    .min(1, "Apellidos del solicitante son requeridos"), // Reemplaza nonempty() con min(1)
  telefono: z
    .string()
    .regex(/^\d+$/, "Telefono debe contener solo números") // Solo números
    .max(15, "Teléfono debe tener un máximo de 15 caracteres") // Hasta 15 caracteres
    .min(1, "Teléfono es requerido"), // Reemplaza nonempty() con min(1)
  correoElectronico: z
    .string()
    .email("Correo electrónico inválido")
    .min(1, "Correo electrónico es requerido"),
});

export type FormularioEmpresaType = z.infer<typeof formularioEmpresaSchema>;
