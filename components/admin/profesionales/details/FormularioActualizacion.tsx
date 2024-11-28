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
import { registrarActividadAdmin } from "@/lib/supabaseAdminPostFunctions";
import VentanaConfirmacion from "@/components/ui/Modal/ModalConfirmacion/VentanaConfirmacion";

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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [idTituloAEliminar, setIdTituloAEliminar] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Función para manejar el éxito del registro
  const handleRegistroExitoso = () => {
    closeModal(); // Cierra el modal
  };
  const confirmarEliminacion = (idEliminar: any) => {
    setIdTituloAEliminar(idEliminar);
    setIsConfirmOpen(true);
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
        });

        if (error) throw error;
        console.log(error);

        toast.success("Datos actualizados correctamente");
        await registrarActividadAdmin({
          description: `Se Actualizo un Egresado Profesional con Identificación (${data.numero_identificacion}) `,
        });
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
  const eliminarTitulo = async () => {
    try {
      if (!idTituloAEliminar) return;
      const { error } = await supabase.rpc("eliminar_titulo_profesional", {
        p_id: idTituloAEliminar,
      });

      if (error) throw new Error(error.message);

      mutate(); // Actualizar los datos tras eliminar
      toast.success(`Título eliminado correctamente`);
      await registrarActividadAdmin({
        description: `Se eliminó un título de un egresado profesional con Identificación ${idTituloAEliminar}`,
      });
    } catch (error) {
      toast.error(`Error al eliminar el título`);
    } finally {
      setIdTituloAEliminar(null); // Limpiar el ID tras la eliminación
      setIsConfirmOpen(false); // Cerrar la ventana de confirmación
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
                  eliminarTitulo={confirmarEliminacion}
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
      <VentanaConfirmacion
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={eliminarTitulo}
      />
    </div>
  );
};
export default FormularioActualizacion;
