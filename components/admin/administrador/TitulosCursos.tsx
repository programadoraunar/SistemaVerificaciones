"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
const fetcher = async (tableName: string) => {
  const { data, error } = await supabase.from(tableName).select("*");
  if (error) throw error;
  return data;
};
const TitulosCursos = () => {
  const { data, error, mutate } = useSWR("tituloscursos", fetcher);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    id: null, // Se utiliza para identificar el registro en edición
    nombre_certificado: "",
    alianzas_con: "",
    tipo: "",
    intencidad_horaria: "",
  });
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = data
    ? data.filter((titulo: any) =>
        titulo.nombre_certificado
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  const [isEditing, setIsEditing] = useState(false);

  if (error) return <div>Error al cargar los datos.</div>;
  if (!data) return <div>Cargando...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      // Actualizar registro existente
      const { error } = await supabase
        .from("tituloscursos")
        .update({
          nombre_certificado: formData.nombre_certificado,
          alianzas_con: formData.alianzas_con,
          tipo: formData.tipo,
          intencidad_horaria: formData.intencidad_horaria,
        })
        .eq("id", formData.id);

      if (error) {
        toast.error("Error al actualizar los datos");
      } else {
        toast.success("Datos actualizados correctamente");
        mutate();
        resetForm();
      }
    } else {
      // Insertar nuevo registro
      const { id, ...insertData } = formData; // Elimina `id` antes de la inserción
      const { error } = await supabase
        .from("tituloscursos")
        .insert([insertData]);
      console.log(error);
      if (error) {
        toast.error("Error al insertar los datos");
      } else {
        toast.success("Datos insertados correctamente");
        mutate();
        resetForm();
      }
    }
  };

  const handleEdit = (titulo: any) => {
    setFormData({
      id: titulo.id,
      nombre_certificado: titulo.nombre_certificado,
      alianzas_con: titulo.alianzas_con,
      tipo: titulo.tipo,
      intencidad_horaria: titulo.intencidad_horaria,
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      id: null,
      nombre_certificado: "",
      alianzas_con: "",
      tipo: "",
      intencidad_horaria: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="overflow-x-auto h-[800px] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 bg-white">
        Administración de Títulos de Cursos
      </h2>
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="flex flex-col mb-4">
          <div className="flex gap-3 mb-3 flex-col">
            <input
              type="text"
              name="nombre_certificado"
              placeholder="Nombre Certificado"
              value={formData.nombre_certificado}
              onChange={handleChange}
              className="p-2 border border-gray-400 rounded"
              required
            />
            <input
              type="text"
              name="alianzas_con"
              placeholder="Alianzas Con"
              value={formData.alianzas_con}
              className="p-2 border border-gray-400 rounded"
              onChange={handleChange}
            />
            <input
              type="text"
              name="tipo"
              placeholder="Tipo"
              value={formData.tipo}
              className="p-2 border border-gray-400 rounded"
              onChange={handleChange}
            />
            <input
              type="text"
              name="intencidad_horaria"
              placeholder="Intensidad Horaria"
              value={formData.intencidad_horaria}
              className="p-2 border border-gray-400 rounded"
              onChange={handleChange}
            />
          </div>

          <Button type="submit">
            {isEditing ? "Actualizar" : "Agregar"} Título
          </Button>
          {isEditing && (
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancelar
            </Button>
          )}
        </form>
        <input
          type="text"
          placeholder="Buscar por nombre de certificado..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-400 rounded mb-4 w-full"
        />
      </div>
      <div className="my-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 text-left text-gray-700 font-semibold">
                  Nombre Certificado
                </th>
                <th className="p-4 text-left text-gray-700 font-semibold">
                  Alianzas Con
                </th>
                <th className="p-4 text-left text-gray-700 font-semibold">
                  Tipo
                </th>
                <th className="p-4 text-left text-gray-700 font-semibold">
                  Intensidad Horaria
                </th>
                <th className="p-4 text-left text-gray-700 font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((titulo: any) => (
                <tr key={titulo.id} className="border-b">
                  <td className="border-gray-400 p-2">
                    {titulo.nombre_certificado}
                  </td>
                  <td className="border-gray-400 p-2">{titulo.alianzas_con}</td>
                  <td className="border-gray-400 p-2">{titulo.tipo}</td>
                  <td className="border-gray-400 text-center">
                    {titulo.intencidad_horaria}
                  </td>
                  <td className="border-gray-400 p-2">
                    <button onClick={() => handleEdit(titulo)}>Editar</button>
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

export default TitulosCursos;
