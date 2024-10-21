"use client";
import { useEgresado } from "@/context/EgresadoContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerInformacionEgresado } from "@/lib/SupabasePublicFunctions";
import { EgresadoVerificado } from "@/interfaces/Verificacion";
const Egresado = () => {
  const router = useRouter();
  const { egresado, identificacion } = useEgresado();
  const [datosGraduado, setDatosGraduado] = useState<EgresadoVerificado | null>(
    null
  ); // Aplica la interfaz en el estado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEgresado = async () => {
      if (!egresado) {
        router.push("/"); // Redirige si no hay egresado
        return;
      }

      try {
        const data: EgresadoVerificado[] = await obtenerInformacionEgresado({
          numero_documento: identificacion,
        });
        setDatosGraduado(data?.[0] || null); // Establece los datos del egresado
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchEgresado();
  }, [egresado, identificacion, router]);
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!datosGraduado) {
    return (
      <div className="flex justify-center items-center lg:py-36 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            No hay egresado disponible
          </h2>
          <p className="text-gray-700 text-center">
            Actualmente no hay información de egresado disponible. Por favor,
            verifica la información ingresada.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div>
        <div className="flex justify-center items-center lg:py-36 bg-gray-100 min-h-screen">
          <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Verificación de Graduado
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={`${datosGraduado.nombre} ${datosGraduado.apellido}`}
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
                  value={new Date(
                    datosGraduado.fecha_grado
                  ).toLocaleDateString()}
                  disabled
                  className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Acta de Grado
                </label>
                <input
                  type="text"
                  value={datosGraduado.acta_grado}
                  disabled
                  className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
                />
              </div>
              <div className="flex justify-center">
                <button className="p-2 bg-blueBase text-white rounded-md hover:bg-blue-800 text-center">
                  Solicitar Verificacion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Egresado;
