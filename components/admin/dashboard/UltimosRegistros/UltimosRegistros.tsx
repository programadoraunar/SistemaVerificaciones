"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import React, { useEffect, useState } from "react";
import Detalles from "./Detalles";
import { Egresado } from "@/interfaces/Egresados";
import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";
import { Registros } from "@/interfaces/Registro";
const fetcher = async () => {
  const { data: result, error } = await supabase.rpc(
    "obtener_ultimos_10_egresados_registrados"
  );
  if (error) throw new Error(error.message);
  if (!result || result.length === 0)
    throw new Error("No se encontraron datos");
  return result; // Asumiendo que la función devuelve un array con un único objeto
};
function UltimosRegistros() {
  const [id, setId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para el modal
  // Simulación de la obtención de los últimos registros
  const { data, error, isValidating, isLoading } = useSWR(
    "ultimos10registros",
    fetcher
  );
  if (isLoading) {
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
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Tipo</th>
              <th className="border border-gray-300 p-2">Descripción</th>
              <th className="border border-gray-300 p-2">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) ? (
              data.map((egresado: Registros) => (
                <tr key={egresado.id}>
                  <td className="border border-gray-300 p-2">
                    {egresado.tipo}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {egresado.nombre} {egresado.apellido}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <Button onClick={() => openModal(egresado.id)}>
                      Ver Detalles
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="border border-gray-300 p-2 text-center"
                >
                  No se encontraron datos.
                </td>
              </tr>
            )}
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
