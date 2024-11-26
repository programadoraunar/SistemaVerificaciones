"use client";
import React, { useEffect, useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { Actividad } from "@/interfaces/Actividad";
import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";
import { convertirAHoraColombiana } from "@/utils/fechas";
const fetcher = async (url: string) => {
  const { data, error } = await supabase.from(url).select("*");
  if (error) throw error;
  return data;
};
function HActividades() {
  const { data: actividades, error } = useSWR(
    "actividadesadministrador",
    fetcher
  );
  if (error) return <div>Error al cargar las actividades.</div>;
  if (!actividades) return <div>Cargando...</div>;
  return (
    <div className="my-4 p-6 bg-white rounded-lg shadow-lg">
      {" "}
      <span className="font-bold text-lg mb-4">Historial de Acciones</span>{" "}
      <br />{" "}
      <span>
        {" "}
        En este historial se muestran las últimas acciones realizadas por el
        administrador en el sistema.{" "}
      </span>{" "}
      <div className="flex flex-col space-y-4">
        {" "}
        {actividades.length > 0 ? (
          actividades.map((actividad: Actividad) => (
            <div
              key={actividad.id}
              className="flex items-center gap-4 p-3 border-b"
            >
              <FaBriefcase size={20} className="text-blue-500" />{" "}
              <div>
                <span className="block text-gray-700 font-bold">
                  {actividad.descripcion}{" "}
                </span>{" "}
                <span className="block text-sm text-gray-500">
                  {convertirAHoraColombiana(actividad.fecha_actividad)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <span className="text-gray-500">No hay actividades recientes</span>
        )}
      </div>
    </div>
  );
}

export default HActividades;
