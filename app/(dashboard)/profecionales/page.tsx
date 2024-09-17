import SearchHeader from "@/components/profesionales/SearchHeader";
import TableProfecionales from "@/components/profesionales/TableProfecionales";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

function profecionalesPage() {
  return (
    <div className="flex flex-col p-5 bg-gray-100">
      <div className="flex justify-between items-center pb-14 lg:pt-10">
        <p className="text-2xl lg:text-3xl font-bold">Profesionales</p>
        <Button className="text-sm lg:text-base">Crear Nuevo </Button>
      </div>
      <SearchHeader />
      <TableProfecionales />
    </div>
  );
}

export default profecionalesPage;
