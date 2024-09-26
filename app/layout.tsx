import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import "./globals.css";
import localFont from "next/font/local";
import HeaderImage from "@/components/HeaderImage";

const myFont = localFont({ src: "./century-gothic.woff2" });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Sistema de Validacion de Certificados Institucionales",
  description: "AUNAR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={myFont.className} suppressHydrationWarning>
      <body className={`bg-background text-foreground`}>
        <main className="min-h-screen flex flex-col items-center">
          <div className="flex-1 w-full flex flex-col items-center">
            <nav className="w-full h-40 relative">
              {" "}
              {/* Ajusta la altura del nav según sea necesario */}
              <HeaderImage /> {/* Componente de imagen de encabezado */}
            </nav>
            <div className="flex flex-col gap-5 justify-center items-center md:flex-row md:justify-between md:px-5 w-full lg:px-24 py-3 bg-blue-zodiac-950 text-xl text-white font-bold">
              Sistema de Verificación
              {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
            </div>
            <div className="w-full">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
