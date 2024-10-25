import React from "react";

interface FormularioActualizacionProps {
  numeroIdentificacion: string; // Prop para recibir solo el número de identificación
  tituloId: number;
  onSuccess: () => void;
}
const FormularioActualizacion: React.FC<FormularioActualizacionProps> = ({
  numeroIdentificacion,
  tituloId,
  onSuccess,
}) => {
  console.log(numeroIdentificacion);
  return <div>FormularioActualIzacion</div>;
};

export default FormularioActualizacion;
