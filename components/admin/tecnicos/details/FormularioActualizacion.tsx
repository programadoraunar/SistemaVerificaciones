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
import useSWR from "swr";
import { registrarActividadAdmin } from "@/lib/supabaseAdminPostFunctions";
import VentanaConfirmacion from "@/components/ui/Modal/ModalConfirmacion/VentanaConfirmacion";

interface FormularioActualizacionProps {
  numeroIdentificacion: string; // Prop para recibir solo el número de identificación
  onSuccess: () => void;
}

// Fetcher para usar con SWR
const fetchTecnico = async (numeroIdentificacion: string) => {
  const result = await obtenerDetallesActualizacionTecnico({
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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [idTituloAEliminar, setIdTituloAEliminar] = useState<any>(null);
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
      ? ["tecnicoActualizacion", numeroIdentificacion]
      : null,
    () => fetchTecnico(numeroIdentificacion)
  );
  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos</p>;

  const tecnicosData = data ? data[0] : null;
  const titulos = data ? data.filter((item: any) => item.id_titulo) : [];

  const onSubmit = async (data: TecnicoLaboralActualizar) => {
    if (data.nombre_tecnico) {
      try {
        const { error } = await supabase.rpc("actualizar_tecnicodatos", {
          p_numero_identificacion: data.numero_identificacion,
          p_tipo_identificacion: data.tipo_identificacion,
          p_nombre: data.nombre_tecnico,
          p_apellido: data.apellido_tecnico,
        });

        if (error) throw error;
        console.log(error);

        toast.success("Datos actualizados correctamente");
        await registrarActividadAdmin({
          description: `Se Actualizo un Egresado (${data.numero_identificacion}) Técnico Laboral`,
        });
        onSuccess();
      } catch (error) {
        console.error("Error al actualizar los datos:", error);
        alert("Hubo un error al actualizar los datos");
      }
    }
  };
  //Función que permite elimina un titulo en especifico, se lo hace directamente aquí para tener la posibilidad de revalidar datos
  const eliminarTitulo = async () => {
    try {
      if (!idTituloAEliminar) return;
      const { error } = await supabase.rpc("eliminar_titulo_tecnico", {
        p_id: idTituloAEliminar,
      });

      if (error) throw new Error(error.message);
      mutate();
      toast.success(`Título con eliminado correctamente`);
      await registrarActividadAdmin({
        description: `Se eliminó un título de un egresado Técnico laboral con Identificación ${idTituloAEliminar}`,
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
      {tecnicosData && (
        <>
          <FormularioDatosPersonales
            tipoIdentificacion={tecnicosData.tipo_identificacion}
            numeroIdentificacion={tecnicosData.numero_identificacion}
            nombre={tecnicosData.nombre_tecnico}
            apellido={tecnicosData.apellido_tecnico}
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
              title={`Agregar Nuevo Titulo a ${tecnicosData.nombre_tecnico}`}
            >
              <NuevoTituloTecnico
                onSuccess={() => {
                  handleRegistroExitoso();
                  mutate();
                }}
                numeroIdentificacion={tecnicosData.numero_identificacion}
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
