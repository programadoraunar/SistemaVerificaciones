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
import { ProfesionalConTitulo } from "@/interfaces/Persona";
import {
  DatosProcesados,
  ProfesionalConTituloImport,
} from "@/interfaces/Profesionales";
import DownloadExcelFile from "./excel/Profesionales/DownloadExcelFile";
import { supabase } from "@/utils/supabase/client";
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
        setPreviewData([]);
        return;
      }

      const data: PreviewData = await response.json();
      setMultipleCount(data.multipleCount);
      setMultipleTitles(data.multipleTitle);
      // Imprimir multipleTitle en la consola
      console.log(data.multipleTitle);
      console.log(data.multipleCount);

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
    } catch (err) {
      console.error("Error al cargar el archivo:", err);
      setError("Error al cargar el archivo");
    }
  };

  const processTransformedData = (data: DatosProcesados[]) => {
    const extension_to_id: { [key: string]: number } = {
      pasto: 1,
      ipiales: 2,
      "puerto asis": 3,
      cali: 4,
      villavicencio: 5,
      cartagena: 6,
    };

    const snies_to_id_titulo: { [key: number]: number } = {
      52928: 1,
      102519: 1,
      53445: 2,
      102322: 2,
      52536: 3,
      52639: 4,
      15864: 5,
      14351: 5,
      15865: 5,
      15861: 6,
      15862: 6,
      5363: 6,
      2742: 6,
      14355: 6,
      3092: 7,
      101274: 7,
      2458: 8,
      2700: 9,
      15616: 9,
      3485: 10,
      14365: 10,
      101511: 11,
      19432: 12,
    };

    const processedData = data.map((row: DatosProcesados) => {
      // Asegurarse de que nombre_extension sea un string antes de llamar a toLowerCase()
      const normalizedExtension =
        typeof row.nombre_extension === "string"
          ? row.nombre_extension.toLowerCase().trim()
          : null;

      return {
        tipo_identificacion: row.tipo_identificacion,
        numero_identificacion: row.numero_identificacion,
        nombre_profesional: row.nombre_profesional,
        apellido_profesional: row.apellido_profesional,
        snies: row.snies,
        titulo_nombre: snies_to_id_titulo[row.snies as number] || null,
        nombre_extension:
          extension_to_id[normalizedExtension as string] || null,
        acta_grado: row.acta_grado,
        numero_diploma: row.numero_diploma,
        folio: row.folio,
        fecha_grado: row.fecha_grado ? new Date(row.fecha_grado) : null,
        libro_registro_grado: row.libro_registro_grado,
      };
    });

    return processedData;
  };
  const subirDatos = async (datos: DatosProcesados[]) => {
    const datosParaInsertar = datos.map((item) => ({
      tipo_identificacion: item.tipo_identificacion,
      nombre: item.nombre_profesional,
      apellido: item.apellido_profesional,
      numero_identificacion: item.numero_identificacion.toString(),
      id_extension: item.nombre_extension,
    }));
    console.log(datosParaInsertar);

    const { data, error } = await supabase
      .from("ProfesionalesPrueba")
      .insert(datosParaInsertar);

    if (error) {
      console.error("Error al insertar datos:", error);
    } else {
      console.log("Datos insertados:", data);
    }
  };
  const manejarClick = () => {
    const datosTransformados = processTransformedData(previewData);
    subirDatos(datosTransformados);
  };

  const [error, setError] = useState<string | null>(null);

  return (
    <div className="file-upload bg-white my-5 p-5">
      <div className="flex flex-col gap-3">
        <h2>Cargar archivo Excel</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="file-input"
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
          <button onClick={manejarClick}>Subir Datos</button>
        </>
      )}
    </div>
  );
};
export default UploadExcel;
