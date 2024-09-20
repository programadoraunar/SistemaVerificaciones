"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CiSearch } from "react-icons/ci";
import DateRangePickerProps from "../ui/DateRangePickerProps ";

function SearchHeader() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-5 bg-white rounded-lg mb-5">
      {/* Primer hijo: ocupa 2 columnas en pantallas grandes */}
      <div className="col-span-1 lg:col-span-2 p-4 flex flex-col gap-3 w-full">
        <Label className="text-lg">Ingrese Numero de Documento</Label>
        <div className="flex items-center w-full">
          <Input
            className="h-9 w-full"
            type="text"
            placeholder="Ingrese Numero de Documento"
          />
          <Button className="ml-2">
            <CiSearch />
          </Button>
        </div>
      </div>

      {/* Los otros hijos */}
      <div className="p-4 flex flex-col justify-center items-center w-full">
        <Label className="text-lg">Fechas</Label>
        <DateRangePickerProps />
      </div>
      <div className="bg-green-500 p-4 w-full">Filtro Por Definir</div>
      <div className="bg-yellow-500 p-4 w-full">Filtro Por Definir</div>
    </div>
  );
}

export default SearchHeader;
