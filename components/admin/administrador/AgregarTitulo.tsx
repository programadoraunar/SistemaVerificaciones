"use client";
import { Button } from "@/components/ui/button";
import { Titulo } from "@/interfaces/Titulos";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR, { mutate } from "swr";

const fetcher2 = async () => {
  const { data, error } = await supabase.rpc("obtener_titulos_con_codigos");
  if (error) throw error;
  return data;
};

const AgregarTitulo = () => {
  const { data: titulos2, error } = useSWR<Titulo[]>("titulos2", fetcher2);
  const [nombre, setNombre] = useState("");
  const [codigos, setCodigos] = useState<string[]>([]);
  const [codigoNuevo, setCodigoNuevo] = useState("");
  const [codigoEditando, setCodigoEditando] = useState<string | null>(null);
  const [codigoEditado, setCodigoEditado] = useState<string>("");
  const [idEditar, setIdEditar] = useState<number | null>(null);
  const formularioRef = useRef<HTMLFormElement | null>(null);

  // Efecto para cargar el título seleccionado al editar
  useEffect(() => {
    if (idEditar && titulos2) {
      const tituloSeleccionado = titulos2.find((t) => t.titulo_id === idEditar);
      if (tituloSeleccionado) {
        setNombre(tituloSeleccionado.nombre);
        setCodigos(tituloSeleccionado.codigos); // Actualiza el estado de códigos
      }
    }
  }, [idEditar, titulos2]);

  // Función para limpiar el formulario
  const limpiarFormulario = () => {
    setNombre("");
    setCodigos([]);
    setCodigoNuevo("");
    setCodigoEditando(null);
    setCodigoEditado("");
    setIdEditar(null);
  };

  // Manejar el envío del formulario para agregar o actualizar títulos
  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (idEditar) {
      const { error } = await supabase
        .from("titulos")
        .update({ nombre })
        .eq("id", idEditar);
      if (error) {
        toast.error("Error al actualizar el título");
      } else {
        toast.success("¡Título actualizado!");
        mutate("titulos2"); // Revalidar después de actualizar
      }
    } else {
      // Lógica para agregar un nuevo título
      const { error } = await supabase.from("titulos").insert([{ nombre }]);
      if (error) {
        toast.error("Error al agregar el título");
      } else {
        toast.success("¡Título agregado!");
        mutate("titulos2"); // Revalidar después de agregar
      }
    }
  };

  // Función para agregar un nuevo código
  const agregarCodigo = async () => {
    if (codigoNuevo.trim() === "" || idEditar === null) return; // Evitar agregar código vacío

    const { error } = await supabase
      .from("codigostitulos")
      .insert([{ codigo: codigoNuevo, titulo_id: idEditar }]); // Asocia el código al título actual

    if (error) {
      toast.error("Error al agregar el código");
    } else {
      setCodigos((prevCodigos) => [...prevCodigos, codigoNuevo]);
      setCodigoNuevo(""); // Limpiar el campo de entrada
      toast.success("¡Código agregado!");
      mutate("titulos2");
    }
  };

  // Función para eliminar un código
  const eliminarCodigo = (codigo: string) => {
    setCodigos((prevCodigos) => prevCodigos.filter((c) => c !== codigo));
  };

  // Función para iniciar la edición de un título
  const editarTitulo = (titulo: Titulo) => {
    setIdEditar(titulo.titulo_id);
    formularioRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Función para iniciar la edición de un código
  const editarCodigo = (codigo: string) => {
    setCodigoEditando(codigo);
    setCodigoEditado(codigo); // Copiar el código actual al campo de edición
  };

  // Manejar la actualización de un código
  const manejarActualizarCodigo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!codigoEditando) return;

    const { error } = await supabase
      .from("codigostitulos")
      .update({ codigo: codigoEditado })
      .eq("codigo", codigoEditando); // Filtra por el código que se está editando

    if (error) {
      console.error("Error al actualizar el código:", error);
      toast.error("Error al actualizar el código");
    } else {
      toast.success("¡Código actualizado!");
      setCodigoEditando(null); // Limpiar el estado después de la actualización
      setCodigoEditado("");
      mutate("titulos2");
    }
  };

  // Cancelar edición y limpiar formulario
  const cancelarEdicion = () => {
    limpiarFormulario();
  };

  // Manejo de errores y carga de datos
  if (error) return <div>Error al cargar los títulos</div>;
  if (!titulos2) return <div>Cargando...</div>;

  return (
    <div className="overflow-x-auto h-[800px] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 bg-white">
        Título
      </h2>
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
          {idEditar && (
            <div className="flex flex-col mb-2">
              <input
                type="text"
                value={codigoNuevo}
                onChange={(e) => setCodigoNuevo(e.target.value)}
                placeholder="Nuevo código"
                className="p-2 border border-gray-400 rounded mb-2"
              />
              <button
                type="button"
                onClick={agregarCodigo}
                className="bg-blue-950 text-white rounded p-2"
              >
                Agregar Código
              </button>
            </div>
          )}
          <div className="mb-2">
            {codigos.map((codigo) => (
              <div key={codigo} className="flex items-center justify-center">
                {codigoEditando === codigo ? (
                  <form
                    onSubmit={manejarActualizarCodigo}
                    className="flex flex-col bg-gray-200 my-4 border rounded-sm py-4 px-4 w-[70%]"
                  >
                    <span className="text-center text-lg font-bold">
                      Edición de Codigo: {codigoEditado}
                    </span>
                    <input
                      type="text"
                      value={codigoEditado}
                      onChange={(e) => setCodigoEditado(e.target.value)}
                      className="p-2 border border-gray-400 rounded mb-2"
                      required
                    />
                    <div className="flex flex-col gap-3">
                      <Button type="button" onClick={manejarActualizarCodigo}>
                        Actualizar Codigo
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setCodigoEditando(null)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center justify-between w-full bg-gray-50">
                    <span>{codigo}</span>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => editarCodigo(codigo)}
                        className="text-blue-500"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => eliminarCodigo(codigo)}
                        className="text-red-500 ml-2"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
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
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left text-gray-700 font-semibold">
                  Nombre
                </th>
                <th className="p-4 text-left text-gray-700 font-semibold">
                  Códigos
                </th>
                <th className="p-4 text-left text-gray-700 font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {titulos2.map((titulo) => (
                <tr
                  key={titulo.titulo_id}
                  className={`border-b ${idEditar === titulo.titulo_id ? "bg-gray-100" : ""}`}
                >
                  <td className="border-gray-400 p-2">{titulo.nombre}</td>
                  <td className="border-gray-400 p-2">
                    {titulo.codigos.length > 0
                      ? titulo.codigos.join(", ")
                      : "N/A"}
                  </td>
                  <td className="border-gray-400 p-2">
                    <button
                      className="text-blue-500"
                      onClick={() => editarTitulo(titulo)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AgregarTitulo;
