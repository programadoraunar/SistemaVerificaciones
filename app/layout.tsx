import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import "./globals.css";
import localFont from "next/font/local";
import HeaderImage from "@/components/HeaderImage";
import Escudo from "@/components/Escudo";
import { EgresadoProvider } from "@/context/EgresadoContext";
import { SolicitanteProvider } from "@/context/SolicitanteContext";

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
        <SolicitanteProvider>
          <EgresadoProvider>
            <main className="min-h-screen flex flex-col items-center">
              <div className="flex-1 w-full flex flex-col items-center">
                <div className="w-full">{children}</div>
              </div>
            </main>
          </EgresadoProvider>
        </SolicitanteProvider>
      </body>
    </html>
  );
}
