import Escudo from "@/components/Escudo";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/Home/Footer";

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
            <nav className="w-full py-20 flex justify-center h-16">
              <div className="w-full  max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex items-center font-semibold py-5">
                  <div className="flex items-center">
                    <Escudo />
                  </div>
                </div>
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
              </div>
            </nav>
            <div className="w-full px-10 py-3 mt-2 bg-blue-zodiac-950 text-xl text-white font-bold">
              Sistema de Verificación
            </div>
            <div className="w-full">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
