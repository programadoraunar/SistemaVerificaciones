"use client";
import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  DatosProcesados,
  ProfesionalConTituloImport,
} from "@/interfaces/Profesionales";
import DownloadExcelFile from "../../excel/Profesionales/DownloadExcelFile";
import { supabase } from "@/utils/supabase/client";
import { EXTENSION_TO_ID, CODE_TO_ID_TITULO } from "@/constants/options";
import toast from "react-hot-toast";
import { Button } from "../../../ui/button";
import DownloadTemplate from "../../../ui/DownloadTemplate";
interface PreviewData {
  preview: (string | number | null)[][];
  headers: string[]; // Agrega un campo para las cabeceras
  multipleCount: number;
  multipleTitle: any[];
}

const UploadExcel: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [multipleCount, setMultipleCount] = useState<number>(0);
  const [multipleTitles, setMultipleTitles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper<ProfesionalConTituloImport>();
  const columns = [
    columnHelper.accessor("tipo_identificacion", {
      header: "Tipo Identificación",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("numero_identificacion", {
      header: "Número Identificación",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("nombre_profesional", {
      header: "Nombre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("apellido_profesional", {
      header: "Apellido",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("snies", {
      header: "SNIES",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("titulo_nombre", {
      header: "Título",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("numero_diploma", {
      header: "N° de Diploma",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("acta_grado", {
      header: "Acta de Grado",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("folio", {
      header: "Folio",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("fecha_grado", {
      header: "Fecha de Grado",
      cell: (info) => {
        const dateValue = info.getValue();
        return dateValue
          ? dateValue.toISOString().split("T")[0]
          : "No disponible";
      },
    }),

    columnHelper.accessor("libro_registro_grado", {
      header: "Libro Registro",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("nombre_extension", {
      header: "Extensión",
      cell: (info) => info.getValue(),
    }),
  ];

  const [previewData, setPreviewData] = useState<ProfesionalConTituloImport[]>(
    []
  ); // Cambiar el tipo aquí

  const table = useReactTable({
    data: previewData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const loadingToastId = toast.loading("Cargando datos, por favor espera...");
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-excel", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to upload file");
        toast.dismiss(loadingToastId); // Cierra el mensaje de carga
        setPreviewData([]);
        return;
      }

      const data: PreviewData = await response.json();
      // Transformar los datos de preview a ProfesionalConTitulo[]
      const transformedData: ProfesionalConTituloImport[] = data.preview.map(
        (row) => ({
          tipo_identificacion: row[0] as string,
          numero_identificacion: row[1] as string,
          nombre_profesional: row[2] as string,
          apellido_profesional: row[3] as string,
          snies: row[4] as Number,
          titulo_nombre: row[5] as string,
          nombre_extension: row[6] as string,
          acta_grado: row[7] as string,
          numero_diploma: row[8] as string,

          folio: row[9] as string,
          fecha_grado: row[10] ? new Date(row[10] as string) : null, // Asegúrate de que el formato sea correcto
          libro_registro_grado: row[11] as string,
        })
      );
      setPreviewData(transformedData);
      toast.dismiss(loadingToastId);
    } catch (err) {
      console.error("Error al cargar el archivo:", err);
      setError("Error al cargar el archivo");
    }
  };

  const processTransformedData = (data: DatosProcesados[]) => {
    const processedData = data.map((row: DatosProcesados) => {
      // Función para normalizar tipo de identificación
      const normalizeTipoIdentificacion = (tipo: string) => {
        if (!tipo) return tipo;

        // Mapear las variantes comunes a sus formas estandarizadas
        const tipoMap: { [key: string]: string } = {
          "C.C": "CC",
          "C.C.": "CC",
          CC: "CC",
          "T.I": "TI",
          "T.I.": "TI",
          TI: "TI",
          "C.E": "CE",
          "C.E.": "CE",
          CE: "CE",
          "P.P.T": "PPT",
          "P.P.T.": "PPT",
          PPT: "PPT",
          PASAPORTE: "PA",
          PA: "PA",
        };

        // Normalizar el tipo eliminando puntos, espacios y convirtiendo a mayúsculas
        const normalized = tipo.replace(/\./g, "").toUpperCase().trim();
        return tipoMap[normalized] || tipo; // Devuelve la forma estandarizada o el valor original
      };
      // Asegurarse de que nombre_extension sea un string antes de llamar a toLowerCase()
      const normalizedExtension =
        typeof row.nombre_extension === "string"
          ? row.nombre_extension.toLowerCase().trim()
          : null;
      // Normalizar tipo de identificación usando la función interna
      const tipoIdentificacion = normalizeTipoIdentificacion(
        row.tipo_identificacion
      );

      return {
        tipo_identificacion: tipoIdentificacion,
        numero_identificacion: row.numero_identificacion,
        nombre_profesional: row.nombre_profesional,
        apellido_profesional: row.apellido_profesional,
        snies: row.snies,
        titulo_nombre: CODE_TO_ID_TITULO[row.snies as number] || null,
        nombre_extension:
          EXTENSION_TO_ID[normalizedExtension as string] || null,
        acta_grado: row.acta_grado,
        numero_diploma: row.numero_diploma,
        folio: row.folio,
        fecha_grado: row.fecha_grado ? new Date(row.fecha_grado) : null,
        libro_registro_grado: row.libro_registro_grado,
      };
    });

    return processedData;
  };
  //subimos los datos en sus respectivas tablas profesionales y títulos
  const subirDatos = async (datos: DatosProcesados[]) => {
    const loadingToastId = toast.loading("Cargando datos, por favor espera...");
    const datosParaInsertar = datos.map((item) => ({
      tipo_identificacion: item.tipo_identificacion,
      nombre: item.nombre_profesional,
      apellido: item.apellido_profesional,
      numero_identificacion: item.numero_identificacion.toString(),
      id_extension: item.nombre_extension,
    }));

    console.log(datosParaInsertar);

    const { data: profesionalesData, error: profesionalesError } =
      await supabase
        .from("profesionales")
        .insert(datosParaInsertar)
        .select("id");

    // Verificar si hay un error al insertar los profesionales
    if (profesionalesError) {
      console.error("Error al insertar datos:", profesionalesError);
      toast.error("Error al registrar el profesional.");
      toast.dismiss(loadingToastId);
      return; // Salir de la función si hay un error
    }

    // Verificar que profesionalesData no sea null
    if (!profesionalesData) {
      console.error(
        "No se recibió datos de profesionales después de la inserción."
      );
      toast.error("No se pudo registrar el profesional.");
      toast.dismiss(loadingToastId);
      return; // Salir de la función si no hay datos
    }

    console.log("Datos insertados:", profesionalesData);

    // Paso 3: Preparar los títulos para insertar
    const titulosParaInsertar = datos.map((item, index) => ({
      id_profesional: profesionalesData[index]?.id || null, // Usar el ID del profesional correspondiente
      id_titulo: item.titulo_nombre || null, // Obtener el ID del título
      acta_grado: item.acta_grado,
      folio: item.folio,
      fecha_grado: item.fecha_grado
        ? new Date(item.fecha_grado).toISOString().split("T")[0]
        : null,
      libro_registro_grado: item.libro_registro_grado,
      numero_diploma: item.numero_diploma,
    }));

    console.log(
      "Datos para insertar en profesionalestitulos:",
      titulosParaInsertar
    );
    const { data: titulosData, error: titulosError } = await supabase
      .from("profesionalestitulos")
      .insert(titulosParaInsertar);

    if (titulosError) {
      console.error("Error al insertar títulos:", titulosError);
      toast.error("Error al registrar los títulos del profesional.");
    } else {
      console.log("Títulos insertados:", titulosData);
      toast.dismiss(loadingToastId);
      toast.success("¡Profesional y títulos registrados con éxito!");
    }
  };

  const manejarClick = () => {
    const datosTransformados = processTransformedData(previewData);
    subirDatos(datosTransformados);
  };

  const [error, setError] = useState<string | null>(null);

  return (
    <div className="file-upload bg-white my-5 p-5">
      <div className="flex justify-between">
        <div className="flex flex-col gap-3">
          <h2>Cargar archivo Excel</h2>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="file-input"
          />
        </div>
        <DownloadTemplate
          fileUrl="plantillas/PlantillaProfesionales.xlsx"
          fileName="PlantillaProfesionales.xlsx"
        />
      </div>

      {error && <p className="error">{error}</p>}
      {multipleCount > 0 && (
        <div>
          <p className="warning">
            Hay {multipleCount} personas con múltiples títulos que no se
            mostrarán en la tabla.
          </p>
          <DownloadExcelFile multipleTitleData={multipleTitles} />
        </div>
      )}

      {previewData.length > 0 && (
        <>
          <div className="bg-white w-full overflow-x-auto rounded-lg">
            <table className="border">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="border-b text-gray-800 uppercase"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 pr-2 py-4 font-bold text-left"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none flex min-w-[36px]"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <span className="pl-2">↑</span>,
                              desc: <span className="pl-2">↓</span>,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 pt-[14px] pb-[18px]">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="px-3 flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-md">
              <div className="sm:mr-auto sm:mb-0 mb-2">
                <span className="mr-2">Items por página</span>
                <select
                  className="border p-1 rounded w-16 border-gray-200"
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[2, 4, 6, 8, 10].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  className={`${
                    !table.getCanPreviousPage()
                      ? "bg-gray-100"
                      : "hover:bg-gray-200 hover:cursor-pointer bg-gray-100"
                  } rounded p-1`}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="w-5 h-5">{"<<"}</span>
                </button>
                <button
                  className={`${
                    !table.getCanPreviousPage()
                      ? "bg-gray-100"
                      : "hover:bg-gray-200 hover:cursor-pointer bg-gray-100"
                  } rounded p-2`}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="w-5 h-5">{"<"}</span>
                </button>
                <span className="flex items-center gap-1">
                  <input
                    min={1}
                    max={table.getPageCount()}
                    type="number"
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      table.setPageIndex(page);
                    }}
                    className="border p-2 rounded w-16"
                  />
                  de {table.getPageCount()}
                </span>
                <button
                  className={`${
                    !table.getCanNextPage()
                      ? "bg-gray-100"
                      : "hover:bg-gray-200 hover:cursor-pointer bg-gray-100"
                  } rounded p-2`}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="w-5 h-5">{">"}</span>
                </button>
                <button
                  className={`${
                    !table.getCanNextPage()
                      ? "bg-gray-100"
                      : "hover:bg-gray-200 hover:cursor-pointer bg-gray-100"
                  } rounded p-2`}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="w-5 h-5">{">>"}</span>
                </button>
              </div>
            </div>
          </div>
          <Button onClick={manejarClick}>Cargar Datos</Button>
        </>
      )}
    </div>
  );
};
export default UploadExcel;
