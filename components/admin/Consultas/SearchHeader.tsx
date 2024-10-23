"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { CiSearch } from "react-icons/ci";
import {
  obtenerProfesionalPorDocumento,
  obtnerProfesionalPorNombreApellido,
  obtnerProfesionalPorRangoFechas,
} from "@/lib/supabaseAdminGetFunctions";
import { ProfesionalConTitulo } from "@/interfaces/Profesionales";
import DateRangePickerProps from "@/components/ui/DateRangePickerProps ";
interface SearchHeaderProps {
  onSearch: (data: ProfesionalConTitulo[]) => void; // Cambiado aquí
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [errorDateRange, setErrorDateRange] = useState<string>("");

  // Función para recibir el rango de fechas desde el hijo
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
  };

  const handleSearchByDateRange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateRange[0] || !dateRange[1]) {
      setErrorDateRange("Por favor, selecciona un rango de fechas válido.");
      return;
    }

    setErrorDateRange(""); // Limpiar el error si las fechas son válidas

    try {
      const FechaInicioData = dateRange[0]?.toISOString().split("T")[0];
      const FechaFinData = dateRange[1]?.toISOString().split("T")[0];
      const result = await obtnerProfesionalPorRangoFechas({
        fechaFin: FechaFinData,
        fechaInicio: FechaInicioData,
      });
      console.log(result);
      onSearch(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="my-5">
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4 bg-white rounded-lg mb-5">
        {/* Campo de búsqueda por número de documento */}
        <div className="col-span-1 lg:col-span-1 p-4 flex flex-col gap-3 w-full">
          <Label className="text-lg font-bold">Por Tipo</Label>
          <div className="flex items-center w-full">
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="persona_natural">Persona Natural</option>
              <option value="empresa">Empresa</option>
            </select>
          </div>
        </div>

        {/* Campo de búsqueda por rango de fechas */}
        <div className="col-span-1 lg:col-span-3 p-4 flex flex-col justify-center items-center w-full">
          <Label className="text-lg font-bold">
            Buscar por Rango de Fechas
          </Label>
          <div className="p-4 flex">
            <DateRangePickerProps onDateChange={handleDateChange} />{" "}
            {/* Pasar la función al hijo */}
            <Button onClick={handleSearchByDateRange} type="button">
              <CiSearch />
            </Button>
          </div>

          {errorDateRange && (
            <p className="text-red-500 text-sm mt-1">{errorDateRange}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchHeader;
