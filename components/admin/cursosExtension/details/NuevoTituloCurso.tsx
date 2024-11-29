import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

interface NuevoTituloCursoProps {
  onSuccess: () => void; // Nueva prop para cerrar el modal
  numeroIdentificacion: string;
}
const fetcher = async (url: string) => {
  const { data, error } = await supabase.from(url).select();
  if (error) throw new Error(error.message);
  return data;
};
const NuevoCursoTecnico: React.FC<NuevoTituloCursoProps> = ({
  onSuccess,
  numeroIdentificacion,
}) => {
  const [idTitulo, setIdTitulo] = useState<number | null>(null);
  const [periodoFormacion, setPeriodoFormacion] = useState<string>("");
  const [fechaEntrega, setFechaEntrega] = useState<string>("");
  const [id_extension, setIdExtension] = useState<string>("");
  // Fetch para obtener el ID del curso de extension  utilizando el número de identificación
  const { data: cursoData, error: cursoError } = useSWR(
    `/cursosextension/${numeroIdentificacion}`,
    async () => {
      const { data, error } = await supabase
        .from("cursosextension")
        .select("id")
        .eq("numero_identificacion", numeroIdentificacion)
        .single();

      if (error) throw error;
      return data;
    }
  );
  // Manejo del formulario de envío
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cursoData) {
      toast.error("No se ha encontrado el técnico.");
      return;
    }

    if (!idTitulo) {
      toast.error("Por favor, selecciona un título.");
      return;
    }

    try {
      // Inserción de los datos del nuevo título en la tabla tecnicoslaboralestitulos
      const { error } = await supabase.from("cursosextensiontitulos").insert([
        {
          curso_extension_id: cursoData.id,
          titulo_curso_id: idTitulo,
          periodo_formacion: periodoFormacion,
          fecha_entrega: fechaEntrega,
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

  const { data: titulos } = useSWR("tituloscursos", fetcher);
  const { data: extensiones } = useSWR("extension", fetcher);

  if (cursoError || cursoError) {
    return <p className="text-red-500">Error al cargar los datos</p>;
  }

  if (!cursoData || !titulos) {
    return <p className="text-gray-500">Cargando...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Título</label>
        <select
          value={idTitulo ?? ""}
          onChange={(e) => setIdTitulo(Number(e.target.value))}
          className="block w-full p-2 border rounded"
          required
        >
          <option value="" disabled>
            Selecciona un título
          </option>
          {titulos.map((titulo: any) => (
            <option key={titulo.id} value={titulo.id}>
              {titulo.nombre_certificado}
            </option>
          ))}
        </select>
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

      <div>
        <label className="block text-sm font-medium">
          Periodo de Formación
        </label>
        <input
          type="text"
          value={periodoFormacion}
          onChange={(e) => setPeriodoFormacion(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Fecha de Entrega</label>
        <input
          type="date"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
          className="block w-full p-2 border rounded"
          required
        />
      </div>

      <Button type="submit">Registrar Título</Button>
    </form>
  );
};
export default NuevoCursoTecnico;
