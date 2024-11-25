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
      { header: "Nombre", key: "nombre", width: 20 },
      {
        header: "Apellido",
        key: "apellido",
        width: 20,
      },
      { header: "Extension", key: "extension", width: 10 },
      { header: "Certificado", key: "certificado", width: 25 },
      { header: "Periodo de Formación", key: "periodo_formacion", width: 15 },
      { header: "Fecha de Entrega", key: "fecha_entrega", width: 10 },
      { header: "Intensidad Horaria", key: "intensidad_horaria", width: 15 },
      { header: "Tipo", key: "tipo", width: 10 },
      { header: "Alianza", key: "alianza", width: 15 },
    ];

    // Agregar datos de `multipleTitleData` a cada fila
    multipleTitleData.forEach((row) => {
      worksheet.addRow({
        tipo_identificacion: row[0],
        numero_identificacion: row[1],
        nombre: row[2],
        apellido: row[3],
        extension: row[4],
        certificado: row[5],
        periodo_formacion: row[6],
        fecha_entrega: row[7],
        intensidad_horaria: row[8],
        tipo: row[9],
        alianza: row[10],
      });
    });

    // Estilo para los encabezados
    worksheet.getRow(1).font = { bold: true };

    // Generar el archivo y desencadenar su descarga
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "CursoEgresadosRepetidos.xlsx");
  };
  return <Button onClick={downloadExcelFile}>Descargar Excel</Button>;
};

export default DownloadExcelFile;
