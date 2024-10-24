import InformesGenerales from "@/components/admin/informes/EgresadosMetricas/InformesGenerales";
import React from "react";

function page() {
  return (
    <div className="p-5">
      <div className="bg-white border rounded-sm p-5 flex flex-col my-5">
        <h3 className="font-bold text-2xl my-2">Informes</h3>
        <span>Pagina donde se listaran los informes</span>
      </div>
      <InformesGenerales />
    </div>
  );
}

export default page;
