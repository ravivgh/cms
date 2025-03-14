import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MonthSelection from "./MonthSelection";
import CardD from "./Card";
import Chart from "./Chart";
import { VscVerifiedFilled } from "react-icons/vsc";
import { TbReport } from "react-icons/tb";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

const StudentDashboard = ({ onDownload, reportRef }) => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default current year
  const [attendanceData, setAttendanceData] = useState({ Total: 0, absent: 0, present: 0 });

  const fetchAttendanceData = async (month, year) => {
    const studentId = localStorage.getItem("student_id");

    if (!studentId) {
      console.error("Student ID not found in local storage.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5472/services/getstuddashatt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sid: parseInt(studentId),
          month: month,
          year: year, 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      setAttendanceData(data);
    } catch (error) {
      console.error("Error fetching student attendance:", error);
    }
  };

  // Fetch data when month or year changes
  useEffect(() => {
    fetchAttendanceData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  return (
    <>
      <div className="assistant-about flex items-center justify-around mx-auto">
        <div className="bg-gradient-to-t from-[#3f3f3f] via-[#4b6750] to-[#5382a1] w-full h-[300px] relative">
          <div className="bg-[#f4f4f4] max-w-[1200px] h-auto mx-auto absolute left-0 right-0 top-16 rounded-t-3xl overflow-hidden rounded-b-md">
            <div className="flex items-center gap-2 bg-[#0b1f36] px-5 py-3">
              <div className="w-2 h-2 bg-[#1d68bd] rounded-full"></div>
              <div className="w-2 h-2 bg-[#5382a1] rounded-full"></div>
              <div className="w-2 h-2 bg-[#d99442] rounded-full"></div>
            </div>
            <div className="p-5">
              <div className="">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl text-black font-medium">Dashboard</h2>
                  <div className="flex items-center gap-3">
                    <Button disabled = "true"
                      className="bg-[#8c9cb8] hover:bg-[#8c9cb8] text-white font-medium rounded-full text-[13px] gap-1 h-9 px-4 transition-all duration-300"
                      onClick={() => navigate("/attendancemark")}
                    >
                      Attendance Mark
                    </Button>
                    <Button disabled = "true"
                      className="bg-[#4f71ab] hover:bg-[#3b5998] text-white font-medium rounded-full text-[13px] gap-1 h-9 px-4 transition-all duration-300"
                      onClick={onDownload}
                    >
                      <TbReport />
                      Report
                    </Button>
                    {/* Month Selection - Pass both month and year handlers */}
                    <MonthSelection selectedMonth={selectedMonth} onSelectDate={setSelectedMonth} />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="hidden md:block">
                  <div className="border-[#cbcbcba2] border-t-2 border-l-2 border-r-2 rounded-t-md p-1 relative">
                    <div className="relative w-48 h-48 group overflow-hidden rounded-md">
                      <img
                        src={`http://localhost:5472/profilepics/${localStorage.getItem("student_id")}.png`}
                        className="w-full h-full object-cover rounded-md"
                        alt="Profile"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                        <Link
                          to="/student/profile"
                          className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                        >
                          Profile
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="10"
                            viewBox="0 0 18 12"
                            fill="none"
                            transform="rotate(-45)"
                          >
                            <path
                              d="M1 6H17M17 6L12 1M17 6L12 11"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <h1 className="text-white text-md text-center bg-[#6fb974] rounded-b-md border-[#cbcbcba2] border-b-2 border-l-2 border-r-2 py-1 flex items-center justify-center gap-2">
                    {localStorage.getItem("Student_Name")}
                    <span>
                      <VscVerifiedFilled className="text-[#eceded]" />
                    </span>
                  </h1>
                  <div className="text-white bg-[#6fb974] w-fit px-2 rounded-full relative bottom-16 left-0 mx-3 flex items-center gap-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <p className="text-[13px]">Student</p>
                  </div>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-6 w-full md:w-4/5">
                  <CardD icon={<TrendingUp />} title="Present" value={attendanceData.present} />
                  <CardD icon={<TrendingDown />} title="Absent" value={attendanceData.absent} />
                  <CardD icon={<TbReport />} title="Total Attendance" value={attendanceData.Total} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Insights Section */}
      <div className="bg-[#f7f7f7] rounded-lg">
        <div className="my-[40rem] sm:my-96 md:my-44 lg:my-56">
          <div className="mx-10">
            <div className="bg-[#e1e1e1] p-3 rounded-t-2xl flex items-center justify-between">
              <h1 className="text-black text-md px-5 py-2 font-medium">
                Monitor no-shows with data-driven insights
              </h1>
            </div>
            <div className="bg-white py-5 px-5">
              <p className="text-[#a21f1f] font-medium w-[500px]">
                Track no-show trends with data insights to optimize scheduling and improve efficiency.
              </p>
            </div>
            <Chart present={attendanceData.present} absent={attendanceData.absent} total={attendanceData.Total} month={selectedMonth} year={selectedYear} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
