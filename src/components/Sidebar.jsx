import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiHomeCircle } from "react-icons/bi";
import { PiStudentFill } from "react-icons/pi";
import { Avatar } from "@mui/material";
import { MdKeyboardDoubleArrowRight, MdCoPresent } from "react-icons/md";
import { MdOutlineGroups } from "react-icons/md";
import { BsCalendarDayFill } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { BsChatSquareTextFill } from "react-icons/bs";
import { MdMenuBook } from "react-icons/md";
import { PiVideoCameraFill } from "react-icons/pi";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { HiChatAlt2 } from "react-icons/hi";
import { FaBriefcase } from "react-icons/fa";

function Sidebar({ isSidebarOpen, onToggle, profilePicture }) {
  const [loading, setLoading] = useState(false);
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
        localStorage.removeItem("college_id")
        localStorage.removeItem("otp")
        localStorage.removeItem("profile_pic")
        localStorage.removeItem("admin_id")
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
              to="/dashboard"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/dashboard" ||
                selectedOption === "/admin/profile"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/dashboard")}
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
              to="/student"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/student"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/student")}
            >
              <i>
                {" "}
                <PiStudentFill className="text-lg" />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                Student
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/attendance"
              className={`flex items-center text-xl  no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/attendance"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/attendance")}
            >
              <i>
                <MdCoPresent className="text-lg" />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                Attendance
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/faculty"
              className={`flex items-center text-xl  no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/faculty"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/faculty")}
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
              to="/leave-list"
              className={`flex items-center text-xl  no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/leave-list"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/leave-list")}
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
                LeaveList
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/course"
              className={`flex items-center text-xl  no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/course"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/course")}
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
              to="/initiate-meet"
              className={`flex items-center text-xl  no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/initiate-meet"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/initiate-meet")}
            >
              <i>
                <PiVideoCameraFill className="text-lg" />
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
              to="/collegemaster"
              className={`flex items-center text-xl  no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/collegemaster" ||
                selectedOption === "/collegemaster/settings/appointment" ||
                selectedOption === "/collegemaster/settings/academic"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/collegemaster")}
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
              className={`flex items-center text-xl  no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
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
    </aside>
  );
}

export default Sidebar;
