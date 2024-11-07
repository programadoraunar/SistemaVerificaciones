"use client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { EgresadosPorExtension } from "@/interfaces/Egresados";
import { supabase } from "@/utils/supabase/client";
import React, { useState } from "react";
import useSWR from "swr";

const fetcher = async () => {
  const { data: result, error } = await supabase.rpc(
    "obtener_egresados_por_extension"
  );
  if (error) throw new Error(error.message);
  if (!result || result.length === 0)
    throw new Error("No se encontraron datos");
  return result;
};

const EgresadosPorCiudad = () => {
  const { data, error, isValidating } = useSWR<EgresadosPorExtension[], Error>(
    "totalEgresadosExtension",
    fetcher
  );

  // Estado para el tipo de egresado seleccionado
  const [selectedTipo, setSelectedTipo] = useState<string>("Profesionales");

  // Filtrar los datos por el tipo seleccionado
  const filteredData = data?.filter(
    (extension) => extension.tipo === selectedTipo
  );

  // Muestra un estado de carga o error si es necesario
  if (isValidating) return <LoadingSpinner />;
  if (error) return <div>Error al cargar los datos: {error.message}</div>;

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Egresados por Ciudad</h2>
      <span>
        Cantidad de Egresados (Profesionales, Técnicos Laborales, Cursos de
        Extensión) por Ciudad registrados en la base de datos
      </span>

      {/* Menú desplegable para seleccionar el tipo de egresado */}
      <div className="my-4">
        <label htmlFor="tipo-select" className="mr-2 font-semibold">
          Selecciona el Tipo:
        </label>
        <select
          id="tipo-select"
          value={selectedTipo}
          onChange={(e) => setSelectedTipo(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="Profesionales">Profesionales</option>
          <option value="Técnicos Laborales">Técnicos Laborales</option>
          <option value="Cursos de Extensión">Cursos de Extensión</option>
        </select>
      </div>

      {/* Tabla para mostrar los datos filtrados */}
      {filteredData && filteredData.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Extensión</th>
              <th className="py-2 px-4 border-b text-right">
                Número de Egresados
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((extension, index) => (
              <tr key={`${extension.ciudad}-${index}`}>
                <td className="py-2 px-4 border-b">{extension.ciudad}</td>
                <td className="py-2 px-4 border-b text-right">
                  {extension.cantidad_egresados}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay datos de egresados disponibles para el tipo seleccionado.</p>
      )}
    </div>
  );
};

export default EgresadosPorCiudad;
