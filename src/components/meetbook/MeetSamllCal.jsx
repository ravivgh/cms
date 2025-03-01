import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import GlobalContext from "@/context/GlobalContext";
import { getMonth } from "@/utils/getMonth";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx((prev) => prev - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx((prev) => prev + 1);
  }
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().startOf("day").format(format); // Reset to start of today (00:00:00)
    const currDay = day.format(format); // Current iterated day's date
    const slcDay = daySelected && daySelected.format(format); // Selected date

    if (nowDay === currDay) {
      return "bg-black rounded-full text-white"; // Red background for today's date
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold"; // Blue background for selected date
    } else {
      return ""; // Default styling
    }
  }

  return (
    <div className="mt-9 ">
      <header className="flex justify-between items-center bg-[#e8d7d7] p-3 rounded-xl">
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-400 mx-2 ">
            <FiChevronLeft className="text-xl" />
          </span>
        </button>
        <p className="text-gray-400 ">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-400 mx-2">
              <FiChevronRight className="text-xl" />
            </span>
          </button>
        </div>
      </header>
      <div className="border border-gray-300 rounded-xl relative bottom-4 bg-[#efefef] text-black shadow-sm p-2">
        <div className="grid grid-cols-7 grid-rows-6 ">
          {currentMonth[0].map((day, i) => (
            <span key={i} className="text-sm py-1 text-center text-gray-600">
              {day.format("dd").charAt(0)}
            </span>
          ))}
          {currentMonth.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSmallCalendarMonth(currentMonthIdx);
                    setDaySelected(day);
                  }}
                  className={`py-1 w-full ${getDayClass(day)}`}
                >
                  <span className="text-sm">{day.format("D")}</span>
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
