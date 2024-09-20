"use client";
import FormularioRegistro from "@/components/profesionales/FormularioRegistro";
import SearchHeader from "@/components/profesionales/SearchHeader";
import TableProfecionales from "@/components/profesionales/TableProfecionales";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function profecionalesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="flex flex-col p-5 bg-gray-100">
      <div className="flex justify-between items-center pb-14 lg:pt-10">
        <p className="text-2xl lg:text-3xl font-bold">Profesionales</p>
        <div>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-zodiac-950 text-white rounded"
          >
            Registrar Nuevo +
          </button>
        </div>
      </div>
      <SearchHeader />
      <TableProfecionales />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Registro de Profesional"
      >
        <FormularioRegistro />
      </Modal>
    </div>
  );
}

export default profecionalesPage;
