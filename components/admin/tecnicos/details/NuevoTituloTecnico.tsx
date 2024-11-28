"use client";
import { Button } from "@/components/ui/button";
import { fetchTitulos } from "@/lib/supabaseAdminGetFunctionsProfe";
import { supabase } from "@/utils/supabase/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
interface NuevoTituloTecnicoProps {
  onSuccess: () => void; // Nueva prop para cerrar el modal
  numeroIdentificacion: string;
}
const fetcher = async (url: string) => {
  const { data, error } = await supabase.from(url).select();
  if (error) throw new Error(error.message);
  return data;
};
const NuevoTituloTecnico: React.FC<NuevoTituloTecnicoProps> = ({
  onSuccess,
  numeroIdentificacion,
}) => {
  const [idTitulo, setIdTitulo] = useState<number | null>(null);
  const [actaGrado, setActaGrado] = useState<string>("");
  const [folio, setFolio] = useState<string>("");
  const [fechaGrado, setFechaGrado] = useState<string>("");
  const [libroRegistroGrado, setLibroRegistroGrado] = useState<string>("");
  const [numeroCertificado, setNumeroCertificado] = useState<string>("");
  const [id_extension, setIdExtension] = useState<string>("");

  // Fetch para obtener el ID del técnico utilizando el número de identificación
  const { data: tecnicoData, error: tecnicoError } = useSWR(
    `/tecnicoslaborales/${numeroIdentificacion}`,
    async () => {
      const { data, error } = await supabase
        .from("tecnicoslaborales")
        .select("id")
        .eq("numero_identificacion", numeroIdentificacion)
        .single();

      if (error) throw error;
      return data;
    }
  );

  // Fetch para obtener los títulos
  const { data: titulos, error: titulosError } = useSWR(
    ["titulos", "tecnico"],
    ([_, categoria]) => fetchTitulos(categoria)
  );

  // Manejo del formulario de envío
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tecnicoData) {
      toast.error("No se ha encontrado el técnico.");
      return;
    }

    if (!idTitulo) {
      toast.error("Por favor, selecciona un título.");
      return;
    }

    try {
      // Inserción de los datos del nuevo título en la tabla tecnicoslaboralestitulos
      const { error } = await supabase.from("tecnicoslaboralestitulos").insert([
        {
          id_tecnico_laboral: tecnicoData.id,
          id_titulo: idTitulo,
          acta_grado: actaGrado,
          folio,
          fecha_grado: fechaGrado,
          libro_registro_grado: libroRegistroGrado,
          numero_certificado: numeroCertificado,
          id_extension: id_extension,
        },
      ]);

      if (error) throw error;

      toast.success("Título agregado correctamente");
      onSuccess();
    } catch (error) {
      console.error("Error al agregar el título:", error);
      toast.error("Hubo un error al agregar el título");
    }
  };
  const { data: extensiones } = useSWR("extension", fetcher);

  if (tecnicoError || titulosError) {
    return <p className="text-red-500">Error al cargar los datos</p>;
  }

  if (!tecnicoData || !titulos) {
    return <p className="text-gray-500">Cargando...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="py-4">
          <label
            htmlFor="titulo"
            className="block text-sm font-semibold text-gray-700"
          >
            Seleccione Título
          </label>
          <select
            id="titulo"
            value={idTitulo || ""}
            onChange={(e) => setIdTitulo(Number(e.target.value))}
            required
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccione un título</option>
            {titulos && titulos.length > 0 ? (
              titulos.map((titulo) => (
                <option key={titulo.id} value={titulo.id}>
                  {titulo.nombre}
                </option>
              ))
            ) : (
              <option>No hay títulos disponibles</option>
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="actaGrado"
            className="block text-sm font-semibold text-gray-700"
          >
            Acta de Grado
          </label>
          <input
            id="actaGrado"
            type="text"
            value={actaGrado}
            onChange={(e) => setActaGrado(e.target.value)}
            required
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="folio"
            className="block text-sm font-semibold text-gray-700"
          >
            Folio
          </label>
          <input
            id="folio"
            type="text"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="fechaGrado"
            className="block text-sm font-semibold text-gray-700"
          >
            Fecha de Grado
          </label>
          <input
            id="fechaGrado"
            type="date"
            value={fechaGrado}
            onChange={(e) => setFechaGrado(e.target.value)}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="libroRegistroGrado"
            className="block text-sm font-semibold text-gray-700"
          >
            Libro de Registro de Grado
          </label>
          <input
            id="libroRegistroGrado"
            type="text"
            value={libroRegistroGrado}
            onChange={(e) => setLibroRegistroGrado(e.target.value)}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="numeroCertificado"
            className="block text-sm font-semibold text-gray-700"
          >
            Número de Certificado
          </label>
          <input
            id="numeroCertificado"
            type="text"
            value={numeroCertificado}
            onChange={(e) => setNumeroCertificado(e.target.value)}
            className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Seleccionar Extension
          </label>

          <select
            value={id_extension}
            onChange={(e) => setIdExtension(e.target.value)}
            className="w-full text-sm px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring ${
            "
          >
            <option value="">Seleccionar la Extension</option>
            {extensiones &&
              extensiones.map((extension: any) => (
                <option key={extension.id} value={extension.id}>
                  {extension.nombre}
                </option>
              ))}
          </select>
        </div>

        <Button type="submit">Registrar Título</Button>
      </form>
    </div>
  );
};

export default NuevoTituloTecnico;
