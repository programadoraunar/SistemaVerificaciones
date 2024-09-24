"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CiSearch } from "react-icons/ci";
import {
  obtenerProfesionalPorDocumento,
  obtnerProfesionalPorNombreApellido,
} from "@/lib/supabaseAdminGetFunctions";
import { ProfesionalConTitulo } from "@/interfaces/Profesionales";
import DateRangePickerProps from "@/components/ui/DateRangePickerProps ";
interface SearchHeaderProps {
  onSearch: (data: ProfesionalConTitulo[]) => void; // Cambiado aquí
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch }) => {
  const [numeroIdentificacion, setNumeroIdentificacion] = useState("");
  const [nombreApellido, setNombreApellido] = useState(""); // Estado para nombres o apellido
  const [errorIdentificacion, setErrorIdentificacion] = useState("");
  const [errorNombre, setErrorNombre] = useState(""); // Estado para errores de nombre

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

  const handleSearchByIdentificacion = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const validationError = validateIdentificacion(numeroIdentificacion);
    if (validationError) {
      setErrorIdentificacion(validationError);
      return; // Detener el envío si hay errores
    }

    setErrorIdentificacion(""); // Limpiar el error si la búsqueda es exitosa

    try {
      const result = await obtenerProfesionalPorDocumento({
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
      return; // Detener el envío si hay errores
    }

    // Separar el nombre completo en partes
    const nombresApellidos = nombreApellido.trim().split(" ");

    let nombresData = "";
    let apellidosData = "";

    // Asumimos que el primer elemento es el nombre y el resto son apellidos
    if (nombresApellidos.length > 0) {
      nombresData = nombresApellidos[0]; // Primer elemento como nombre
      apellidosData = nombresApellidos.slice(1).join(" "); // Unir el resto como apellidos
    }

    try {
      const result = await obtnerProfesionalPorNombreApellido({
        nombres: nombresData || null, // Enviar el nombre o NULL
        apellidos: apellidosData || null, // Enviar los apellidos o NULL
      });
      onSearch(result); // Callback para manejar los resultados
    } catch (err) {
      console.log(err);
    }

    setErrorNombre(""); // Limpiar el error si la búsqueda es exitosa
    console.log("Nombre ingresado:", nombresData); // Imprimir el nombre
    console.log("Apellidos ingresados:", apellidosData); // Imprimir los apellidos
  };

  return (
    <form>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-5 bg-white rounded-lg mb-5">
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

        {/* Campo de búsqueda por rango de fechas */}
        <div className="p-4 flex flex-col justify-center items-center w-full">
          <Label className="text-lg">Buscar por Rango de Fechas</Label>
          <DateRangePickerProps />
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
