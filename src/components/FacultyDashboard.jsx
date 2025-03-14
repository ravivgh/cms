import React, { useEffect, useState } from "react";
import MonthSelection from "./MonthSelection";
import CardD from "./Card";
import { GraduationCap, TrendingDown, TrendingUp, Library } from "lucide-react";
import { VscVerifiedFilled } from "react-icons/vsc";
import Chart from "./Chart";
import { Button } from "./ui/button";
import { TbReport } from "react-icons/tb";
import { Link } from "react-router-dom";
import { addMonths } from 'date-fns';

const FacultyDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:5472/services/getstafdashcount",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              month: selectedMonth,
              staff_id: localStorage.getItem("staff_id"),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        setDashboardData(data);
        console.log("API Response:", data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    console.log("Month changed:", selectedMonth);
  }, [selectedMonth]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <>
      <div className="assistant-about  flex items-center justify-around mx-auto  ">
        <div className="bg-gradient-to-t from-[#3f3f3f] via-[#4b6750]  to-[#5382a1]   w-full h-[300px] relative   ">
          <div className=" bg-[#f4f4f4] max-w-[1200px] h-auto mx-auto absolute left-0 right-0 top-16     rounded-t-3xl overflow-hidden rounded-b-md ">
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
                    <Button className="bg-[#4f71ab] hover:bg-[#3b5998] text-white font-medium rounded-full text-[13px] gap-1 h-9 px-4 transition-all duration-300  ">
                      <TbReport />
                      Report
                    </Button>

                    <MonthSelection
                      selectedMonth={selectedMonth}
                      onSelectDate={handleMonthChange}
                    />
                  </div>
                </div>
              </div>
              <div className=" ">
                <div className=" flex items-center justify-between">
                  <div className="hidden md:block">
                    <div className="border-[#cbcbcba2] border-t-2 border-l-2 border-r-2 rounded-t-md p-1 relative">
                      <div className="relative w-48 h-48 group overflow-hidden rounded-md">
                        <img
                          src={`http://localhost:5472/profilepics/${localStorage.getItem(
                            "staff_id"
                          )}.png`}
                          className="w-full h-full object-cover rounded-md"
                          alt="Profile"
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                          <Link
                            to="/faculty/profile"
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

                    <div>
                      <h1 className="text-white text-md text-center bg-[#deb15c] rounded-b-md border-[#cbcbcba2] border-b-2 border-l-2 border-r-2 py-1 flex items-center justify-center gap-2">
                        {localStorage.getItem("staff_name")}
                        <span>
                          <VscVerifiedFilled className="text-[#eceded]" />
                        </span>
                      </h1>
                    </div>

                    <div className="text-white bg-[#deb15c] w-fit px-2 rounded-full relative bottom-16 left-0 mx-3 flex items-center gap-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <p className="text-[13px]">Faculty</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-6 w-full md:w-4/5">
                    <CardD
                      icon={<GraduationCap />}
                      title="Total Students"
                      value={dashboardData?.students || 0}
                      description="Number of Total Students"
                    />

                    <CardD
                      icon={<TrendingUp />}
                      title="Present"
                      value={`${dashboardData?.present || 0}%`}
                      description="Number of Present"
                    />
                    <CardD
                      icon={<TrendingDown />}
                      title="Absent"
                      value={`${dashboardData?.absent || 0}%`}
                      description="Number of Absent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#f7f7f7] rounded-lg">
        <div className="my-[40rem] sm:my-96 md:my-44 lg:mt-56 ">
          <div className="mx-10">
            <Chart />
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyDashboard;