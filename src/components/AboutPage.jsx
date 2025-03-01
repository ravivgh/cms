import React from "react";
import { Link } from "react-router-dom";

import excelDemo from "../assets/demo.mp4";

import lightLogo from "../assets/logo-light.png";
import { PiStudentFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { Card, CardContent } from "./ui/card";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";
import contact from "../assets/contact.png";
import logo from "../assets/logo.png";
import { MdArrowOutward } from "react-icons/md";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import supportImg from "../assets/support.jpg";
import hoverImage2 from "../assets/allView.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const AboutPage = () => {
  const items = [
    {
      id: "1",
      title: "Our Mission",
      content: (
        <>
          At CampusFlow, our mission is to revolutionize the way colleges and
          universities manage their day-to-day operations. We aim to empower
          institutions by providing an all-in-one solution that simplifies
          student data management, faculty coordination, attendance tracking,
          examination schedules, and more. Our goal is to save time, reduce
          manual errors, and improve the overall educational experience for both
          students and faculty.
        </>
      ),
    },
    {
      id: "2",
      title: "Our Features",
      content: (
        <>
          {/* Smart Student Management */}
          <div className="space-y-8">
            <h3 className="text-2xl font-medium text-gray-700">
              Smart Student Management
            </h3>
            <ul className="space-y-4 text-lg text-gray-600">
              <li>
                <strong>Online Fee Payment:</strong> Secure and hassle-free
                online fee payment options for students and guardians.
              </li>
              <li>
                <strong>AI-Generated Reports:</strong> Administrators can use
                the AI assistant to generate student reports, such as
                identifying those who haven't paid fees or tracking attendance
                trends.
              </li>
            </ul>
          </div>

          {/* Innovative Learning & Assessments */}
          <div className="space-y-8 mt-12">
            <h3 className="text-2xl font-medium text-gray-700">
              Innovative Learning & Assessments
            </h3>
            <ul className="space-y-4 text-lg text-gray-600">
              <li>
                <strong>Faculty-Generated Coding Questions:</strong> Faculty
                members can create custom coding assessments directly within the
                system.
              </li>
              <li>
                <strong>Real-Time Code Editor:</strong> Students can solve and
                submit answers to coding questions in a robust, user-friendly
                code editor.
              </li>
              <li>
                <strong>Point-Based Reward System:</strong> Students earn points
                by successfully completing coding challenges and purchasing
                additional courses using those points, fostering continuous
                learning.
              </li>
            </ul>
          </div>

          {/* Attendance Management */}
          <div className="space-y-8 mt-12">
            <h3 className="text-2xl font-medium text-gray-700">
              Attendance Management
            </h3>
            <ul className="space-y-4 text-lg text-gray-600">
              <li>
                <strong>Face Recognition & GPS-Based Attendance:</strong> Ensure
                accurate attendance tracking through state-of-the-art facial
                recognition technology and GPS verification for on-campus or
                remote attendance.
              </li>
              <li>
                <strong>Video Call Lecture Attendance:</strong> Attendance is
                automatically marked during live video lectures, with
                faculty-provided attendance records integrated seamlessly into
                the system.
              </li>
            </ul>
          </div>

          {/* Seamless Communication & Collaboration */}
          <div className="space-y-8 mt-12">
            <h3 className="text-2xl font-medium text-gray-700">
              Seamless Communication & Collaboration
            </h3>
            <ul className="space-y-4 text-lg text-gray-600">
              <li>
                <strong>Video Conferencing & Messaging:</strong> Real-time
                communication tools for virtual lectures, project discussions,
                and parent-teacher meetings.
              </li>
              <li>
                <strong>Appointment Scheduling:</strong> Students can schedule
                appointments with faculty for consultations, project
                discussions, or mentoring sessions, with automatic reminders and
                scheduling tools integrated.
              </li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "3",
      title: "Why Choose Us?",
      content: (
        <>
          <div className="space-y-8 mt-12">
            <ul className="space-y-4 text-lg text-gray-600">
              <li>
                <strong>AI-Powered Solutions:</strong> Automate administrative
                processes and gain deep insights into operational efficiency and
                student performance.
              </li>
              <li>
                <strong>Comprehensive Features:</strong> Manage everything from
                attendance to assessments, communication, and performance
                analytics on one platform.
              </li>
              <li>
                <strong>Data Security:</strong> We prioritize the privacy and
                security of user data through advanced encryption and strict
                data management protocols.
              </li>
              <li>
                <strong>User-Friendly Interface:</strong> Designed for students,
                faculty, and administrators, ensuring a seamless experience
                across all features.
              </li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "4",
      title: "Our Values",
      content: (
        <>
          <div className="space-y-8 mt-12">
            <div className="space-y-4 text-lg text-gray-600">
              <div>
                <h3 className="font-semibold text-xl text-gray-700">
                  Innovation
                </h3>
                <p>
                  We continuously strive to push the boundaries of educational
                  technology, ensuring our platform stays at the forefront of
                  digital transformation in education.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-gray-700">
                  Simplicity
                </h3>
                <p>
                  Our platform is designed to be easy to use for all users –
                  whether you're a student, faculty member, or administrator.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-gray-700">
                  Efficiency
                </h3>
                <p>
                  We aim to eliminate unnecessary processes, enabling
                  institutions to focus on what matters most – student success.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-gray-700">
                  Collaboration
                </h3>
                <p>
                  We believe in the power of teamwork. We work closely with
                  educators, administrators, and students to make our platform
                  more effective and impactful.
                </p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "5",
      title: "The CampusFlow & Team",
      content: (
        <>
          <div className="  ">
            <p className="text-lg text-gray-600 mb-12">
              We are committed to making education management smarter, more
              efficient, and impactful. With <strong>CampusFlow</strong>,
              colleges and universities can focus on what truly matters –
              delivering exceptional education and student success.
            </p>
            <div className="bg-white p-8  text-left">
              <h3 className="text-2xl  text-gray-700 mb-4">Get in Touch</h3>

              <p className="text-gray-600 mb-2">
                <strong>Campus HQ :</strong> Surat , Gujarat India
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Contact :</strong> support@CamusFlow
              </p>
              <p className="text-gray-600 mt-6 text-lg">
                Let us help you revolutionize education management and learning
                experiences through innovation and technology!
              </p>
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <div className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-black ">
          <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 shadow-md">
            <div className="bg-gray-800 h-12 flex items-center space-x-4 py-2 justify-center">
              <h1 className="text-gray-300 text-sm">
                Optimize Your College's Operations with Our All-in-One Platform.
              </h1>
            </div>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
              <Link
                to="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <div className="flex items-center">
                  <img
                    src={lightLogo}
                    className="w-[160px] h-auto py-4"
                    alt="College Logo"
                  />
                </div>
              </Link>

              {/* Hamburger Menu for small devices */}
              <div className="md:hidden flex items-center">
                <Sheet>
                  <SheetTrigger>
                    <button className="text-black focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </SheetTrigger>

                  {/* Sheet Content for the navigation menu */}
                  <SheetContent position="left" size="content">
                    <SheetHeader>
                      <SheetTitle></SheetTitle>
                      <SheetDescription></SheetDescription>
                    </SheetHeader>

                    <div className="flex flex-col space-y-5  py-6">
                      <Link to="/solutions">
                        <div className="flex items-center space-x-1 hover:bg-gray-200 px-4 py-2">
                          <p className="text-black text-[17px]">Solutions</p>
                          <MdKeyboardArrowDown className="text-black" />
                        </div>
                      </Link>
                      <Link to="/products">
                        <div className="flex items-center space-x-1 hover:bg-gray-200 px-4 py-2">
                          <p className="text-black text-[17px]">
                            Products / Features
                          </p>
                          <MdKeyboardArrowDown className="text-black" />
                        </div>
                      </Link>
                      <Link to="/about">
                        <div className="flex items-center space-x-1 hover:bg-gray-200 px-4 py-2">
                          <p className="text-black text-[17px]">About</p>
                          <MdKeyboardArrowDown className="text-black" />
                        </div>
                      </Link>
                      <Link to="/contact">
                        <div className="flex items-center space-x-1 hover:bg-gray-200 px-4 py-2">
                          <p className="text-black text-[17px]">Contact us</p>
                          <MdKeyboardArrowDown className="text-black" />
                        </div>
                      </Link>
                      <div className="register-btn text-gray-800 text-center p-2 hover:bg-gray-900 hover:text-white border border-black">
                        <Link to="/register" className="px-5">
                          College Register
                        </Link>
                      </div>
                      <div className="login-btn bg-gradient-to-r from-gray-800 to-gray-700 text-white text-center flex items-center justify-center px-4 py-2 hover:bg-[#1d3352] rounded-sm hover:to-gray-800 hover:from-gray-700 transition-all duration-300 cursor-pointer">
                        <Link to="/login">Login</Link>
                        <IoIosArrowRoundForward className="text-white text-[25px]" />
                      </div>
                    </div>

                    {/* Close button for the Sheet */}
                    <SheetFooter>
                      <SheetClose></SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Non-Hamburger Menu for larger screens */}
              <div className="hidden md:flex items-center space-x-4 md:space-x-6 ">
                <div className="group ">
                  <Link to="/solutions">
                    <div className="flex items-center space-x-1 hover:text-blue-700 cursor-pointer group">
                      <p className="text-black text-[15px] group-hover:text-blue-500">
                        Solutions
                      </p>
                      <MdKeyboardArrowDown className="text-black group-hover:text-blue-500 transition-transform duration-300 ease-in-out transform group-hover:rotate-180" />
                    </div>
                  </Link>

                  <div className="absolute w-full bg-white shadow-lg hidden group-hover:flex flex-col p-6 z-20 transform -translate-x-1/2 left-1/2 justify-center h-[450px] transition-all duration-500 ease-in-out animate-move-down ">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-5 md:space-y-0 md:space-x-10 max-w-5xl mx-auto">
                      <div className="space-y-2 max-w-lg">
                        <h1 className="text-2xl">
                          Simplifying{" "}
                          <span className="font-semibold">Solutions</span>
                        </h1>
                        <p className="text-gray-500">
                          Your go-to solution for smarter college management,
                          combining simplicity, efficiency, and innovation.
                        </p>
                        <h1 className="bg-blue-800 text-gray-100 w-fit px-2  rounded-sm">
                          {" "}
                          Much & More
                        </h1>
                      </div>
                      {/* <div className="shadow-sm w-fit rounded-lg border border-gray-300 bg-[#efefef] p-3">
                               <img
                                 src={hoverImage1}
                                 alt="g"
                                 className="w-72 rounded-md"
                               />
                             </div> */}
                      <div className="">
                        <img
                          src={hoverImage2}
                          alt=""
                          className="w-[1000px] rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <Link to="/products">
                    <div className="flex items-center space-x-1 hover:text-blue-700 cursor-pointer group">
                      <p className="text-black text-[15px] group-hover:text-blue-500">
                        Products / Features
                      </p>
                      <MdKeyboardArrowDown className="text-black group-hover:text-blue-500 transition-transform duration-300 ease-in-out transform group-hover:rotate-180" />
                    </div>
                  </Link>
                  <div className="absolute w-full bg-white shadow-lg hidden group-hover:flex flex-col p-6 z-20 transform -translate-x-1/2 left-1/2 justify-center h-[480px] transition-all duration-500 ease-in-out animate-move-down ">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-5 md:space-y-0 md:space-x-10 max-w-full mx-auto">
                      <div className="space-y-2 max-w-lg my-auto">
                        <img
                          src="https://d2b1cooxpkirg1.cloudfront.net/publicAssets/homepage/our-product/IntervuePlatform.webp"
                          alt=""
                          className="w-80"
                        />
                        <h1 className="text-xl font-semibold">
                          Management as a Service
                        </h1>
                        <p className="text-gray-500 text-sm">
                          Scalable solutions for streamlined college management
                          and efficiency.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-6  mx-auto ">
                        <Card className="w-80 py-5 rounded-3xl shadow-[0px_0px_20px_rgba(0,0,0,0.15)]  bg-[#acc7e7]">
                          <CardContent>
                            <div className="space-y-5">
                              <div className="bg-[#292929] w-fit p-2 rounded-xl">
                                <MdAdminPanelSettings className="text-3xl text-[#e2e2e5] " />
                              </div>
                              <div className="">
                                <h1 className="font-semibold text-xl">Admin</h1>
                                <p className="text-gray-800 text-sm">
                                  manage college operations, and student
                                  information
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="w-80 py-5 rounded-3xl shadow-[0px_0px_20px_rgba(0,0,0,0.15)]  bg-[#f1ce8b]">
                          <CardContent>
                            <div className="space-y-5">
                              <div className="bg-[#292929] w-fit p-2 rounded-xl">
                                <FaUsers className="text-3xl text-[#e2e2e5] " />
                              </div>
                              <div className="">
                                <h1 className="font-semibold text-xl">
                                  Faculty
                                </h1>
                                <p className="text-gray-800 text-sm">
                                  manage your classes attendance, and academic
                                  resources
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <div className="col-span-2 flex justify-center">
                          <Card className="w-80 py-5 rounded-3xl shadow-[0px_0px_20px_rgba(0,0,0,0.15)] bg-[#a7d6aa]">
                            <CardContent>
                              <div className="space-y-5">
                                <div className="bg-[#292929] w-fit p-2 rounded-xl">
                                  <PiStudentFill className="text-3xl text-[#e2e2e5] " />
                                </div>
                                <div className="">
                                  <h1 className="font-semibold text-xl">
                                    Student
                                  </h1>
                                  <p className="text-gray-800 text-sm">
                                    Join the student portal for a seamless
                                    academic experience
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <Link to="/about">
                    <div className="flex items-center space-x-1 hover:text-blue-700 cursor-pointer group">
                      <p className="text-black text-[15px] group-hover:text-blue-500">
                        About
                      </p>
                      <MdKeyboardArrowDown className="text-black group-hover:text-blue-500 transition-transform duration-300 ease-in-out transform group-hover:rotate-180" />
                    </div>
                  </Link>
                  <div className="absolute w-full bg-white shadow-lg hidden group-hover:flex flex-col p-6 z-20 transform -translate-x-1/2 left-1/2 justify-center h-[480px] transition-all duration-500 ease-in-out animate-move-down ">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-5 md:space-y-0 md:space-x-10 max-w-full mx-20">
                      {/* Text Section */}
                      <div className="space-y-2 max-w-lg">
                        <h1 className="text-lg font-semibold">Our Mission</h1>
                        <p className="text-gray-600 text-sm">
                          Empowering colleges with a robust system to manage
                          recruitment, student data, and administrative
                          tasks—all in one platform.
                        </p>
                        <div className="w-full h-[0.8px] bg-gray-500"></div>
                        <div className="text-sm">
                          <h1 className="py-2 text-lg font-semibold">
                            Our Values
                          </h1>
                          <div className="space-y-2">
                            {" "}
                            <div className="bg-gray-100 w-fit px-5 py-5 rounded-md space-y-2">
                              <div className="flex items-center gap-5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                  viewBox="0 0 66 65"
                                  fill="none"
                                >
                                  <rect
                                    x="0.5"
                                    width="65"
                                    height="65"
                                    rx="14"
                                    fill="#3C3C3C"
                                  ></rect>
                                  <g filter="url(#filter0_b_4429_9675)">
                                    <path
                                      d="M20.7939 30.3075C20.5505 30.3075 20.3535 30.1103 20.3535 29.8686V28.8741C20.3535 28.6308 20.5505 28.4351 20.7939 28.4351C21.039 28.4351 21.2361 28.6308 21.2361 28.8741V29.8686C21.2361 29.9853 21.1897 30.0971 21.1069 30.1793C21.0241 30.2615 20.9115 30.3075 20.7939 30.3075ZM21.2361 26.3048V19.261C21.2361 19.0178 21.039 18.8221 20.7939 18.8221C20.5505 18.8221 20.3535 19.0177 20.3535 19.261V26.3229C20.3535 26.5645 20.5505 26.7601 20.7939 26.7601C21.039 26.7601 21.2361 26.5645 21.2361 26.3229V26.3048ZM23.8061 26.0418V25.0472C23.8061 24.8039 23.609 24.6083 23.364 24.6083C23.1205 24.6083 22.9235 24.8039 22.9235 25.0472V26.0598C22.9235 26.3015 23.1205 26.4971 23.364 26.4971C23.609 26.4971 23.8061 26.3015 23.8061 26.0598V26.0418ZM23.8061 22.4779V15.4375C23.8061 15.1959 23.609 15.0003 23.364 15.0003C23.1205 15.0003 22.9235 15.1959 22.9235 15.4375V22.496C22.9235 22.7376 23.1205 22.9333 23.364 22.9333C23.609 22.9333 23.8061 22.7377 23.8061 22.496V22.4779ZM45.6464 29.8684V28.8739C45.6464 28.6306 45.4494 28.4349 45.2059 28.4349C44.9609 28.4349 44.7638 28.6305 44.7638 28.8739V29.8684C44.7638 30.11 44.9608 30.3073 45.2059 30.3073C45.4494 30.3073 45.6464 30.11 45.6464 29.8684ZM45.6464 26.3045V19.2608C45.6464 19.0175 45.4494 18.8219 45.2059 18.8219C44.9609 18.8219 44.7638 19.0175 44.7638 19.2608V26.3226C44.7638 26.5643 44.9608 26.7599 45.2059 26.7599C45.4494 26.7599 45.6464 26.5643 45.6464 26.3226V26.3045ZM43.0764 26.0415V25.047C43.0764 24.8037 42.8794 24.6081 42.6359 24.6081C42.3908 24.6081 42.1938 24.8037 42.1938 25.047V26.0596C42.1938 26.3012 42.3908 26.4968 42.6359 26.4968C42.8793 26.4968 43.0764 26.3012 43.0764 26.0596V26.0415ZM43.0764 22.4776V15.4373C43.0764 15.1956 42.8794 15 42.6359 15C42.3908 15 42.1938 15.1956 42.1938 15.4373V22.4957C42.1938 22.7374 42.3908 22.933 42.6359 22.933C42.8793 22.933 43.0764 22.7374 43.0764 22.4957V22.4776ZM16.3826 49.0156V48.003C16.3826 47.7613 16.1856 47.5641 15.9421 47.5641C15.6971 47.5641 15.5 47.7613 15.5 48.003V49.0156C15.5 49.2572 15.6971 49.4545 15.9421 49.4545C16.1856 49.4545 16.3826 49.2572 16.3826 49.0156ZM16.3826 45.4517V38.3899C16.3826 38.1482 16.1856 37.951 15.9421 37.951C15.6971 37.951 15.5 38.1482 15.5 38.3899V45.4517C15.5 45.6933 15.6971 45.8906 15.9421 45.8906C16.1856 45.8906 16.3826 45.6934 16.3826 45.4517ZM19.9727 45.2101V44.1761C19.9727 43.9344 19.7757 43.7372 19.5322 43.7372C19.2872 43.7372 19.0901 43.9344 19.0901 44.1761V45.2101C19.0901 45.4533 19.2871 45.649 19.5322 45.649C19.7757 45.649 19.9727 45.4534 19.9727 45.2101ZM19.9727 41.6462V34.568C19.9727 34.3247 19.7757 34.129 19.5322 34.129C19.2872 34.129 19.0901 34.3247 19.0901 34.568V41.6252C19.0901 41.8668 19.2871 42.0641 19.5322 42.0641C19.7757 42.0641 19.9727 41.8668 19.9727 41.6252V41.6462ZM50.5 49.0156V48.0031C50.5 47.7614 50.3029 47.5641 50.0579 47.5641C49.8144 47.5641 49.6174 47.7614 49.6174 48.0031V49.0156C49.6174 49.2573 49.8144 49.4546 50.0579 49.4546C50.3029 49.4546 50.5 49.2573 50.5 49.0156ZM50.5 45.4518V38.3899C50.5 38.1483 50.3029 37.951 50.0579 37.951C49.8144 37.951 49.6174 38.1483 49.6174 38.3899V45.4518C49.6174 45.6934 49.8144 45.8907 50.0579 45.8907C50.3029 45.8907 50.5 45.6934 50.5 45.4518ZM46.9099 45.2101V44.1762C46.9099 43.9345 46.7129 43.7373 46.4678 43.7373C46.2243 43.7373 46.0273 43.9345 46.0273 44.1762V45.2101C46.0273 45.4534 46.2243 45.649 46.4678 45.649C46.7128 45.649 46.9099 45.4534 46.9099 45.2101ZM46.9099 41.6463V34.568C46.9099 34.3247 46.7129 34.1291 46.4678 34.1291C46.2243 34.1291 46.0273 34.3247 46.0273 34.568V41.6252C46.0273 41.8669 46.2243 42.0641 46.4678 42.0641C46.7128 42.0641 46.9099 41.8669 46.9099 41.6252V41.6463ZM28.4694 39.0737C26.8185 36.8824 25.7802 33.5769 25.5334 29.8947L23.851 30.9944C23.3625 31.31 23.0677 31.8509 23.0694 32.4278V40.1785C23.0677 40.8279 23.437 41.4229 24.0232 41.7139C24.6094 42.0048 25.3099 41.9407 25.8331 41.5511L28.2756 39.7314L28.4694 39.0737ZM42.1591 31.017L40.4634 29.8942C40.22 33.5764 39.1817 36.882 37.5307 39.0471L37.7244 39.731L40.1669 41.5507C40.6902 41.9403 41.3907 42.0044 41.9769 41.7134C42.5631 41.4225 42.9323 40.8274 42.9307 40.1781V32.4274C42.9323 31.8488 42.6376 31.3096 42.1491 30.994L42.1591 31.017ZM33.0003 20.5654C34.6496 20.5704 36.2492 19.9967 37.5129 18.9446C36.3389 16.8964 34.7673 15.6651 33.0003 15.6651C31.2332 15.6651 29.6619 16.8964 28.4877 18.9347C29.7495 19.9933 31.3491 20.572 33.0003 20.5654ZM33.0003 25.1419C31.7501 25.1419 30.6223 25.8898 30.1438 27.0372C29.6669 28.183 29.9302 29.503 30.8144 30.3808C31.6987 31.2586 33.0284 31.52 34.1826 31.0465C35.3384 30.5715 36.0919 29.452 36.0919 28.2109C36.0919 27.3972 35.7657 26.6164 35.1861 26.0411C34.6065 25.4658 33.8199 25.1419 33.0003 25.1419ZM38.0525 44.0789C38.0956 44.2334 38.0525 44.3995 37.9366 44.5112C37.8224 44.623 37.6551 44.6641 37.4995 44.6181L35.3584 43.9655L33.4424 49.6992C33.3828 49.8784 33.2139 50 33.0218 50C32.8314 50 32.6625 49.8784 32.6029 49.6992L30.6423 43.9655L28.5011 44.6181C28.3455 44.6641 28.1782 44.623 28.064 44.5112C27.9481 44.3995 27.905 44.2334 27.9481 44.0789L29.4682 38.8582C27.5341 36.5618 26.3766 32.59 26.3766 28.2194C26.3169 25.2966 26.9015 22.3969 28.0855 19.7209C29.4814 20.8272 31.2135 21.4337 33.0004 21.4436C34.7921 21.4486 36.5308 20.8436 37.9284 19.7291C39.1058 22.4036 39.6854 25.3016 39.6241 28.2196C39.6241 32.6038 38.4766 36.549 36.5325 38.8584L38.0525 44.0789ZM36.9745 28.219C36.9745 26.6244 36.0058 25.1844 34.5204 24.5745C33.0367 23.9647 31.3261 24.3017 30.1901 25.4293C29.0541 26.5586 28.713 28.2551 29.329 29.7297C29.9434 31.2042 31.3923 32.1642 33.0002 32.1642C35.1944 32.1642 36.9745 30.3987 36.9745 28.219Z"
                                      fill="white"
                                    ></path>
                                  </g>
                                </svg>
                                <h1 className="text-black font-medium">
                                  Innovation{" "}
                                </h1>
                              </div>

                              <p className="text-gray-600">
                                We continuously strive to push the boundaries of
                                educational technology, ensuring our platform
                                stays at the forefront of digital transformation
                                in education.
                              </p>
                            </div>
                            <div className="bg-gray-100 w-fit px-5 py-5 rounded-md space-y-2">
                              <div className="flex items-center gap-5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                  viewBox="0 0 66 65"
                                  fill="none"
                                >
                                  <rect
                                    x="0.5"
                                    width="65"
                                    height="65"
                                    rx="14"
                                    fill="#3C3C3C"
                                  ></rect>
                                  <g filter="url(#filter0_b_4429_9675)">
                                    <path
                                      d="M35.4992 39.957H30.021V50.0003H35.4992V39.957Z"
                                      fill="white"
                                    ></path>
                                  </g>
                                  <g filter="url(#filter1_b_4429_7366)">
                                    <path
                                      d="M32.7609 27.1742C33.6013 27.1742 34.2826 26.4929 34.2826 25.6525C34.2826 24.8121 33.6013 24.1309 32.7609 24.1309C31.9205 24.1309 31.2393 24.8121 31.2393 25.6525C31.2393 26.4929 31.9205 27.1742 32.7609 27.1742Z"
                                      fill="white"
                                    ></path>
                                  </g>
                                  <g filter="url(#filter2_b_4429_7366)">
                                    <path
                                      d="M32.76 19.0391L25.4558 23.105V49.9968H28.1949V39.0404C28.1949 38.5413 28.6088 38.1274 29.1079 38.1274H36.4121C36.9112 38.1274 37.3252 38.5413 37.3252 39.0404V49.9968H40.0643V23.1051L32.76 19.0391ZM35.1947 35.084H30.2887C29.7774 35.084 29.3757 34.6701 29.3757 34.171C29.3757 33.6719 29.7774 33.258 30.2887 33.258H35.1947C35.6938 33.258 36.1078 33.6719 36.1078 34.171C36.1078 34.6701 35.6938 35.084 35.1947 35.084ZM32.76 28.9972C30.9096 28.9972 29.4123 27.4999 29.4123 25.6495C29.4123 23.7991 30.9097 22.3018 32.76 22.3018C34.6104 22.3018 36.1078 23.7991 36.1078 25.6495C36.1078 27.4999 34.6104 28.9972 32.76 28.9972Z"
                                      fill="white"
                                    ></path>
                                  </g>
                                  <g filter="url(#filter3_b_4429_7366)">
                                    <path
                                      d="M43.7154 22.9132C43.5655 22.9132 43.4134 22.8764 43.2731 22.7985L32.7602 16.9578L22.2472 22.7985C21.8061 23.0434 21.251 22.8835 21.0061 22.4437C20.7612 22.0026 20.9194 21.4469 21.3604 21.202L32.3168 15.115C32.5927 14.9617 32.9279 14.9617 33.2037 15.115L44.16 21.2019C44.6011 21.4468 44.7592 22.0026 44.5143 22.4436C44.3479 22.7437 44.0364 22.9132 43.7154 22.9132Z"
                                      fill="white"
                                    ></path>
                                  </g>
                                  <g filter="url(#filter4_b_4429_7366)">
                                    <path
                                      d="M23.6303 25.6504V32.9546H14.5L16.9347 25.6504H23.6303Z"
                                      fill="white"
                                    ></path>
                                  </g>
                                  <g filter="url(#filter5_b_4429_7366)">
                                    <path
                                      d="M15.717 34.7812V49.9983H23.6299V34.7812H15.717ZM20.6474 45.7376H18.6997C18.2005 45.7376 17.7866 45.3236 17.7866 44.8246C17.7866 44.3255 18.2005 43.9115 18.6997 43.9115H20.6474C21.1466 43.9115 21.5604 44.3255 21.5604 44.8246C21.5604 45.3236 21.1466 45.7376 20.6474 45.7376ZM20.6474 40.8681H18.6997C18.2005 40.8681 17.7866 40.4541 17.7866 39.955C17.7866 39.456 18.2005 39.042 18.6997 39.042H20.6474C21.1466 39.042 21.5604 39.456 21.5604 39.955C21.5604 40.4541 21.1466 40.8681 20.6474 40.8681Z"
                                      fill="white"
                                    ></path>
                                  </g>
                                  <g filter="url(#filter6_b_4429_7366)">
                                    <path
                                      d="M51.0211 32.9546H41.8909V25.6504H48.5864L51.0211 32.9546Z"
                                      fill="white"
                                    ></path>
                                  </g>
                                  <g filter="url(#filter7_b_4429_7366)">
                                    <path
                                      d="M41.8909 34.7812V49.9983H49.8037V34.7812H41.8909ZM46.8212 45.7376H44.8735C44.3743 45.7376 43.9605 45.3236 43.9605 44.8246C43.9605 44.3255 44.3743 43.9115 44.8735 43.9115H46.8212C47.3204 43.9115 47.7342 44.3255 47.7342 44.8246C47.7342 45.3236 47.3204 45.7376 46.8212 45.7376ZM46.8212 40.8681H44.8735C44.3743 40.8681 43.9605 40.4541 43.9605 39.955C43.9605 39.456 44.3743 39.042 44.8735 39.042H46.8212C47.3204 39.042 47.7342 39.456 47.7342 39.955C47.7342 40.4541 47.3204 40.8681 46.8212 40.8681Z"
                                      fill="white"
                                    ></path>
                                  </g>
                                </svg>
                                <h1 className="text-black font-medium">
                                  Simplicity
                                </h1>
                              </div>

                              <p className="text-gray-600">
                                Our platform is designed to be easy to use for
                                all users – whether you're a student, faculty
                                member, or administrator.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm space-y-2">
                        <div className="bg-gray-100 w-fit px-5 py-5 rounded-md space-y-2">
                          <div className="flex items-center gap-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="40"
                              viewBox="0 0 66 65"
                              fill="none"
                            >
                              <rect
                                x="0.5"
                                width="65"
                                height="65"
                                rx="14"
                                fill="#3C3C3C"
                              ></rect>
                              <g filter="url(#filter0_b_4429_9906)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M19.2678 15H47.6998C48.6753 15 49.4662 15.7909 49.4677 16.7664V21.3905L17.5 21.3934L17.5014 16.7667C17.5014 15.7912 18.2922 15 19.2678 15ZM25.3955 40.5787V37.0444L25.8169 37.4643C25.9612 37.6072 26.1892 37.626 26.3552 37.5091L28.6773 35.8725C28.8808 35.9894 29.0915 36.0933 29.3036 36.1929L29.3123 40.5802L25.3955 40.5787ZM25.9785 32.1319C26.0651 32.2748 26.0594 32.4537 25.9641 32.5908L24.3839 34.8509L26.159 36.6188L28.4147 35.0298C28.4854 34.9808 28.5705 34.9533 28.6571 34.9533C28.7336 34.9533 28.8072 34.9735 28.8736 35.0125C29.601 35.4498 30.3904 35.7745 31.2144 35.9766C31.376 36.017 31.4987 36.1483 31.5276 36.3114L32.0096 39.026L34.5149 39.0202L34.9854 36.3027V36.3042C35.0143 36.1411 35.1355 36.0098 35.2957 35.9694C36.1197 35.763 36.9077 35.4354 37.6336 34.9938C37.7765 34.9086 37.9554 34.9144 38.0926 35.0096L40.3526 36.5885L42.1176 34.8148L40.5286 32.5591C40.4334 32.4234 40.4262 32.243 40.5127 32.1002C40.95 31.3728 41.2747 30.5834 41.4768 29.7594C41.5158 29.5977 41.6471 29.475 41.8116 29.4462L44.5262 28.9642L44.5219 26.6118L39.3292 26.6233L39.3278 26.6219C39.3942 26.9856 39.4288 27.3536 39.4288 27.723C39.4332 29.3654 38.7837 30.9427 37.6249 32.1059C36.466 33.2705 34.8915 33.9271 33.2491 33.93H33.2346C31.5952 33.9286 30.0221 33.2777 28.8603 32.1189C27.7 30.96 27.0448 29.3869 27.0404 27.7475C27.0404 27.378 27.0722 27.01 27.1371 26.6463L21.9445 26.6579L21.9503 29.0103L24.6678 29.4807H24.6663C24.8294 29.5096 24.9607 29.6308 25.0011 29.7924C25.2075 30.6151 25.5351 31.403 25.9753 32.1289L25.9785 32.1319ZM38.4734 26.6248C38.8083 28.2037 38.4128 29.8475 37.3997 31.103C36.3852 32.3571 34.8598 33.0874 33.2464 33.0902H33.2348C31.6242 33.0902 30.1002 32.3643 29.0829 31.1145C28.0669 29.8647 27.6657 28.2253 27.9919 26.6478L38.4736 26.6262L38.4734 26.6248ZM30.1508 40.5791L30.1421 36.5339C30.3398 36.6047 30.5404 36.6682 30.7439 36.7244L31.2404 39.5213V39.5228C31.2765 39.7234 31.4511 39.8691 31.6546 39.8691L33.0819 39.8662V40.5792L30.1508 40.5791ZM33.9233 40.5791L33.9204 39.8633L34.8642 39.8604L34.8657 39.8618C35.0706 39.8618 35.2452 39.7132 35.2784 39.5111L35.7633 36.7114C36.0981 36.6176 36.4272 36.5036 36.749 36.3722L36.7577 40.5762L33.9233 40.5791ZM37.5976 40.5791L37.5889 35.9838C37.6697 35.942 37.7506 35.8972 37.8299 35.8525L40.1578 37.4804C40.3252 37.5973 40.5518 37.5771 40.6961 37.4328L41.1362 36.9897L41.2272 40.5789L37.5976 40.5791ZM47.6984 40.5791C48.6755 40.5791 49.4663 39.7882 49.4678 38.8127V22.2305L17.5016 22.2334V38.8126C17.5016 39.7882 18.2924 40.579 19.268 40.579H24.5545V36.2077L23.54 35.196C23.3957 35.0531 23.3754 34.8251 23.4923 34.6577L25.1188 32.3284V32.3298C24.7508 31.6775 24.4607 30.9848 24.2572 30.2632L21.4589 29.7783H21.4604C21.2583 29.7451 21.1097 29.5705 21.1097 29.367L21.1024 26.2411C21.1024 26.0087 21.2901 25.8197 21.5224 25.8197L44.9409 25.772C45.0521 25.772 45.1588 25.8168 45.2368 25.8947C45.3162 25.9741 45.3609 26.0794 45.3609 26.192L45.3681 29.3179L45.3667 29.3165C45.3667 29.5214 45.2209 29.696 45.0203 29.7321L42.2234 30.2286V30.2271C42.0243 30.9487 41.7385 31.6443 41.3705 32.2967L43.0071 34.6187H43.0085C43.1254 34.7847 43.1067 35.0113 42.9623 35.157L41.9564 36.1687L42.0676 40.5804L47.6984 40.5791ZM34.3708 18.2704C34.3708 18.383 34.4141 18.4898 34.4935 18.5677C34.5728 18.6471 34.6796 18.6918 34.7907 18.6918H47.296C47.5284 18.6918 47.716 18.5028 47.716 18.2704C47.716 18.0395 47.5283 17.8505 47.296 17.8505H34.7907C34.6796 17.8505 34.5728 17.8952 34.4935 17.9746C34.4141 18.0525 34.3708 18.1593 34.3708 18.2704ZM21.9911 18.4724C21.9911 18.7048 22.1788 18.8924 22.4111 18.8924H22.4472C22.6795 18.8924 22.8671 18.7048 22.8671 18.4724C22.8671 18.2401 22.6795 18.0525 22.4472 18.0525H22.4111C22.3 18.0525 22.1932 18.0972 22.1138 18.1752C22.0359 18.2545 21.9911 18.3613 21.9911 18.4724ZM24.3002 18.4724C24.3002 18.7048 24.4878 18.8924 24.7202 18.8924H24.7563C24.9872 18.8924 25.1762 18.7048 25.1762 18.4724C25.1762 18.2401 24.9872 18.0525 24.7563 18.0525H24.7202C24.4878 18.0525 24.3002 18.2401 24.3002 18.4724ZM26.5689 18.4724C26.5689 18.5836 26.6136 18.6904 26.693 18.7697C26.7709 18.8491 26.8777 18.8924 26.9903 18.8924H27.0278H27.0264C27.2587 18.8924 27.4463 18.7048 27.4463 18.4725C27.4463 18.2401 27.2587 18.0525 27.0264 18.0525H26.9903C26.7579 18.0525 26.5703 18.2401 26.5703 18.4725L26.5689 18.4724ZM25.3956 42.9229V41.4191H24.5542V42.5029H23.8399C23.671 41.9199 23.1717 41.4941 22.5699 41.4191H22.199C21.4139 41.5288 20.8467 42.2244 20.8958 43.0152C20.9434 43.8061 21.5928 44.4252 22.3851 44.4382H22.388C23.062 44.4368 23.6537 43.9908 23.8399 43.3429H24.9742C25.0853 43.3429 25.1936 43.2996 25.2715 43.2202C25.3509 43.1408 25.3956 43.034 25.3956 42.9229ZM29.3181 43.0657C28.5965 43.2793 28.1404 43.9894 28.2458 44.734C28.3526 45.4787 28.989 46.0329 29.7409 46.0372H29.7438C30.4957 46.03 31.1278 45.4729 31.2317 44.7297C31.3356 43.985 30.8782 43.2778 30.158 43.0657L30.1537 41.4205H29.3138L29.3181 43.0657ZM33.0991 47.03C32.3789 47.2436 31.9229 47.9522 32.0282 48.6968C32.1336 49.4415 32.7686 49.9957 33.5205 50H33.5248H33.5234C34.2767 49.9942 34.9103 49.4372 35.0142 48.6925C35.1181 47.9478 34.6592 47.2392 33.9376 47.0285L33.926 41.4202H33.0861L33.0977 47.03H33.0991ZM35.6737 44.5087C35.6751 45.3443 36.3534 46.0197 37.1905 46.0197H37.1934H37.1919C37.9453 46.014 38.5788 45.4583 38.6827 44.7122C38.7867 43.9675 38.3292 43.2589 37.6061 43.0482L37.6032 41.4203H36.7633L36.7662 43.0497C36.1182 43.2388 35.6737 43.8333 35.6737 44.5087ZM41.712 43.4494H43.1292C43.3154 44.0989 43.91 44.5448 44.5854 44.5448H44.5883C45.4022 44.5116 46.0444 43.842 46.0444 43.028C46.043 42.2126 45.3993 41.5444 44.5854 41.5141H44.5825C43.9085 41.5155 43.3168 41.9615 43.1292 42.6095H42.1176L42.0872 41.4203L41.2488 41.4188L41.2906 43.0395C41.295 43.2675 41.4826 43.4494 41.7106 43.4494L41.712 43.4494Z"
                                  fill="white"
                                ></path>
                              </g>
                            </svg>

                            <h1 className="text-black font-medium">
                              Efficiency
                            </h1>
                          </div>

                          <p className="text-gray-600">
                            We aim to eliminate unnecessary processes, enabling
                            institutions to focus on what matters most – student
                            success.
                          </p>
                        </div>
                        <div className="bg-gray-100 w-fit px-5 py-5 rounded-md space-y-2">
                          <div className="flex items-center gap-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="40"
                              height="40"
                              viewBox="0 0 66 65"
                              fill="none"
                            >
                              <rect
                                x="0.5"
                                width="65"
                                height="65"
                                rx="14"
                                fill="#3C3C3C"
                              ></rect>
                              <g filter="url(#filter0_b_4429_9675)">
                                <path
                                  d="M26.7872 31.6618H39.7301C39.3629 35.4008 36.6014 38.3174 33.26 38.3174C29.9186 38.3174 27.1538 35.4008 26.7872 31.6618ZM50.5267 31.7037H41.5713C41.2819 31.7037 41.0486 31.9376 41.0486 32.2253C41.0486 36.5121 37.5614 39.9992 33.2747 39.9992C28.9879 39.9992 25.5008 36.5121 25.5008 32.2253C25.5008 31.937 25.2669 31.7037 24.9791 31.7037H16.0227C15.7333 31.7037 15.5 31.9376 15.5 32.2253V33.6482C15.5 34.568 16.1881 35.2953 17.2944 35.546L20.0968 36.1819C20.3628 37.068 20.719 37.9279 21.1596 38.7444L19.6252 41.1796C19.022 42.1396 19.0492 43.1399 19.6981 43.7877L21.7117 45.7992C22.3601 46.4503 23.3599 46.4786 24.3221 45.8721L26.7562 44.3409C27.5786 44.7837 28.4375 45.1394 29.3165 45.4032L29.9551 48.2056C30.2047 49.3119 30.932 50 31.8518 50H34.6982C35.6136 50 36.3398 49.313 36.5949 48.2056L37.2307 45.4032C38.1179 45.1383 38.9778 44.781 39.7943 44.3415L42.2273 45.8715C43.1884 46.4802 44.1887 46.4519 44.8376 45.7997L46.8491 43.7872C47.4986 43.1388 47.5252 42.1391 46.922 41.1779L45.3876 38.7438C45.8271 37.9296 46.1839 37.0696 46.452 36.1813L49.2555 35.5455C50.3618 35.2942 51.0499 34.5664 51.0499 33.6477V32.2248C51.0499 31.9365 50.8155 31.7037 50.5267 31.7037ZM33.2741 23.3113C29.8762 23.3113 27.0798 25.9342 26.8024 29.2614H39.7426C39.4657 25.9342 36.6705 23.3113 33.2741 23.3113ZM39.4407 25.4049C40.2294 26.508 40.7298 27.8303 40.8321 29.2614H50.6844C50.407 25.9342 47.6106 23.3113 44.2127 23.3113C42.3867 23.3113 40.6706 24.0701 39.4407 25.4049ZM27.1027 25.4082C25.8755 24.0728 24.1589 23.314 22.3296 23.314C18.9355 23.314 16.1413 25.9358 15.8639 29.2609H25.7129C25.8146 27.8314 26.315 26.5102 27.1027 25.4082ZM22.3296 22.6548C24.4336 22.6548 26.1453 20.943 26.1453 18.8391C26.1453 16.7352 24.4336 15.0267 22.3296 15.0267C20.2257 15.0267 18.5139 16.7368 18.5139 18.8391C18.5139 20.9414 20.2257 22.6548 22.3296 22.6548ZM37.0806 18.8364C37.0806 16.7357 35.3732 15.0267 33.2747 15.0267C31.1762 15.0267 29.465 16.7357 29.465 18.8364C29.465 20.937 31.174 22.6428 33.2747 22.6428C35.3754 22.6428 37.0806 20.9354 37.0806 18.8364ZM44.2127 22.6695C46.328 22.6695 48.049 20.9501 48.049 18.8364C48.049 16.7226 46.328 15 44.2127 15C42.0973 15 40.3796 16.721 40.3796 18.8364C40.3796 20.9517 42.0989 22.6695 44.2127 22.6695Z"
                                  fill="white"
                                ></path>
                              </g>
                            </svg>
                            <h1 className="text-black font-medium">
                              Collaboration
                            </h1>
                          </div>

                          <p className="text-gray-600">
                            We believe in the power of teamwork. We work closely
                            with educators, administrators, and students to make
                            our platform more effective and impactful.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <Link to="/contact">
                    <div className="flex items-center space-x-1 hover:text-blue-700 cursor-pointer group">
                      <p className="text-black text-[15px] group-hover:text-blue-500">
                        Contact us
                      </p>
                      <MdKeyboardArrowDown className="text-black group-hover:text-blue-500 transition-transform duration-300 ease-in-out transform group-hover:rotate-180" />
                    </div>
                  </Link>
                  <div className="absolute w-full bg-white shadow-lg hidden group-hover:flex flex-col p-6 z-20 transform -translate-x-1/2 left-1/2 justify-center h-[480px] transition-all duration-500 ease-in-out animate-move-down">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-5 md:space-y-0 md:space-x-10 max-w-full mx-auto">
                      {/* Text Section */}
                      <div className="space-y-5 max-w-lg">
                        <h1 className="text-lg flex flex-wrap items-center space-x-2 font-medium gap-2">
                          <span className="font-extralight">Let’s Make </span>{" "}
                          College Management Better Together
                        </h1>
                        <p className="text-gray-600 text-sm">
                          Empowering colleges with a robust system to manage
                          recruitment, student data, and administrative
                          tasks—all in one platform.
                        </p>
                        <div className="w-full h-[0.8px] bg-gray-500"></div>
                        <div className="">
                          <h1 className="text-blue-800 flex items-center gap-2">
                            {" "}
                            <IoLocationOutline className="text-blue-800" />
                            CampusFlow HQ
                          </h1>
                          <p>Surat ,Gujarat India</p>
                        </div>
                        <div className="w-full h-[0.8px] bg-gray-500"></div>
                        <div className="">
                          <h1 className="text-blue-800 flex items-center gap-2">
                            <MdOutlineContactSupport />
                            Contact
                          </h1>
                          <div className="bg-gray-100 w-fit px-7 py-7 rounded-md my-3">
                            <h1>Support</h1>
                            <span className="text-gray-500">
                              support@campusflow
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Image Section */}
                      <div>
                        <img
                          src={supportImg}
                          className="w-full h-[350px] object-cover rounded-xl  "
                          alt="Contact Us"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="register-btn hidden sm:block text-gray-800 text-center p-2 hover:bg-gray-900 hover:text-white border border-black">
                  <Link to="/register" className="px-5">
                    College Register
                  </Link>
                </div>
                <div className="login-btn bg-gradient-to-r from-gray-800 to-gray-700 text-white text-center flex items-center justify-center px-4 py-2 hover:bg-[#1d3352] rounded-sm hover:to-gray-800 hover:from-gray-700 transition-all duration-300 cursor-pointer">
                  <Link to="/login">Login</Link>
                  <IoIosArrowRoundForward className="text-white text-[25px]" />
                </div>
              </div>
            </div>
          </nav>

          <div className="mt-60 flex flex-col lg:flex-row items-center justify-center mx-auto space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="text-center lg:text-left space-y-10">
              <div className="bg-black text-white  rounded-full w-fit px-3 py-1">
                <h1>8 Min Read</h1>
              </div>
              <div className="">
                {" "}
                <h1 className="text-3xl font-bold">About Us </h1>
                <p className="text-4xl mt-2 max-w-md lg:max-w-lg ">
                  Innovating Education for a Smarter Future
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div>
              <img
                src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6790a4e846966f024839a0df_Rectangle%2034625984.png"
                alt="Innovating Education"
                className="w-[500px] mx-auto lg:mx-0"
              />
            </div>
          </div>
          <div className="mt-5 ">
            <div className="space-y-4">
              <Accordion
                type="multiple"
                defaultValue={items.map((item) => item.id)}
                collapsible
                className="w-full"
              >
                {items.map((item) => (
                  <AccordionItem value={item.id} key={item.id} className="py-2">
                    <AccordionTrigger className="py-10  leading-6 hover:no-underline font-bold text-3xl">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 text-muted-foreground text-xl text-gray-500">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#e7e5e898]  w-full flex flex-col sm:flex-row items-center justify-around py-10 px-5 ">
        <div className="w-full sm:w-1/2 p-4">
          <h1 className="text-black text-3xl sm:text-5xl pb-5 font-semibold">
            FAQs
          </h1>
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
                What is the College Management System?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500">
                There a provide different roles (e.g., students, faculty,
                admins) and what each role can do within the system.It supports
                student management, faculty oversight, and administrative
                operations, ensuring a more efficient and organized environment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className=" border-black border-b">
              <AccordionTrigger>
                How does the system handle student attendance?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500">
                The system allows faculty members to mark and track student
                attendance digitally. Students can view their attendance
                records, and administrators can generate reports to monitor
                overall attendance trends.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className=" border-black border-b">
              <AccordionTrigger>
                What security measures are in place to protect data?
              </AccordionTrigger>
              <AccordionContent className="text-gray-500">
                Our system includes robust security features, such as encrypted
                data storage and user authentication, to ensure that all
                sensitive information is protected and only accessible by
                authorized personnel.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="relative flex items-center justify-center py-10 bg-[#e7e5e898]  w-full flex-col">
        <div className="relative sm:px-8 px-4">
          <img
            src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6729ece19745c8c0f797acea_cta.png"
            alt=""
            className="w-[1200px] "
          />
        </div>
        <div className="absolute flex items-center justify-center flex-col space-y-3">
          <h1 className="text-xl md:text-4xl lg:text-5xl font-semibold">
            Join the Future of Management
          </h1>
          <p className=" text-gray-400 text-sm md:text-base lg:text-lg max-w-[90%] sm:max-w-[600px] lg:max-w-[800px]">
            Discover how our college management system can{" "}
            <span className="text-white font-medium">save you time, </span>
            provide valuable{" "}
            <span className="text-white font-medium">insights</span> , and
            <span className="text-white font-medium"> streamline</span> your
            administrative processes effortlessly.
          </p>
        </div>
      </div>
      <div className="">
        <footer className="bg-[#040404] w-full h-full pt-40 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 px-6">
              <div className=" text-center lg:text-left space-y-4">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-40 sm:w-48 lg:w-56 h-auto mx-auto lg:mx-0 mix-blend-screen"
                />
                <h1 className="text-[#ffcd6c] text-base sm:text-lg lg:text-xl font-extralight max-w-sm mx-auto lg:mx-0">
                  On a mission to revolutionize how{" "}
                  <span className="font-medium">
                    colleges manage and operate forever.
                  </span>
                </h1>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-end items-center gap-6">
                <Link to="/about">
                  <div className="flex items-center space-x-2  px-4 py-2">
                    <p className=" text-[17px]">Solutions</p>
                    <MdArrowOutward />
                  </div>
                </Link>
                <Link to="/about">
                  <div className="flex items-center space-x-2  px-4 py-2">
                    <p className="text-[17px]">Products / Features</p>
                    <MdArrowOutward />
                  </div>
                </Link>
                <div className="">
                  {" "}
                  <Link to="/about">
                    <div className="flex items-center space-x-2 px-4 py-2">
                      <p className=" text-[17px]">About</p>
                      <MdArrowOutward />
                    </div>
                  </Link>
                </div>

                <Link to="/contact">
                  <div className="flex items-center space-x-2  px-4 py-2">
                    <p className=" text-[17px]">Contact us</p>
                    <MdArrowOutward />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-28 flex flex-col sm:flex-row items-center justify-between gap-6 px-6">
            <div className="w-full sm:w-2/3 lg:w-3/4 h-[1px] bg-gray-700 "></div>
            <p className="text-gray-100 text-sm sm:text-base">
              {" "}
              CampusFlow © 2024
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutPage;
