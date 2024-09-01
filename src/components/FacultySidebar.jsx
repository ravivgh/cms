import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiHomeCircle } from "react-icons/bi";
import { PiStudentFill } from "react-icons/pi";
import { Avatar } from "@mui/material";
import { MdKeyboardDoubleArrowRight, MdCoPresent } from "react-icons/md";
import { MdOutlineGroups } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { ClipLoader } from "react-spinners";

function FacultySidebar({ isSidebarOpen, onToggle, profilePicture }) {
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
              to="/facultydashboard"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/facultydashboard"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/facultydashboard")}
            >
              <i>
                <BiHomeCircle />
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
              to="/students"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/students"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/students")}
            >
              <i>
                {" "}
                <PiStudentFill />
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
              to="/attendancesheet"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/attendancesheet"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/attendancesheet")}
            >
              <i>
                <MdCoPresent />
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
              to="/facultydata"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/facultydata"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/facultydata")}
            >
              <i>
                <MdOutlineGroups />
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
              onClick={handleLogout}
              className={`flex items-center text-xl  no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "logout"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
            >
              <i>
                <CgLogOut />
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
            <li className="flex items-center justify-center mb-5">
              <Avatar
                alt="Profile Picture"
                src={profilePicture}
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </li>
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
                  <MdKeyboardDoubleArrowRight />
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

export default FacultySidebar;
