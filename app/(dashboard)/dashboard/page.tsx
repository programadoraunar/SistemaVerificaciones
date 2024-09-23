import Cards from "@/components/admin/dashboard/Cards";
import { PiFalloutShelter } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import HActividades from "@/components/admin/dashboard/HActividades";
import UltimasVerificaciones from "@/components/admin/dashboard/UltimasVerificaciones";
import UltimosRegistros from "@/components/admin/dashboard/UltimosRegistros";

export default function DashboardPage() {
  return (
    <div className="p-6 flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Cards
          title="Total de Egresados"
          value={1200}
          text="Numero total de egresados registrados"
          icon={<FaGraduationCap size={50} />}
        />
        <Cards
          title="Total de Profesionales"
          value={300}
          text="Total egresados con titulo profesional"
          icon={<FaBriefcase size={50} />}
        />
        <Cards
          title="Total de Técnicos Laborales"
          value={1500}
          text="Total egresados con titulo laboral"
          icon={<FaTools size={50} />}
        />
        <Cards
          title="Total de Cursos de Extension"
          value={20}
          text="Total egresados con titulo de curso"
          icon={<FaBookOpen size={50} />}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col min-h-0">
          <HActividades />
        </div>
        <div className="flex flex-col min-h-0 my-4 gap-10 justify-center">
          <UltimasVerificaciones />
          <UltimosRegistros />
        </div>
      </div>
    </div>
  );
}
