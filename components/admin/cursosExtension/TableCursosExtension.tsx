"use client";
import Loading from "@/components/ui/Loading";
import Modal from "@/components/ui/Modal";
import { InformacionCursoExtension } from "@/interfaces/CursosExtension";
import { obtenerInformacionCursosExtension } from "@/lib/supabaseAdminGetFunctionsProfe";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import useSWR from "swr";
import FormActualizacionCursosExtension from "./details/FormActualizacionCursosExtension";
const fetcher = async () => {
  const result = await obtenerInformacionCursosExtension();
  return result;
};

function TableCursosExtension({
  searchResults,
}: {
  searchResults: InformacionCursoExtension[];
}) {
  const { data, error, isLoading, mutate } = useSWR(
    "cursosExtension",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const [sorting, setSorting] = useState<SortingState>([]);
  const [modalOpen, setModalOpen] = useState(false); // Estado para el modal
  const [identificacion, setIdentificacion] = useState<string | null>(null);

  const columnHelper = createColumnHelper<InformacionCursoExtension>();

  const columns = [
    columnHelper.accessor("tipo_identificacion", {
      header: "Tipo Identificación",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("numero_identificacion", {
      header: "Número Identificación",
      cell: (info) => <div className="text-center">{info.getValue()}</div>,
    }),

    columnHelper.accessor("nombre_cursoextension", {
      header: "Nombre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("apellido_cursoextension", {
      header: "Apellido",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("nombre_extension", {
      header: "Extension",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "details",
      header: "Detalles",
      cell: (info) => (
        <button
          onClick={() => openModal(info.row.original.numero_identificacion)}
          className="bg-blue-zodiac-950 text-white p-2 rounded"
        >
          Detalles
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data: searchResults.length > 0 ? searchResults : data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const openModal = (numeroIdentificacion: string) => {
    setIdentificacion(numeroIdentificacion); // Establece el profesional seleccionado
    setModalOpen(true); // Abre el modal
  };

  const closeModal = () => {
    setModalOpen(false); // Cierra el modal
    setIdentificacion(null); // Reinicia el profesional seleccionado
    mutate(); // Revalida los datos de SWR para que se actualice la tabla
  };

  if (error) {
    return <div>Error al cargar los datos.</div>;
  }
  return (
    <div className="bg-white w-full overflow-x-auto rounded-lg">
      {!isLoading ? (
        <>
          <table className="border w-full">
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
        </>
      ) : (
        <Loading />
      )}
      <Toaster />
      {/* Modal para mostrar el formulario de actualización */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title="Actualizar Egresado Curso Extension"
      >
        {identificacion !== null && (
          <FormActualizacionCursosExtension
            numeroIdentificacion={identificacion}
            onSuccess={closeModal}
          />
        )}
      </Modal>
    </div>
  );
}
export default TableCursosExtension;
