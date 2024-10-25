"use client";
import { ProfesionalRegistro } from "@/interfaces/Profesionales";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";
import { identificationOptionsFormulario } from "@/constants/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { formularioRegistroSchema } from "@/validations/validationAdminSchemas";
import Loading from "../../ui/Loading";
import { registrarProfesionalConTitulo } from "@/lib/supabaseAdminPostFunctions";
import { toast, Toaster } from "react-hot-toast";

interface FormularioRegistroProps {
  onSuccess: () => void; // Nueva prop para cerrar el modal
}
/**
 * Componente de formulario para registrar profesionales con título, técnicos o cursos de extensión.
 * Este formulario permite ingresar la información de identificación, datos personales, y detalles académicos
 * para registrar un profesional, técnico o curso de extension en el sistema.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {function} props.onSuccess - Función que se ejecuta después de registrar exitosamente un profesional.
 *
 * @typedef {Object} ProfesionalRegistro
 * @property {string} tipo_identificacion - Tipo de identificación seleccionado.
 * @property {string} numero_identificacion - Número de identificación del profesional.
 * @property {string} nombre - Nombre del profesional.
 * @property {string} apellido - Apellido del profesional.
 * @property {string} numero_diploma - Número del diploma obtenido.
 * @property {string} id_titulo - ID del título seleccionado del profesional.
 * @property {string} acta_grado - Número del acta de grado.
 * @property {string} folio - Número del folio.
 * @property {string} fecha_grado - Fecha de grado en formato 'YYYY-MM-DD'.
 * @property {string} libro_registro_grado - Número del libro de registro de grado.
 * @property {string} id_extension - ID de la extensión seleccionada.
 *
 * @typedef {Object} FormularioRegistroProps
 * @property {function} onSuccess - Función que se llama al registrar exitosamente el profesional.
 *
 * @returns {JSX.Element} Formulario de registro de profesionales y técnicos.
 *
 * @example
 * <FormularioRegistro onSuccess={() => console.log("Registro exitoso")} />
 */
function FormularioRegistro({ onSuccess }: FormularioRegistroProps) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfesionalRegistro>({
    resolver: zodResolver(formularioRegistroSchema),
  });

  const fetcher = async (url: string) => {
    const { data, error } = await supabase.from(url).select();
    if (error) throw new Error(error.message);
    return data;
  };

  const { data: titulos } = useSWR("titulos", fetcher);
  const { data: extensiones } = useSWR("extension", fetcher);

  const onSubmit: SubmitHandler<ProfesionalRegistro> = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      await registrarProfesionalConTitulo(data);

      onSuccess(); // Cerrar el modal al registrar con éxito
    } catch (error) {
      console.log(error);
      // Verifica si el error tiene la estructura esperada
      if (typeof error === "object" && error !== null && "message" in error) {
        const customError = error as { message: string; code?: string }; // Cast para acceder a 'message' y 'code'

        toast.error(`${customError.message}`); // Muestra el mensaje de error
      } else {
        // Si no tiene la estructura esperada, muestra un mensaje genérico
        toast.error("Ocurrió un error inesperado.");
      }
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto  bg-white p-5 lg:p-4 rounded-lg shadow-lg"
      >
        <div className="flex flex-col lg:flex-row w-full lg:gap-8">
          {/* Tipo de Identificación */}
          <div className="mb-4 w-[100%] lg:w-[50%] ">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Tipo de Identificación
            </label>

            <select
              {...register("tipo_identificacion")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.numero_identificacion
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <option disabled selected>
                Seleccione una identificación
              </option>
              {identificationOptionsFormulario.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.nombre}
                </option>
              ))}
            </select>
            {errors.tipo_identificacion && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tipo_identificacion.message}
              </p>
            )}
          </div>

          {/* Número de Documento */}
          <div className="mb-4 w-[100%] lg:w-[50%]">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Número de Documento
            </label>
            <input
              type="text"
              {...register("numero_identificacion")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.numero_identificacion
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Número de documento"
            />
            {errors.numero_identificacion && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numero_identificacion.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:gap-8">
          {/* Nombre */}
          <div className="mb-4  w-[100%] lg:w-[50%]">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Nombres
            </label>
            <input
              type="text"
              {...register("nombre")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.nombre ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nombre"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>

          {/* Apellido */}
          <div className="mb-4 w-[100%] lg:w-[50%]">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Apellidos
            </label>
            <input
              type="text"
              {...register("apellido")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.apellido ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Apellido"
            />
            {errors.apellido && (
              <p className="text-red-500 text-sm mt-1">
                {errors.apellido.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full  lg:gap-8">
          {/* Programa */}
          <div className="mb-4 w-[100%] lg:w-[50%]">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Numero de Diploma
            </label>
            <input
              type="text"
              {...register("numero_diploma")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.numero_diploma ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Número de Diploma"
            />
            {errors.numero_diploma && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numero_diploma.message}
              </p>
            )}
          </div>
          {/* Título */}
          <div className="mb-4 w-[100%] lg:w-[50%]">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Título
            </label>
            <select
              {...register("id_titulo")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.id_titulo ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option>Seleccionar Título</option>
              {titulos &&
                titulos.map((titulo: any) => (
                  <option key={titulo.id} value={titulo.id}>
                    {titulo.nombre}
                  </option>
                ))}
            </select>
            {errors.id_titulo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.id_titulo.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:gap-8">
          {/* Acta de Grado */}
          <div className="mb-4 w-[100%] lg:w-[50%]">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Acta de Grado
            </label>
            <input
              type="text"
              {...register("acta_grado")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.acta_grado ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Acta de grado"
            />
            {errors.acta_grado && (
              <p className="text-red-500 text-sm mt-1">
                {errors.acta_grado.message}
              </p>
            )}
          </div>

          {/* Folio */}
          <div className="mb-4 w-[100%] lg:w-[50%]">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Folio
            </label>
            <input
              type="text"
              {...register("folio")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.folio ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Folio"
            />
            {errors.folio && (
              <p className="text-red-500 text-sm mt-1">
                {errors.folio.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:gap-8">
          {/* Fecha de Grado */}
          <div className="mb-4w-[100%] lg:w-[50%]">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Fecha de Grado
            </label>
            <input
              type="date"
              {...register("fecha_grado")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.fecha_grado ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fecha_grado && (
              <p className="text-red-500 text-sm mt-1">
                {errors.acta_grado?.message}
              </p>
            )}
          </div>

          {/* Libro Registro de Grado */}
          <div className="mb-4 w-[100%] lg:w-[50%]">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Libro de Registro de Grado
            </label>
            <input
              type="text"
              {...register("libro_registro_grado")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.libro_registro_grado
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Libro de registro de grado"
            />
            {errors.libro_registro_grado && (
              <p className="text-red-500 text-sm mt-1">
                {errors.libro_registro_grado.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full lg:gap-8">
          <div className="mb-4 w-[100%] lg:w-[50%]">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Extension
            </label>
            <select
              {...register("id_extension")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.id_titulo ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccionar la Extension</option>
              {extensiones &&
                extensiones.map((extension: any) => (
                  <option key={extension.id} value={extension.id}>
                    {extension.nombre}
                  </option>
                ))}
            </select>
            {errors.id_titulo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.id_titulo.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Registrar</Button>
        </div>
        <Toaster />
      </form>
    </>
  );
}

export default FormularioRegistro;
