"use client";
import React from "react";
import { AlignmentType, Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { formatearFecha } from "@/utils/fechas";
import { identificationOptionsFormulario } from "@/constants/options";
interface GenerarDocumentoWordProps {
  persona: {
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    nombre: string;
    apellido: string;
    titulo_nombre: string;
    fecha_grado: string;
    acta_grado: string;
    folio: string;
    libro_registro_grado: string;
    numero_certificado: string;
  };
}
const getTipoIdentificacionNombre = (id: string) => {
  const tipo = identificationOptionsFormulario.find((item) => item.id === id);
  return tipo ? tipo.nombre : id; // Si no encuentra el id, devuelve el código original
};
const GenerarDocumentoWord: React.FC<GenerarDocumentoWordProps> = ({
  persona,
}) => {
  const generarDocumento = () => {
    const nombreCompleto = `${persona.nombre} ${persona.apellido}`;
    const tipoIdentificacionNombre = getTipoIdentificacionNombre(
      persona.tipoIdentificacion
    );
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
              alignment: AlignmentType.JUSTIFIED,
              children: [
                new TextRun({
                  text: `El (la) señor (a) ${nombreCompleto.toUpperCase()}, identificado (a) con ${tipoIdentificacionNombre} No. ${persona.numeroIdentificacion}, obtuvo el certificado en ${persona.titulo_nombre} con fecha de grado ${formatearFecha(persona.fecha_grado)}, se encuentra inscrito (a) en el Acta No. ${persona.acta_grado}, folio No. ${persona.folio} del libro de Certificados No. ${persona.libro_registro_grado} de los Registros Institucionales.`,
                  font: "Century Gothic",
                  size: 24,
                }),
              ],
              spacing: { before: 300, after: 300 },
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
