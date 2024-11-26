"use client";
import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginFormData, loginSchema } from "@/validations/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [blockTime, setBlockTime] = useState<number>(0); // Tiempo de espera en segundos

  // Reducir el tiempo de bloqueo cada segundo
  useEffect(() => {
    if (blockTime > 0) {
      const timer = setTimeout(() => setBlockTime(blockTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [blockTime]);

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null); // Limpiar mensaje de error previo

    const result = await signInAction(data);

    if (!result.success) {
      setErrorMessage(result.message!);
      toast.error(result.message!);

      // Capturar tiempo de espera si está incluido en el mensaje del backend
      const waitTimeMatch = result.message!.match(/en (\d+) segundos/);
      if (waitTimeMatch) {
        setBlockTime(parseInt(waitTimeMatch[1], 10)); // Extraer tiempo de espera del mensaje
      }
    } else {
      window.location.href = "/dashboard"; // Redirigir si es exitoso
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col min-w-80 py-52 "
    >
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-8">
        <h1 className="text-2xl font-medium">Ingresar</h1>
        <div className="flex flex-col gap-2 mt-8">
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input {...register("email")} placeholder="you@example.com" />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}

          <div className="flex justify-between items-center">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <Input
            {...register("password")}
            type="password"
            placeholder="Tu Contraseña"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Olvido Su Contraseña?
          </Link>

          <SubmitButton
            disabled={isSubmitting || blockTime > 0} // Bloqueo basado en tiempo
            pendingText={`Espera ${blockTime}s...`} // Mensaje dinámico
          >
            {isSubmitting
              ? "Ingresando..."
              : blockTime > 0
                ? `Intenta en ${blockTime}s`
                : "Ingresar"}
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
