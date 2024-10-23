"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { CiSearch } from "react-icons/ci";
import DateRangePickerProps from "@/components/ui/DateRangePickerProps ";
import { obtenerConsultasPorTipoFecha } from "@/lib/SupabaseAdminGetConsultas";
import { Consulta } from "@/interfaces/Verificacion";
interface SearchHeaderProps {
  onSearch: (data: Consulta[]) => void; // Cambiado aquí
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [errorDateRange, setErrorDateRange] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("persona_natural");

  // Función para recibir el rango de fechas desde el hijo
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
  };

  const handleSearchByDateRange = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que ambas fechas estén seleccionadas
    if (!dateRange[0] || !dateRange[1]) {
      setErrorDateRange("Por favor, selecciona un rango de fechas válido.");
      return;
    }

    // Limpiar el mensaje de error
    setErrorDateRange("");

    try {
      const startDate = dateRange[0].toISOString().split("T")[0];
      const endDate = dateRange[1].toISOString().split("T")[0];
      // Crear el objeto para  enviar a la función que obtiene las consultas
      const consultaData = {
        tipo: selectedType,
        fechaInicio: startDate,
        fechaHasta: endDate,
      };
      const result = await obtenerConsultasPorTipoFecha(consultaData);
      onSearch(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="my-5" onSubmit={handleSearchByDateRange}>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4 bg-white rounded-lg mb-5">
        {/* Campo de búsqueda por tipo */}
        <div className="col-span-1 lg:col-span-1 p-4 flex flex-col gap-3 w-full">
          <Label className="text-lg font-bold">Por Tipo</Label>
          <div className="flex items-center w-full">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
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
            <DateRangePickerProps onDateChange={handleDateChange} />
            <Button type="submit">
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
