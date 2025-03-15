import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AttendanceGrid from "../components/AttendanceGrid";
import MonthSelection from "../components/MonthSelection";
import { Button } from "@/components/ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PiSealCheckFill } from "react-icons/pi";
import { MdOutlineEmail } from "react-icons/md";

import { Card, CardContent } from "@/components/ui/card";
import { FaArrowRightLong } from "react-icons/fa6";
import { CiMobile4 } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Search } from "lucide-react";
import { TbMedal } from "react-icons/tb";
import { TbReport } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { FcCalendar } from "react-icons/fc";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
function Attendances() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayMonth, setDisplayMonth] = useState(selectedMonth);
  const [displayDate, setDisplayDate] = useState(selectedDate);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // useEffect(() => {
  //   const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
  //   setSubjects(storedSubjects);
  // }, []);
  useEffect(() => {
    const storedSubjects = [
      {
        name: "Rahul Shah",
        avatar:
          "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/0f6fee60-187e-44ed-8ccf-e0bc3b56eeac.jpg",
        assignedClass: "TYBCA",
        phoneNumber: "9879185312",
        email: "rahulshah@gmail.com",
        subject: "Computer Science",
      },
      {
        name: "Sara Smith",
        avatar:
          "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/68935ce6-16ff-437f-bc4a-5f85c7e238fe.jpg",
        assignedClass: "TYBCA",
        phoneNumber: "9879185312",
        email: "ssmith@gmail.com",
        subject: "Java",
      },
      {
        name: "John Doe",
        avatar:
          "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/bb34b3a9-006d-4b7e-b885-8cd040cd60b5.jpg",
        assignedClass: "FYBCA",
        phoneNumber: "9879185312",
        email: "john@gmail.com",
        subject: "Linux",
      },
      {
        name: "Sara Smith",
        avatar:
          "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/a7e93f4c-d40c-4598-9728-cf71c93a1ee6.jpg",
        assignedClass: "TYBCA",
        phoneNumber: "9879185312",
        email: "ssmith@gmail.com",
        subject: "Cloud Computing",
      },
    ];
    localStorage.setItem("subjects", JSON.stringify(storedSubjects));
    setSubjects(storedSubjects);
  }, []);

  const handleSearch = () => {
    setDisplayMonth(selectedMonth);
    setDisplayDate(selectedDate);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchQuery) ||
      subject.assignedClass.toLowerCase().includes(searchQuery) ||
      subject.subject.toLowerCase().includes(searchQuery)
  );
  const handleBack = () => {
    setSelectedSubject(null);
  };
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Placeholder options to cycle through
  const placeholders = ["Subject", "Name", "Class"];

  useEffect(() => {
    // Set up interval to update the placeholder index
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000); // Change placeholder every 2 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [placeholders.length]);
  return (
    <div className="">
      {!selectedSubject ? (
        <motion.div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        >
          <div className="text-black text-2xl">
            <h1 className="font-medium">Attendance Sheet</h1>
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
          <div className="flex items-center justify-center mb-10">
            <div className="space-y-2 ">
              <Label>Search input with icon and button</Label>
              <div className="relative">
                <Input
                  className="peer pe-9 ps-9 py-6 text-black rounded-full bg-gray-200 w-96"
                  placeholder={`Search ${placeholders[placeholderIndex]}`}
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Search size={16} strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>

          {filteredSubjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 px-10">
              {filteredSubjects.map((subject, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  // whileTap={{ scale: 0.95 }}
                  // onClick={() => setSelectedSubject(subject)}
                >
                  <Card className="bg-[#f7f7f7]  rounded-lg shadow-lg cursor-pointer">
                    <div
                      className="bg-[#2b2b2b] w-full h-20 rounded-t-lg bg-cover"
                      // style={{
                      //   backgroundImage:
                      //     "url(https://d2b1cooxpkirg1.cloudfront.net/publicAssets/homepage/solutions/bg-1.png)",
                      // }}
                    ></div>
                    <CardContent className="relative bottom-12">
                      <div className="float-end">
                        <span
                          className="bg-[#6f7478] p-2 rounded-full text-[#fff] flex items-center gap-2 text-xs border border-[#3b3c3f]"
                          onClick={() => setSelectedSubject(subject)}
                        >
                          View Sheet{" "}
                          <FaArrowRightLong className="text-[#fff]" />
                        </span>
                      </div>
                      <div className="space-y-4">
                        <Avatar className="rounded-lg w-20 h-20 border-1 border-[#ffffff] p-[3px] bg-white">
                          <AvatarImage
                            src={subject.avatar}
                            alt={subject.name}
                            className="rounded-lg"
                          />
                          <AvatarFallback>
                            {subject.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <h1 className="font-medium flex items-center gap-1">
                          {subject.name}{" "}
                          <PiSealCheckFill className="text-green-700" />
                        </h1>
                        <div className=" items-center flex gap-5">
                          <p>Assigned Class</p>
                          <span className="font-medium">
                            {subject.assignedClass}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="">
                          <span className="">Subject Role</span>
                        </div>
                        <div className="h-10 w-10 bg-[#755485] text-white rounded-full flex items-center justify-center">
                          {subject.subject.charAt(0)}
                        </div>
                        <div>
                          <h1 className="text-base text-[#333333]">
                            {subject.subject}
                          </h1>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="">
                          <h1 className="text-[#1d68bd] flex items-center gap-2 font-medium text-sm">
                            {" "}
                            <span className="w-1 h-1 bg-blue-800 rounded-full "></span>
                            Contact info
                          </h1>
                        </div>
                        <div className="flex flex-col space-y-2 text-sm ">
                          <div className="flex items-center gap-2">
                            <MdOutlineEmail />

                            <span className="text-gray-500">
                              {" "}
                              {subject.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CiMobile4 />
                            <span className="text-gray-500">
                              {" "}
                              {subject.phoneNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <h2>No subjects found</h2>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="attendance"
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // exit={{ opacity: 0 }}
        >
          <div className="bg-gradient-to-t from-[#2b2b2b] via-[#2b2b2b]  to-[#3b3c3f]  w-full h-72  rounded-xl pt-10">
            <div className="flex items-center justify-around w-full">
              <div className="py-10">
                <h2 className="text-2xl text-white ">Attendance Sheet</h2>

                <p className="text-xs text-gray-400 pt-1">
                  {selectedSubject?.subject}
                </p>
              </div>
              <div className="flex items-center gap-5">
                {" "}
                <div>
                  <Button className="bg-[#111111]">
                    {" "}
                    <TbReport />
                    <span className="pl-1">Report</span>
                  </Button>
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
          <div className="relative  bottom-28 mx-10 ">
            <div className="from-[#3b3c3f] via-[#116752]  to-[#1d68bd] rounded-t-lg bg-gradient-to-t shadow-[0px_-20px_90px_rgba(0,0,0,0.3)] ">
              <div className="attendance-heading flex items-center justify-around">
                <Button
                  onClick={handleBack}
                  className="  mr-5 rounded-full bg-black border border-gray-800  hover:text-white text-white "
                >
                  <FaArrowLeftLong
                    style={{
                      padding: "5px",

                      fontSize: "25px",
                    }}
                  />
                </Button>
                {/* <h2 className="text-lg text-white py-10">{`${selectedSubject?.subject} Attendance Sheet`}</h2> */}
                <div className="flex items-center gap-2">
                  <Avatar className="rounded-lg w-28 h-28 border border-[#ffffff] p-[3px]  relative bottom-10">
                    <AvatarImage
                      src="https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/0f6fee60-187e-44ed-8ccf-e0bc3b56eeac.jpg"
                      alt=""
                      className="rounded-lg"
                    />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>

                  <div className="">
                    <h1>Submited by:</h1>
                    <span>Rahul Arora</span>
                    <span className="text-gray-300 text-sm">
                      (rahularora@gmail.com)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f7f7f7]">
              {/* <hr
                  className="mx-auto bg-[#0000003b] my-2 rounded-sm"
                  style={{ width: "100%", height: "1px", borderWidth: 0 }}
                ></hr> */}
              <div className="bg-[#f7f7f7]  rounded-lg  ">
                <div className="attendance-dataFlow py-5 flex items-center justify-between  p-5 rounded-b-lg from-[#1f1f1f] via-[#1f1f1f]  to-[#3b3c3f] bg-gradient-to-t  bg-[#1f1f1f] flex-wrap">
                  <div className="flex items-center">
                    <div className="attendance-icon bg-gray-700 p-3 rounded-full">
                      <FcCalendar className="text-3xl" />
                    </div>

                    <div className="flex items-center flex-col pl-3">
                      <h2 className="text-xl  text-white  ">
                        Today,28 Feb 2024
                      </h2>

                      <div className="flex items-center gap-2 pt-1">
                        <p className="text-gray-300 text-xs ">
                          This show daily data in real-time |{" "}
                        </p>
                        <span className="text-yellow-500 text-xs flex items-center gap-1">
                          Insight <FaArrowRightLong />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="header-card flex items-center gap-10">
                    <div className="bg-[#282828] p-5 rounded-lg border-gray-500 border">
                      <p className="text-gray-200 text-xs">Total Students</p>
                      <div className="flex items-center justify-between pt-3 ">
                        <h1 className="text-white text-2xl pr-4">256</h1>
                        <div className="bg-[#2d2649] p-1 rounded-md">
                          <GraduationCap className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#282828] p-5 rounded-lg border-gray-500 border">
                      <p className="text-gray-200 text-xs">Present Students</p>
                      <div className="flex items-center justify-between pt-3">
                        <h1 className="text-white text-2xl">250</h1>
                        <div className="bg-green-600 p-1 rounded-md">
                          <TrendingUp className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#282828] p-5 rounded-lg border-gray-500 border">
                      <p className="text-gray-200 text-xs">Absent Students</p>
                      <div className="flex items-center justify-between pt-3">
                        <h1 className="text-white text-2xl">6</h1>
                        <div className="bg-red-600 p-1 rounded-md">
                          <TrendingDown className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                    <div
                      className="group bg-[#282828] p-5 rounded-lg border-gray-500 border relative transition-all duration-300"
                      onClick={() => navigate("/attendance/viewall/all")}
                    >
                      <p className="text-gray-200 text-xs">Question Bank</p>
                      <div className="flex items-center justify-between pt-3">
                        <h1 className="text-white text-2xl pr-4">18</h1>
                        <div className="bg-yellow-500 p-1 rounded-md">
                          <TbMedal className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      {/* Arrow Icon, Initially Hidden */}
                      <MdArrowOutward className="absolute top-2 right-2 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:text-white transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
                <div className="">
                  <hr
                    className="mx-auto bg-slate-200 my-2 rounded-sm"
                    style={{ width: "100%", height: "0.5px", borderWidth: 0 }}
                  ></hr>
                </div>
                <div className="px-5 pb-5">
                  <div className="flex items-center justify-between">
                    <div className="">
                      <h1 className="text-black text-lg">
                        Students Attendance
                      </h1>
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
                      selectedSubject={selectedSubject}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Attendances;
