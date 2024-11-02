import React from "react";
import MetricasPromociones from "./MetricasPromociones";

const Promociones = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Promociones</h2>
      <span>
        En este apartado se enumeran las promociones que han tenido los
        diferentes programas académicos hasta la actualidad
      </span>
      <MetricasPromociones />
    </div>
  );
};

export default Promociones;
