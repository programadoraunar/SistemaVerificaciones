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
import { DatosProcesados, TecnicoConTituloImport } from "@/interfaces/Tecnicos";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import DownloadExcelFile from "../../excel/Tecnicos/DownloadExcelFile";
import useCodigosSIETTecnicos from "@/hooks/useCodigosSNIESTecnicos";
import useExtensionesId from "@/hooks/useExtensionesId";
import { registrarActividadAdmin } from "@/lib/supabaseAdminPostFunctions";
interface PreviewData {
  preview: (string | number | null)[][];
  headers: string[]; // Agrega un campo para las cabeceras
  multipleCount: number;
  multipleTitle: any[];
}

const UploadExcelTecnico = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [multipleCount, setMultipleCount] = useState<number>(0);
  const [multipleTitles, setMultipleTitles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: extensiones } = useExtensionesId();
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  // usamos el hook para obtener el mapeo de los codigos SIET con los títulos
  const { data: codeToIdTitulo } = useCodigosSIETTecnicos();
  const columnHelper = createColumnHelper<TecnicoConTituloImport>();
  const columns = [
    columnHelper.accessor("tipo_identificacion", {
      header: "Tipo Identificación",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("numero_identificacion", {
      header: "Número Identificación",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("nombre_tecnico", {
      header: "Nombre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("apellido_tecnico", {
      header: "Apellido",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("siet", {
      header: "SIET",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("titulo_nombre", {
      header: "Título",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("numero_certificado", {
      header: "N° de Certificado",
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
      cell: (info) => info.getValue(),
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
  const [previewData, setPreviewData] = useState<TecnicoConTituloImport[]>([]); // Cambiar el tipo aquí
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
    const expectedFileName = "PlantillaTecnicos.xlsx"; // El nombre de archivo esperado
    if (file.name !== expectedFileName) {
      toast.dismiss(loadingToastId); // Cierra el mensaje de carga
      toast.error("El archivo no corresponde a la plantilla correcta.");
      return;
    }
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
      setMultipleCount(data.multipleCount);
      setMultipleTitles(data.multipleTitle);
      // Transformar los datos de preview a TecnicoConTituloImport[]
      const transformedData: TecnicoConTituloImport[] = data.preview.map(
        (row) => ({
          tipo_identificacion: row[0] as string,
          numero_identificacion: row[1] as string,
          nombre_tecnico: row[2] as string,
          apellido_tecnico: row[3] as string,
          siet: row[4] as Number,
          titulo_nombre: row[5] as string,
          nombre_extension: row[6] as string,
          acta_grado: row[7] as string,
          numero_certificado: row[8] as string,
          folio: row[9] as string,
          fecha_grado: row[10] as string, // Asegúrate de que el formato sea correcto
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
  // función donde se procesa la información se coloca el id de su titulo correspondiente al igual
  // que el id de la extension correspondiente
  const processTransformedData = (data: DatosProcesados[]) => {
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

    const processedData = data.map((row: DatosProcesados) => {
      const normalizedExtension =
        typeof row.nombre_extension === "string"
          ? row.nombre_extension.toLowerCase().trim()
          : null;

      // Normalizar tipo de identificación usando la función interna
      const tipoIdentificacion = normalizeTipoIdentificacion(
        row.tipo_identificacion
      );

      const fechaGradoFormatted =
        row.fecha_grado && !isNaN(new Date(row.fecha_grado).getTime())
          ? new Date(row.fecha_grado).toISOString().split("T")[0]
          : null;

      return {
        tipo_identificacion: tipoIdentificacion,
        numero_identificacion: row.numero_identificacion,
        nombre_tecnico: row.nombre_tecnico,
        apellido_tecnico: row.apellido_tecnico,
        siet: row.siet,
        titulo_nombre: codeToIdTitulo?.[row.siet as number] || null,
        nombre_extension: extensiones?.[normalizedExtension as string] || null,
        acta_grado: row.acta_grado,
        numero_certificado: row.numero_certificado,
        folio: row.folio,
        fecha_grado: fechaGradoFormatted,
        libro_registro_grado: row.libro_registro_grado,
      };
    });

    return processedData;
  };
  const subirDatos = async (datos: DatosProcesados[]) => {
    const loadingToastId = toast.loading("Cargando datos, por favor espera...");

    // Mapeo de los datos a un formato que espera la función en el backend
    const datosParaInsertar = datos.map((item) => ({
      tipo_identificacion: item.tipo_identificacion,
      nombre: item.nombre_tecnico,
      apellido: item.apellido_tecnico,
      numero_identificacion: item.numero_identificacion.toString(),
      id_extension: item.nombre_extension,
      titulo_nombre: item.titulo_nombre,
      acta_grado: item.acta_grado,
      folio: item.folio,
      fecha_grado: item.fecha_grado,
      libro_registro_grado: item.libro_registro_grado,
      numero_certificado: item.numero_certificado,
    }));
    try {
      // Llamar a la función RPC en Supabase
      const { data, error } = await supabase.rpc(
        "insertar_tecnicos_y_titulos_excel",
        { datos: datosParaInsertar }
      );

      // Manejo de la respuesta del servidor
      if (error) {
        toast.error(`Error: ${error.message}`);
        console.error(error);
      } else if (data && data.mensaje && data.duplicados) {
        // Caso de duplicados
        toast.error(`${data.mensaje}: ${data.duplicados.join(", ")}`, {
          duration: 10000,
        });
      } else {
        toast.success("Datos insertados correctamente.");
        await registrarActividadAdmin({
          description: "Se registraron Técnicos desde un archivo Excel",
        });

        console.log(data); // Aquí puedes ver la respuesta de la función
      }
    } catch (error) {
      toast.error("Error al conectar con el servidor.");
      console.error("Error:", error);
    } finally {
      // Descartar el toast de carga
      toast.dismiss(loadingToastId);
      limpiarTabla();
    }
  };

  const manejarClick = () => {
    const datosTransformados = processTransformedData(previewData);
    subirDatos(datosTransformados);
  };
  //boton para limpiar la tabla
  const limpiarTabla = () => {
    setFileInputKey(Date.now());
    setPreviewData([]);
  };
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="file-upload bg-white my-5 p-5">
      <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-3 lg:gap-6">
        <div className="flex flex-col gap-3">
          <h2>Cargar archivo Excel</h2>
          <input
            key={fileInputKey}
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="text-sm"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 mt-3 lg:mt-0">
          {previewData.length > 0 && (
            <Button onClick={limpiarTabla}>Limpiar Tabla</Button>
          )}
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      {multipleCount > 0 && (
        <div>
          <p className="warning">
            Hay {multipleCount} personas con múltiples títulos o con números de
            identificación repetidos. Por favor, verificalos descargándolos
            mediante el siguiente botón
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
          <Button className="py-5" onClick={manejarClick}>
            Cargar Datos
          </Button>
        </>
      )}
    </div>
  );
};

export default UploadExcelTecnico;
