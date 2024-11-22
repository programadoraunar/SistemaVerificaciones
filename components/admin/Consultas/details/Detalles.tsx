"use client";
import { Button } from "@/components/ui/button";
import {
  ConsultaBusquedaId,
  ConsultaDetalles,
} from "@/interfaces/Verificacion";
import { obtenerDetallesConsultaId } from "@/lib/SupabaseAdminGetConsultas";
import { convertirAHoraColombiana } from "@/utils/fechas";
import Link from "next/link";
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
        console.log(response);
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
        {consulta.tipo_solicitante === "persona_natural" ? (
          <>
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <span className="font-bold">Numero de Identificación:</span>
                &nbsp;
                {consulta.numero_identificacion_solicitante}
              </div>
              <div className="flex">
                <span className="font-bold">País:</span>&nbsp;
                {consulta.pais_solicitante}
              </div>

              <div className="flex">
                <span className="font-bold">Region:</span>&nbsp;
                {consulta.region_solicitante}
              </div>
              <div className="flex">
                <span className="font-bold">Ciudad:</span>&nbsp;
                {consulta.ciudad_solicitante}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <span className="font-bold">Razón Social</span>&nbsp;
                {consulta.razon_social_empresa}
              </div>
              <div className="flex">
                <span className="font-bold">Cargo</span>&nbsp;
                {consulta.cargo_solicitante}
              </div>
            </div>
          </>
        )}

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
          <span className="font-bold">Nombre:</span> {consulta.nombre}{" "}
          {consulta.apellido}
        </p>
        <p>
          <span className="font-bold">Tipo Identificación:</span>{" "}
          {consulta.tipo_identificacion}
        </p>
        <p>
          <span className="font-bold">Número Identificación:</span>{" "}
          {consulta.numero_identificacion}
        </p>
        {consulta.tipo === "Tecnico Laboral" ? (
          <Button>
            <Link href="/tecnicos">Mas Información</Link>
          </Button>
        ) : consulta.tipo === "Profesional" ? (
          <div className="my-10">
            <Button>
              <Link href="/profesionales">Mas Información</Link>
            </Button>
          </div>
        ) : (
          <div className="my-10">
            <Button>
              <Link href="/extension">Mas Información</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detalles;
