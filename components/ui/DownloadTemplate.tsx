import { Button } from "@/components/ui/button";
import React from "react";
interface DownloadTemplateProps {
  fileUrl: string; // URL del archivo que se desea descargar
  fileName?: string; // Nombre del archivo al descargar, opcional
}
const DownloadTemplate: React.FC<DownloadTemplateProps> = ({
  fileUrl,
  fileName = "archivo.xlsx",
}) => {
  const handleDownload = () => {
    if (!fileUrl) {
      console.error("No se proporcionó una URL para el archivo.");
      return;
    }

    // Crear un enlace temporal y simular un clic para iniciar la descarga
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName; // Nombre del archivo al descargar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return <Button onClick={handleDownload}>Descargar Plantilla</Button>;
};

export default DownloadTemplate;
