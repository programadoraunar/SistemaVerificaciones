import React from "react";
import MetricasPromocionesTecnicos from "./MetricasPromocionesTecnicos";

const PromocionesTecnicos = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">
        Promociones Técnicos Laborales
      </h2>
      <span>
        En este apartado se enumeran las promociones que han tenido los
        diferentes programas académicos hasta la actualidad
      </span>
      <MetricasPromocionesTecnicos />
    </div>
  );
};

export default PromocionesTecnicos;
