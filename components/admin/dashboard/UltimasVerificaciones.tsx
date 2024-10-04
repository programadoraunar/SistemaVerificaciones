"use client";
import React, { useEffect, useState } from "react";
import { Verificacion } from "@/interfaces/Dashboard";
import { Button } from "@/components/ui/button";

function UltimasVerificaciones() {
  const [verificaciones, setVerificaciones] = useState<Verificacion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulación de la obtención de las últimas verificaciones
  useEffect(() => {
    // Simulación de datos
    const mockVerificaciones: Verificacion[] = [
      {
        id: 1,
        tipoSolicitante: "Persona natural",
        nombresSolicitante: "Juan",
        apellidosSolicitante: "Pérez",
        fechaConsulta: "2024-09-01",
      },
      {
        id: 2,
        tipoSolicitante: "Empresa",
        nombresSolicitante: "Softech Ltda.",
        apellidosSolicitante: "",
        fechaConsulta: "2024-09-02",
      },
      {
        id: 3,
        tipoSolicitante: "Empresa",
        nombresSolicitante: "Softech Ltda.",
        apellidosSolicitante: "",
        fechaConsulta: "2024-09-02",
      },
      {
        id: 4,
        tipoSolicitante: "Persona natural",
        nombresSolicitante: "Juan",
        apellidosSolicitante: "Pérez",
        fechaConsulta: "2024-09-01",
      },
      {
        id: 5,
        tipoSolicitante: "Persona natural",
        nombresSolicitante: "Juan",
        apellidosSolicitante: "Pérez",
        fechaConsulta: "2024-09-01",
      },

      // Más datos simulados aquí
    ];

    // Simula la carga de datos
    setTimeout(() => {
      setVerificaciones(mockVerificaciones);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <p>Cargando las últimas verificaciones...</p>;
  }

  return (
    <div className="bg-white p-5 rounded-lg">
      <h2 className="text-lg font-bold mb-4">
        Resumen de Consulta de Verificación de Titulo
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse min-w-[640px]">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Tipo Solicitante</th>
              <th className="border border-gray-300 p-2">
                Nombres Solicitante
              </th>
              <th className="border border-gray-300 p-2">Fecha Consulta</th>
              <th className="border border-gray-300 p-2">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {verificaciones.map((verificacion) => (
              <tr key={verificacion.id}>
                <td className="border border-gray-300 p-2">
                  {verificacion.tipoSolicitante}
                </td>
                <td className="border border-gray-300 p-2">
                  {verificacion.nombresSolicitante}{" "}
                  {verificacion.apellidosSolicitante}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(verificacion.fechaConsulta).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <Button
                    onClick={() =>
                      alert(
                        `Ver detalles de la verificación ID: ${verificacion.id}`
                      )
                    }
                  >
                    Ver Detalles
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UltimasVerificaciones;
