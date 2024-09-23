"use client";
import { ProfesionalRegistro } from "@/interfaces/Profesionales";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";
import {
  formaciones,
  identificationOptionsFormulario,
} from "@/constants/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { formularioRegistroSchema } from "@/validations/validationAdminSchemas";
import Loading from "../ui/Loading";
import { registrarProfesionalConTitulo } from "@/lib/supabaseAdminPostFunctions";

function FormularioRegistro() {
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

  const { data: programas } = useSWR("programas", fetcher);
  const { data: titulos } = useSWR("titulos", fetcher);

  const onSubmit: SubmitHandler<ProfesionalRegistro> = async (data) => {
    setIsLoading(true);
    try {
      const result = await registrarProfesionalConTitulo(data);
      console.log(result);
    } catch (error) {
      console.error("Error al registrar el profesional:", error);
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
              className="w-full text-sm p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-200"
            >
              <option disabled selected>
                Seleccione una identificación
              </option>
              {identificationOptionsFormulario.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>

          {/* Número de Documento */}
          <div className="mb-4 w-[100%] lg:w-[50%]">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Número de Documento
            </label>
            <input
              type="text"
              {...register("numero")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.numero ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Número de documento"
            />
            {errors.numero && (
              <p className="text-red-500 text-sm mt-1">
                {errors.numero.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full lg:gap-8">
          {/* Nombre */}
          <div className="mb-4  w-[100%] lg:w-[50%]">
            <label className="block text-gray-700 text-md font-bold mb-2">
              Nombre
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
              Apellido
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
              Programa
            </label>
            <select
              {...register("id_programa")}
              className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
                errors.id_programa ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccionar Programa</option>
              {programas &&
                programas.map((programa: any) => (
                  <option key={programa.id} value={programa.id}>
                    {programa.nombre}
                  </option>
                ))}
            </select>
            {errors.id_programa && (
              <p className="text-red-500 text-sm mt-1">
                {errors.id_programa.message}
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
              <option value="">Seleccionar Título</option>
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

        <div className="flex justify-end">
          <Button type="submit">Registrar</Button>
        </div>
      </form>
    </>
  );
}

export default FormularioRegistro;
