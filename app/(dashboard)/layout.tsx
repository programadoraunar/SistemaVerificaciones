import SlideBar from "@/components/slidebar/SlideBar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6">
      {/* Barra lateral fija */}
      <SlideBar />
      {/* Contenido dinámico que cambiará según la página */}
      <div className="xl:col-span-5">
        <div className="h-[90vh] overflow-y-scroll p-8">{children}</div>
      </div>
    </div>
  );
}
