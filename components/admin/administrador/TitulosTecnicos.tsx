"use client";
import { Button } from "@/components/ui/button";
import VentanaConfirmacion from "@/components/ui/Modal/ModalConfirmacion/VentanaConfirmacion";
import { Titulo } from "@/interfaces/Titulos";
import { registrarActividadAdmin } from "@/lib/supabaseAdminPostFunctions";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR, { mutate } from "swr";

const fetcher2 = async () => {
  const { data, error } = await supabase.rpc("obtener_titulos_con_codigos", {
    p_categoria: "tecnico",
  });
  if (error) throw error;
  return data;
};

const TitulosTecnico = () => {
  const { data: titulos2, error } = useSWR<Titulo[]>(
    "titulosTecnico",
    fetcher2
  );
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState(""); // Nueva categoría
  const [codigos, setCodigos] = useState<string[]>([]);
  const [codigoNuevo, setCodigoNuevo] = useState("");
  const [codigoEditando, setCodigoEditando] = useState<string | null>(null);
  const [codigoEditado, setCodigoEditado] = useState<string>("");
  const [idEditar, setIdEditar] = useState<number | null>(null);
  const formularioRef = useRef<HTMLFormElement | null>(null);
  //estados para la confirmación de eliminación de un titulo
  const [idEliminar, setIdEliminar] = useState<number | null>(null); // Estado para el ID a eliminar titulo
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (idEditar && titulos2) {
      const tituloSeleccionado = titulos2.find((t) => t.titulo_id === idEditar);
      if (tituloSeleccionado) {
        setNombre(tituloSeleccionado.nombre);
        setCategoria(tituloSeleccionado.categoria || "");
        setCodigos(tituloSeleccionado.codigos || []);
      }
    }
  }, [idEditar, titulos2]);

  const limpiarFormulario = () => {
    setNombre("");
    setCategoria("");
    setCodigos([]);
    setCodigoNuevo("");
    setCodigoEditando(null);
    setCodigoEditado("");
    setIdEditar(null);
  };

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoria) {
      toast.error("Por favor, selecciona una categoría.");
      return;
    }

    if (idEditar) {
      const { error } = await supabase
        .from("titulos")
        .update({ nombre, categoria })
        .eq("id", idEditar);
      if (error) {
        toast.error("Error al actualizar el título");
      } else {
        toast.success("¡Título actualizado!");
        try {
          const result = await registrarActividadAdmin({
            description: "Se Actualizo un titulo de los Técnicos Laborales",
          });
          console.log(result);
        } catch (error) {
          console.error("Error al registrar la actividad:", error);
          toast.error("Error al registrar la actividad");
        }
        mutate("titulosTecnico");
        limpiarFormulario();
      }
    } else {
      const { data, error } = await supabase
        .from("titulos")
        .insert([{ nombre, categoria }])
        .select();
      if (error) {
        toast.error("Error al agregar el título");
      } else if (data?.length) {
        const nuevoTituloId = data[0].id;
        for (const codigo of codigos) {
          await supabase
            .from("codigostitulos")
            .insert([{ codigo, titulo_id: nuevoTituloId }]);
        }
        toast.success("¡Título agregado!");
        try {
          const result = await registrarActividadAdmin({
            description: "Se Agrego un  titulo en los Técnicos Laborales",
          });
          console.log(result);
        } catch (error) {
          console.error("Error al registrar la actividad:", error);
          toast.error("Error al registrar la actividad");
        }
        mutate("titulosTecnico");
        limpiarFormulario();
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
      if (error.code === "23505") {
        toast.error(
          "El código ingresado ya está en uso. Por favor, verifica el código y asegúrate de que no esté duplicado antes de intentarlo de nuevo."
        );
      } else {
        toast.error("Error al agregar el código");
      }
    } else {
      setCodigos((prevCodigos) => [...prevCodigos, codigoNuevo]);
      setCodigoNuevo(""); // Limpiar el campo de entrada
      toast.success("¡Código agregado!");
      mutate("titulosTecnico");
    }
  };
  // Función para eliminar un código
  const eliminarCodigo = async (codigo: string) => {
    // Verificar si el código está en el modo de edición, en cuyo caso no se eliminaría
    if (codigoEditando === codigo) {
      toast.error("No se puede eliminar el código mientras está en edición.");
      return;
    }

    // Hacer la solicitud para eliminar el código de la base de datos
    const { error } = await supabase
      .from("codigostitulos")
      .delete()
      .eq("codigo", codigo) // Filtra por el código a eliminar
      .single(); // .single() asegura que solo se elimine una fila

    if (error) {
      toast.error("Error al eliminar el código");
    } else {
      // Si no hubo errores, actualiza el estado local eliminando el código
      setCodigos((prevCodigos) => prevCodigos.filter((c) => c !== codigo));
      toast.success("¡Código eliminado!");
      mutate("titulosTecnico"); // Vuelve a obtener los datos actualizados
    }
  };

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
    console.log(codigoEditado);

    const { error } = await supabase
      .from("codigostitulos")
      .update({ codigo: codigoEditado })
      .eq("codigo", codigoEditando); // Filtra por el código que se está editando

    if (error) {
      console.error("Error al actualizar el código:", error);
      toast.error("Error al actualizar el código");
    } else {
      toast.success("¡Código actualizado!");
      console.log(codigoEditado);

      try {
        const result = await registrarActividadAdmin({
          description:
            "Se Actualizo un codigo de un titulo de los Técnicos Laborales",
        });
        console.log(result);
      } catch (error) {
        console.error("Error al registrar la actividad:", error);
        toast.error("Error al registrar la actividad");
      }
      console.log(error);
      setCodigoEditando(null); // Limpiar el estado después de la actualización
      setCodigoEditado("");
      mutate("titulosTecnico");
    }
  };
  // Abre la modal de confirmación y establece el título a eliminar
  const confirmarEliminacion = (tituloId: number) => {
    setIdEliminar(tituloId);
    setIsModalOpen(true);
  };
  // Ló
  // Lógica para eliminar el título
  const eliminarTitulo = async () => {
    if (!idEliminar) return;

    const { error } = await supabase
      .from("titulos")
      .delete()
      .eq("id", idEliminar);

    if (error) {
      toast.error("Error al eliminar el título");
    } else {
      toast.success("¡Título eliminado!");
      await registrarActividadAdmin({
        description: `Se eliminó el título con ID ${idEliminar}`,
      });
      mutate("titulos2");
    }
    setIsModalOpen(false); // Cierra la modal después de la operación
    setIdEliminar(null); // Limpia el estado
  };

  // Cancelar edición y limpiar formulario
  const cancelarEdicion = () => {
    limpiarFormulario();
  };

  if (error) return <div>Error al cargar los títulos</div>;
  if (!titulos2) return <div>Cargando...</div>;

  return (
    <div className="overflow-x-auto h-[800px] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 bg-white">
        Títulos Técnicos Laborales
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
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="p-2 border border-gray-400 rounded mb-2"
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="tecnico">Tecnico</option>
          </select>
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={codigoNuevo}
              onChange={(e) => setCodigoNuevo(e.target.value)}
              placeholder="Nuevo código"
              className="p-2 border border-gray-400 rounded"
            />
            <button
              type="button"
              onClick={agregarCodigo}
              className="bg-blue-950 text-white rounded text-sm px-2"
            >
              Agregar Código
            </button>
          </div>
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

        <div className="my-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 text-left text-gray-700 font-semibold">
                    Nombre
                  </th>
                  <th className="p-4 text-left text-gray-700 font-semibold">
                    Categoría
                  </th>
                  <th className="p-4 text-left text-gray-700 font-semibold">
                    SIET
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
                    className={`border-b ${
                      idEditar === titulo.titulo_id ? "bg-gray-100" : ""
                    }`}
                  >
                    <td className="border-gray-400 p-2">{titulo.nombre}</td>
                    <td className="border-gray-400 p-2">{titulo.categoria}</td>
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

                      <button
                        type="button"
                        onClick={() => confirmarEliminacion(titulo.titulo_id)} // Llama a la función de eliminación
                        className="text-red-500"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <VentanaConfirmacion
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={eliminarTitulo}
      />
      <Toaster />
    </div>
  );
};

export default TitulosTecnico;
