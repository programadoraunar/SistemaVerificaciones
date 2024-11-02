import { EgresadosPorAnio } from "@/interfaces/Egresados";
import { supabase } from "@/utils/supabase/client";
import React, { useState } from "react";
import useSWR from "swr";

interface GraduateData {
  anio: number;
  cantidad_egresados: number;
}

const fetcher = async () => {
  const { data: result, error } = await supabase.rpc(
    "obtener_egresados_por_anio"
  );
  if (error) throw new Error(error.message);
  if (!result || result.length === 0)
    throw new Error("No se encontraron datos");
  return result;
};
const EgresadoPorAnio: React.FC = () => {
  const { data, error, isValidating } = useSWR<EgresadosPorAnio[], Error>(
    "totalEgresadosPorAnio",
    fetcher
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Manejar la selección de año
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value ? parseInt(e.target.value) : null;
    setSelectedYear(year);
  };

  // Obtener la cantidad de egresados para el año seleccionado
  const getCantidadEgresados = () => {
    if (!data || !selectedYear) return 0;
    const selectedData = data.find((item) => item.anio === selectedYear);
    return selectedData ? selectedData.cantidad_egresados : 0;
  };

  const cantidadEgresados = getCantidadEgresados();

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Egresados Según Año</h2>
      <span>Cantidad de Estudiantes Egresados Por Año</span>
      <div className="mb-4">
        <label htmlFor="year-select" className="block mb-2">
          Selecciona un año:
        </label>
        <select
          id="year-select"
          className="border border-gray-300 rounded p-2"
          onChange={handleYearChange}
        >
          <option value="">Selecciona un año</option>
          {data?.map((item) => (
            <option key={item.anio} value={item.anio}>
              {item.anio}
            </option>
          ))}
        </select>
      </div>
      {selectedYear && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Egresados en {selectedYear}: {cantidadEgresados}
          </h3>
        </div>
      )}
    </div>
  );
};
export default EgresadoPorAnio;
