import { useState } from "react";
import AttendanceGrid from "../components/AttendanceGrid";
import MonthSelection from "../components/MonthSelection";
import { Button } from "@/components/ui/button";
import { FcCalendar } from "react-icons/fc";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import { TbReport } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { TbMedal } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function Attendance({ activeColumn, handleColumnChange }) {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayMonth, setDisplayMonth] = useState(selectedMonth);
  const [displayDate, setDisplayDate] = useState(selectedDate);

  const handleSearch = () => {
    setDisplayMonth(selectedMonth);
    setDisplayDate(selectedDate);
  };

  return (
    <>
      <div className="bg-gradient-to-t from-[#3b3c3f] via-[#3b3c3f]  to-[#3b3c3f]  w-full h-72  rounded-xl pt-10">
        <div className="flex items-center justify-around w-full">
          <div className="py-10">
            <h2 className="text-2xl text-white ">Attendance Sheet</h2>

            <p className="text-xs text-gray-400 pt-1">
              Professor <span>Bread Smith</span>
            </p>
          </div>
          <div className="flex items-center gap-5">
            {" "}
            <div>
              {/* <Button className="bg-[#888888]">
                {" "}
                <TbReport />
                <span className="pl-1">Report</span>
              </Button> */}
            </div>
            {/* <div>
              <Button className="bg-[#969696]">
                {" "}
                <IoMdTime />
                <span className="pl-1">Time Management</span>
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      <div className=" bg-[#f7f7f7] p-5 rounded-lg relative  bottom-28 mx-10">
        <div className="attendance-dataFlow py-5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="attendance-icon bg-slate-200 p-3 rounded-full">
              <FcCalendar className="text-3xl" />
            </div>

            <div className="flex items-center flex-col pl-3">
              <h2 className="text-xl  text-black  ">Today,28 Feb 2024</h2>

              <div className="flex items-center gap-2 pt-1">
                <p className="text-gray-600 text-xs ">
                  This show daily data in real-time |{" "}
                </p>
                <span className="text-yellow-600 text-xs flex items-center gap-1">
                  Insight <FaArrowRightLong />
                </span>
              </div>
            </div>
          </div>
          <div className="header-card flex items-center gap-10">
            <div className="bg-[#efefef] p-5 rounded-lg border-gray-300 border">
              <p className="text-gray-600 text-xs">Total Students</p>
              <div className="flex items-center justify-between pt-3 ">
                <h1 className="text-black text-2xl pr-4">256</h1>
                <div className="bg-[#2d2649] p-1 rounded-md">
                  <GraduationCap className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-[#efefef] p-5 rounded-lg border-gray-300 border">
              <p className="text-gray-600 text-xs">Present Students</p>
              <div className="flex items-center justify-between pt-3">
                <h1 className="text-black text-2xl">250</h1>
                <div className="bg-green-600 p-1 rounded-md">
                  <TrendingUp className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-[#efefef] p-5 rounded-lg border-gray-300 border">
              <p className="text-gray-600 text-xs">Absent Students</p>
              <div className="flex items-center justify-between pt-3">
                <h1 className="text-black text-2xl">6</h1>
                <div className="bg-red-600 p-1 rounded-md">
                  <TrendingDown className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <div
              className="group bg-[#efefef] p-5 rounded-lg border-gray-300 border relative transition-all duration-300"
              onClick={() => navigate("/attendances/viewall")}
            >
              <p className="text-gray-600 text-xs">Question Bank</p>
              <div className="flex items-center justify-between pt-3">
                <h1 className="text-black text-2xl pr-4">18</h1>
                <div className="bg-yellow-500 p-1 rounded-md">
                  <TbMedal className="w-3 h-3 text-white" />
                </div>
              </div>
              {/* Arrow Icon, Now Visible on Hover */}
              <MdArrowOutward className="absolute top-2 right-2 text-gray-800 opacity-0 group-hover:opacity-100 group-hover:text-black transition-opacity duration-300" />
            </div>
          </div>
        </div>
        <hr
          className="mx-auto bg-[#0000003b] my-2 rounded-sm"
          style={{
            width: "100%",
            height: "1px",
            color: "white",
            borderWidth: 0,
          }}
        ></hr>
        <div className="flex items-center justify-between">
          <div className="">
            <h1 className="text-black text-lg">Students Attendance</h1>
            <p className="text-gray-600 text-sm">
              Keep track students attendance on a daily basis
            </p>
          </div>
          <div className="flex gap-4 my-5 p-3 border rounded-lg">
            <MonthSelection
              selectedMonth={(value) => setSelectedMonth(value)}
              onSelectDate={(date) => setSelectedDate(date)}
            />

            <div className="search-button">
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>
        </div>

        <div>
          <AttendanceGrid
            selectedMonth={displayMonth}
            selectedDate={displayDate}
          />
        </div>
      </div>
    </>
  );
}

export default Attendance;
