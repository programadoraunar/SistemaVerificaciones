import Footer from "@/components/Home/Footer";
import NavBar from "@/components/Home/NavBar";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

interface DatosGraduado {
  nombre: string;
  apellido: string;
  folio: string;
  titulo: string;
  fechaGrado: string;
  actaGrado: string;
  libro: string;
}

function Verificacion() {
  return (
    <div>
      <NavBar />
      <Footer />
    </div>
  );
}

export default Verificacion;
