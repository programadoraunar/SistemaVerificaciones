"use client";
import React from "react";
import { AlignmentType, Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { formatearFecha } from "@/utils/fechas";
interface GenerarDocumentoWordProps {
  persona: {
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    nombre: string;
    apellido: string;
    extension: number;
    titulo_nombre: string;
    fecha_grado: string;
    acta_grado: string;
    folio: string;
    libro_registro_grado: string;
    numero_diploma: string;
  };
}

const GenerarDocumentoWord: React.FC<GenerarDocumentoWordProps> = ({
  persona,
}) => {
  const generarDocumento = () => {
    const nombreCompleto = `${persona.nombre} ${persona.apellido}`;

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "VERIFICACIÓN DE TÍTULO",
                  bold: true,
                  size: 32,
                  font: "Century Gothic",
                }),
              ],
              spacing: { before: 300, after: 600 },
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: "La Secretaria General de la Corporación Universitaria Autónoma de Nariño - AUNAR, hace constar que:",
                  font: "Century Gothic",
                  size: 24,
                }),
              ],
              spacing: { before: 300, after: 300 },
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: `El (la) señor (a) ${nombreCompleto}, identificado (a) con ${persona.tipoIdentificacion} No. ${persona.numeroIdentificacion}, obtuvo el título de ${persona.titulo_nombre} con fecha de grado ${formatearFecha(persona.fecha_grado)}, inscrito en el Acta No. ${persona.acta_grado}, folio No. ${persona.folio} del libro de Diplomas No. ${persona.libro_registro_grado} de los Registros Institucionales.`,
                  font: "Century Gothic",
                  size: 24,
                }),
              ],
              spacing: { after: 200 },
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Verificacion_Titulo_${persona.numeroIdentificacion}.docx`);
    });
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // Esto previene el envío del formulario.
        generarDocumento();
      }}
      className="bg-blue-zodiac-950 text-white p-2 rounded"
    >
      Verificación
    </button>
  );
};

export default GenerarDocumentoWord;
