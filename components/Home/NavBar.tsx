import React from "react";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Escudo from "../Escudo";
function NavBar() {
  return (
    <>
      <nav className="w-full  py-20 flex justify-center h-16">
        <div className="w-full  max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex items-center font-semibold py-5">
            <div className="flex items-center">
              <Escudo />
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-col gap-5 justify-center items-center md:flex-row md:justify-between md:px-5 w-full lg:px-24 py-3 bg-blue-zodiac-950 text-xl text-white font-bold">
        <span className="px-3">
          Sistema de Verificación de Certificados y/o Títulos Aunar
        </span>

        {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
      </div>
    </>
  );
}

export default NavBar;
