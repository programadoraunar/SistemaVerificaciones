"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const schema = z.object({
  tipoSolicitante: z.enum(["persona", "empresa"]),
  nombre: z.string().min(1, "Nombre es requerido"),
  apellido: z.string().optional(),
  razonSocial: z.string().optional(),
  nif: z.string().optional(),
});

// Tipo de datos del formulario
type FormValues = z.infer<typeof schema>;
function Test() {
  const {
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tipoSolicitante: "persona",
    },
  });

  const tipoSolicitante = watch("tipoSolicitante");

  const onSubmit = (data: FormValues) => {
    const datos = data;
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: "600px", margin: "auto" }}
    >
      <div>
        <label>
          <input
            type="radio"
            value="persona"
            {...register("tipoSolicitante")}
          />
          Persona
        </label>
        <label>
          <input
            type="radio"
            value="empresa"
            {...register("tipoSolicitante")}
          />
          Empresa
        </label>
        {errors.tipoSolicitante && (
          <span>{errors.tipoSolicitante.message}</span>
        )}
      </div>

      {tipoSolicitante === "persona" && (
        <>
          <div>
            <label>
              Nombre
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => <input type="text" {...field} />}
              />
              {errors.nombre && <span>{errors.nombre.message}</span>}
            </label>
          </div>
          <div>
            <label>
              Apellido
              <Controller
                name="apellido"
                control={control}
                render={({ field }) => <input type="text" {...field} />}
              />
              {errors.apellido && <span>{errors.apellido.message}</span>}
            </label>
          </div>
        </>
      )}

      {tipoSolicitante === "empresa" && (
        <>
          <div>
            <label>
              Razón Social
              <Controller
                name="razonSocial"
                control={control}
                render={({ field }) => <input type="text" {...field} />}
              />
              {errors.razonSocial && <span>{errors.razonSocial.message}</span>}
            </label>
          </div>
          <div>
            <label>
              NIF
              <Controller
                name="nif"
                control={control}
                render={({ field }) => <input type="text" {...field} />}
              />
              {errors.nif && <span>{errors.nif.message}</span>}
            </label>
          </div>
        </>
      )}

      <button type="submit">Enviar</button>
    </form>
  );
}

export default Test;
