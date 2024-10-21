// LoginForm.js
import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  return (
    <form className="flex-1 flex flex-col min-w-64 py-52">
      <h1 className="text-2xl font-medium">Ingresar</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Correo Electrónico</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Contraseña</Label>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Tu Contraseña"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Ingresar
        </SubmitButton>
      </div>
    </form>
  );
}
