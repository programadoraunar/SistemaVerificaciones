import Footer from "@/components/Home/Footer";
import NavBar from "@/components/Home/NavBar";
import Egresado from "@/components/verificacion/Egresado";
import React, { useEffect, useState } from "react";

function Verificacion() {
  return (
    <div>
      <NavBar />
      <Egresado />
      <Footer />
    </div>
  );
}

export default Verificacion;
