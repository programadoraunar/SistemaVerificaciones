"use client";

import FormularioRegistro from "@/components/admin/profesionales/FormularioRegistro";
import Modal from "@/components/ui/Modal";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Registro de Técnico"
      >
        <FormularioRegistro onSuccess={handleRegistroExitoso} />
      </Modal>
    </div>
  );
}

export default tecnicosPage;
