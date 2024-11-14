import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";

interface DownloadExcelProps {
  multipleTitleData: any[]; // Puedes tipar mejor esta propiedad según la estructura de los datos
}

const DownloadExcelFile: React.FC<DownloadExcelProps> = ({
  multipleTitleData,
}) => {
  const downloadExcelFile = async () => {
    // Crear un nuevo workbook y worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Profesionales");

    // Añadir encabezados
    worksheet.columns = [
      { header: "Tipo Identificación", key: "tipo_identificacion", width: 15 },
      {
        header: "Número Identificación",
        key: "numero_identificacion",
        width: 20,
      },
      { header: "Nombre Tecnico", key: "nombre_tecnico", width: 20 },
      {
        header: "Apellido Tecnico",
        key: "apellido_tecnico",
        width: 20,
      },
      { header: "SIET", key: "siet", width: 10 },
      { header: "Programa", key: "programa", width: 25 },
      { header: "Nombre Extensión", key: "nombre_extension", width: 15 },
      { header: "Acta Grado", key: "acta_grado", width: 10 },
      { header: "Número Certiicado", key: "numero_certificado", width: 15 },
      { header: "Folio", key: "folio", width: 10 },
      { header: "Fecha Grado", key: "fecha_grado", width: 15 },
      {
        header: "Libro Registro Grado",
        key: "libro_registro_grado",
        width: 20,
      },
    ];

    // Agregar datos de `multipleTitleData` a cada fila
    multipleTitleData.forEach((row) => {
      worksheet.addRow({
        tipo_identificacion: row[0],
        numero_identificacion: row[1],
        nombre_tecnico: row[2],
        apellido_tecnico: row[3],
        siet: row[4],
        programa: row[5],
        nombre_extension: row[6],
        acta_grado: row[7],
        numero_certificado: row[8],
        folio: row[9],
        fecha_grado: row[10],
        libro_registro_grado: row[11],
      });
    });

    // Estilo para los encabezados
    worksheet.getRow(1).font = { bold: true };

    // Generar el archivo y desencadenar su descarga
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "TecnicosConMasDeUnTitulo.xlsx");
  };

  return (
    <Button onClick={downloadExcelFile} className="download-button">
      Descargar Excel
    </Button>
  );
};

export default DownloadExcelFile;
