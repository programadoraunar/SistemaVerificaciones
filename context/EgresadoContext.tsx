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
}

// Crea el contexto con un valor inicial de null
export const EgresadoContext = createContext<EgresadoContextType | null>(null);

export const EgresadoProvider = ({ children }: { children: ReactNode }) => {
  const [egresado, setEgresado] = useState<any>(null); // Usa el tipo adecuado aquí

  return (
    <EgresadoContext.Provider value={{ egresado, setEgresado }}>
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
