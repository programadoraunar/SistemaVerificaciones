"use client";
import { Button } from "@/components/ui/button";
import { Registro } from "@/interfaces/Registro";
import React, { useEffect, useState } from "react";

function UltimosRegistros() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulación de la obtención de los últimos registros
  useEffect(() => {
    // Datos simulados para los últimos registros
    const mockRegistros: Registro[] = [
      {
        id: 1,
        tipo: "Profesional",
        descripcion: "Juan Pérez, Ingeniero de Sistemas",
        fechaCreacion: "2024-09-01",
      },
      {
        id: 2,
        tipo: "Técnico Laboral",
        descripcion: "Ana Gómez, Técnico en Redes",
        fechaCreacion: "2024-09-02",
      },
      {
        id: 3,
        tipo: "Curso de Extensión",
        descripcion: "Curso de Programación en Python",
        fechaCreacion: "2024-09-03",
      },
      {
        id: 4,
        tipo: "Formación Académica",
        descripcion: "Maestría en Inteligencia Artificial",
        fechaCreacion: "2024-09-04",
      },
      {
        id: 4,
        tipo: "Formación Académica",
        descripcion: "Maestría en Inteligencia Artificial",
        fechaCreacion: "2024-09-04",
      },
      // Más datos simulados aquí
    ];

    // Simula la carga de datos
    setTimeout(() => {
      setRegistros(mockRegistros);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <p>Cargando los últimos registros...</p>;
  }
  return (
    <div className="bg-white p-5 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Últimos Registros Agregados</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collaps">
          <thead>
            <tr>
              <th className="border border-gray-300">Tipo</th>
              <th className="border border-gray-300">Descripción</th>
              <th className="border border-gray-300">Fecha de Creación</th>
              <th className="border border-gray-300">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                <td className="p-2">{registro.tipo}</td>
                <td className="p-2">{registro.descripcion}</td>
                <td className="p-2">
                  {new Date(registro.fechaCreacion).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <Button
                    onClick={() =>
                      alert(`Ver detalles del registro ID: ${registro.id}`)
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

export default UltimosRegistros;
