import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BiHomeCircle } from "react-icons/bi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineGroups,MdAccessTime } from "react-icons/md";
import { Avatar } from "@mui/material";
import { CgLogOut } from "react-icons/cg";
import { ClipLoader } from "react-spinners";
import { TextField } from "@mui/material";
import { Button } from "@/components/ui/button";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Section } from "lucide-react";
import { Input } from "postcss";
import studentInfo from "@/scripts/Studenbyid";
import updateStudentDetails from "@/scripts/updatestudent.mjs";

function StudentSidebar({ isSidebarOpen, onToggle, profilePicture }) {
  const [loading, setLoading] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [section, setSection] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const update = async () =>{

    let upd =  await updateStudentDetails(email,phoneNumber,name);
    if(upd){
      setIsDialogOpen(true)
      setDialogMessage("Record Updated Successsfully");
      setIsSheetOpen(false)
    }
    else{
      setIsSheetOpen(true)

    }

    }

  const sections = {
    FY: ["FY-A", "FY-B", "FY-C", "FY-D", "FY-E"],
  };
  const selectedYear = "FY";
  const handleSectionChange = (value) => {
    setSection(value);
    console.log(value);
  };
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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
  useEffect(() => {
    const fetchData = async () => {
        try {
            
            const data = await studentInfo(); 
            
            
            setName(data[0].Student_Name);
            setEmail(data[0].Email);
            setDob(data[0].Dob);
            setSection(data[0].Class+"-"+data[0].Section);
            setPhoneNumber(data[0].Mobile);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, [isSidebarOpen, location]);


  
  const handleLogout = () => {
    localStorage.removeItem('otp');
    localStorage.removeItem('student_id');
    localStorage.removeItem('profile_pic');
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
      {isDialogOpen && (
                      <div className="blank">
                        <div className="show-popup">
                          <div
                            className="close-btn"
                            onClick={handleCloseDialog}
                          ></div>
                          <div className="pt-5">
                            <IoIosCheckmarkCircleOutline
                              style={{ color: "green", fontSize: "80px " }}
                              className="mx-auto "
                            />
                          </div>
                          <div className="heading text-white  text-2xl text-center">
                            <h1> {dialogMessage}</h1>
                          </div>
                        </div>
                      </div>
                    )}
      <nav className="h-full">
        <ul className="flex flex-col h-full gap-6 list-none">
          <li>
            <Link
              to="/studentdashboard"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/studentdashboard"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/studentdashboard")}
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
              to="/facultydetails"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/facultydetails"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/facultydetails")}
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
              to="/timetable"
              className={`flex items-center text-xl no-underline leading-none p-[10px_14px] transition-colors duration-400 ease-in-out hover:bg-white hover:text-black focus-visible:bg-white focus-visible:text-black rounded-md ${
                selectedOption === "/timetable"
                  ? "bg-white text-black"
                  : "text-white"
              }`}
              onClick={() => setSelectedOption("/timetable")}
            >
              <i>
                <MdAccessTime />
              </i>

              <span
                className={`${
                  isSidebarOpen
                    ? "opacity-100 visible pl-2"
                    : "opacity-0 invisible"
                } text-sm`}
              >
                Time Table
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
                onClick={() => setIsSheetOpen(true)}
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
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
            <TextField
              id="outlined-basic"
              label="Class"
              variant="outlined"
              value={section}
             disabled = {true}
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
              label="Date of Birth"
              variant="outlined"
              value={dob}
              disabled={true}
              //onChange={(e) => setName(e.target.value)}
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
              <Button className="bg-black text-white mt-14 w-[350px]" onClick={update}>
                Save
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </aside>
  );
}

export default StudentSidebar;
