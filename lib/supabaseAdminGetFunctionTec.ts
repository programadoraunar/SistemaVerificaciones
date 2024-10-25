import { supabase } from "@/utils/supabase/client";

export const obtenerInformacionTecnicos = async () => {
  const { data, error } = await supabase.rpc(
    "obtener_informacion_tecnicos_laborales"
  );

  if (error) throw error; // Lanza el error para que se maneje en el componente
  return data; // Devuelve los datos
};
