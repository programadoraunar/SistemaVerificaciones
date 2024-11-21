import { ProfesionalActualizar } from "@/interfaces/Profesionales";
import { obtenerDetallesActualizacionProfesional } from "@/lib/supabaseAdminGetFunctionsProfe";
import React, { useState } from "react";
import FormularioDatosPersonales from "../details/FormularioDatosPersonales";
import FormularioTitulos from "../details/FormularioTitulos";
import ExpandingButton from "@/components/ui/ExpandingButton";
import { supabase } from "@/utils/supabase/client";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import NuevoTituloProfesional from "./NuevoTituloProfesional";
import useSWR from "swr";

interface FormularioActualizacionProps {
  numeroIdentificacion: string; // Prop para recibir solo el número de identificación
  onSuccess: () => void;
}

// Fetcher para usar con SWR
const fetchProfesional = async (numeroIdentificacion: string) => {
  const result = await obtenerDetallesActualizacionProfesional({
    numero_identificacion: numeroIdentificacion,
  });
  return result;
};

const FormularioActualizacion: React.FC<FormularioActualizacionProps> = ({
  numeroIdentificacion,
  onSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Función para manejar el éxito del registro
  const handleRegistroExitoso = () => {
    closeModal(); // Cierra el modal
  };
  const { data, error, isLoading, mutate } = useSWR(
    numeroIdentificacion
      ? ["profesionalActualizacion", numeroIdentificacion]
      : null,
    () => fetchProfesional(numeroIdentificacion)
  );
  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos</p>;
  const professionalData = data ? data[0] : null;
  console.log(professionalData);
  const titulos = data ? data.filter((item: any) => item.id_titulo) : [];

  const onSubmit = async (data: ProfesionalActualizar) => {
    // si contiene un nombre lo que llega es por que hay que actualizar los datos personales de los administradores
    if (data.nombre_profesional) {
      try {
        const { error } = await supabase.rpc("actualizar_profesionaldatos", {
          p_numero_identificacion: data.numero_identificacion,
          p_tipo_identificacion: data.tipo_identificacion,
          p_nombre: data.nombre_profesional,
          p_apellido: data.apellido_profesional,
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
    } else {
      // si no hay es para actualizar los títulos del profesional
    }
  };
  //Función que permite elimina un titulo en especifico, se lo hace directamente aquí para tener la posibilidad de revalidar datos
  const eliminarTitulo = async (idEliminar: any) => {
    try {
      const { error } = await supabase.rpc("eliminar_titulo_profesional", {
        p_id: idEliminar,
      });

      if (error) throw new Error(error.message);
      console.log(idEliminar);
      mutate();
      toast.success(`Título con eliminado correctamente`);
    } catch (error) {
      toast.error(`Error al eliminar el título`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-5 lg:p-4 rounded-lg shadow-lg">
      {professionalData && (
        <>
          <FormularioDatosPersonales
            tipoIdentificacion={professionalData.tipo_identificacion}
            numeroIdentificacion={professionalData.numero_identificacion}
            nombre={professionalData.nombre_profesional}
            apellido={professionalData.apellido_profesional}
            extension={professionalData.id_extension}
            onSubmit={onSubmit} // Puedes pasar el onSubmit si necesitas manejar el envío desde aquí
          />
          <div className="py-4">
            <ExpandingButton
              buttonText="Titulo(s)"
              expandedContent={
                <FormularioTitulos
                  titulos={titulos}
                  tipoIdentificacion={professionalData.tipo_identificacion}
                  numeroIdentificacion={professionalData.numero_identificacion}
                  nombre={professionalData.nombre_profesional}
                  apellido={professionalData.apellido_profesional}
                  extension={professionalData.id_extension}
                  eliminarTitulo={eliminarTitulo}
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
                Nuevo Titulo
              </button>
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              title={`Agregar Nuevo Titulo a ${professionalData.nombre_profesional}`}
            >
              <NuevoTituloProfesional
                numeroIdentificacion={professionalData.numero_identificacion}
                onSuccess={handleRegistroExitoso}
              />
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};
export default FormularioActualizacion;
