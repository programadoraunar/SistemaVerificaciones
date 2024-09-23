"use client";
import FormularioRegistro from "@/components/profesionales/FormularioRegistro";
import SearchHeader from "@/components/profesionales/SearchHeader";
import TableProfecionales from "@/components/profesionales/TableProfecionales";
import Modal from "@/components/ui/Modal";
import { ProfesionalConTitulo } from "@/interfaces/Profesionales";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function profecionalesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [searchResults, setSearchResults] = useState<ProfesionalConTitulo[]>(
    []
  );
  const notify = () => toast("Registro Exitoso !");
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
      <SearchHeader onSearch={setSearchResults} />
      <TableProfecionales searchResults={searchResults} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Registro de Profesional"
      >
        <FormularioRegistro onSuccess={closeModal} />
      </Modal>
      <div>
        <button onClick={notify}>Notify !</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default profecionalesPage;
