import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.min.css";
interface DateRangePickerProps {
  onDateChange: (dates: [Date | null, Date | null]) => void; // Nueva prop
}
const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const handleChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    onDateChange(dates); // Pasar fechas al padre
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
        showMonthDropdown
        showYearDropdown
        dropdownMode="select" // Esto permite los dropdowns
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
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
              className={`p-1 rounded-full ${prevMonthButtonDisabled ? "text-gray-300" : "text-gray-700 hover:bg-gray-100"}`}
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
            <div className="flex space-x-2 items-center">
              <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(Number(value))}
                className="border-none bg-transparent text-lg font-bold"
              >
                {Array.from(
                  { length: 100 },
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                value={date.getMonth()}
                onChange={({ target: { value } }) => changeMonth(Number(value))}
                className="border-none bg-transparent text-lg font-bold"
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              type="button"
              className={`p-1 rounded-full ${nextMonthButtonDisabled ? "text-gray-300" : "text-gray-700 hover:bg-gray-100"}`}
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
