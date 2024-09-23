"use client";
import React, { useEffect, useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { Actividad } from "@/interfaces/Actividad";
function HActividades() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  useEffect(() => {
    const actividadesPrueba: Actividad[] = [
      {
        id: "1",
        descripcion: "El admin creó un nuevo curso",
        fecha_actividad: new Date().toISOString(),
      },
      {
        id: "2",
        descripcion: "El admin modificó los permisos de un usuario",
        fecha_actividad: new Date().toISOString(),
      },
      {
        id: "3",
        descripcion: "El admin eliminó un registro",
        fecha_actividad: new Date().toISOString(),
      },
      {
        id: "4",
        descripcion: "El admin asignó una nueva dependencia",
        fecha_actividad: new Date().toISOString(),
      },
      {
        id: "5",
        descripcion: "El admin creó un nuevo informe",
        fecha_actividad: new Date().toISOString(),
      },
      {
        id: "6",
        descripcion: "El admin revisó una solicitud pendiente",
        fecha_actividad: new Date().toISOString(),
      },
      {
        id: "7",
        descripcion: "El admin eliminó una observación",
        fecha_actividad: new Date().toISOString(),
      },
      {
        id: "8",
        descripcion: "El admin actualizó la información de un usuario",
        fecha_actividad: new Date().toISOString(),
      },
      {
        id: "9",
        descripcion: "El admin cerró una solicitud de PQRSF",
        fecha_actividad: new Date().toISOString(),
      },
      {
        id: "10",
        descripcion: "El admin generó un nuevo reporte",
        fecha_actividad: new Date().toISOString(),
      },
    ];

    setActividades(actividadesPrueba); // Simulamos la carga de actividades
  }, []);
  return (
    <div className="my-4 p-6 bg-white rounded-lg shadow-lg">
      <span className="font-bold text-lg mb-4">Historial de Acciones</span>
      <br />
      <span>
        En este historial se muestran las últimas acciones realizadas por el
        administrador en el sistema.
      </span>
      <div className="flex flex-col space-y-4">
        {actividades.length > 0 ? (
          actividades.map((actividad) => (
            <div
              key={actividad.id}
              className="flex items-center gap-4 p-3 border-b"
            >
              <FaBriefcase size={20} className="text-blue-500" />
              <div>
                <span className="block text-gray-700 font-bold">
                  {actividad.descripcion}
                </span>
                <span className="block text-sm text-gray-500">
                  {actividad.fecha_actividad}
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
