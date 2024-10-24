import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { EgresadosPorExtension } from "@/interfaces/Egresados";
import { supabase } from "@/utils/supabase/client";
import React from "react";
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
  // Muestra un estado de carga o error si es necesario
  if (isValidating) return <LoadingSpinner />;
  if (error) return <div>Error al cargar los datos: {error.message}</div>;
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Egresados por Ciudad</h2>
      {data && data.length > 0 ? (
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
            {data.map((extension) => (
              <tr key={extension.ciudad}>
                <td className="py-2 px-4 border-b">{extension.ciudad}</td>
                <td className="py-2 px-4 border-b text-right">
                  {extension.cantidad_egresados}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay datos de egresados disponibles.</p>
      )}
    </div>
  );
};

export default EgresadosPorCiudad;
