import Cards from "@/components/ui/Cards";
import React from "react";
import EgresadoPorAnio from "./EgresadosPorAño/EgresadoPorAnio";
import EgresadosPorCiudad from "./EgresadosPorCiudad/EgresadosPorCiudad";
import Promociones from "./Promociones/Promociones";
const Metricas = () => {
  return (
    <div className="bg-white border rounded-sm p-5 flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <EgresadosPorCiudad />
        <EgresadoPorAnio />
        <Promociones />
      </div>
    </div>
  );
};

export default Metricas;
