import React from "react";
import AgregarTitulo from "./AgregarTitulo";
import AdministrarExtensiones from "./AdministrarExtensiones";
const LayoutAdministracion = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-min">
      <div className="bg-white shadow-lg rounded-lg px-6 py-5 flex flex-col my-5 self-start">
        <AgregarTitulo />
      </div>
      <div className="bg-white shadow-lg rounded-lg px-6 py-5 flex flex-col my-5 self-start">
        <AdministrarExtensiones />
      </div>
    </div>
  );
};

export default LayoutAdministracion;
