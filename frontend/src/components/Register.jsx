import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import step1 from "../assets/step.mp4";
import logo from "../assets/logo-light.png";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence } from "framer-motion";
import { FaUniversity } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdSupervisorAccount } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import lightLogo from "../assets/logo.png";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";
import { RiFileExcel2Fill } from "react-icons/ri";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import step3 from "../assets/demo.mp4";
import ProgressUser from "./ProgressUser";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const Register = () => {
  const [step, setStep] = useState(1);
  const [collegeName, setCollegeName] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [section, setSection] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stufileName, setStfileName] = useState("");
  const [stafileName, setStafileName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [colleegid, setCollegId] = useState(0);
  const [status, setStatus] = useState("");
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();
  const [isCollegeNameValid, setIsCollegeNameValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  // Validate that only letters and spaces are allowed
  const validateCollegeName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setIsNameValid(validateName(newName)); // Set validation state
  };
  const handleCollegeNameChange = (e) => {
    const newCollegeName = e.target.value;
    setCollegeName(newCollegeName);
    setIsCollegeNameValid(validateCollegeName(newCollegeName));
  };
  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email input changes
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail)); // Set validation state
  };
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  // Handle phone number input changes
  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;

    // Allow only numeric input
    if (!/^\d*$/.test(newPhoneNumber)) {
      return; // Do nothing if non-numeric characters are input
    }

    // Limit the input to 10 digits
    if (newPhoneNumber.length > 10) {
      return; // Stop further input if the length exceeds 10
    }

    setPhoneNumber(newPhoneNumber);
    setIsPhoneNumberValid(newPhoneNumber.length === 10); // Set valid only if exactly 10 digits
  };

  useEffect(() => {
    // Duration for each avatar's progress display
    const duration = 5000; // Adjust timing as needed (5 seconds)

    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // Loop through 0, 1, 2
    }, duration);

    return () => clearTimeout(timer);
  }, [activeIndex]);
  const texts = ["Student", "Faculty", "Admin"];

  const handleNext = () => {
    setStep(step + 1);
  };
  const handleBack = () => {
    setStep(step - 1);
  };
  const handleSelection = (option) => {
    setSelectedOption(option);
  };
  const sections = {
    FY: ["FY-A", "FY-B", "FY-C", "FY-D", "FY-E"],
    SY: ["SY-A", "SY-B", "SY-C", "SY-D", "SY-E"],
    TY: ["TY-A", "TY-B", "TY-C", "TY-D", "TY-E"],
  };
  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };
  const selectedYear = "FY";
  const staffHandleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStafileName(file.name);
    } else {
      setStafileName("");
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);
      let header = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const firstRow = header[0];
      const valuesToCheck = [
        "_id",
        "Staff_name",
        "Mob",
        "Staff_Email",
        "Assigned_Class",
        "Section",
        "Subject",
      ];
      let col = 0;
      valuesToCheck.forEach((value) => {
        if (firstRow[col] === value) {
          col++;
        } else {
          col--;
        }
      });
      if (col === 7) {
        jsonData = jsonData.map((staff) => ({
          ...staff,
          college_id: colleegid,
        }));

        setFile(jsonData);
        if (insertstaff(jsonData)) {
        } else {
          setIsDialogOpen(true);
          setDialogMessage("Error while Importing Staff Data Successfull");
          setStatus("Error");
        }
      } else {
        alert("Staff Excel Should be in Format");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const sendmail = async (email, name) => {
    try {
      const response = await axios.post(
        "http://localhost:5472/services/sendmail",
        {
          Sendto: email,
          sendtoname: name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        return true;
      } else {
        console.error(`Unexpected status code: ${response.status}`);
        return false;
      }
    } catch (error) {
      // Log the error from the HTTP request
      console.error("Error sending email:", error);
      return false;
    }
  };
  const studenthandleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStfileName(file.name);
    } else {
      setStfileName("");
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);
      let header = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const firstRow = header[0];
      const valuesToCheck = [
        "_id",
        "Student_Name",
        "Class",
        "Section",
        "DOB",
        "Email",
        "Mobile",
      ];
      let col = 0;
      valuesToCheck.forEach((value) => {
        if (firstRow[col] === value) {
          col++;
        } else {
          col--;
        }
      });

      if (col === 7) {
        jsonData = jsonData.map((student) => ({
          ...student,
          college_id: colleegid,
        }));

        if (insertstudents(jsonData)) {
          handleNext();
          setStatus("Success");
        }
      } else {
        alert("Excel should be in Format");
      }
    };

    reader.readAsArrayBuffer(file);
  };
  const sendtomongo = async () => {
    try {
      let addcollege = await axios.post(
        "http://localhost:5472/services/insert",
        { colname: collegeName, addr: address, collename: "College_Master" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (addcollege.data) {
        setCollegId(addcollege.data.college_id);
        handleNext();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const register_admin = async () => {
    try {
      let user_info = await axios.post(
        "http://localhost:5472/services/regadmin",
        {
          Sname: name,
          Password: password,
          Email: email,
          Mobile: parseInt(phoneNumber),
          college_id: colleegid,
          collecname: "Admin_users",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (user_info.data) {
        setStatus("Success");
        handleNext();
      } else {
        setStatus("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const insertstudents = async (studentdata) => {
    try {
      let addstudent = await axios.post(
        "http://localhost:5472/services/addstudent",
        { studentdata, collecname: "Student_Master" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (addstudent) {
        return true;
        console.log(addstudent);
      } else {
        console.log("Error");
        setStatus("Error");
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const insertstaff = async (staffdata) => {
    //console.log(staffdata)

    try {
      let addstaff = await axios.post(
        "http://localhost:5472/services/addstaff",
        { staffdata, collecname: "Staff_Master" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (addstaff) {
        return true;
      } else {
        console.log("Error");
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      if (await sendmail(email, name)) {
        // Assuming sendmail is defined
        setStatus("Success");
        setDialogMessage("College Registration Successful");
        setIsDialogOpen(true);

        // Start the countdown
        setCountdown(3);
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(interval);
              handleCloseDialog();
              return 0;
            }
            return prev - 1; // Decrease the countdown
          });
        }, 1000); // Update every second
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setDialogMessage("Registration Failed. Please try again.");
      setIsDialogOpen(true);

      setCountdown(3);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            handleCloseDialog();
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Update second
    } finally {
      setIsLoading(false); // Reset
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    navigate("/login/admin");
  };
  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = "/student_data.xlsx";
    link.download = "student_data.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadFileFaculty = () => {
    const link = document.createElement("a");
    link.href = "/staff_data.xlsx"; //  file in the public folder
    link.download = "staff_data.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <nav className="bg-[#27a1dd] dark:bg-gray-900 fixed w-full  z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* <img src={logo} className="h-8" alt="College Logo" /> */}
            <h1 className="text-2xl font-medium text-white">
              <span className="text-[#e2e2e2] font-bold">Edu</span>Sphere{" "}
            </h1>
          </Link>
          <div className="flex space-x-3">
            <div className="login-btn bg-black text-white text-center flex items-center justify-center px-4 py-2 hover:bg-gray-900 rounded-sm">
              <a href="/login">Login</a>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex flex-wrap min-h-screen">
        <div className="left-side-brief w-full md:w-1/2 p-10 flex items-center justify-center">
          <div className="max-w-lg m-auto  ">
            <div className="heading-intro">
              <h1 className="font-medium text-black py-14 text-3xl text-center">
                {" "}
                Register
              </h1>
            </div>
            <div className="">
              <AnimatePresence>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                  >
                    <div className="">
                      <h1 className="text-black text-xl pb-5 font-medium">
                        College Information?
                      </h1>
                    </div>
                    <div className="college-name relative">
                      <TextField
                        id="outlined-basic"
                        label="College Name"
                        variant="outlined"
                        value={collegeName}
                        onChange={handleCollegeNameChange}
                        placeholder="Enter here"
                        error={!isCollegeNameValid && collegeName !== ""}
                        helperText={
                          !isCollegeNameValid && collegeName !== ""
                            ? "Only letters are allowed"
                            : ""
                        }
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
                      <div className="college-icon text-black absolute top-5 left-[320px]">
                        {" "}
                        <FaUniversity />
                      </div>
                    </div>
                    {collegeName && (
                      <div
                        className="college-address"
                        style={{ marginTop: "12px", marginBottom: "20px" }}
                      >
                        <TextField
                          id="outlined-address"
                          label="College Address"
                          variant="outlined"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter address"
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
                      </div>
                    )}
                    <div className="first-btn mt-5">
                      <Button
                        onClick={sendtomongo}
                        variant="contained"
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          borderRadius: 30,
                        }}
                        disabled={!collegeName || !address}
                      >
                        <FaArrowRightLong
                          style={{
                            padding: "5px",
                            color: "white",
                            fontSize: "25px",
                          }}
                        />
                      </Button>
                    </div>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                  >
                    <div className="showcase-details w-full text-black">
                      <div className="intro-showcase-heading">
                        <h1 className="text-2xl ">How do you want to use?</h1>
                        <p>We will personalize your experience accordingly</p>
                      </div>
                      <div className="select-profession pt-14  mb-10 space-y-4 ">
                        {/* <div
                          className={`select-student border border-1 border-[#00000016] flex justify-around  items-center py-5 px-2 hover:border-black  ${
                            selectedOption === "student" ? "active" : ""
                          }`}
                          onClick={() => handleSelection("student")}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="student-icon px-5">
                            <PiStudentFill
                              style={{ fontSize: "30px", color: "green" }}
                            />
                          </div>
                          <div className="student-details flex  flex-col px-10">
                            <h1 className="lg:text-lg sm:text-lg text-base">
                              Join the student portal for a seamless academic
                              experience
                            </h1>
                            <p className="text-gray-500">Student</p>
                          </div>
                        </div>
                        <div
                          className={`select-faulty border border-1 border-[#00000016] flex justify-around items-center py-5 px-2 hover:border-black ${
                            selectedOption === "faulty" ? "active" : ""
                          }`}
                          onClick={() => handleSelection("faulty")}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="faulty-icon px-5">
                            <MdSupervisorAccount
                              style={{ fontSize: "30px", color: "#755485" }}
                            />
                          </div>
                          <div className="faulty-details flex  flex-col px-10">
                            <h1 className="lg:text-lg sm:text-lg text-base">
                              Sign up to manage your classes attendance, and
                              academic resources
                            </h1>
                            <p className="text-gray-500">Faulty</p>
                          </div>
                        </div> */}
                        <div
                          className={`select-admin border-1 border-[#00000016] flex justify-around items-center py-5 px-2 border hover:border-black ${
                            selectedOption === "admin" ? "active" : ""
                          }`}
                          onClick={() => handleSelection("admin")}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="admin-icon px-5">
                            <MdOutlineAdminPanelSettings
                              style={{
                                fontSize: "30px",
                                color: "#1d68bd",
                              }}
                            />
                          </div>
                          <div className="admin-details flex  flex-col px-10">
                            <h1 className="lg:text-lg sm:text-lg text-base">
                              Sign up to manage college operations, and student
                              information
                            </h1>
                            <p className="text-gray-500">Admin</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="">
                        <Button
                          onClick={handleBack}
                          variant="contained"
                          style={{
                            color: "white",
                            backgroundColor: "black",
                            borderRadius: 30,
                          }}
                        >
                          <FaArrowLeftLong
                            style={{
                              padding: "5px",
                              color: "white",
                              fontSize: "25px",
                            }}
                          />
                        </Button>
                      </div>
                      <div className="">
                        <Button
                          onClick={handleNext}
                          disabled={!selectedOption}
                          variant="contained"
                          style={{
                            color: "white",
                            backgroundColor: "black",
                            borderRadius: 30,
                          }}
                        >
                          <FaArrowRightLong
                            style={{
                              padding: "5px",
                              color: "white",
                              fontSize: "25px",
                            }}
                          />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="text-black"
                  >
                    {selectedOption === "admin" && (
                      <>
                        <div className="flex items-center flex-col justify-center space-y-3">
                          <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Enter here"
                            error={!isNameValid && name !== ""}
                            helperText={
                              !isNameValid && name !== ""
                                ? "Only letters allowed"
                                : ""
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "black",
                                width: "400px",

                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "black",
                                },
                              },
                              "& .MuiInputLabel-outlined": {
                                color: "black",
                              },
                            }}
                          />

                          <div className="flex items-center justify-center relative">
                            <div className=" ">
                              <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter here"
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    color: "black",
                                    width: "400px",

                                    "& .MuiOutlinedInput-notchedOutline": {
                                      borderColor: "black",
                                    },
                                  },
                                  "& .MuiInputLabel-outlined": {
                                    color: "black",
                                  },
                                }}
                              />
                            </div>
                            <div
                              className="password-icon absolute right-14 left-[370px] cursor-pointer"
                              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                            >
                              {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                          </div>
                          <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter here"
                            error={!isEmailValid && email !== ""}
                            helperText={
                              !isEmailValid && email !== ""
                                ? "Please enter a valid email address"
                                : ""
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "black",
                                width: "400px",

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
                            onChange={handlePhoneNumberChange}
                            placeholder="Enter here"
                            error={!isPhoneNumberValid && phoneNumber !== ""}
                            helperText={
                              !isPhoneNumberValid && phoneNumber !== ""
                                ? "Phone number must be exactly 10 digits"
                                : ""
                            }
                            inputProps={{
                              maxLength: 10,
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "black",
                                width: "400px",

                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "black",
                                },
                              },
                              "& .MuiInputLabel-outlined": {
                                color: "black",
                              },
                            }}
                          />
                        </div>
                      </>
                    )}
                    {selectedOption === "faulty" && (
                      <>
                        <div className="flex items-center flex-col justify-center space-y-3">
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
                                width: "400px",

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
                            <FormControl sx={{ marginTop: 1, minWidth: 400 }}>
                              <InputLabel id="demo-simple-select-helper-label">
                                Section
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="Section"
                                value={section}
                                onChange={handleSectionChange}
                              >
                                <MenuItem value="">--Select Section--</MenuItem>
                                {sections[selectedYear].map((sec) => (
                                  <MenuItem key={sec} value={sec}>
                                    {sec}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>

                            {section && (
                              <div>
                                <p style={{ color: "black", fontSize: "10px" }}>
                                  You have selected: {section}
                                </p>
                              </div>
                            )}
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
                                width: "400px",

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
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter here"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "black",
                                width: "400px",

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
                                width: "400px",

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
                            onChange={handlePhoneNumberChange}
                            placeholder="Enter here"
                            error={!isPhoneNumberValid && phoneNumber !== ""}
                            helperText={
                              !isPhoneNumberValid && phoneNumber !== ""
                                ? "Phone number must be 10 digits"
                                : ""
                            }
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                color: "black",
                                width: "400px",

                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "black",
                                },
                              },
                              "& .MuiInputLabel-outlined": {
                                color: "black",
                              },
                            }}
                          />
                        </div>
                      </>
                    )}
                    {selectedOption === "student" && (
                      <>
                        <h1 className="text-xl pb-5 font-medium">
                          Import Your Excel here
                        </h1>
                        <div className="bg-white py-5 px-5 rounded-sm w-[400px]">
                          <div className="bg-[#f2f7ff] py-14 px-10 rounded-sm border-2 border-dashed border-blue-500 flex items-center flex-col justify-center">
                            <div className="flex items-center justify-center pb-5 ">
                              <RiFileExcel2Fill
                                style={{ fontSize: "30px", color: "#116752" }}
                              />
                            </div>
                            <Input
                              id="excelFile"
                              type="file"
                              accept=".xlsx, .xls"
                              className="bg-[#116752] text-gray-400 rounded-full "
                              onChange={handleFileUpload}
                              style={{ display: "none" }}
                            />
                            <label
                              htmlFor="excelFile"
                              className="custom-file-upload bg-gray-200 py-1 px-2 rounded-sm"
                            >
                              Select File
                            </label>
                          </div>
                          <div className="pt-3">
                            <p className="text-sm text-gray-500 ">
                              Supported formats: XLS, XLSX
                            </p>
                          </div>
                          {stufileName && (
                            <div className="file-info bg-[#f3f5f7] py-5 my-5 rounded-sm flex items-center justify-around">
                              <RiFileExcel2Fill
                                style={{ fontSize: "30px", color: "#116752" }}
                              />
                              <p className="text-gray-500"> {stufileName}</p>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between mt-5">
                      <div className="">
                        <Button
                          onClick={handleBack}
                          variant="contained"
                          style={{
                            color: "white",
                            backgroundColor: "black",
                            borderRadius: 30,
                          }}
                        >
                          <FaArrowLeftLong
                            style={{
                              padding: "5px",
                              color: "white",
                              fontSize: "25px",
                            }}
                          />
                        </Button>
                      </div>
                      {}
                      <Button
                        onClick={register_admin}
                        variant="contained"
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          borderRadius: 30,
                        }}
                        disabled={!name || !password || !email || !phoneNumber}
                      >
                        <FaArrowRightLong
                          style={{
                            padding: "5px",
                            color: "white",
                            fontSize: "25px",
                          }}
                        />
                      </Button>
                    </div>

                    {/* {isDialogOpen && (
                      <div className="blank">
                        <div className="show-popup">
                          <div
                            className="close-btn"
                            onClick={handleCloseDialog}
                          >
                            X {}
                          </div>
                          <div className="pt-5">
                            <IoIosCheckmarkCircleOutline
                              style={{ color: "green", fontSize: "80px" }}
                              className="mx-auto"
                            />
                          </div>
                          <div className="heading text-white text-2xl text-center">
                            <h1>{dialogMessage}</h1>
                          </div>
                        </div>
                      </div>
                    )} */}
                  </motion.div>
                )}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                  >
                    <div className="">
                      <div className="flex items-center justify-between pb-5">
                        <div className="">
                          <h1 className="text-xl  font-medium text-black">
                            Import Your Student's
                          </h1>
                        </div>
                        <div
                          className="bg-green-700 p-2 rounded-full flex items-center cursor-pointer hover:bg-[#01874d]"
                          onClick={downloadFile}
                        >
                          <PiMicrosoftExcelLogoFill
                            style={{
                              fontSize: "20px",
                              paddingRight: "3px",
                            }}
                          />
                          <div className="">Download sample </div>
                        </div>
                      </div>
                      <div className="bg-white py-5 px-5 rounded-sm w-[400px]">
                        <div className="bg-[#f2f7ff] py-14 px-10 rounded-sm border-2 border-dashed border-blue-500 flex items-center flex-col justify-center">
                          <div className="flex items-center justify-center pb-5 ">
                            <RiFileExcel2Fill
                              style={{ fontSize: "30px", color: "#116752" }}
                            />
                          </div>
                          <Input
                            id="excelFile"
                            type="file"
                            accept=".xlsx, .xls"
                            className="bg-[#116752] text-gray-400 rounded-full "
                            onChange={studenthandleFileUpload}
                            style={{ display: "none" }}
                          />
                          <label
                            htmlFor="excelFile"
                            className="custom-file-upload bg-gray-200 py-1 px-2 rounded-sm text-gray-500"
                          >
                            Select File
                          </label>
                        </div>
                        <div className="pt-3">
                          <p className="text-sm text-gray-500 ">
                            Supported formats: XLS, XLSX
                          </p>
                        </div>
                        {stufileName && (
                          <div className="file-info bg-[#f3f5f7] py-5 my-5 rounded-sm flex items-center justify-around">
                            <RiFileExcel2Fill
                              style={{ fontSize: "30px", color: "#116752" }}
                            />
                            <p className="text-gray-500"> {stufileName}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-5">
                      <div className="">
                        <Button
                          onClick={handleBack}
                          variant="contained"
                          style={{
                            color: "white",
                            backgroundColor: "black",
                            borderRadius: 30,
                          }}
                        >
                          <FaArrowLeftLong
                            style={{
                              padding: "5px",
                              color: "white",
                              fontSize: "25px",
                            }}
                          />
                        </Button>
                      </div>
                      <Button
                        onClick={handleNext}
                        variant="contained"
                        style={{
                          color: "white",
                          backgroundColor: "black",
                          borderRadius: 30,
                        }}
                        disabled={!stufileName}
                      >
                        <FaArrowRightLong
                          style={{
                            padding: "5px",
                            color: "white",
                            fontSize: "25px",
                          }}
                        />
                      </Button>
                    </div>
                  </motion.div>
                )}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                  >
                    <div className="">
                      <div className="flex items-center justify-between pb-5">
                        <div className="">
                          <h1 className="text-xl font-medium text-black">
                            Import Your Staff's
                          </h1>
                        </div>
                        <div
                          className="bg-[#755485] p-2 rounded-full flex items-center cursor-pointer hover:bg-[#50295dd8]"
                          onClick={downloadFileFaculty}
                        >
                          <PiMicrosoftExcelLogoFill
                            style={{
                              fontSize: "20px",
                              paddingRight: "3px",
                            }}
                          />
                          <div className="">Download sample </div>
                        </div>
                      </div>
                      <div className="bg-white py-5 px-5 rounded-sm w-[400px]">
                        <div className="bg-[#c98aeb2a] py-14 px-10 rounded-sm border-2 border-dashed border-purple-300 flex items-center flex-col justify-center">
                          <div className="flex items-center justify-center pb-5 ">
                            <RiFileExcel2Fill
                              style={{ fontSize: "30px", color: "#116752" }}
                            />
                          </div>
                          <Input
                            id="excelFile"
                            type="file"
                            accept=".xlsx, .xls"
                            className="bg-[#116752] text-gray-400 rounded-full "
                            onChange={staffHandleFileUpload}
                            style={{ display: "none" }}
                          />
                          <label
                            htmlFor="excelFile"
                            className="custom-file-upload bg-gray-200 py-1 px-2 rounded-sm text-gray-500"
                          >
                            Select File
                          </label>
                        </div>
                        <div className="pt-3">
                          <p className="text-sm text-gray-500 ">
                            Supported formats: XLS, XLSX
                          </p>
                        </div>
                        {stafileName && (
                          <div className="file-info bg-[#f3f5f7] py-5 my-5 rounded-sm flex items-center justify-around">
                            <RiFileExcel2Fill
                              style={{ fontSize: "30px", color: "#116752" }}
                            />
                            <p className="text-gray-500"> {stafileName}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-5">
                      <div className="">
                        <Button
                          onClick={handleBack}
                          variant="contained"
                          style={{
                            color: "white",
                            backgroundColor: "black",
                            borderRadius: 30,
                          }}
                        >
                          <FaArrowLeftLong
                            style={{
                              padding: "5px",
                              color: "white",
                              fontSize: "25px",
                            }}
                          />
                        </Button>
                      </div>
                      <div className="">
                        <Button
                          onClick={handleSubmit}
                          variant="contained"
                          disabled={status != "Success" || isLoading}
                          style={{
                            color: "white",
                            backgroundColor: "black",
                            borderRadius: 30,
                          }}
                        >
                          {isLoading ? "Loading..." : "Finish"}
                        </Button>
                      </div>

                      {isDialogOpen && (
                        <div className="blank">
                          <div className="show-popup">
                            <div
                              className="close-btn"
                              onClick={handleCloseDialog}
                              style={{ cursor: "pointer" }} // Add pointer cursor for better UX
                            ></div>
                            <div className="pt-5">
                              <IoIosCheckmarkCircleOutline
                                style={{ color: "green", fontSize: "80px" }}
                                className="mx-auto"
                              />
                            </div>
                            <div className="heading text-white text-2xl text-center">
                              <h1>{dialogMessage}</h1>
                              <h2 className="text-lg text-white">
                                Redirecting in {countdown}...
                              </h2>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
                <div className="progress-dots">
                  {[1, 2, 3, 4, 5].map((dot, index) => (
                    <motion.span
                      key={index}
                      className={`dot ${step === dot ? "active" : ""}`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: step === dot ? 1.2 : 1 }}
                    />
                  ))}
                </div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="right-side-content w-full md:w-1/2 flex flex-col items-center justify-center">
          <div className="flex items-center justify-around flex-col py-5">
            <div className="">
              <h1 className="text-black text-2xl pt-10">
                Import Your Faculty & Student Information
              </h1>
            </div>
            <AnimatePresence>
              {step === 1 && (
                <motion.video
                  src={step1}
                  key="video1"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className=" h-auto w-full"
                  autoPlay
                  loop
                  muted
                />
              )}
              {step === 1 && (
                <motion.div
                  key="text1"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="text-gray-500 pt-5 px-5"
                >
                  <h1>
                    Please enter the name and address of your college to
                    establish your institutions identity within the management
                    system. This step is essential for accurate and efficient
                    operation.
                  </h1>
                </motion.div>
              )}
              {/* {step === 2 && (
                <motion.video
                  src={step2}
                  key="video2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className=" h-auto w-full"
                  autoPlay
                  loop
                  muted
                />
              )} */}
              {step === 2 && (
                <motion.div
                  key="text2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="text-gray-500 pt-5 px-5"
                >
                  <div className="flex space-x-[120px] sm:space-x-[150px] mt-[100px] mb-[50px] justify-center py-10">
                    <ProgressUser
                      duration={5}
                      isActive={activeIndex === 0}
                      color="#004bad"
                      text={texts[0]}
                      src={
                        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer1.png"
                      }
                    />
                    <ProgressUser
                      duration={5}
                      isActive={activeIndex === 1}
                      color="#e83568"
                      text={texts[1]}
                      src={
                        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer2.png"
                      }
                    />
                    <ProgressUser
                      duration={5}
                      isActive={activeIndex === 2}
                      color="orange"
                      text={texts[2]}
                      src={
                        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer3.png"
                      }
                    />
                  </div>
                  <p className="py-10 px-5">
                    In the College Management System, admins and faculty
                    register manually, while student data is efficiently
                    imported via Excel files for bulk management.
                  </p>
                </motion.div>
              )}
              {step === 3 && (
                <motion.video
                  src={step3}
                  key="video2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className=" h-auto w-[520px]"
                  autoPlay
                  loop
                  muted
                />
              )}
              {step === 3 && (
                <motion.div
                  key="text3"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="text-gray-500 pt-5 px-5"
                >
                  <h1 className="py-10">
                    Admins and faculty can streamline student registration by
                    importing student data directly from an Excel file. This
                    allows for quick and efficient bulk enrollment.
                  </h1>
                </motion.div>
              )}
              {step === 4 && (
                <motion.video
                  src={step3}
                  key="video2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className=" h-auto w-[520px]"
                  autoPlay
                  loop
                  muted
                />
              )}
              {step === 4 && (
                <motion.div
                  key="text4"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="text-gray-500 pt-5 px-5"
                >
                  <h1 className="py-10">
                    Admins and faculty can streamline student registration by
                    importing student data directly from an Excel file. This
                    allows for quick and efficient bulk enrollment.
                  </h1>
                </motion.div>
              )}
              {step === 5 && (
                <motion.video
                  src={step3}
                  key="video2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className=" h-auto w-[520px]"
                  autoPlay
                  loop
                  muted
                />
              )}
              {step === 5 && (
                <motion.div
                  key="text5"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="text-gray-500 pt-5 px-5"
                >
                  <h1 className="py-10">
                    Admins and faculty can streamline student registration by
                    importing student data directly from an Excel file. This
                    allows for quick and efficient bulk enrollment.
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="">
        <footer className="bg-[#27282c] w-full h-full flex items-center justify-center">
          <div className="py-10 ">
            {/* <img
              src={lightLogo}
              alt="Logo"
              className="w-[150px] h-auto mix-blend-screen"
            /> */}
            <h1 className="text-2xl font-medium">
              <span className="text-[#C70039] font-bold">Edu</span>Manage{" "}
            </h1>
            <p className="text-xs text-center text-gray-400">
              {" "}
              EduSphere © 2024
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Register;
