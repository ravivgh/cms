import { useState, useRef } from "react";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo-light.png";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { IoIosCamera } from "react-icons/io";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { IoIosArrowRoundForward } from "react-icons/io";
const AdminLogin = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  // const isButtonDisabled = !email || !password;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(e.target.value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
    updateButtonState(e.target.value, password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length !== 6) {
      setPasswordError("Password must be exactly 6 characters long.");
    } else {
      setPasswordError("");
    }
    updateButtonState(email, e.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleOtpChange = (otp) => {
    setOtp(otp);
    console.log(otp);
    setIsOtpValid(otp.length === 4);
  };
  const handleDrawerToggle = (e) => {
    e.preventDefault();
    setIsDrawerOpen((prev) => !prev);
  };
  const handleVerify = () => {
    if (isOtpValid) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setStep(2);
      }, 3000);
    } else {
      alert("Please enter a valid OTP");
    }
  };
  const updateButtonState = (email, password) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isPasswordValid = password.length === 6;

    if (emailPattern.test(email) && isPasswordValid) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleTakePhoto = (dataUri) => {
    setProfilePicture(dataUri);
    setIsCameraOpen(false);
    console.log(dataUri);
  };
  const fileInputRef = useRef(null);
  const handleChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handlePictureChange = (e) => {
    console.log("object");
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleBack = () => {
  //   setStep(1);
  // };

  const handleSubmit = () => {
    if (profilePicture) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
      }, 3000);
    }
  };
  return (
    <>
      <div className="flex flex-wrap min-h-screen">
        <div className="left-side-brief w-full md:w-1/2 p-10 flex items-center justify-center">
          <div className="max-w-lg m-auto text-center md:text-left">
            <h1 className="text-black text-4xl pt-20 md:pt-40 leading-loose">
              Our Roles
            </h1>
            <p className="text-black text-xl">
              Oversee college operations and manage student and faculty
              information efficiently.
            </p>

            <div className="admin-band  flex  items-center justify-center  bg-[#acc7e7]  px-3 py-2 mt-9 w-fit  rounded-full mx-auto lg:mx-0 gap-2">
              <MdOutlineAdminPanelSettings
                style={{ fontSize: "20px", color: "black" }}
              />
              <p className="text-black ml-2 md:ml-0">Manage Operations</p>
            </div>
          </div>
        </div>
        <div className="right-side-content w-full md:w-1/2 flex flex-col items-center justify-center">
          <img src={logo} alt="Logo" className="w-40 md:w-40" />
          <div className="w-full max-w-sm p-4">
            <div className="student-box-heading flex items-center justify-center pb-4">
              <h2 className="text-center p-1 m-10 bg-[#acc7e7]  rounded-sm w-32 text-black">
                ADMIN
              </h2>
            </div>
            <hr
              style={{
                height: "1px",
                color: "grey",
                borderWidth: 0,
                backgroundColor: "grey",
              }}
            ></hr>
            <div className="student-email-control pt-5 pb-5 w-full">
              <div>
                <h1 className="text-[#8080808f] text-base font-medium text-center">
                  Log In with Your Email & Password
                </h1>
              </div>
              <form>
                <div className="email-showcase pt-8">
                  <label htmlFor="email" className="text-black block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Ex.  smith@gmail.com"
                    className="w-full p-6 bg-[#F2F3F8] text-black text-lg"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-2">{emailError}</p>
                  )}
                  <div className="password-showcase pt-2 relative">
                    <label htmlFor="password" className="text-black block">
                      Password
                    </label>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      className="w-full p-6 bg-[#F2F3F8] text-black text-lg"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <div
                      className="absolute bottom-4 left-80"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer", color: "black" }}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                  )}
                  <div className="btn pt-10 flex relative items-center">
                    <Button
                      className={`w-full p-6  ${
                        isButtonDisabled
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-black"
                      } text-white rounded-md`}
                      onClick={handleDrawerToggle}
                      disabled={isButtonDisabled}
                    >
                      Submit
                    </Button>
                    <div className="absolute left-[200px]">
                      <IoIosArrowRoundForward
                        style={{ color: "grey", fontSize: "30" }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <hr
              className="mx-auto bg-[#48484855]"
              style={{
                width: "100px",
                height: "1px",
                color: "grey",
                borderWidth: 0,
              }}
            ></hr>
            <div className="pt-20  mx-auto">
              <p className="text-gray-400 ">
                By login up you agree to CampusFlow{" "}
                <span className="text-green-600">Privacy Policy</span> and{" "}
                <span className="text-green-600">Terms of Service.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {isDrawerOpen && (
        <Drawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          className="bg-black"
        >
          <DrawerContent>
            {step === 1 && (
              <div className="flex items-center justify-center flex-col py-5">
                <div>
                  <h1 className="text-black text-xl font-semibold text-center">
                    Enter your verification code
                  </h1>
                  <p className="pt-2">
                    We sent a verification code to <span>smith@gmail.com</span>
                  </p>
                </div>
                <div className="py-7">
                  <AvatarGroup total={24}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6734a14081a246fbb68851d7_Design%20Templates-Portrait_Intervue%20(334%20x%20212%20px)%20(6).png"
                    />
                    <Avatar
                      alt="Travis Howard"
                      src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6734a11ab27574be137c4ca1_Design%20Templates-Portrait_Intervue%20(19)%201%20(1).png"
                    />
                    <Avatar
                      alt="Agnes Walker"
                      src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6734a0fb60d081bdda9028b5_Design%20Templates-Portrait_Intervue%20(19)%201.png"
                    />
                    <Avatar
                      alt="Trevor Henderson"
                      src="https://st.depositphotos.com/63571822/54892/i/450/depositphotos_548923552-stock-photo-young-man-going-job-interview.jpg"
                    />
                  </AvatarGroup>
                </div>
                <hr
                  className="mx-auto bg-[#48484855]"
                  style={{
                    width: "100px",
                    height: "1px",
                    color: "grey",
                    borderWidth: 0,
                  }}
                ></hr>
                <div className="py-11">
                  <InputOTP
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS}
                    onChange={handleOtpChange}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        style={{
                          width: "50px",
                          height: "50px",
                          fontSize: "25px",
                          border: "1px solid grey",
                        }}
                      />
                      <InputOTPSlot
                        index={1}
                        style={{
                          width: "50px",
                          height: "50px",
                          fontSize: "25px",
                          border: "1px solid grey",
                        }}
                      />
                      <InputOTPSlot
                        index={2}
                        style={{
                          width: "50px",
                          height: "50px",
                          fontSize: "25px",
                          border: "1px solid grey",
                        }}
                      />
                      <InputOTPSlot
                        index={3}
                        style={{
                          width: "50px",
                          height: "50px",
                          fontSize: "25px",
                          border: "1px solid grey",
                        }}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="verify-btn">
                  <Button
                    style={{
                      width: "150px",
                      backgroundColor: isOtpValid ? "black" : "grey",
                    }}
                    onClick={handleVerify}
                    disabled={!isOtpValid}
                  >
                    {isVerifying ? (
                      <div className="flex items-center gap-3">
                        <ClipLoader
                          size={20}
                          color={"#fff"}
                          loading={isVerifying}
                        />
                        <span>Verify</span>
                      </div>
                    ) : (
                      "Verify"
                    )}
                  </Button>
                </div>
              </div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
              >
                {loading ? (
                  <div className="flex justify-center items-center h-screen">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                  </div>
                ) : (
                  <div className="profile-showcase">
                    <div className="profile-intro text-center m-auto pb-3">
                      <h1 className="text-lg">Choose profile picture?</h1>
                    </div>
                    <hr
                      className="mx-auto bg-[#48484855]"
                      style={{
                        width: "50px",
                        height: "2px",
                        color: "grey",
                        borderWidth: 0,
                      }}
                    />
                    <div className="profile-content pt-8">
                      <div className="front flex items-center justify-around flex-wrap ">
                        <div className="author-image-container">
                          <div className="take-profile">
                            <Avatar
                              alt="Profile Picture"
                              src={profilePicture}
                              sx={{
                                width: 190,
                                height: 190,
                              }}
                            />
                          </div>
                        </div>

                        <div className="profile-options ">
                          {isCameraOpen ? (
                            <div className="camera-container">
                              <Camera
                                onTakePhoto={(dataUri) =>
                                  handleTakePhoto(dataUri)
                                }
                              />
                            </div>
                          ) : (
                            <>
                              <Button
                                className="rounded-sm gap-1"
                                variant="contained"
                                onClick={handleOpenCamera}
                                style={{
                                  margin: "10px",
                                  backgroundColor: "Black",
                                  color: "white",
                                }}
                              >
                                <IoIosCamera className="text-lg" />
                                Take Photo
                              </Button>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handlePictureChange}
                                id="file-input"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                              />

                              <Button
                                className="rounded-sm bg-black text-white"
                                variant="contained"
                                onClick={handleChooseFileClick}
                              >
                                Choose File
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 float-right p-5">
                      {/* <Button onClick={handleBack} variant="outlined">
                      Back
                    </Button> */}
                      <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!profilePicture}
                      >
                        Finish
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default AdminLogin;
