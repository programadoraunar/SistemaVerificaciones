"use client";
import { Button } from "@/components/ui/button";
import { Titulo } from "@/interfaces/Titulos";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR, { mutate } from "swr";

const fetcher = async () => {
  const { data, error } = await supabase
    .from("titulos")
    .select("*")
    .order("id", { ascending: true });
  console.log(data);
  if (error) throw error;
  return data;
};

const AgregarTitulo = () => {
  const { data: titulos, error } = useSWR<Titulo[]>("titulos", fetcher);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idEditar, setIdEditar] = useState<number | null>(null);
  const formularioRef = useRef<HTMLFormElement | null>(null);
  // Efecto para actualizar el formulario cuando cambia el título seleccionado
  useEffect(() => {
    if (idEditar && titulos) {
      const tituloSeleccionado = titulos.find((t) => t.id === idEditar);
      if (tituloSeleccionado) {
        setNombre(tituloSeleccionado.nombre);
        setDescripcion(tituloSeleccionado.descripcion || "");
      }
    }
  }, [idEditar, titulos]);
  const limpiarFormulario = () => {
    setNombre("");
    setDescripcion("");
    setIdEditar(null);
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (idEditar) {
        // Actualizar título existente
        const { error } = await supabase
          .from("titulos")
          .update({ nombre, descripcion })
          .eq("id", idEditar);
        toast.success("¡Actualizado!");
        if (error) throw error;
      } else {
        // Agregar nuevo título
        const { error } = await supabase
          .from("titulos")
          .insert([{ nombre, descripcion }]);

        if (error) throw error;
      }

      // Revalidar los datos
      mutate("titulos");
      limpiarFormulario();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const editarTitulo = (titulo: Titulo) => {
    setIdEditar(titulo.id);
    formularioRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelarEdicion = () => {
    limpiarFormulario();
  };

  const eliminarTitulo = async (id: number) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este título?"
    );
    if (confirmacion) {
      try {
        const { error } = await supabase.from("titulos").delete().eq("id", id);

        if (error) throw error;

        // Revalidar los datos
        mutate("titulos");
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  if (error) return <div>Error al cargar los títulos</div>;
  if (!titulos) return <div>Cargando...</div>;

  return (
    <div>
      <h2 className="font-bold text-xl">Título</h2>
      <div className="container mx-auto p-4">
        <form
          ref={formularioRef}
          className="flex flex-col mb-4"
          onSubmit={manejarSubmit}
        >
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del título"
            className="p-2 border border-gray-400 rounded mb-2"
            required
          />
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del título"
            className="p-2 border border-gray-400 rounded mb-2"
            required
          />
          <div className="flex gap-2">
            <Button type="submit">{idEditar ? "Actualizar" : "Agregar"}</Button>
            {idEditar && (
              <Button type="button" onClick={cancelarEdicion} variant="outline">
                Cancelar
              </Button>
            )}
          </div>
        </form>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">Nombre</th>
                <th className="border border-gray-400 p-2">Descripción</th>
                <th className="border border-gray-400 p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {titulos.map((titulo) => (
                <tr
                  key={titulo.id}
                  className={idEditar === titulo.id ? "bg-gray-100" : ""}
                >
                  <td className="border border-gray-400 p-2">
                    {titulo.nombre}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {titulo.descripcion}
                  </td>
                  <td className="border border-gray-400 p-2">
                    <Button
                      onClick={() => editarTitulo(titulo)}
                      className="y-2 rounded w-full"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => eliminarTitulo(titulo.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2  rounded w-full"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default AgregarTitulo;
