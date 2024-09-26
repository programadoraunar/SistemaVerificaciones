import { ProfesionalActualizar } from "@/interfaces/Profesionales";
import {
  obtenerDetallesActualizacionProfesional,
  obtenerProfesionalPorDocumento,
} from "@/lib/supabaseAdminGetFunctions";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormularioDatosPersonales from "./FormularioDatosPersonales";
import FormularioTitulos from "./FormularioTitulos";
import ExpandingButton from "@/components/ui/ExpandingButton";

interface FormularioActualizacionProps {
  numeroIdentificacion: string; // Prop para recibir solo el número de identificación
}
const FormularioActualizacion: React.FC<FormularioActualizacionProps> = ({
  numeroIdentificacion,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [professionalData, setProfessionalData] =
    useState<ProfesionalActualizar | null>(null);

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        setLoading(true);
        const result = await obtenerDetallesActualizacionProfesional({
          numero_identificacion: numeroIdentificacion,
        });
        console.log(result);
        // Establece los datos del profesional
        setProfessionalData(result[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessional();
  }, [numeroIdentificacion]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  const onSubmit = async (data: ProfesionalActualizar) => {
    try {
      console.log(data);
      // Lógica para actualizar los datos aquí
      alert("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Hubo un error al actualizar los datos");
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
                  idTitulo={professionalData.id_titulo}
                  actaGrado={professionalData.acta_grado}
                  folio={professionalData.folio}
                  fechaGrado={professionalData.fecha_grado}
                  libroRegistroGrado={professionalData.libro_registro_grado}
                  numeroDiploma={professionalData.numero_diploma}
                  onSubmit={onSubmit} // Igual aquí para manejar el envío
                />
              }
            />
          </div>
        </>
      )}
    </div>
  );
};
export default FormularioActualizacion;
