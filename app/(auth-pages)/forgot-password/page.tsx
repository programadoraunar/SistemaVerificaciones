import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <>
      <div className="flex-1 flex flex-col min-w-80 py-52 ">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-8">
          <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
            <h1 className="text-2xl font-medium">Restablecer Contraseña</h1>
            <div className="flex flex-col gap-2 [&>input]:mb-3">
              <Label htmlFor="email">Email</Label>
              <Input name="email" placeholder="you@example.com" required />
              <SubmitButton formAction={forgotPasswordAction}>
                Restablecer Contraseña
              </SubmitButton>
              <FormMessage message={searchParams} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
