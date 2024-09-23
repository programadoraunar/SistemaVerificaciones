import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";

const DateRangePicker: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const handleChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    console.log(
      "Fecha de inicio:",
      dates[0] ? dates[0].toLocaleDateString() : "No seleccionada"
    );
    console.log(
      "Fecha de fin:",
      dates[1] ? dates[1].toLocaleDateString() : "No seleccionada"
    );
  };

  return (
    <div className="relative px-1 cursor-pointer">
      <DatePicker
        selectsRange={true}
        startDate={dateRange[0] || undefined}
        endDate={dateRange[1] || undefined}
        onChange={handleChange}
        wrapperClassName="input-attribute"
        className="bg-white appearance-none px-4 py-4 rounded-lg shadow border-black text-black"
        showIcon
        withPortal
        monthsShown={1}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between px-2 py-2">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              type="button"
              className={`
                p-1 rounded-full 
                ${prevMonthButtonDisabled ? "text-gray-300" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="text-lg font-bold text-gray-800">
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type="button"
              className={`
                p-1 rounded-full 
                ${nextMonthButtonDisabled ? "text-gray-300" : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      />
      <i className="fas fa-calendar absolute top-1/4 right-4 text-black"></i>
    </div>
  );
};

export default DateRangePicker;
