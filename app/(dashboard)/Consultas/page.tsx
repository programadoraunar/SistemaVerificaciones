"use client";
import SearchHeader from "@/components/admin/Consultas/SearchHeader";
import TableConsultas from "@/components/admin/Consultas/TableConsultas";
import { ProfesionalConTitulo } from "@/interfaces/Profesionales";
import React, { useState } from "react";

function page() {
  const [searchResults, setSearchResults] = useState<ProfesionalConTitulo[]>(
    []
  );
  return (
    <div className="p-6">
      <div className="bg-white shadow-lg rounded-lg px-6 py-5 flex flex-col space-x-4">
        <h2 className="text-2xl font-bold">
          Gestión de Verificaciones de Títulos
        </h2>
        <p className="py-5">
          En esta seccion podras consultar las verificaciones de titulos que han
          registrado empresas y personas naturales
        </p>
      </div>

      <SearchHeader onSearch={setSearchResults} />
      <TableConsultas />
    </div>
  );
}

export default page;
