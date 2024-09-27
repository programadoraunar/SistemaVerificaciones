"use client";
import React from "react";
import { AlignmentType, Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { ProfesionalConTitulo } from "@/interfaces/Profesionales";

interface GenerarDocumentoWordProps {
  profesional: ProfesionalConTitulo;
}

const GenerarDocumentoWord: React.FC<GenerarDocumentoWordProps> = ({
  profesional,
}) => {
  const generarDocumento = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Título centrado y con fuente "Century Gothic"
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "VERIFICACIÓN DE TÍTULO",
                  bold: true,
                  size: 32, // Tamaño de fuente
                  font: "Century Gothic", // Fuente personalizada
                }),
              ],
              spacing: {
                before: 300,
                after: 600, // Espacio después del título
              },
            }),
            // Primer párrafo
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "La Secretaria General de la Corporación Universitaria Autónoma de Nariño - AUNAR, hace constar que:",
                  font: "Century Gothic", // Fuente personalizada
                  size: 24, // Ajustar tamaño de fuente si es necesario
                }),
              ],
              spacing: {
                before: 300,
                after: 300, // Espacio después del título
              },
            }),
            // Párrafo con los datos del profesional
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: `El (la) señor (a) ${profesional.nombre_profesional} ${profesional.apellido_profesional}, identificado (a) con cédula de ciudadanía No. ${profesional.numero_identificacion}, obtuvo el título de ${profesional.titulo_nombre} con fecha de grado ${profesional.fecha_grado}, se encuentra inscrito (a) en el Acta No. ${profesional.acta_grado}, folio No. ${profesional.folio} del libro de Diplomas No. ${profesional.libro_registro_grado} de los Registros Institucionales.`,
                  font: "Century Gothic",
                  size: 24,
                }),
              ],
              spacing: {
                after: 200, // Espacio después del texto
              },
            }),
          ],
        },
      ],
    });

    // Generar y descargar el archivo
    Packer.toBlob(doc).then((blob) => {
      saveAs(
        blob,
        `Verificacion_Titulo_${profesional.numero_identificacion}.docx`
      );
    });
  };

  return (
    <button
      onClick={generarDocumento}
      className="bg-blue-zodiac-950 text-white p-2 rounded"
    >
      Descargar
    </button>
  );
};

export default GenerarDocumentoWord;
