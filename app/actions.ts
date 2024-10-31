"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { LoginFormData, loginSchema } from "@/validations/validationSchema";

// Acción de inicio de sesión
export const signInAction = async (data: LoginFormData) => {
  // Validación de los datos con Zod
  const parsedData = loginSchema.safeParse(data);
  if (!parsedData.success) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "Datos de inicio de sesión inválidos"
    );
  }

  const { email, password } = parsedData.data;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/dashboard");
};

// Acción de cierre de sesión
export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
