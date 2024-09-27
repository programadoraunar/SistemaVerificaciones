import Cards from "@/components/ui/Cards";
import { PiFalloutShelter } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import HActividades from "@/components/admin/dashboard/HActividades";
import UltimasVerificaciones from "@/components/admin/dashboard/UltimasVerificaciones";
import UltimosRegistros from "@/components/admin/dashboard/UltimosRegistros";
import Metricas from "@/components/admin/dashboard/Metricas";

export default function DashboardPage() {
  return (
    <div className="p-6 flex flex-col">
      <Metricas />
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
