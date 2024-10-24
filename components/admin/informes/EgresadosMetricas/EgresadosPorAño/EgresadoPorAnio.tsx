import React, { useState } from "react";

interface GraduateData {
  year: number;
  count: number;
}
const EgresadoPorAnio: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const data: GraduateData[] = [
    { year: 2023, count: 150 },
    { year: 2022, count: 120 },
    { year: 2021, count: 100 },
    { year: 2023, count: 200 },
    { year: 2022, count: 180 },
    { year: 2021, count: 160 },
    { year: 2023, count: 100 },
    { year: 2022, count: 90 },
  ];

  // Agrupar datos solo por año
  const groupedData = data.reduce((acc: Record<number, number>, item) => {
    acc[item.year] = (acc[item.year] || 0) + item.count;
    return acc;
  }, {});

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Egresados Según Año</h2>
      <div className="mb-4">
        <label htmlFor="year-select" className="block mb-2">
          Selecciona un año:
        </label>
        <select
          id="year-select"
          className="border border-gray-300 rounded p-2"
          onChange={(e) =>
            setSelectedYear(e.target.value ? parseInt(e.target.value) : null)
          }
        >
          <option value="">Selecciona un año</option>
          {[2023, 2022, 2021, 2020, 2019].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {selectedYear && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Egresados en {selectedYear}:
          </h3>
          <p className="text-green-600">
            {groupedData[selectedYear]} egresados
          </p>
        </div>
      )}
    </div>
  );
};
export default EgresadoPorAnio;
