"use client";
import React from "react";
import { AlignmentType, Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { formatearFecha } from "@/utils/fechas";
import { Persona } from "@/interfaces/Persona";
import { ProfesionalConTitulo } from "@/interfaces/Profesionales";

interface GenerarDocumentoWordProps {
  persona: Persona;
}

const GenerarDocumentoWord: React.FC<GenerarDocumentoWordProps> = ({
  persona,
}) => {
  const esProfesional = (p: Persona): p is ProfesionalConTitulo =>
    (p as ProfesionalConTitulo).id_profesional !== undefined;

  const generarDocumento = () => {
    const nombre = esProfesional(persona)
      ? `${persona.nombre_profesional} ${persona.apellido_profesional}`
      : `${persona.nombre_tecnico} ${persona.apellido_tecnico}`;

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
              spacing: {
                before: 300,
                after: 600,
              },
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
              spacing: {
                before: 300,
                after: 300,
              },
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: `El (la) señor (a) ${nombre}, identificado (a) con cédula de ciudadanía No. ${persona.numero_identificacion}, obtuvo el título de ${persona.titulo_nombre} con fecha de grado ${formatearFecha(persona.fecha_grado)}, se encuentra inscrito (a) en el Acta No. ${persona.acta_grado}, folio No. ${persona.folio} del libro de Diplomas No. ${persona.libro_registro_grado} de los Registros Institucionales.`,
                  font: "Century Gothic",
                  size: 24,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Verificacion_Titulo_${persona.numero_identificacion}.docx`);
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
