"use client";
import { ProfesionalRegistro } from "@/interfaces/Profesionales";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";
function FormularioRegistro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfesionalRegistro>();

  const fetcher = async (url: string) => {
    const { data, error } = await supabase.from(url).select();
    if (error) throw new Error(error.message);
    return data;
  };

  // Uso de SWR para obtener programas y títulos
  const { data: programas, error: programasError } = useSWR(
    "programas",
    fetcher
  );
  const { data: titulos, error: titulosError } = useSWR("titulos", fetcher);

  // Manejo de envío de formulario
  const onSubmit: SubmitHandler<ProfesionalRegistro> = (data) => {
    console.log(data);
    // Aquí puedes manejar el envío de datos, como una petición a una API
  };
  return (
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
          <input
            type="text"
            {...register("tipo_identificacion", { required: true })}
            className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
              errors.tipo_identificacion ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tipo de identificación"
          />
          {errors.tipo_identificacion && (
            <p className="text-red-500 text-sm mt-1">
              Este campo es requerido.
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
            {...register("numero", { required: true })}
            className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
              errors.numero ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Número de documento"
          />
          {errors.numero && (
            <p className="text-red-500 text-sm mt-1">
              Este campo es requerido.
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
            {...register("nombre", { required: true })}
            className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
              errors.nombre ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nombre"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">
              Este campo es requerido.
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
            {...register("apellido", { required: true })}
            className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
              errors.apellido ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Apellido"
          />
          {errors.apellido && (
            <p className="text-red-500 text-sm mt-1">
              Este campo es requerido.
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
            {...register("id_programa", { required: true })}
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
              Este campo es requerido.
            </p>
          )}
        </div>

        {/* Título */}
        <div className="mb-4 w-[100%] lg:w-[50%]">
          <label className="block text-gray-700 text-md font-bold mb-2">
            Título
          </label>
          <select
            {...register("id_titulo", { required: true })}
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
              Este campo es requerido.
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
            {...register("acta_grado", { required: true })}
            className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
              errors.acta_grado ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Acta de grado"
          />
          {errors.acta_grado && (
            <p className="text-red-500 text-sm mt-1">
              Este campo es requerido.
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
            {...register("folio", { required: true })}
            className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
              errors.folio ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Folio"
          />
          {errors.folio && (
            <p className="text-red-500 text-sm mt-1">
              Este campo es requerido.
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
            {...register("fecha_grado", { required: true })}
            className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
              errors.fecha_grado ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fecha_grado && (
            <p className="text-red-500 text-sm mt-1">
              Este campo es requerido.
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
            {...register("libro_registro_grado", { required: true })}
            className={`w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
              errors.libro_registro_grado ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Libro de registro de grado"
          />
          {errors.libro_registro_grado && (
            <p className="text-red-500 text-sm mt-1">
              Este campo es requerido.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Registrar</Button>
      </div>
    </form>
  );
}

export default FormularioRegistro;
