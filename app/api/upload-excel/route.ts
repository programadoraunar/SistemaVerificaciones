import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet(1);

    if (!worksheet) {
      return NextResponse.json(
        { error: "Worksheet not found" },
        { status: 400 }
      );
    }

    const preview: (string | number | null | Date)[][] = [];
    const titleCounts: Record<string, number> = {};
    const multipleTitleRecords: any[][] = [];

    // Función auxiliar para formatear fechas
    const formatDate = (value: any): string | number | null | Date => {
      if (value instanceof Date) {
        return value.toISOString().split("T")[0];
      }
      if (typeof value === "string" && value.includes("T00:00:00.000Z")) {
        return value.split("T")[0];
      }
      return value;
    };

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const rowData = Array.isArray(row.values)
          ? row.values.slice(1).map((value) => {
              if (
                typeof value === "string" ||
                typeof value === "number" ||
                value instanceof Date ||
                value === null
              ) {
                return formatDate(value);
              }
              return null;
            })
          : [];

        const idNumber = rowData[1] as string;

        if (titleCounts[idNumber]) {
          titleCounts[idNumber]++;
          multipleTitleRecords.push(rowData);
        } else {
          titleCounts[idNumber] = 1;
          preview.push(rowData);
        }
      }
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        const rowData = Array.isArray(row.values)
          ? row.values.slice(1).map((value) => {
              return formatDate(value);
            })
          : [];

        const idNumber = rowData[1] as string;

        if (titleCounts[idNumber] > 1) {
          multipleTitleRecords.push(rowData);
        }
      }
    });

    const singleTitlePreview = preview.filter((row) => {
      const idNumber = row[1] as string;
      return titleCounts[idNumber] === 1;
    });

    return NextResponse.json({
      preview: singleTitlePreview,
      multipleTitle: multipleTitleRecords,
      multipleCount: multipleTitleRecords.length,
      headers: worksheet.getRow(1).values,
    });
  } catch (error) {
    console.error("Error al procesar el archivo:", error);
    return NextResponse.json(
      { error: "Error processing the file" },
      { status: 500 }
    );
  }
}
