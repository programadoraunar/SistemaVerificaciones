"use client";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Link from "next/link";
import { ProfesionalConTitulo } from "@/interfaces/Profesionales";
import Loading from "../ui/Loading";

const columnHelper = createColumnHelper<ProfesionalConTitulo>();

const columns = [
  columnHelper.accessor("id_profesional", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("tipo_identificacion", {
    header: "Tipo Identificación",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("numero", {
    header: "Número",
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
  columnHelper.accessor("programa_nombre", {
    header: "Programa",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("titulo_nombre", {
    header: "Titulo",
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
  columnHelper.display({
    id: "details",
    header: "Detalles",
    cell: (info) => (
      <Link
        href={`/profesional/${info.row.original.id_profesional}`}
        className="bg-blue-zodiac-950 text-white p-2 rounded"
      >
        Detalles
      </Link>
    ),
  }),
];

function TableProfecionales() {
  const [data, setData] = useState<ProfesionalConTitulo[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.rpc(
          "obtener_informacion_profesionales"
        );
        setIsLoading(false);
        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="bg-white w-full overflow-x-auto rounded-lg">
      {!isLoading ? (
        <>
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
          <div className="flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-md">
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
                    : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
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
                    : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
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
                  className="border p-2 rounded w-10"
                />
                de {table.getPageCount()}
              </span>
              <button
                className={`${
                  !table.getCanNextPage()
                    ? "bg-gray-100"
                    : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
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
                    : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
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
    </div>
  );
}
export default TableProfecionales;
