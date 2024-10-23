import React from "react";

interface Detalles {
  id: number; // Prop para recibir solo el número de identificación
  onSuccess: () => void;
}
const Detalles: React.FC<Detalles> = ({ id, onSuccess }) => {
  return <div>Detalles</div>;
};

export default Detalles;
