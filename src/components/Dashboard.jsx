import MonthSelection from "./MonthSelection";
import { useState } from "react";
import CardD from "./Card";
import Chart from "./Chart";
import { MdOutlineGroups } from "react-icons/md";
import { GraduationCap, TrendingDown, TrendingUp, Library } from "lucide-react";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";
const Dashboard = ({ isSidebarOpen, selectedMonth }) => {
  return (
    <main
      className={`transition-all duration-500 ${
        isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
      }`}
      style={{
        width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
      }}
    >
      <div className="assistant-about  flex items-center justify-around mx-auto  ">
        <div className="bg-gradient-to-t from-[#3f3f3f] via-[#4b6750]  to-[#5382a1]  w-full h-[300px] relative   ">
          {" "}
          <div className=" bg-[#f4f4f4] max-w-[1200px] h-auto mx-auto absolute left-0 right-0 top-16    rounded-t-3xl overflow-hidden rounded-b-md ">
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
                    {/* <Button className="bg-[#000] rounded-full text-[12px] w-20 h-7 px-3 text-[#ffcd6c]">
                    Report
                  </Button> */}
                    <MonthSelection selectedMonth={selectedMonth} />
                  </div>
                </div>
                {/* <hr
                  className="mx-auto bg-[#0000003b] mt-2 w-36 rounded-sm"
                  style={{
                    height: "0.5px",
                    color: "white",
                    borderWidth: 0,
                  }}
                ></hr> */}
              </div>
              <div className=" ">
                <div className=" flex items-center justify-between">
                  <div className="hidden md:block">
                    {/* Profile Image Container */}
                    <div className="border-[#cbcbcba2] border-t-2 border-l-2 border-r-2 rounded-t-md p-1 relative">
                      <div className="relative w-48 h-48 group overflow-hidden rounded-md">
                        {/* Profile Image */}
                        <img
                          src={`http://localhost:5472/profilepics/${localStorage.getItem("admin_id")}.png`}
                          className="w-full h-full object-cover rounded-md"
                          alt="Profile"
                        />

                        {/* Overlay with Hover Effect */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                          <Link
                            to="/admin/profile"
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

                    {/* Name Section */}
                    <div>
                      <h1 className="text-white text-md text-center bg-[#1c65b7] rounded-b-md border-[#cbcbcba2] border-b-2 border-l-2 border-r-2 py-1 flex items-center justify-center gap-2">
                        Rahul Arora
                        <span>
                          <VscVerifiedFilled className="text-[#eceded]" />
                        </span>
                      </h1>
                    </div>

                    {/* Faculty Badge */}
                    <div className="text-white bg-[#1c65b7] w-fit px-2 rounded-full relative bottom-16 left-0 mx-3 flex items-center gap-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <p className="text-[13px]">Admin</p>
                    </div>
                  </div>

                  {/* Cards Section:  */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-6 w-full md:w-4/5">
                    <CardD
                      icon={<GraduationCap />}
                      title="Total Students"
                      value="120"
                      description="Number of Total Students"
                    />
                    <CardD
                      icon={<MdOutlineGroups style={{ fontSize: "25px" }} />}
                      title="Total Faculty"
                      value="5"
                      description="Number of Total Faculty"
                    />
                    <CardD
                      icon={<Library />}
                      title="Total Subject"
                      value="5"
                      description="Number of Total Subject"
                    />
                    <CardD
                      icon={<TrendingUp />}
                      title="Present"
                      value="90%"
                      description="Number of Present"
                    />
                    <CardD
                      icon={<TrendingDown />}
                      title="Absent"
                      value="10%"
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
        <div className="my-[40rem] sm:my-96 md:my-44 lg:my-56 ">
          <div className="mx-10">
            <div className="bg-[#e1e1e1] p-3 rounded-t-2xl flex items-center justify-between">
              {" "}
              <h1 className="text-black text-md  px-5 py-2  font-medium">
                Monitor no-shows with data-driven insights
                {/* <RxActivityLog />
                Activity */}
              </h1>
              {/* <div className="flex items-center justify-end px-10 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-3 bg-[#ff9e2a]"></div>
                  <h1 className="text-black">Present</h1>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-3 bg-[#4a805f]"></div>
                  <h1 className="text-black">Absent</h1>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-3 bg-[#1d68bd]"></div>
                  <h1 className="text-black">Total Students</h1>
                </div>
              </div> */}
            </div>
            <div className="bg-white py-5 px-5">
              <p className="text-[#a21f1f] font-medium w-[500px]">
                Track no-show trends with data insights to optimize scheduling
                and improve efficiency
              </p>
            </div>

            <Chart />
          </div>{" "}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
