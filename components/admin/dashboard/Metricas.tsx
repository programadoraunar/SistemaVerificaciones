"use client";
import React, { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
} from "react-icons/fa";
import Cards from "@/components/ui/Cards";
import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Define la interfaz para el tipo de datos que esperamos recibir
interface TotalEgresados {
  total_profesionales: number;
  total_tecnicos_laborales: number;
  total_cursos_extension: number;
  total_egresados: number;
}
// Función de obtención de datos
const fetcher = async () => {
  const { data: result, error } = await supabase.rpc("obtener_total_egresados");
  if (error) throw new Error(error.message);
  if (!result || result.length === 0)
    throw new Error("No se encontraron datos");
  return result[0]; // Asumiendo que la función devuelve un array con un único objeto
};
const Metricas: React.FC = () => {
  const { data, error, isValidating } = useSWR<TotalEgresados, Error>(
    "totalEgresados",
    fetcher
  );

  // Muestra un estado de carga o error si es necesario
  if (isValidating) return <LoadingSpinner />;
  if (error) return <div>Error al cargar los datos: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Cards
        title="Total de Egresados"
        value={data?.total_egresados ?? 0}
        text="Número total de egresados registrados"
        icon={<FaGraduationCap size={50} />}
      />
      <Cards
        title="Total de Profesionales"
        value={data?.total_profesionales ?? 0}
        text="Total egresados con título profesional"
        icon={<FaBriefcase size={50} />}
      />
      <Cards
        title="Total de Técnicos Laborales"
        value={data?.total_tecnicos_laborales ?? 0}
        text="Total egresados con título laboral"
        icon={<FaTools size={50} />}
      />
      <Cards
        title="Total de Cursos de Extensión"
        value={data?.total_cursos_extension ?? 0}
        text="Total egresados con título de curso"
        icon={<FaBookOpen size={50} />}
      />
    </div>
  );
};

export default Metricas;
