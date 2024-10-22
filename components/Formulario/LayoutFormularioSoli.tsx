"use client";
import { useState } from "react";
import FormularioPersona from "./FormularioPersona";
import FormularioEmpresa from "./FormularioEmpresa";
import {
  FormularioEmpresaType,
  FormularioPersonaType,
} from "../../validations/validationSchema";
import ExpandingButton from "../ui/ExpandingButton";
import {
  formaciones,
  identificationOptionsFormulario,
} from "@/constants/options";
import { supabase } from "@/utils/supabase/client";
import {
  registrarConsultaConEgresado,
  registrarConsultaConEgresadoEmpresas,
  verificarEgresado,
} from "@/lib/SupabasePublicFunctions";
import Modal from "../ui/Modal";
import { useRouter } from "next/navigation";
import { useEgresado } from "@/context/EgresadoContext";
import Loading from "../ui/Loading";

const LayoutFormularioSoli: React.FC = () => {
  const router = useRouter();
  const [tipoSolicitante, setTipoSolicitante] = useState("persona");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { egresado, setEgresado, identificacion, setIdentificacion } =
    useEgresado();
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [datosAdicionales, setDatosAdicionales] = useState({
    tipoIdentificacionEgresado: "",
    numeroIdentificacionEgresado: "",
    formacionAcademicaEgresado: "",
  });
  const [errors, setErrors] = useState({
    tipoIdentificacionEgresado: "",
    numeroIdentificacionEgresado: "",
    formacionAcademicaEgresado: "",
  });

  const handleTipoSolicitanteChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTipoSolicitante(e.target.value);
  };

  const handleDatosAdicionalesChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Convertir a número si es el campo de formación académica
    const newValue =
      name === "formacionAcademicaEgresado" ? Number(value) : value;

    setDatosAdicionales((prev) => ({ ...prev, [name]: newValue }));
  };

  const validate = () => {
    const newErrors = {
      tipoIdentificacionEgresado: "",
      numeroIdentificacionEgresado: "",
      formacionAcademicaEgresado: "",
    };

    if (!datosAdicionales.tipoIdentificacionEgresado) {
      newErrors.tipoIdentificacionEgresado =
        "El tipo de identificación es requerido.";
    }

    if (!datosAdicionales.numeroIdentificacionEgresado) {
      newErrors.numeroIdentificacionEgresado =
        "El número de identificación es requerido.";
    } else if (!/^\d+$/.test(datosAdicionales.numeroIdentificacionEgresado)) {
      newErrors.numeroIdentificacionEgresado =
        "El número de identificación debe contener solo números.";
    }

    if (!datosAdicionales.formacionAcademicaEgresado) {
      newErrors.formacionAcademicaEgresado =
        "La formación académica es requerida.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handlePersonaSubmit = async (data: FormularioPersonaType) => {
    if (validate()) {
      const datosCompletos = { ...data, ...datosAdicionales };
      console.log("Datos completos Persona:", datosCompletos);
      // Prepara los datos  para verificar si existe el egresado
      const datosVerificacion = {
        tipoIdentificacionEgresado: datosAdicionales.tipoIdentificacionEgresado,
        numeroIdentificacionEgresado:
          datosAdicionales.numeroIdentificacionEgresado,
        formacionAcademicaEgresado: Number(
          datosAdicionales.formacionAcademicaEgresado
        ), // Convertir a número
      };
      try {
        setIsLoading(true);
        const datos = await verificarEgresado(datosVerificacion);
        console.log(datos);
        if (datos) {
          // Si existe el egresado, se procede a guardar la información de la persona
          setIdentificacion(datosVerificacion.numeroIdentificacionEgresado);
          setEgresado(datos);
          await registrarConsultaConEgresado({
            nombresSolicitante: datosCompletos.nombres,
            apellidosSolicitante: datosCompletos.apellidos,
            tipoIdentificacionSolicitante: datosCompletos.tipoIdentificacion,
            numeroIdentificacionSolicitante: datosCompletos.numeroDocumento,
            telefonoSolicitante: datosCompletos.telefono,
            correoElectronicoSolicitante: datosCompletos.correoElectronico,
            paisSolicitante: datosCompletos.pais,
            regionSolicitante: datosCompletos.subcountry,
            ciudadSolicitante: datosCompletos.ciudad,
            formacionAcademicaEgresado:
              datosVerificacion.formacionAcademicaEgresado,
            numeroIdentificacionEgresado:
              datosVerificacion.numeroIdentificacionEgresado,
          });
          setIsLoading(false);
          router.push("/verificacion");
        } else {
          setIsLoading(false);
          openModal();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEmpresaSubmit = async (data: FormularioEmpresaType) => {
    if (validate()) {
      const datosCompletos = { ...data, ...datosAdicionales };
      console.log("Datos completos Empresa:", datosCompletos);
      // Maneja los datos completos aquí
      // Prepara los datos  para verificar si existe el egresado
      const datosVerificacion = {
        tipoIdentificacionEgresado: datosAdicionales.tipoIdentificacionEgresado,
        numeroIdentificacionEgresado:
          datosAdicionales.numeroIdentificacionEgresado,
        formacionAcademicaEgresado: Number(
          datosAdicionales.formacionAcademicaEgresado
        ), // Convertir a número
      };
      try {
        setIsLoading(true);
        const datos = await verificarEgresado(datosVerificacion);
        if (datos) {
          // Si existe el egresado, se procede a guardar la información de la persona
          setEgresado(datos);
          setIdentificacion(datosVerificacion.numeroIdentificacionEgresado);
          await registrarConsultaConEgresadoEmpresas({
            apellidosSolicitante: datosCompletos.apellidosSolicitante,
            cargo: datosCompletos.cargoSolicitante,
            correoElectronicoSolicitante: datosCompletos.correoElectronico,
            formacionAcademicaEgresado:
              datosVerificacion.formacionAcademicaEgresado,
            nit: datosCompletos.nit,
            nombresSolicitante: datosCompletos.nombresSolicitante,
            numeroIdentificacionEgresado:
              datosCompletos.numeroIdentificacionEgresado,
            razon: datosCompletos.nit,
            telefonoSolicitante: datosCompletos.telefono,
          });
          setIsLoading(false);
          router.push("/verificacion");
        } else {
          setIsLoading(false);
          openModal();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="p-6 lg:w-[40%] bg-white shadow-md rounded-md">
      <h2 className="text-center text-3xl font-bold">
        Verifica el título académico
      </h2>
      <p className="border-b-2 border-blue-950 py-2 my-2 font-bold">
        <span className="pl-2">Datos del Egresado</span>
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-2">
        {/* Tipo de Identificación */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Tipo de Identificación
          </label>
          <select
            name="tipoIdentificacionEgresado"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-sm"
            required
            onChange={handleDatosAdicionalesChange}
            value={datosAdicionales.tipoIdentificacionEgresado}
          >
            <option disabled value="">
              Seleccione una identificación
            </option>
            {identificationOptionsFormulario.map((option, index) => (
              <option value={option.id} key={index}>
                {option.nombre}
              </option>
            ))}
          </select>
          {errors.tipoIdentificacionEgresado && (
            <p className="text-red-500 text-sm">
              {errors.tipoIdentificacionEgresado}
            </p>
          )}
        </div>
        {/* Número de Identificación */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Número de Identificación
          </label>
          <input
            type="text"
            name="numeroIdentificacionEgresado"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-sm"
            required
            onChange={handleDatosAdicionalesChange}
            value={datosAdicionales.numeroIdentificacionEgresado}
          />
          {errors.numeroIdentificacionEgresado && (
            <p className="text-red-500 text-sm">
              {errors.numeroIdentificacionEgresado}
            </p>
          )}
        </div>
      </div>
      <div className="p-2">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Formación Académica
        </label>
        <select
          name="formacionAcademicaEgresado"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 text-sm"
          required
          onChange={handleDatosAdicionalesChange}
          value={datosAdicionales.formacionAcademicaEgresado}
        >
          <option disabled value="">
            Seleccione una formación
          </option>
          {formaciones.map((option, index) => (
            <option value={option.id} key={index}>
              {option.nombre}
            </option>
          ))}
        </select>
        {errors.formacionAcademicaEgresado && (
          <p className="text-red-500 text-sm">
            {errors.formacionAcademicaEgresado}
          </p>
        )}
      </div>
      {/* Datos del Solicitante */}

      <p className="border-b-2 border-blue-950 py-2 my-2 font-bold">
        <span className="pl-2">Datos del Solicitante</span>
      </p>
      {/* Tipo de Solicitante */}
      <div className="pl-2">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Tipo de Solicitante
        </label>
        <div className="flex space-x-4 py-2">
          <label className="flex items-center text-sm">
            <input
              type="radio"
              name="tipoSolicitante"
              value="persona"
              checked={tipoSolicitante === "persona"}
              onChange={handleTipoSolicitanteChange}
              className="mr-2"
            />
            Persona natural
          </label>
          <label className="flex items-center text-sm">
            <input
              type="radio"
              name="tipoSolicitante"
              value="empresa"
              checked={tipoSolicitante === "empresa"}
              onChange={handleTipoSolicitanteChange}
              className="mr-2"
            />
            Empresa
          </label>
        </div>
      </div>
      {tipoSolicitante === "persona" && (
        <FormularioPersona onSubmit={handlePersonaSubmit} />
      )}
      {tipoSolicitante === "empresa" && (
        <FormularioEmpresa onSubmit={handleEmpresaSubmit} />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="¡Egresado No Encontrado!"
      >
        El egresado no ha sido encontrado. Por favor, verifique que ha ingresado
        correctamente su número de identificación, que ha seleccionado el tipo
        de identificación correcto y que ha escogido la formación académica
        adecuada.
      </Modal>

      {!isLoading ? <></> : <Loading />}
    </div>
  );
};

export default LayoutFormularioSoli;
