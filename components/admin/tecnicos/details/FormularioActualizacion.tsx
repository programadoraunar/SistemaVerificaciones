"use client";
import { TecnicoLaboralActualizar } from "@/interfaces/Tecnicos";
import { obtenerDetallesActualizacionTecnico } from "@/lib/supabaseAdminGetFunctionsProfe";
import React, { useEffect, useState } from "react";
import FormularioDatosPersonales from "./FormularioDatosPersonales";
import ExpandingButton from "@/components/ui/ExpandingButton";
import FormularioTitulos from "./FormularioTitulos";
import { supabase } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import NuevoTituloTecnico from "./NuevoTituloTecnico";

interface FormularioActualizacionProps {
  numeroIdentificacion: string; // Prop para recibir solo el número de identificación
  onSuccess: () => void;
}
const FormularioActualizacion: React.FC<FormularioActualizacionProps> = ({
  numeroIdentificacion,
  onSuccess,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tecnicosData, setTecnicosData] =
    useState<TecnicoLaboralActualizar | null>(null);
  const [titulos, setTitulos] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Función para manejar el éxito del registro
  const handleRegistroExitoso = () => {
    closeModal(); // Cierra el modal
  };
  useEffect(() => {
    const fetchTecnico = async () => {
      try {
        setLoading(true);
        const result = await obtenerDetallesActualizacionTecnico({
          numero_identificacion: numeroIdentificacion,
        });
        // Establece los datos del profesional
        setTecnicosData(result[0]);
        setTitulos(result.filter((item: any) => item.id_titulo));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTecnico();
  }, [numeroIdentificacion]);
  if (loading) {
    return <p>Cargando...</p>;
  }

  const onSubmit = async (data: TecnicoLaboralActualizar) => {
    if (data.nombre_tecnico) {
      try {
        const { error } = await supabase.rpc("actualizar_tecnicodatos", {
          p_numero_identificacion: data.numero_identificacion,
          p_tipo_identificacion: data.tipo_identificacion,
          p_nombre: data.nombre_tecnico,
          p_apellido: data.apellido_tecnico,
          p_id_extension: data.id_extension,
        });

        if (error) throw error;
        console.log(error);

        toast.success("Datos actualizados correctamente");
        onSuccess();
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
        alert("Hubo un error al actualizar los datos");
      }
    }
  };
  return (
    <div className="max-w-2xl mx-auto bg-white p-5 lg:p-4 rounded-lg shadow-lg">
      {tecnicosData && (
        <>
          <FormularioDatosPersonales
            tipoIdentificacion={tecnicosData.tipo_identificacion}
            numeroIdentificacion={tecnicosData.numero_identificacion}
            nombre={tecnicosData.nombre_tecnico}
            apellido={tecnicosData.apellido_tecnico}
            extension={tecnicosData.id_extension}
            onSubmit={onSubmit} // Puedes pasar el onSubmit si necesitas manejar el envío desde aquí
          />
          <div className="py-4">
            <ExpandingButton
              buttonText="Titulo(s)"
              expandedContent={
                <FormularioTitulos
                  titulos={titulos}
                  tipoIdentificacion={tecnicosData.tipo_identificacion}
                  numeroIdentificacion={tecnicosData.numero_identificacion}
                  nombre={tecnicosData.nombre_tecnico}
                  apellido={tecnicosData.apellido_tecnico}
                  extension={tecnicosData.id_extension}
                />
              }
            />
          </div>
          <div>
            <div>
              <button
                onClick={openModal}
                className="px-4 py-2 bg-blue-zodiac-950 text-white rounded"
              >
                Registrar Nuevo +
              </button>
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              title={`Agregar Nuevo Titulo a ${tecnicosData.nombre_tecnico}`}
            >
              <NuevoTituloTecnico
                onSuccess={handleRegistroExitoso}
                numeroIdentificacion={tecnicosData.numero_identificacion}
              />
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default FormularioActualizacion;
