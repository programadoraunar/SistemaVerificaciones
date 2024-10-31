"use client";
import {
  ConsultaBusquedaId,
  ConsultaDetalles,
} from "@/interfaces/Verificacion";
import { obtenerDetallesConsultaId } from "@/lib/SupabaseAdminGetConsultas";
import { convertirAHoraColombiana } from "@/utils/fechas";
import React, { useEffect, useState } from "react";
interface Detalles {
  idConsulta: number;
  onSuccess: () => void;
}
const Detalles: React.FC<Detalles> = ({ idConsulta, onSuccess }) => {
  const [consulta, setConsulta] = useState<ConsultaDetalles | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchConsulta = async () => {
      try {
        const consultaId: ConsultaBusquedaId = { id: idConsulta };
        const response = await obtenerDetallesConsultaId(consultaId);
        setConsulta(response[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching consulta:", error);
        setIsError(true);
      }
    };

    fetchConsulta();
  }, [idConsulta]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar la consulta.</div>;
  }

  if (!consulta) {
    return <div>No se encontró la consulta.</div>;
  }
  return (
    <div className="p-6 bg-white rounded-lg ">
      <div className="space-y-2 text-gray-700">
        <h3 className="text-lg font-semibold text-center">
          Detalles del Solicitante
        </h3>

        <p>
          <span className="font-bold">Tipo Solicitante:</span>{" "}
          {consulta.tipo_solicitante}
        </p>
        <p>
          <span className="font-bold">Nombres:</span>{" "}
          {consulta.nombres_solicitante} {consulta.apellidos_solicitante}
        </p>
        <p>
          <span className="font-bold">Teléfono:</span>{" "}
          {consulta.telefono_solicitante}
        </p>
        <p>
          <span className="font-bold">Correo Electrónico:</span>{" "}
          {consulta.correo_electronico_solicitante}
        </p>
        <p>
          <span className="font-bold">Fecha Consulta:</span>{" "}
          {convertirAHoraColombiana(consulta.fecha_consulta)}
        </p>

        {/* Información del Profesional */}
        <h3 className="text-lg font-semibold mt-4 text-center">
          Egresado Consultado
        </h3>
        <p>
          <span className="font-bold">Nombre:</span>{" "}
          {consulta.profesional_nombre} {consulta.profesional_apellido}
        </p>
        <p>
          <span className="font-bold">Tipo Identificación:</span>{" "}
          {consulta.profesional_tipo_identificacion}
        </p>
        <p>
          <span className="font-bold">Número Identificación:</span>{" "}
          {consulta.profesional_numero_identificacion}
        </p>
      </div>
    </div>
  );
};

export default Detalles;
