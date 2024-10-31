"use client";
import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginFormData, loginSchema } from "@/validations/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await signInAction(data); // Aquí se ejecuta la acción de inicio de sesión
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col min-w-64 py-52"
    >
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

        <SubmitButton disabled={isSubmitting} pendingText="Ingresando...">
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </SubmitButton>
      </div>
    </form>
  );
}
