import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

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
      { header: "Nombre Profesional", key: "nombre_profesional", width: 20 },
      {
        header: "Apellido Profesional",
        key: "apellido_profesional",
        width: 20,
      },
      { header: "SNIES", key: "snies", width: 10 },
      { header: "Título Nombre", key: "titulo_nombre", width: 25 },
      { header: "Nombre Extensión", key: "nombre_extension", width: 15 },
      { header: "Acta Grado", key: "acta_grado", width: 10 },
      { header: "Número Diploma", key: "numero_diploma", width: 15 },
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
        nombre_profesional: row[2],
        apellido_profesional: row[3],
        snies: row[4],
        titulo_nombre: row[5],
        nombre_extension: row[6],
        acta_grado: row[7],
        numero_diploma: row[8],
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
    saveAs(blob, "Profesionales.xlsx");
  };

  return (
    <button onClick={downloadExcelFile} className="download-button">
      Descargar Excel
    </button>
  );
};

export default DownloadExcelFile;
