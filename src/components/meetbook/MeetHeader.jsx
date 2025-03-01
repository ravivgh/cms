import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import { GrFormSchedule } from "react-icons/gr";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="px-4 py-2 flex items-center bg-[#ebebebce] border rounded-tl-xl rounded-tr-xl">
      <GrFormSchedule className="text-green-700 w-7 h-7" />
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">
        Calendar Schedule
      </h1>
      <button
        onClick={handleReset}
        className="border rounded-full py-2 px-4 mr-5 text-black  border-gray-300"
      >
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <FiChevronLeft />
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          <FiChevronRight />
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 ">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}
