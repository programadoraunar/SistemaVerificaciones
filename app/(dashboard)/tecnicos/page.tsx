"use client";
import FormularioRegistroTecnicos from "@/components/admin/tecnicos/FormularioRegistroTecnicos";
import SearchHeader from "@/components/admin/tecnicos/SearchHeader";
import TableTecnicos from "@/components/admin/tecnicos/TableTecnicos";
import UploadExcelTecnico from "@/components/admin/tecnicos/UploadExcel/UploadExcelTecnico";
import Modal from "@/components/ui/Modal";
import { Tecnico } from "@/interfaces/Tecnicos";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaTools } from "react-icons/fa";
function tecnicosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Función para manejar el éxito del registro
  const handleRegistroExitoso = () => {
    closeModal(); // Cierra el modal
  };
  const [searchResults, setSearchResults] = useState<Tecnico[]>([]);

  return (
    <div className="flex flex-col p-5 bg-gray-100">
      <div className="flex justify-between items-center pb-14 lg:pt-10">
        <div className="flex gap-3">
          <FaTools size={36} />
          <p className="text-2xl lg:text-3xl font-bold">Técnicos Laborales</p>
        </div>

        <div>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-zodiac-950 text-white rounded"
          >
            Registrar Nuevo +
          </button>
        </div>
      </div>
      <SearchHeader onSearch={setSearchResults} />
      <TableTecnicos searchResults={searchResults} />
      <UploadExcelTecnico />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Registro de Técnico"
      >
        <FormularioRegistroTecnicos onSuccess={handleRegistroExitoso} />
      </Modal>
      <Toaster />
    </div>
  );
}

export default tecnicosPage;
