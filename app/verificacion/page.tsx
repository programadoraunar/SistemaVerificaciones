"use client";
import Footer from "@/components/Home/Footer";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface DatosGraduado {
  nombre: string;
  apellido: string;
  folio: string;
  titulo: string;
  fechaGrado: string;
  actaGrado: string;
  libro: string;
}

function Verificacion() {
  const [datosGraduado, setDatosGraduado] = useState<DatosGraduado | null>(
    null
  );
  const supabase = createClient();

  useEffect(() => {
    async function fetchDatosGraduado() {
      const { data, error } = await supabase.rpc("obtener_datos_profesional", {
        p_numero_identificacion: "1000000001", // Reemplaza con el número de identificación real
        p_programa: "Ingeniería de Sistemas", // Reemplaza con el programa real
      });
      console.log(data);
      console.log(error);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      if (data && data.length > 0) {
        const [row] = data;
        setDatosGraduado({
          nombre: row.nombre,
          apellido: row.apellido,
          folio: row.folio,
          titulo: row.titulo,
          fechaGrado: row.fecha_grado,
          actaGrado: row.acta_grado,
          libro: row.libro_registro_grado,
        });
      }
    }

    fetchDatosGraduado();
  }, [supabase]);

  if (!datosGraduado) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-center items-center lg:py-36 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Verificación del Egresado
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex flex-col">
              <label className="block text-gray-700 font-semibold mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={`${datosGraduado.nombre} ${datosGraduado.apellido}`}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
              />
              <label className="block text-gray-700 font-semibold my-2">
                Folio
              </label>
              <input
                type="text"
                value={datosGraduado.folio}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Título
              </label>
              <input
                type="text"
                value={datosGraduado.titulo}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Fecha de Grado
              </label>
              <input
                type="text"
                value={new Date(datosGraduado.fechaGrado).toLocaleDateString()}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
              />
            </div>
            <div className="flex justify-between">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Acta de Grado
                </label>
                <input
                  type="text"
                  value={datosGraduado.actaGrado}
                  disabled
                  className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Libro de Diplomas
                </label>
                <input
                  type="text"
                  value={datosGraduado.libro}
                  disabled
                  className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center py-4">
              <p className="py-2 text-red-500">
                {" "}
                Si se requiere documento con firma por favor dar click aquí *
              </p>
              <button className="p-2 bg-blueBase text-white rounded-md hover:bg-blue-800 text-center">
                Solicitar Verificación
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Verificacion;
