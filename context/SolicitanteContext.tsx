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
interface SolicitanteContextType {
  solicitanteCorreo: any;
  setSolicitanteCorreo: Dispatch<SetStateAction<any>>;
  solicitanteNombre: any;
  setSolicitanteNombre: Dispatch<SetStateAction<any>>;
}
export const SolicitanteContext = createContext<SolicitanteContextType | null>(
  null
);

export const SolicitanteProvider = ({ children }: { children: ReactNode }) => {
  const [solicitanteCorreo, setSolicitanteCorreo] = useState<any>(null);
  const [solicitanteNombre, setSolicitanteNombre] = useState<any>(null);

  return (
    <SolicitanteContext.Provider
      value={{
        solicitanteCorreo,
        setSolicitanteCorreo,
        solicitanteNombre,
        setSolicitanteNombre,
      }}
    >
      {children}
    </SolicitanteContext.Provider>
  );
};

export const useSolicitante = () => {
  const context = useContext(SolicitanteContext);
  if (!context) {
    throw new Error("useSolicitante must be used within an EgresadoProvider");
  }
  return context;
};
