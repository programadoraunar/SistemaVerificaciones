"use client";
import { useEgresado } from "@/context/EgresadoContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerInformacionEgresado } from "@/lib/SupabasePublicFunctions";
import { EgresadoVerificado } from "@/interfaces/Verificacion";
import { formatearFecha } from "@/utils/fechas";
import Loading from "../ui/Loading";
import { useSolicitante } from "@/context/SolicitanteContext";
import emailjs from "@emailjs/browser";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import Modal from "../ui/Modal";

const Egresado = () => {
  const router = useRouter();
  const { egresado, identificacion, formacionAcademicaContext } = useEgresado();
  const { solicitanteCorreo, solicitanteNombre } = useSolicitante();
  const [datosGraduado, setDatosGraduado] = useState<EgresadoVerificado[]>([]); // Aplica la interfaz en el estado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEgresado = async () => {
      if (!egresado) {
        router.push("/");
        return;
      }
      try {
        const data: EgresadoVerificado[] = await obtenerInformacionEgresado({
          numero_documento: identificacion,
          formacionAcademica: formacionAcademicaContext,
        });

        setDatosGraduado(data); // Establece los datos del egresado como un array
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchEgresado();
  }, [egresado, identificacion, router]);

  const sendEmail = () => {
    const templateParams = {
      solicitante_nombre: solicitanteNombre,
      solicitante_correo: solicitanteCorreo,
      egresado_titulo: datosGraduado[0]?.titulo || "",
      egresado_nombre: datosGraduado[0]?.nombre || "", // Maneja el caso donde no hay datos
      egresado_documento: identificacion,
    };
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE!,
        process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE!,
        templateParams,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAIL_JS_ANON_KEY!,
        }
      )
      .then(
        () => {
          setIsModalOpen(true);
          setTimeout(() => {
            router.push("/");
          }, 7000);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (loading) {
    return <Loading />;
  }

  if (!datosGraduado && !datosGraduado) {
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
    <div>
      <div className="bg-hero flex justify-center items-center lg:py-36 bg-gray-100 min-h-screen">
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
                value={`${datosGraduado[0].nombre} ${datosGraduado[0].apellido}`}
                disabled
                className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
              />
            </div>
            {datosGraduado.map((item, index) => (
              <div key={index}>
                <label className="block text-gray-700 font-semibold mb-2">
                  Título {index + 1}
                </label>
                <input
                  type="text"
                  value={item.titulo}
                  disabled
                  className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
                />
                <div className="flex flex-col py-5 md:flex-row md:gap-3 items-center w-full">
                  <div className="flex flex-col w-[100%] md:w-[50%]">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Fecha de Grado
                    </label>
                    <input
                      type="text"
                      value={formatearFecha(item.fecha_grado)}
                      disabled
                      className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
                    />
                  </div>
                  <div className="flex flex-col w-[100%] md:w-[50%]">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Acta de Grado
                    </label>
                    <input
                      type="text"
                      value={item.acta_grado}
                      disabled
                      className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:gap-3 items-center">
                  <div className="flex flex-col w-[100%] md:w-[50%]">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Folio
                    </label>
                    <input
                      type="text"
                      value={item.folio}
                      disabled
                      className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
                    />
                  </div>

                  <div className="flex flex-col w-[100%] md:w-[50%]">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Libro de Registros
                    </label>
                    <input
                      type="text"
                      value={item.libro_registro_grado}
                      disabled
                      className="w-full bg-gray-100 border border-gray-300 rounded-md p-2 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div
              className="py-3
            
            "
            >
              <span className="text-red-400 font-bold">
                * Si usted(es) requiere de una certificación firmada dar click
                aquí
              </span>
            </div>

            <div className="flex justify-center">
              <button
                className="p-2 bg-blue-zodiac-950 text-white rounded-md text-center"
                onClick={sendEmail}
              >
                Solicitar Verificación
              </button>
            </div>
            <div className="flex justify-end">
              <Link
                className="p-2 bg-blue-zodiac-950 text-white rounded-md hover:bg-blue-800 text-center"
                href="/"
              >
                <IoMdArrowBack />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Solicitud Enviada"
      >
        <span className="text-justify">
          Su solicitud de verificación de título ha sido recibida. La respuesta
          será enviada al correo electrónico registrado en su solicitud
        </span>
      </Modal>
    </div>
  );
};

export default Egresado;
