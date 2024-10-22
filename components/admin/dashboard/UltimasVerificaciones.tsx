"use client";
import React, { useEffect, useState } from "react";
import { Verificacion } from "@/interfaces/Dashboard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { convertirAHoraColombiana } from "@/utils/fechas";
import Link from "next/link";
// Función que obtiene los datos de verificaciones desde Supabase
const fetcher = async () => {
  const { data, error } = await supabase
    .from("consultas") // Nombre de tu tabla 'consultas'
    .select(
      "id, tipo_solicitante, nombres_solicitante, apellidos_solicitante, fecha_consulta"
    )
    .order("fecha_consulta", { ascending: false })
    .limit(10);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return (
    data?.map((verificacion) => ({
      id: verificacion.id,
      tipoSolicitante: verificacion.tipo_solicitante,
      nombresSolicitante: verificacion.nombres_solicitante,
      apellidosSolicitante: verificacion.apellidos_solicitante,
      fechaConsulta: verificacion.fecha_consulta,
    })) ?? []
  );
};
function UltimasVerificaciones() {
  // Utilizando SWR para obtener los datos de Supabase
  const {
    data: verificaciones,
    error,
    isValidating,
  } = useSWR("ultimas-verificaciones", fetcher);

  // Mostrar mensaje de error si ocurre algún problema
  if (error)
    return <p>Error al cargar las últimas verificaciones: {error.message}</p>;

  // Mostrar mensaje mientras los datos se están cargando
  if (!verificaciones) return <p>Cargando las últimas verificaciones...</p>;

  return (
    <div className="bg-white p-5 rounded-lg">
      <div className="flex justify-between items-center py-3">
        <h2 className="text-lg font-bold mb-4">
          Resumen de Consulta de Verificación de Título
        </h2>
        <Link className="p-2 bg-blue-950 text-white" href="/Consultas">
          Todas +
        </Link>
      </div>
      {isValidating && <LoadingSpinner />}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse min-w-[640px]">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Tipo Solicitante</th>
              <th className="border border-gray-300 p-2">
                Nombres Solicitante
              </th>
              <th className="border border-gray-300 p-2">Fecha Consulta</th>
              <th className="border border-gray-300 p-2">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {verificaciones.map((verificacion) => (
              <tr key={verificacion.id}>
                <td className="border border-gray-300 p-2">
                  {verificacion.tipoSolicitante}
                </td>
                <td className="border border-gray-300 p-2">
                  {verificacion.nombresSolicitante}{" "}
                  {verificacion.apellidosSolicitante}
                </td>
                <td className="border border-gray-300 p-2">
                  {convertirAHoraColombiana(verificacion.fechaConsulta)}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <Button
                    onClick={() =>
                      alert(
                        `Ver detalles de la verificación ID: ${verificacion.id}`
                      )
                    }
                  >
                    Ver Detalles
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UltimasVerificaciones;
