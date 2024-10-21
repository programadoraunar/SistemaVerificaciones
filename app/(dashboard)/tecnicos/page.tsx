"use client";

import FormularioRegistro from "@/components/admin/FormularioRegistro";
import SearchHeader from "@/components/admin/tecnicos/SearchHeader";
import Modal from "@/components/ui/Modal";
import { TecnicoConTitulo } from "@/interfaces/Tecnicos";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
function tecnicosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Función para manejar el éxito del registro
  const handleRegistroExitoso = () => {
    // Puedes realizar acciones adicionales aquí si es necesario
    toast.success("¡Registro exitoso!");
    closeModal(); // Cierra el modal
  };
  const [searchResults, setSearchResults] = useState<TecnicoConTitulo[]>([]);
  console.log(searchResults);
  return (
    <div className="flex flex-col p-5 bg-gray-100">
      <div className="flex justify-between items-center pb-14 lg:pt-10">
        <p className="text-2xl lg:text-3xl font-bold">Técnicos</p>
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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Registro de Técnico"
      >
        <FormularioRegistro onSuccess={handleRegistroExitoso} />
      </Modal>
      <Toaster />
    </div>
  );
}

export default tecnicosPage;
