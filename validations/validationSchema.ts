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
  pais: z.string().min(1, "Seleccione un país"), // Validación de país
  subcountry: z.string().min(1, "Seleccione una región"), // Validación de región
  ciudad: z.string().min(1, "Seleccione una ciudad"), // Validación de ciudad
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
    .min(1, "Correo electrónico es requerido")
    .refine(
      (email) => {
        const partes = email.split("@");
        if (partes.length !== 2) {
          return false;
        }

        const domain = partes[1];
        const domainPartes = domain.split(".");

        // Verifica que el dominio contenga al menos dos partes (dominio y TLD)
        if (domainPartes.length < 2) {
          return false;
        }

        const dominiosNoPermitidos = [
          "gmail.com",
          "yahoo.com",
          "yahoo.es",
          "hotmail.com",
          "hotmail.es",
          "outlook.com",
          "outlook.es",
          "live.com",
          "aol.com",
          "icloud.com",
          "protonmail.com",
          "zoho.com",
          "mail.com",
          "gmx.com",
          "yandex.com",
          "yandex.ru",
          "tutanota.com",
          "rocketmail.com",
          "inbox.com",
          "msn.com",
          "me.com",
          "fastmail.com",
        ];

        return !dominiosNoPermitidos.includes(domain);
      },
      {
        message: "Solo se permiten correos electrónicos empresariales",
      }
    ),
});

export type FormularioEmpresaType = z.infer<typeof formularioEmpresaSchema>;

export const formularioEgresadoSchema = z.object({
  tipoIdentificacionEgresado: z.string().nonempty("Este campo es obligatorio"),
  numeroIdentificacionEgresado: z
    .string()
    .nonempty("Este campo es obligatorio"),
  formacionAcademicaEgresado: z.string().nonempty("Este campo es obligatorio"),
});

export type FormularioEgresado = z.infer<typeof formularioEgresadoSchema>;

export const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
