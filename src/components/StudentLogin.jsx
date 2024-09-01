import { useState, useRef } from "react";
import { PiStudentFill } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo-light.png";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { motion } from "framer-motion";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const StudentLogin = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [otp, setOtp] = useState(""); // State to hold OTP
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isButtonDisabled = !email;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleOtpChange = (otp) => {
    setOtp(otp);
    console.log(otp);
    // Check if the OTP length is 4 (or your required length) and update validity
    setIsOtpValid(otp.length === 4);
  };
  const handleDrawerToggle = (e) => {
    e.preventDefault();
    setIsDrawerOpen((prev) => !prev);
  };
  const handleVerify = () => {
    if (isOtpValid) {
      setStep(2);
    } else {
      alert("Please enter a valid OTP");
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
        navigate("/studentdashboard");
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
              Access your attendance, resources, and academic progress all in
              one place.
            </p>
            <div className="student-band flex  items-center justify-center  bg-[#a7d6aa] p-2 mt-9 w-[210px] rounded-full mx-auto lg:mx-0 ">
              <PiStudentFill style={{ fontSize: "20px", color: "black" }} />
              <p className="text-black ml-2 md:ml-0">Track Your Attendance</p>
            </div>
          </div>
        </div>
        <div className="right-side-content w-full md:w-1/2 flex flex-col items-center justify-center">
          <img src={logo} alt="Logo" className="w-40 md:w-40" />
          <div className="w-full max-w-sm p-4">
            <div className="student-box-heading flex items-center justify-center pb-4">
              <h2 className="text-center p-1 m-10 bg-green-600 rounded-sm w-32">
                STUDENT
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
                  Log In with Your Email
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

                  <div className="email-btn pt-10 flex relative items-center">
                    <Button
                      className="w-full p-6"
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
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
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
                      src="/static/images/avatar/1.jpg"
                    />
                    <Avatar
                      alt="Travis Howard"
                      src="/static/images/avatar/2.jpg"
                    />
                    <Avatar
                      alt="Agnes Walker"
                      src="/static/images/avatar/4.jpg"
                    />
                    <Avatar
                      alt="Trevor Henderson"
                      src="/static/images/avatar/5.jpg"
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
                    Verify
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
                      <div className="front flex items-center justify-around flex-wrap">
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
                                className="rounded-sm"
                                variant="contained"
                                onClick={handleOpenCamera}
                                style={{
                                  margin: "10px",
                                  backgroundColor: "Black",
                                  color: "white",
                                }}
                              >
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

export default StudentLogin;
