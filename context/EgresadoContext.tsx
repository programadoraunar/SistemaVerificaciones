"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define la interfaz para el contexto
interface EgresadoContextType {
  egresado: any; // Puedes especificar un tipo más específico según tu caso
  setEgresado: Dispatch<SetStateAction<any>>; // Asegúrate de usar el tipo correcto aquí
  identificacion: any;
  setIdentificacion: Dispatch<SetStateAction<any>>;
  formacionAcademicaContext: any;
  setFormacionAcademicaContext: Dispatch<SetStateAction<any>>;
}

// Crea el contexto con un valor inicial de null
export const EgresadoContext = createContext<EgresadoContextType | null>(null);

export const EgresadoProvider = ({ children }: { children: ReactNode }) => {
  const [egresado, setEgresado] = useState<any>(null); // Usa el tipo adecuado aquí
  const [identificacion, setIdentificacion] = useState<any>(null);

  const [formacionAcademicaContext, setFormacionAcademicaContext] =
    useState<any>(null);

  return (
    <EgresadoContext.Provider
      value={{
        egresado,
        setEgresado,
        identificacion,
        setIdentificacion,
        formacionAcademicaContext,
        setFormacionAcademicaContext,
      }}
    >
      {children}
    </EgresadoContext.Provider>
  );
};

export const useEgresado = () => {
  const context = useContext(EgresadoContext);
  if (!context) {
    throw new Error("useEgresado must be used within an EgresadoProvider");
  }
  return context;
};
