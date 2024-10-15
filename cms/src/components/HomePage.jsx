// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import excelDemo from "../assets/demo.mp4";
import image1 from "../assets/image1.jpg";
import { motion, AnimatePresence } from "framer-motion";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import { FaUniversity } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedDots from "./AnimatedDots";
import lightLogo from "../assets/logo.png";
import logo from "../assets/logo-light.png";
import step1 from "../assets/step.mp4";
import attendance from "../assets/atten.mp4";
import { RiPresentationLine } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import AnimatedStep from "./AnimatedStep";
import ProgressUser from "./ProgressUser";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [0, 1, 2];

  const handleNextSlide = () => {
    setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
  };
  const carouselItems = [
    "Enter Your Email Address & Create a Secure Password",
    "Input the One-Time Password (OTP) Sent to Your Email",
    "Upload a Profile Picture to Complete Your Verification",
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const duration = 5000;

    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, duration);

    return () => clearTimeout(timer);
  }, [activeIndex]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [carouselItems.length]);
  const texts = ["Student", "Faculty", "Admin"];
  const description = [
    "Join the student portal for a seamless academic experience",
    "Login to manage your classes attendance, and academic resources",
    "Login to manage college operations, and student information",
  ];
  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-black">
        <nav className="bg-white dark:bg-gray-900 fixed w-full  z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 shadow-md">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" alt="College Logo" />
            </Link>
            <div className="flex space-x-3">
              <div className="register-btn border border-black text-black text-center p-2 hover:bg-gray-900 hover:text-white">
                <Link to="/register" className="px-5">
                  College Register
                </Link>
              </div>
              <div className="login-btn bg-black text-white text-center flex items-center justify-center px-4 py-2 hover:bg-gray-900 rounded-sm">
                <Link to="/login">Login</Link>
                {/* <IoIosArrowRoundForward className="text-white text-[25px] " /> */}
              </div>
            </div>
          </div>
        </nav>

        <div className="mt-60">
          <h1 className="text-black text-3xl text-center lg:text-4xl">
            Save your <span className="font-medium">bandwidth</span>
          </h1>
          <p className="text-center text-gray-400 pt-2 text-base lg:text-lg">
            Save Time and Resources in just 2 steps
          </p>
          <div className="register-btn bg-black text-white text-center w-[250px] mx-auto mt-6 p-4 rounded-full flex items-center justify-center hover:bg-gray-900 ">
            <Link to="/register" className="px-5 ">
              College Register
            </Link>
            <div className="">
              <IoIosArrowRoundForward
                style={{ color: "white", fontSize: "30" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="main-showcase w-full h-full  bg-[#27282c] mt-28 pb-10">
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
              <CarouselPrevious className="bg-transparent text-white" />
              <CarouselNext className="bg-transparent text-white" />
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

      <div className="pt-20 pb-5 bg-slate-100 flex items-center flex-wrap justify-around">
        <div className="w-full max-w-[350px] sm:max-w-[600px] px-4">
          <div className="">
            <h1 className="text-black text-2xl text-center lg:text-3xl">
              How do you want to login{" "}
              <span className="font-medium">CampusFlow?</span>
            </h1>
            <p className="text-gray-500  text-center text-base pt-1 lg:text-lg">
              We will personalize your experience accordingly
            </p>
          </div>

          <div className="flex space-x-[50px] sm:space-x-[150px] mt-[100px] mb-[50px] justify-center">
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
        </div>
      </div>
      <div className="py-7">
        <h1 className="text-black text-center text-2xl lg:text-3xl">
          Your own solution
        </h1>
        <p className="text-gray-500 text-center text-sm lg:text-lg ">
          Attendance, Graphically View and Manage the students all in on place
        </p>
        <hr
          className="mx-auto bg-black my-2"
          style={{
            width: "100px",
            height: "1px",
            color: "white",
            borderWidth: 0,
          }}
        ></hr>
        <div className="">
          <AnimatedStep
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          />
        </div>
      </div>

      <AnimatePresence>
        {currentSlide === 0 && (
          <motion.div
            className="py-5 bg-[#FCFCFC] flex items-center flex-wrap justify-around"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            key="slide-1"
          >
            <motion.div
              className="w-[600px]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <video autoPlay muted loop>
                <source src={step1} />
              </video>
            </motion.div>
            <motion.div
              className="w-[700px] flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="px-5 py-3">
                <FaUniversity className="text-[#755485] text-8xl" />
              </div>
              <h1 className="text-black text-2xl sm:text-3xl px-5  font-medium">
                College Information
              </h1>
              <p className="text-black text-lg pt-3 px-5">
                Provide name and address of your college to establish your
                institutions identity within the management system. This step is
                essential for accurate and efficient operation.
              </p>
            </motion.div>
          </motion.div>
        )}
        {currentSlide === 1 && (
          <motion.div
            className="py-5 bg-[#FCFCFC] flex items-center flex-wrap justify-around"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            key="slide-2"
          >
            <motion.div
              className="w-[600px]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <video autoPlay muted loop>
                <source src={excelDemo} />
              </video>
            </motion.div>
            <motion.div
              className="w-[700px] flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="px-5 py-3">
                <MdWatchLater className="text-[#755485] text-8xl" />
              </div>
              <h1 className="text-black text-2xl sm:text-3xl px-5">
                Import Your Excel
              </h1>
              <p className="text-black text-lg pt-3 px-5">
                Admins and faculty can streamline student registration by
                importing student data directly from an Excel file. This allows
                for quick and efficient bulk enrollment.
              </p>
            </motion.div>
          </motion.div>
        )}
        {currentSlide === 2 && (
          <motion.div
            className="py-5 bg-[#FCFCFC] flex items-center flex-wrap justify-around"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            key="slide-3"
          >
            <motion.div
              className="w-[600px] "
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <video
                autoPlay
                muted
                loop
                className="lg:rounded-lg md:rounded-lg sm:rounded-lg"
              >
                <source src={attendance} />
              </video>
            </motion.div>
            <motion.div
              className="w-[700px] flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="px-5 py-3">
                <RiPresentationLine className="text-[#755485] text-8xl" />
              </div>
              <h1 className="text-black text-2xl sm:text-3xl px-5  font-medium">
                Attendance
              </h1>
              <p className="text-black text-lg pt-3 px-5">
                Effortlessly manage and visualize student attendance with our
                intuitive interface. Easily track and analyze attendance data
                through graphical representations.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatedDots
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
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
      <div className="">
        <footer className="bg-[#27282c] w-full h-full flex items-center justify-center">
          <div className="py-10 ">
            <img
              src={lightLogo}
              alt="Logo"
              className="w-[150px] h-auto mix-blend-screen"
            />
            <p className="text-xs text-center text-gray-400">
              {" "}
              CampusFlow © 2024
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
