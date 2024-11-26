"use server";
import { headers } from "next/headers";
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

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/dashboard", "Password updated");
};
