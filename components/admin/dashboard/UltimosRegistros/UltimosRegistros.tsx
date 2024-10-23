"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { Registro } from "@/interfaces/Registro";
import React, { useEffect, useState } from "react";
import Detalles from "./Detalles";

function UltimosRegistros() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para el modal
  // Simulación de la obtención de los últimos registros
  useEffect(() => {
    // Datos simulados para los últimos registros
    const mockRegistros: Registro[] = [
      {
        id: 1,
        tipo: "Profesional",
        descripcion: "Juan Pérez, Ingeniero de Sistemas",
      },
      {
        id: 2,
        tipo: "Técnico Laboral",
        descripcion: "Ana Gómez, Técnico en Redes",
      },
      {
        id: 3,
        tipo: "Curso de Extensión",
        descripcion: "Curso de Programación en Python",
      },
      {
        id: 4,
        tipo: "Formación Académica",
        descripcion: "Maestría en Inteligencia Artificial",
      },
      {
        id: 4,
        tipo: "Formación Académica",
        descripcion: "Maestría en Inteligencia Artificial",
      },
      // Más datos simulados aquí
    ];

    // Simula la carga de datos
    setTimeout(() => {
      setRegistros(mockRegistros);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <p>Cargando los últimos registros...</p>;
  }

  const openModal = (id: number) => {
    setId(id); // Establece el profesional seleccionado
    setModalOpen(true); // Abre el modal
  };

  const closeModal = () => {
    setModalOpen(false); // Cierra el modal
    setId(null); // Reinicia el profesional seleccionado
  };
  return (
    <div className="bg-white p-5 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Últimos Registros Agregados</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collaps">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Tipo</th>
              <th className="border border-gray-300 p-2">Descripción</th>
              <th className="border border-gray-300 p-2">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                <td className="border border-gray-300 p-2">{registro.tipo}</td>
                <td className="border border-gray-300 p-2">
                  {registro.descripcion}
                </td>
                <td className="border border-gray-300p-2">
                  <Button onClick={() => openModal(registro.id)}>
                    Ver Detalles
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title="Detalle del Registro"
      >
        {id !== null && <Detalles id={id} onSuccess={closeModal} />}
      </Modal>
    </div>
  );
}

export default UltimosRegistros;
