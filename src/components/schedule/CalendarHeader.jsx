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
    <header className="px-4 py-[2px] flex items-center  from-[#101010] via-[#101010]  to-[#101010] bg-gradient-to-t  ">
      <GrFormSchedule className="text-gray-500 w-7 h-7" />
      <h1 className="mr-10 text-base text-gray-100 font-medium">
        Calendar Schedule
      </h1>
      <button
        onClick={handleReset}
        className=" rounded-full py-[6px] px-4 mr-5 text-white bg-[#1d68bc]"
      >
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-200 mx-2">
          <FiChevronLeft />
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-200 mx-2">
          <FiChevronRight />
        </span>
      </button>
      <h2 className="ml-4 text-base text-gray-200 ">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}
