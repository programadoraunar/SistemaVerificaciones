"use client";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { CiSearch } from "react-icons/ci";
import { Tecnico } from "@/interfaces/Tecnicos";
import DateRangePickerProps from "@/components/ui/DateRangePickerProps ";
import {
  obtenerTecnicoPorDocumento,
  obtnerTecnicoPorNombreApellido,
} from "@/lib/supabaseAdminGetFunctionTec";

interface SearchHeaderProps {
  onSearch: (data: Tecnico[]) => void;
}
const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch }) => {
  const [numeroIdentificacion, setNumeroIdentificacion] = useState("");
  const [nombreApellido, setNombreApellido] = useState(""); // Estado para nombres o apellido
  const [errorIdentificacion, setErrorIdentificacion] = useState("");
  const [errorNombre, setErrorNombre] = useState(""); // Estado para errores de nombre
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [errorDateRange, setErrorDateRange] = useState<string>("");
  const validateIdentificacion = (value: string) => {
    if (!value) {
      return "Este campo es obligatorio"; // Mensaje si el campo está vacío
    }
    if (!/^[0-9]+$/.test(value)) {
      return "Ingrese un número válido"; // Mensaje si no es un número
    }
    return ""; // Sin errores
  };

  const validateNombreApellido = (value: string) => {
    if (!value) {
      return "Este campo es obligatorio"; // Mensaje si el campo está vacío
    }
    if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
      return "Ingrese solo Nombres Validos"; // Mensaje si contiene caracteres no permitidos
    }
    return ""; // Sin errores
  };

  // Función para recibir el rango de fechas desde el hijo
  const handleDateChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
  };
  const handleSearchByIdentificacion = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const validationError = validateIdentificacion(numeroIdentificacion);
    if (validationError) {
      setErrorIdentificacion(validationError);
      return; // Detener el envío si hay errores
    }

    setErrorIdentificacion(""); // Limpiar el error si la búsqueda es exitosa
    console.log(numeroIdentificacion);
    try {
      const result = await obtenerTecnicoPorDocumento({
        numero_identificacion: numeroIdentificacion,
      });
      onSearch(result);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchByNombreApellido = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateNombreApellido(nombreApellido);
    if (validationError) {
      setErrorNombre(validationError);
      return;
    }

    const searchTerm = nombreApellido.trim();
    console.log(searchTerm);
    try {
      // Primero intentamos buscar como apellido
      let result = await obtnerTecnicoPorNombreApellido({
        nombres: null,
        apellidos: searchTerm,
      });
      // Si no hay resultados, intentamos buscar como nombre
      if (!result || result.length === 0) {
        console.log("nombre");
        result = await obtnerTecnicoPorNombreApellido({
          nombres: searchTerm,
          apellidos: null,
        });
      }
      // Si aún no hay resultados y hay un espacio en el término de búsqueda,
      // dividimos en nombre y apellido
      if ((!result || result.length === 0) && searchTerm.includes(" ")) {
        const [firstWord, ...restWords] = searchTerm.split(" ");
        const lastWords = restWords.join(" ");

        result = await obtnerTecnicoPorNombreApellido({
          nombres: firstWord,
          apellidos: lastWords,
        });
      }
      onSearch(result);
    } catch (err) {
      console.error("Error en la búsqueda:", err);
    }

    setErrorNombre("");
  };
  return (
    <form>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4 bg-white rounded-lg mb-5">
        {/* Campo de búsqueda por número de documento */}
        <div className="col-span-1 lg:col-span-2 p-4 flex flex-col gap-3 w-full">
          <Label className="text-lg">Ingrese Número de Documento</Label>
          <div className="flex items-center w-full">
            <Input
              className="h-9 w-full"
              type="text"
              placeholder="Ingrese Número de Documento"
              value={numeroIdentificacion}
              onChange={(e) => setNumeroIdentificacion(e.target.value)}
            />
            <Button
              className="ml-2"
              type="submit"
              onClick={handleSearchByIdentificacion}
            >
              <CiSearch />
            </Button>
          </div>
          {errorIdentificacion && (
            <p className="text-red-500 text-sm mt-1">{errorIdentificacion}</p>
          )}
        </div>
        {/* Campo de búsqueda por nombre o apellido */}
        <div className="p-4 flex flex-col gap-3 w-full">
          <Label className="text-lg">Ingrese Nombres o Apellido</Label>
          <div className="flex items-center w-full">
            <Input
              className="h-9 w-full"
              type="text"
              placeholder="Ingrese Nombres o Apellido"
              value={nombreApellido}
              onChange={(e) => setNombreApellido(e.target.value)}
            />
            <Button
              className="ml-2"
              type="button"
              onClick={handleSearchByNombreApellido}
            >
              <CiSearch />
            </Button>
          </div>
          {errorNombre && (
            <p className="text-red-500 text-sm mt-1">{errorNombre}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchHeader;
