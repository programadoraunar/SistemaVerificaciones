// useConsultas.ts
import { supabase } from "@/utils/supabase/client";
import useSWR from "swr";

const fetcher = async () => {
  const { data, error } = await supabase
    .from("consultas")
    .select(
      "id, tipo_solicitante, nombres_solicitante, apellidos_solicitante, telefono_solicitante, correo_electronico_solicitante, fecha_consulta"
    );

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useConsultas = () => {
  const { data, error, mutate } = useSWR("consultas", fetcher);

  return {
    consultas: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
