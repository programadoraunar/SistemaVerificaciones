"use client";
import SearchHeader from "@/components/admin/cursosExtension/SearchHeader";
import FormularioRegistroCurso from "@/components/admin/cursosExtension/FormularioRegistroCurso";
import TableCursosExtension from "@/components/admin/cursosExtension/TableCursosExtension";
import Modal from "@/components/ui/Modal";
import { InformacionCursoExtension } from "@/interfaces/CursosExtension";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PiStudentBold } from "react-icons/pi";
import UploadExcelCursos from "@/components/admin/cursosExtension/UploadExcel/UploadExcelCursos";

function cursoExtensionPage() {
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
  const [searchResults, setSearchResults] = useState<
    InformacionCursoExtension[]
  >([]);

  return (
    <div className="flex flex-col p-5 bg-gray-100">
      {/* <div className="flex justify-between items-center pb-14 lg:pt-10">
        <div className="flex gap-3 items-center">
          <PiStudentBold size={37} />
          <p className="text-xl lg:text-3xl font-bold">Cursos de Extension</p>
        </div>
        <div>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-zodiac-950 text-white rounded text-sm"
          >
            Registrar Nuevo +
          </button>
        </div>
      </div>
      <SearchHeader onSearch={setSearchResults} />
      <TableCursosExtension searchResults={searchResults} />
      <UploadExcelCursos />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Registro de Curso de Extension"
      >
        <FormularioRegistroCurso onSuccess={handleRegistroExitoso} />
      </Modal>
      <Toaster /> */}
    </div>
  );
}

export default cursoExtensionPage;
