"use client";
import ExpandingButton from "@/components/ui/ExpandingButton";
import React from "react";
import Metricas from "./Metricas";

const InformesGenerales = () => {
  return (
    <div className="flex flex-col">
      <ExpandingButton
        buttonText="Métricas Egresados"
        expandedContent={<Metricas />}
      />
    </div>
  );
};

export default InformesGenerales;
