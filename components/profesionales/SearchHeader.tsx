"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CiSearch } from "react-icons/ci";
import { useForm } from "react-hook-form";
import {
  FilterFormData,
  filterSchema,
} from "@/validations/validationAdminSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { obtenerProfesionalPorDocumento } from "@/lib/supabaseAdminGetFunctions";
import { ProfesionalConTitulo } from "@/interfaces/Profesionales";
import DateRangePickerProps from "@/components/ui/DateRangePickerProps ";
interface SearchHeaderProps {
  onSearch: (data: ProfesionalConTitulo[]) => void; // Cambiado aquí
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
  });

  const onSubmit = async (data: FilterFormData) => {
    try {
      const result = await obtenerProfesionalPorDocumento(data);
      onSearch(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-5 bg-white rounded-lg mb-5">
        <div className="col-span-1 lg:col-span-2 p-4 flex flex-col gap-3 w-full">
          <Label className="text-lg">Ingrese Número de Documento</Label>
          <div className="flex items-center w-full">
            <Input
              className="h-9 w-full"
              type="text"
              placeholder="Ingrese Número de Documento"
              {...register("numero_identificacion")}
            />
            <Button className="ml-2" type="submit">
              <CiSearch />
            </Button>
          </div>
          {errors.numero_identificacion && (
            <p className="text-red-500 text-sm mt-1">
              {errors.numero_identificacion.message}
            </p>
          )}
        </div>
        <div className="p-4 flex flex-col justify-center items-center w-full">
          <Label className="text-lg">Fechas</Label>
          <DateRangePickerProps />
        </div>

        <div className="bg-green-500 p-4 w-full">Filtro Por Definir</div>
        <div className="bg-yellow-500 p-4 w-full">Filtro Por Definir</div>
      </div>
    </form>
  );
};

export default SearchHeader;
