import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProgressUser from "./ProgressUser";
import lightLogo from "../assets/logo.png";
import { PiStudentFill } from "react-icons/pi";
import {
  MdSupervisorAccount,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import logo from "../assets/logo-light.png";
const LoginPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselItems = [
    "Enter Your Email Address & Create a Secure Password",
    "Input the One-Time Password (OTP) Sent to Your Email",
    "Upload a Profile Picture to Complete Your Verification",
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Duration for each avatar's progress display
    const duration = 5000; // Adjust timing as needed (5 seconds)

    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3); // Loop through 0, 1, 2
    }, duration);

    return () => clearTimeout(timer);
  }, [activeIndex]);
  const texts = ["Student", "Faculty", "Admin"];
  const description = [
    "Join the student portal for a seamless academic experience",
    "Login to manage your classes attendance, and academic resources",
    "Login to manage college operations, and student information",
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [carouselItems.length]);

  return (
    <>
      <div className="container px-4">
        <nav className="bg-[#FFA500] dark:bg-gray-900 fixed w-full  z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 shadow-md">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* <img src={logo} className="h-8" alt="College Logo" /> */}
              <h1 className="text-2xl font-medium">
                <span className="text-[#C70039] font-bold">Edu</span>Manage{" "}
              </h1>
            </Link>
            <div className="flex space-x-3">
              <div className="register-btn border border-black text-black text-center p-2 hover:bg-gray-900 hover:text-white">
                <Link to="/register" className="px-5">
                  College Register
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="intro-login pt-28">
          <h1 className="text-center text-xl  ">Login into your account</h1>
        </div>
        <div className="login-showcase flex flex-wrap items-center justify-center pt-20 gap-8">
          {/* Faulty Card */}
          <div className="faulty-login-card flex justify-center">
            <Card className="w-[400px] h-[400px] shadow-[5px_0_10px_-11px_rgba(0,0,0,0.5)]">
              <div className="faulty-icon-intro flex items-center justify-center pt-10 pb-3">
                <div className="faulty-band flex items-center justify-around bg-[#f1ce8b] p-2 w-[250px] rounded-full">
                  <MdSupervisorAccount style={{ fontSize: "20px" }} />
                  <p>Manage & Monitor Academic</p>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="font-medium px-2">For</span>Faculty
                </CardTitle>
                <CardDescription className="text-center pt-5 text-base">
                  Login to manage your classes attendance, and academic
                  resources
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center pt-5">
                <Link
                  to="/login/faculty"
                  className="text-center flex items-center justify-center w-[150px] rounded-sm h-12 bg-black text-white"
                >
                  Login
                </Link>
              </CardContent>
              <CardFooter className="text-center"></CardFooter>
            </Card>
          </div>
          {/* Student Card */}
          <div className="student-login-card flex justify-center">
            <Card className="w-[400px] h-[400px]">
              <div className="student-icon-intro flex items-center justify-center pt-10 pb-3">
                <div className="student-band flex items-center justify-around bg-[#a7d6aa] p-2 w-[210px] rounded-full">
                  <PiStudentFill style={{ fontSize: "20px" }} />
                  <p>Track Your Attendance</p>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="font-medium px-2">For</span>Student
                </CardTitle>
                <CardDescription className="text-center pt-5 text-base">
                  Join the student portal for a seamless academic experience
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center pt-5">
                <Link
                  to="/login/student"
                  className=" w-[150px] rounded-sm h-12 bg-[#008d00] flex items-center justify-center text-white"
                >
                  Login
                </Link>
              </CardContent>
            </Card>
          </div>
          {/* Admin Card */}
          <div className="admin-login-card flex justify-center">
            <Card className="w-[400px] h-[400px] shadow-[-5px_0_10px_-11px_rgba(0,0,0,0.5)]">
              <div className="admin-icon-intro flex items-center justify-center pt-10 pb-3">
                <div className="admin-band flex items-center justify-around bg-[#acc7e7] p-2 w-[190px] rounded-full">
                  <MdOutlineAdminPanelSettings style={{ fontSize: "20px" }} />
                  <p>Manage Operations</p>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="font-medium px-2">For</span>Admin
                </CardTitle>
                <CardDescription className="text-center pt-5 text-base">
                  Login to manage college operations, and student information
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center pt-5">
                <Link
                  to="/login/admin"
                  className="bg-black text-white flex items-center justify-center w-[150px] rounded-sm h-12"
                >
                  Login
                </Link>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className="w-full h-full bg-[#27282c] mt-28 pb-10">
        <h1 className="text-white text-center pt-12 font-medium text-2xl ">
          {" "}
          Here&apos;s how it works?
        </h1>
        <hr
          className="mx-auto bg-[#ffffff55] my-2"
          style={{
            width: "100px",
            height: "1px",
            color: "white",
            borderWidth: 0,
          }}
        ></hr>
        <div className="pt-14 pb-2 flex items-center justify-around flex-wrap">
          <div className=" ">
            <Carousel
              orientation="vertical"
              className="w-full h-[110px] max-w-sm "
            >
              <CarouselContent
                className="-mt-160 h-[115px] "
                style={{
                  transform: `translateY(-${currentIndex * 100}%)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index} className="pt-1 md:basis-1/2 ">
                    <div className="p-1 ">
                      <Card className="bg-black border-none rounded-sm  ">
                        <CardContent className="flex items-center justify-around p-6 text-white ">
                          <p className="text-center px-4 py-2 border rounded-[100%] w-10 h-10 mr-4">
                            {index + 1}
                          </p>
                          <p>{item}</p>
                        </CardContent>
                      </Card>
                      <div className="border-focus w-full h-1 bg-black overflow-hidden">
                        <div
                          className={`bg-white h-full animate-progress`}
                          style={{
                            animationDelay:
                              currentIndex === index ? "0s" : "5s",
                          }}
                        ></div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-transparent" />
              <CarouselNext className="bg-transparent" />
            </Carousel>
          </div>
          <div className="pt-10 ">
            {currentIndex === 0 && (
              <div className="student-animated flex items-center justify-center">
                <img src={image1} alt="" />
              </div>
            )}

            {currentIndex === 1 && (
              <div className="faulty-animated flex items-center justify-center">
                <img src={image2} alt="" />
              </div>
            )}

            {currentIndex === 2 && (
              <div className="admin-animated flex items-center justify-center">
                <img src={image3} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="py-20 bg-slate-50 flex items-center flex-wrap justify-around">
        <div className="flex space-x-[50px] sm:space-x-[150px] mt-[100px] mb-[50px] justify-center w-full max-w-[300px] sm:max-w-[600px]">
          <ProgressUser
            duration={5}
            isActive={activeIndex === 0}
            color="#004bad"
            text={texts[0]}
            description={description[0]}
            src={
              "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer1.png"
            }
          />
          <ProgressUser
            duration={5}
            isActive={activeIndex === 1}
            color="#e83568"
            text={texts[1]}
            description={description[1]}
            src={
              "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer2.png"
            }
          />
          <ProgressUser
            duration={5}
            isActive={activeIndex === 2}
            color="orange"
            text={texts[2]}
            description={description[2]}
            src={
              "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer3.png"
            }
          />
        </div>
        <div className="">
          <h1 className="text-black text-2xl text-center sm:text-3xl ">
            CampusFlow is Reliable, Fast and Helpful
          </h1>
          <p className="text-gray-500 text-center">
            Attendance, Graphically View and Manage the students all in on place
          </p>
        </div>
      </div>
      <div className="bg-[#e7e5e898]  w-full flex flex-col sm:flex-row items-center justify-around py-10 px-5 ">
        <div className="w-full sm:w-1/2 p-4">
          <h1 className="text-black text-3xl sm:text-3xl pb-5">FAQs</h1>
          <p className="text-gray-600">
            Whether you’re managing attendance, tracking student records, or
            overseeing faculty operations, our system provides a comprehensive
            solution to simplify these tasks.
          </p>
        </div>
        <div className="text-black w-full sm:w-1/2 p-5 text-ls">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className=" border-black border-b">
              <AccordionTrigger>
                How do I track student attendance?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500">
                The Attendance tab within the Classes section allows you to mark
                daily attendance, view attendance summaries, and generate
                reports.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className=" border-black border-b">
              <AccordionTrigger>How do I check my attendance?</AccordionTrigger>
              <AccordionContent className="text-gray-500">
                Navigate to the Attendance section in your dashboard to view
                your attendance record, including details on days present,
                absent, and any late marks.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className=" border-black border-b">
              <AccordionTrigger>
                How do I manage student records?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500">
                The Student Management section allows you to add, edit, and
                delete student records. You can also import records in bulk
                using Excel files.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
              EduManage © 2024
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;
