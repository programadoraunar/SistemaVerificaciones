import HActividades from "@/components/admin/dashboard/HActividades";
import UltimasVerificaciones from "@/components/admin/dashboard/UltimasVerificaciones/UltimasVerificaciones";
import UltimosRegistros from "@/components/admin/dashboard/UltimosRegistros/UltimosRegistros";
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
