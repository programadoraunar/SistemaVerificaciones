"use client";
import { ProfesionalConTituloImport } from "@/interfaces/Profesionales";
import { useState } from "react";
import * as ExcelJS from "exceljs";
import { format, parseISO } from "date-fns"; // Importa las funciones necesarias
import { es } from "date-fns/locale";
const UploadExcel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ProfesionalConTituloImport[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      parseExcel(selectedFile);
    }
  };

  const parseExcel = async (file: File) => {
    const workbook = new ExcelJS.Workbook();
    try {
      await workbook.xlsx.load(await file.arrayBuffer());
      const worksheet = workbook.worksheets[0];
      const jsonData: ProfesionalConTituloImport[] = [];

      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > 1) {
          // Skip header row
          const rowData: ProfesionalConTituloImport = {
            tipo_identificacion: row.getCell(1).value as string,
            numero_identificacion: row.getCell(2).value as string,
            nombre_profesional: row.getCell(3).value as string,
            apellido_profesional: row.getCell(4).value as string,
            titulo_nombre: row.getCell(5).value as string,
            numero_diploma: row.getCell(6).value as string, // Corrige el índice para 'Número Diploma'
            acta_grado: row.getCell(7).value as string, // Corrige el índice para 'Acta Grado'
            folio: row.getCell(8).value as string, // Corrige el índice para 'Folio'
            fecha_grado: row.getCell(7)?.value
              ? new Date(row.getCell(7).value as string)
              : null,
            libro_registro_grado: row.getCell(10).value as string,
          };
          jsonData.push(rowData);
        }
      });

      setData(jsonData);
    } catch (err) {
      setError("Error al leer el archivo Excel.");
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      // Formatear las fechas antes de enviar los datos a la API
      const formattedData = data.map((item) => ({
        ...item,
        fecha_grado: item.fecha_grado
          ? format(new Date(item.fecha_grado), "yyyy-MM-dd")
          : null, // Formato "YYYY-MM-DD"
      }));

      // Aquí iría tu lógica para enviar los datos a tu API
      // console.log("hola ", formattedData); // Cambia esto para enviar a tu API
      alert("Datos procesados con éxito!");
      setData([]); // Limpiar la previsualización
    } catch (err) {
      setError("Error al procesar los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5 bg-white p-6 shadow-lg rounded-md overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Cargar Excel de Profesionales</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4 border rounded p-2 cursor-pointer"
      />

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {data.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Previsualización de Datos
          </h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th
                    key={key}
                    className="border border-gray-300 p-2 text-left text-gray-700 font-semibold"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  {Object.values(row).map((value, idx) => (
                    <td
                      key={idx}
                      className="border border-gray-300 text-gray-600"
                    >
                      {value instanceof Date
                        ? format(value, "MMMM d, yyyy", { locale: es }) // Formatear la fecha en español
                        : String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-zodiac-950 text-white p-2 rounded"
          >
            {loading ? "Cargando..." : "Registrar Profesionales"}
          </button>
        </div>
      )}
    </div>
  );
};
export default UploadExcel;
