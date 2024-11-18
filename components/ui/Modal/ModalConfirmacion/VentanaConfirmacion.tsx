"use client";
import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
interface VentanaConfirmacionProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const VentanaConfirmacion: React.FC<VentanaConfirmacionProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isOpen) {
      setIsConfirmDisabled(true); // Bloquear el botón al abrir el modal
      timer = setTimeout(() => setIsConfirmDisabled(false), 5000); // Desbloquear tras 5 segundos
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="¿Estás seguro de eliminar?">
      <div className="text-gray-700 text-center">
        <p>
          Esta acción no se puede deshacer. Por favor, confirma que deseas
          eliminar este titulo
        </p>
      </div>
      <div className="flex justify-center space-x-4 mt-6">
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          className={`px-4 py-2 rounded text-white ${
            isConfirmDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          } transition`}
          onClick={onConfirm}
          disabled={isConfirmDisabled}
        >
          {isConfirmDisabled ? "Espere..." : "Sí, eliminar"}
        </button>
      </div>
    </Modal>
  );
};

export default VentanaConfirmacion;
