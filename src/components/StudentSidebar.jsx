import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiHomeCircle } from "react-icons/bi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineGroups } from "react-icons/md";
import { Avatar } from "@mui/material";
import { CgLogOut } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { TextField } from "@mui/material";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PiVideoConferenceFill } from "react-icons/pi";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { HiChatAlt2 } from "react-icons/hi";
import { BsCalendarDayFill } from "react-icons/bs";

import { MdOutlineTerminal } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";

function StudentSidebar({ isSidebarOpen, onToggle, profilePicture }) {
  const [loading, setLoading] = useState(false);
  // const [subjectName, setSubjectName] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [section, setSection] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");

  // const sections = {
  //   FY: ["FY-A", "FY-B", "FY-C", "FY-D", "FY-E"],
  // };
  // const selectedYear = "FY";
  // const handleSectionChange = (value) => {
  //   setSection(value);
  //   console.log(value);
  // };
  // const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("/dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("expand-side");
    } else {
      document.body.classList.remove("expand-side");
    }
    setSelectedOption(location.pathname);
  }, [isSidebarOpen, location]);
  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 3000);
  };
  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 p-4 bg-[#1d1d1d] text-white transition-[width] duration-300 ${
        isSidebarOpen ? "w-[12.5rem]" : "w-[5rem]"
      }`}
    >
      <nav className="h-full">
        <ul className="flex flex-col h-full gap-6 list-none">
          <li>
            <Link
              to="/studentdashboard"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/studentdashboard" ||
                selectedOption === "/student/profile"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/studentdashboard")}
            >
              <i>
                <BiHomeCircle className="text-lg" />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/facultydetails"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/facultydetails"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/facultydetails")}
            >
              <i>
                <MdOutlineGroups className="text-lg" />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                Faculty
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/code-editor"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/code-editor"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/code-editor")}
            >
              <i>
                <MdOutlineTerminal className="text-lg" />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                CodeEditor
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/question-sheet"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/question-sheet"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/question-sheet")}
            >
              <i>
                <CgFileDocument className="text-lg" />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                QnaSheet
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/leave-student"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/leave-student"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/leave-student")}
            >
              <i>
                <FaBriefcase className="text-lg" />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                Leave
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/course-student"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/course-student" ||
                selectedOption === "/course-student/:coursesId"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/course-student")}
            >
              <i>
                <MdOutlineCollectionsBookmark className="text-lg" />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                Course
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/chat-student"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/chat-student"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/chat-student")}
            >
              <i>
                <HiChatAlt2 className="text-lg" />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                Chat
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/initiate-meet-student"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/initiate-meet-student"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/initiate-meet-student")}
            >
              <i>
                <PiVideoConferenceFill className="text-lg" />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                Meeting
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/collegemaster-student"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/collegemaster-student" ||
                selectedOption === "/collegemaster-student/settings/appointment"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/collegemaster-student")}
            >
              <i>
                <BsCalendarDayFill className="text-lg" />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                Calender
              </span>
            </Link>
          </li>
          <li>
            <Link
              onClick={handleLogout}
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "logout"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
            >
              <i>
                <CgLogOut className="text-lg" />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                Logout
              </span>
            </Link>
          </li>

          <div className="mt-auto">
            {/* <li className="flex items-center justify-center mb-5">
              <Avatar
                alt="Profile Picture"
                src={profilePicture}
                sx={{
                  width: 30,
                  height: 30,
                }}
                onClick={() => setIsSheetOpen(true)}
              />
            </li> */}
            <li className="">
              <a
                href="#"
                className="flex items-center text-xl text-white no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md"
                onClick={onToggle}
              >
                <i
                  className={`collapse-btn transition-transform duration-300 ${
                    isSidebarOpen ? "rotate-180" : ""
                  }`}
                >
                  <MdKeyboardDoubleArrowRight className="text-lg" />
                </i>
                <span
                  className={`${
                    isSidebarOpen
                      ? "opacity-100 visible pl-2"
                      : "opacity-0 invisible"
                  } text-sm`}
                >
                  Collapse
                </span>
              </a>
            </li>
          </div>
        </ul>
      </nav>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 ">
          <ClipLoader color="#3b82f6" size={35} />
        </div>
      )}
      {/* <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when
            </SheetDescription>
          </SheetHeader>
          <div className="flex items-center flex-col justify-center space-y-3 pt-5">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter here"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  width: "350px",

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                },
                "& .MuiInputLabel-outlined": {
                  color: "black",
                },
              }}
            />
            <div>
              <Select onValueChange={handleSectionChange} value={section}>
                <SelectTrigger className="w-[350px] border border-black">
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sections</SelectLabel>
                    {sections[selectedYear].map((sec) => (
                      <SelectItem key={sec} value={sec}>
                        {sec}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <TextField
              id="outlined-basic"
              label="Assigned Subject name"
              variant="outlined"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Enter here"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  width: "350px",

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                },
                "& .MuiInputLabel-outlined": {
                  color: "black",
                },
              }}
            />

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter here"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  width: "350px",

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                },
                "& .MuiInputLabel-outlined": {
                  color: "black",
                },
              }}
            />
            <TextField
              id="outlined-basic"
              label="Phone number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter here"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "black",
                  width: "350px",

                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                },
                "& .MuiInputLabel-outlined": {
                  color: "black",
                },
              }}
            />
            <div className="">
              <Button className="bg-black text-white mt-14 w-[350px]">
                Save
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet> */}
    </aside>
  );
}

export default StudentSidebar;
