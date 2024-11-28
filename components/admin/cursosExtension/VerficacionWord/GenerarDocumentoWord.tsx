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
    titulo_nombre: string;
    periodo_formacion: string;
    fecha_entrega: string;
  };
}
const GenerarDocumentoWord: React.FC<GenerarDocumentoWordProps> = ({
  persona,
}) => {
  const nombreCompleto = `${persona.nombre} ${persona.apellido}`;
  console.log(persona.titulo_nombre);
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
                  text: "CERTIFICADO DE VERIFICACIÓN DE TÍTULO",
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
                  text: "La Secretaría General de la Corporación Universitaria Autónoma de Nariño (AUNAR) certifica que:",
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
                  text: `El (la) señor (a) ${nombreCompleto}, identificado (a) con ${persona.tipoIdentificacion} No. ${persona.numeroIdentificacion}, obtuvo el título de "${persona.titulo_nombre}" durante el periodo de formación ${persona.periodo_formacion}.`,
                  font: "Century Gothic",
                  size: 24,
                }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: `La fecha de entrega del título fue ${formatearFecha(persona.fecha_entrega)}. Este certificado se expide para los fines que el interesado estime convenientes.`,
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
