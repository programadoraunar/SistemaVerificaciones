"use client";
import { Button } from "@/components/ui/button";
import { Extension } from "@/interfaces/Extensiones";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
const fetcher = async () => {
  const { data, error } = await supabase
    .from("extension")
    .select("*")
    .order("id", { ascending: true });
  if (error) throw error;
  return data;
};
const AdministrarExtensiones = () => {
  const { data: extensiones, error } = useSWR<Extension[]>(
    "extenciones",
    fetcher
  );
  const [nombre, setNombre] = useState("");
  const [idEditar, setIdEditar] = useState<number | null>(null);
  const formularioRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
    if (idEditar && extensiones) {
      const extensionSeleccionada = extensiones.find((t) => t.id === idEditar);
      if (extensionSeleccionada) {
        setNombre(extensionSeleccionada.nombre);
      }
    }
  }, [idEditar, extensiones]);
  const limpiarFormulario = () => {
    setNombre("");
    setIdEditar(null);
  };
  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (idEditar) {
        const { error } = await supabase
          .from("extensiones")
          .update({ nombre })
          .eq("id", idEditar);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("extensiones")
          .insert([{ nombre }]);
        if (error) throw error;
      }
      mutate("extensiones");
      limpiarFormulario();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const editarExtension = (extension: Extension) => {
    setIdEditar(extension.id);
    formularioRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const cancelarEdicion = () => {
    limpiarFormulario();
  };

  if (error) return <div>Error al cargar las extensiones</div>;
  if (!extensiones) return <div>Cargando...</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Gestión de Extensiones
      </h2>
      <div className="container mx-auto">
        <form
          ref={formularioRef}
          className="space-y-4 mb-6"
          onSubmit={manejarSubmit}
        >
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la Extensión"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-4">
            <Button type="submit">{idEditar ? "Actualizar" : "Agregar"}</Button>
            {idEditar && (
              <Button
                type="button"
                onClick={cancelarEdicion}
                variant={"outline"}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left text-gray-700 font-semibold">
                  Extension
                </th>
                <th className="p-4 text-left text-gray-700 font-semibold w-32">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {extensiones.map((extension) => (
                <tr
                  key={extension.id}
                  className={`border-b ${idEditar === extension.id ? "bg-gray-100" : ""}`}
                >
                  <td className="p-2">{extension.nombre}</td>
                  <td className="p-2 space-y-2 w-32">
                    <Button
                      onClick={() => editarExtension(extension)}
                      className="y-2 rounded w-full"
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdministrarExtensiones;
