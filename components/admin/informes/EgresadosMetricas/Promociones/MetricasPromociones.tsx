"use client";
import { supabase } from "@/utils/supabase/client";
import React, { useMemo, useState } from "react";
import useSWR from "swr";

interface Promocion {
  nombre_titulo: string;
  anio: string;
  total_promociones_acumuladas: number;
  total_promociones_anuales: number;
}
const fetcher = async () => {
  const { data: result, error } = await supabase.rpc(
    "obtener_promociones_anuales_y_acumuladas_por_titulo"
  );
  if (error) throw new Error(error.message);
  if (!result || result.length === 0)
    throw new Error("No se encontraron datos");
  return result;
};

const MetricasPromociones = () => {
  const { data, error, isValidating } = useSWR<Promocion[], Error>(
    "promociones",
    fetcher
  );
  const [selectedTitulo, setSelectedTitulo] = useState("");
  const [selectedAnio, setSelectedAnio] = useState<number | "">("");
  // Obtener los títulos únicos disponibles
  const titulosDisponibles = useMemo(() => {
    return data
      ? Array.from(new Set(data.map((item) => item.nombre_titulo)))
      : [];
  }, [data]);

  // Filtrar años correspondientes al título seleccionado
  const aniosDisponibles = useMemo(() => {
    return data && selectedTitulo
      ? data
          .filter((item) => item.nombre_titulo === selectedTitulo)
          .map((item) => item.anio)
      : [];
  }, [data, selectedTitulo]);

  // Calcular el total de promociones acumuladas para el título seleccionado
  const totalPromocionesAcumuladas = useMemo(() => {
    if (data && selectedTitulo) {
      const registros = data.filter(
        (item) => item.nombre_titulo === selectedTitulo
      );
      return registros.length > 0
        ? registros[registros.length - 1].total_promociones_acumuladas
        : 0;
    }
    return 0;
  }, [data, selectedTitulo]);

  // Obtener promociones anuales para el año y título seleccionado
  const promocionesAnuales = useMemo(() => {
    const registro = data?.find(
      (item) =>
        item.nombre_titulo === selectedTitulo && item.anio === selectedAnio
    );
    return registro ? registro.total_promociones_anuales : 0;
  }, [data, selectedTitulo, selectedAnio]);

  if (isValidating) return <div>Cargando datos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Métricas de Promociones</h2>

      {/* Seleccionar título */}
      <label className="block mb-2">
        <span className="text-gray-700">Selecciona un título:</span>
        <select
          className="block w-full mt-1 border p-2"
          value={selectedTitulo}
          onChange={(e) => {
            setSelectedTitulo(e.target.value);
            setSelectedAnio(""); // Limpiar selección de año al cambiar título
          }}
        >
          <option value="">-- Selecciona un título --</option>
          {titulosDisponibles.map((titulo, index) => (
            <option key={index} value={titulo}>
              {titulo}
            </option>
          ))}
        </select>
      </label>

      {/* Mostrar total de promociones acumuladas al seleccionar título */}
      {selectedTitulo && (
        <div className="mt-4 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">
            Total de Promociones Acumuladas:
          </h2>
          <span>Total de promociones acumuladas hasta la actualidad</span>
          <p>{totalPromocionesAcumuladas}</p>
        </div>
      )}

      {/* Seleccionar año si hay un título seleccionado */}
      {selectedTitulo && (
        <label className="block mb-4 mt-4">
          <span className="text-gray-700">Selecciona un año:</span>
          <select
            className="block w-full mt-1 border p-2"
            value={selectedAnio === "" ? "" : selectedAnio} // Manejar el valor como string cuando está vacío
            onChange={(e) =>
              setSelectedAnio(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            } // Convertir solo si no es vacío
          >
            <option value="">-- Selecciona un año --</option>
            {aniosDisponibles.map((anio, index) => (
              <option key={index} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Mostrar total de promociones anuales cuando hay año seleccionado */}
      {selectedTitulo && selectedAnio && (
        <div className="mt-4 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">
            Promociones Anuales para {selectedAnio}:
          </h2>
          <p>{promocionesAnuales}</p>
        </div>
      )}
    </div>
  );
};

export default MetricasPromociones;
