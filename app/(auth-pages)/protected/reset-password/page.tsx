import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <div className="flex-1 flex flex-col min-w-80 py-52 ">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-8">
        <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
          <h1 className="text-2xl font-medium">Restablecer Contraseña</h1>
          <p className="text-sm text-foreground/60">
            Por favor ingrese su contraseña nueva
          </p>
          <Label htmlFor="password">Nueva Contraseña</Label>
          <Input
            type="password"
            name="password"
            placeholder="Nueva Contraseña"
            required
          />
          <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar Contraseña"
            required
          />
          <SubmitButton formAction={resetPasswordAction}>
            Restablecer
          </SubmitButton>
          <FormMessage message={searchParams} />
        </form>
      </div>
    </div>
  );
}
