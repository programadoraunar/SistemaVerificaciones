"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LoginFormData, loginSchema } from "@/validations/validationSchema";
const loginAttempts = new Map<
  string,
  { attempts: number; lastAttempt: number }
>();

export const signInAction = async (data: LoginFormData) => {
  const parsedData = loginSchema.safeParse(data);
  if (!parsedData.success) {
    return {
      success: false,
      message: "Datos de inicio de sesión inválidos",
    };
  }

  const { email, password } = parsedData.data;
  const supabase = createClient();

  const currentTime = Date.now();
  const userAttempts = loginAttempts.get(email) || {
    attempts: 0,
    lastAttempt: 0,
  };

  const delay = userAttempts.attempts * 5000; // Incremento de 5 segundos por intento fallido
  if (currentTime - userAttempts.lastAttempt < delay) {
    const waitTime = Math.ceil(
      (delay - (currentTime - userAttempts.lastAttempt)) / 1000
    );
    return {
      success: false,
      message: `Demasiados intentos fallidos. Intenta de nuevo en ${waitTime} segundos.`,
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    loginAttempts.set(email, {
      attempts: userAttempts.attempts + 1,
      lastAttempt: currentTime,
    });
    return { success: false, message: "Credenciales incorrectas" };
  }

  loginAttempts.delete(email);
  return { success: true };
};

// Acción de cierre de sesión
export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
