"use client";
import React from "react";
import { AlignmentType, Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { formatearFecha } from "@/utils/fechas";
import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";
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
const fetchIntensidadHoraria = async (tituloNombre: string) => {
  const { data, error } = await supabase
    .from("tituloscursos")
    .select("intencidad_horaria")
    .eq("nombre_certificado", tituloNombre)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data?.intencidad_horaria || "N/A"; // Devuelve la intensidad horaria o "N/A" si no se encuentra
};
const GenerarDocumentoWord: React.FC<GenerarDocumentoWordProps> = ({
  persona,
}) => {
  const nombreCompleto = `${persona.nombre} ${persona.apellido}`;

  // Usamos SWR para obtener la intensidad horaria
  const {
    data: intensidadHoraria,
    error,
    isLoading,
  } = useSWR(persona.titulo_nombre, fetchIntensidadHoraria);

  // Si hay un error o está cargando, mostramos un mensaje de carga o error
  if (isLoading) {
    return <div>Cargando intensidad horaria...</div>;
  }

  if (error) {
    return <div>Error al cargar la intensidad horaria: {error.message}</div>;
  }

  const generarDocumento = () => {
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
                  text: `El (la) señor (a) ${nombreCompleto}, identificado (a) con ${persona.tipoIdentificacion} No. ${persona.numeroIdentificacion}, obtuvo el certificado en "${persona.titulo_nombre}", con una intensidad de ${intensidadHoraria} horas.`,
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
        e.preventDefault(); // Previene el envío del formulario.
        generarDocumento();
      }}
      className="bg-blue-zodiac-950 text-white p-2 rounded"
    >
      Verificación
    </button>
  );
};

export default GenerarDocumentoWord;
