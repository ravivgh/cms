// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import excelDemo from "../assets/demo.mp4";
import image1 from "../assets/3.jpg";
import { motion, AnimatePresence } from "framer-motion";
import image2 from "../assets/new.jpg";
import CodeLive from "../assets/codeLive.mp4";
import image3 from "../assets/2.jpg";
import { FaUniversity } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GrSchedules } from "react-icons/gr";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiAnalogue } from "react-icons/si";
import { TbReport } from "react-icons/tb";

import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import model1 from "../assets/model.mp4";
import VideoProgress from "./VideoProgress";
import AnimatedDots from "./AnimatedDots";
import lightLogo from "../assets/logo-light.png";
import logo from "../assets/logo.png";
import step1 from "../assets/step.mp4";
import attendance from "../assets/atten.mp4";
import { RiPresentationLine } from "react-icons/ri";
import { IoIosArrowRoundForward } from "react-icons/io";
import AnimatedStep from "./AnimatedStep";
import ProgressUser from "./ProgressUser";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";
import contact from "../assets/contact.png";
import dot from "../assets/dots.png";
import { BsLayers } from "react-icons/bs";
import f1 from "../assets/f1.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuScanFace } from "react-icons/lu";
import { RiCopperCoinFill } from "react-icons/ri";
import mapImg from "../assets/mapImg.png";
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
import { MdArrowOutward } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa";

import { MdManageAccounts } from "react-icons/md";
import { RiRobot3Line } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import supportImg from "../assets/support.jpg";
import hoverImage1 from "../assets/Student.png";
import hoverImage2 from "../assets/allView.png";
import { Input } from "./ui/input";
const HomePage = () => {
  const logosRef = useRef(null);

  useEffect(() => {
    const ul = logosRef.current;
    if (ul) {
      // Clone the list to create the infinite scroll effect
      const clone = ul.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      ul.parentNode.appendChild(clone);
    }
  }, []);
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
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const videos = [
    {
      src: model1,
      avatar:
        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer3.png",
      name: "Ravi Vaghela",
      background:
        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/homepage/solutions/bg-3.webp",
    },
    {
      src: model1,
      avatar:
        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer2.png",
      name: "Neha Patel",
      background:
        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/homepage/solutions/bg-1.webp",
    },
    {
      src: model1,
      avatar:
        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer1.png",
      name: "Neha Patel",
      background:
        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/homepage/solutions/bg-5.webp",
    },
    {
      src: model1,
      avatar:
        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/interviewers/interviewer4.png",
      name: "Neha Patel",
      background:
        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/homepage/solutions/bg-2.webp",
    },
  ];

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
    setIsActive(false);
    setTimeout(() => setIsActive(true), 200);
  };

  const currentAvatar = videos[currentVideo].avatar;
  const currentName = videos[currentVideo].name;

  const allAvatars = videos.map((video) => video.avatar);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 5.0; //speed video
    }
  }, []);

  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    {
      image:
        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/homepage/our-product/our-product-3.webp",
      footerIcon: <SiAnalogue className="text-white" />,
      footerText: "Report & Analysis",
      bgColor: "#eff6fe",
    },
    {
      image:
        "https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6734a90fc798f9a26bf3617b_Design%20Templates-Portrait_Intervue%20(18).png",
      footerIcon: <TbReport className="text-white" />,
      footerText: "Manage Data Insights",
      bgColor: "#eff6fe",
    },
    {
      image:
        "https://d2b1cooxpkirg1.cloudfront.net/publicAssets/homepage/resources-section/hrmatrix.webp",
      footerIcon: <MdManageAccounts className="text-white" />,
      footerText: "Faster Efficiency & Managing",
      bgColor: "#eff6fe",
    },
  ];

  const handleNext = () => {
    setCurrentCard((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setCurrentCard((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  const [message, setMessage] = useState(""); // For the current input
  const [messages, setMessages] = useState([]); // To store all messages

  // Handle sending the message and generating a response
  const handleSend = () => {
    if (message.trim()) {
      // Add the user's message
      const newMessages = [...messages, { type: "user", text: message.trim() }];
      setMessages(newMessages);
      setMessage(""); // Clear the input field

      // Add the bot's response
      setTimeout(() => {
        const botResponse = generateResponse(message.trim());
        setMessages([...newMessages, { type: "bot", text: botResponse }]);
      }, 500); // Simulate delay for bot response
    }
  };

  // Generate a bot response based on the user's input
  const generateResponse = (userMessage) => {
    if (userMessage.toLowerCase().includes("manage data")) {
      return "Hey 👋 How do you want to get started with Intervue?";
    } else if (userMessage.toLowerCase().includes("register college")) {
      return "To register your college, go to the 'Registration' section.";
    } else {
      return "I'm not sure how to help with that. Can you clarify?";
    }
  };
  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          aria-label={isOpen ? "Close live chat" : "Open live chat"}
          aria-haspopup="dialog"
          onClick={toggleChat}
          className="flex items-center justify-center w-[60px] h-[60px] rounded-full shadow-lg transition-all"
          style={{
            backgroundColor: isOpen ? "#030303" : "#030303",
          }}
          whileHover={{
            scale: 1.1,
            transition: {
              duration: 0.1, // Smooth transition duration
              ease: "easeInOut", // Smooth easing function
            },
          }}
          whileTap={{
            scale: 0.95,
            transition: {
              duration: 0.1, // Slightly faster for tap
              ease: "easeInOut",
            },
          }}
        >
          {isOpen ? (
            // Close Icon SVG
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 19 18"
              className="conversations-visitor-close-icon"
            >
              <path
                fill="#fff"
                d="M10.627 9.013l6.872 6.873.708.707-1.415 1.414-.707-.707-6.872-6.872L2.34 17.3l-.707.707L.22 16.593l.707-.707L7.8 9.013.946 2.161l-.707-.708L1.653.04l.707.707L9.213 7.6 16.066.746l.707-.707 1.414 1.414-.707.708-6.853 6.852z"
              ></path>
            </svg>
          ) : (
            // Open Icon SVG
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="32"
              height="30"
              viewBox="0 0 39 37"
              className="conversations-visitor-open-icon"
            >
              <defs>
                <path
                  id="conversations-visitor-open-icon-path-1:r0:"
                  d="M31.4824242 24.6256121L31.4824242 0.501369697 0.476266667 0.501369697 0.476266667 24.6256121z"
                ></path>
              </defs>
              <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <g transform="translate(-1432 -977) translate(1415.723 959.455)">
                  <g transform="translate(17 17)">
                    <g transform="translate(6.333 .075)">
                      <path
                        fill="#ffffff"
                        d="M30.594 4.773c-.314-1.943-1.486-3.113-3.374-3.38C27.174 1.382 22.576.5 15.36.5c-7.214 0-11.812.882-11.843.889-1.477.21-2.507.967-3.042 2.192a83.103 83.103 0 019.312-.503c6.994 0 11.647.804 12.33.93 3.079.462 5.22 2.598 5.738 5.728.224 1.02.932 4.606.932 8.887 0 2.292-.206 4.395-.428 6.002 1.22-.516 1.988-1.55 2.23-3.044.008-.037.893-3.814.893-8.415 0-4.6-.885-8.377-.89-8.394"
                      ></path>
                    </g>
                    <g fill="#ffffff" transform="translate(0 5.832)">
                      <path d="M31.354 4.473c-.314-1.944-1.487-3.114-3.374-3.382-.046-.01-4.644-.89-11.859-.89-7.214 0-11.813.88-11.843.888-1.903.27-3.075 1.44-3.384 3.363C.884 4.489 0 8.266 0 12.867c0 4.6.884 8.377.889 8.393.314 1.944 1.486 3.114 3.374 3.382.037.007 3.02.578 7.933.801l2.928 5.072a1.151 1.151 0 001.994 0l2.929-5.071c4.913-.224 7.893-.794 7.918-.8 1.902-.27 3.075-1.44 3.384-3.363.01-.037.893-3.814.893-8.414 0-4.601-.884-8.378-.888-8.394"></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          )}
        </motion.button>

        {/* Chat Content (Toggle Visibility) */}
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 w-96 h-96 bg-white shadow-xl rounded-lg flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
          >
            {/* Chat Messages (Scrollable Area) */}
            <div className="flex-1 overflow-y-auto scroll-container p-4 space-y-4">
              {messages.length === 0 && (
                <div className="p-3 rounded-lg shadow bg-gray-200 text-black">
                  Hey 👋 How do you want to get started with CampusFlow?
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg shadow  ${
                    msg.type === "user"
                      ? "bg-blue-100 text-black self-end"
                      : "bg-gray-200 text-black self-start"
                  }`}
                  style={{ maxWidth: "100%", wordWrap: "break-word" }}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input and Send Button (Fixed at Bottom) */}
            <div className="flex items-center space-x-4 p-4 border-t border-gray-300 bg-white rounded-b-lg">
              <Input
                type="text"
                placeholder="Ask a question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 rounded-full border border-slate-300 text-black"
              />
              <button
                aria-label="send message"
                data-test-id="chat-send-button"
                disabled={!message.trim()}
                onClick={handleSend}
                className={`px-4 py-2 transition-colors rounded-full ${
                  message.trim()
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </div>
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
                              <h1 className="font-semibold text-xl">Faculty</h1>
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
                        recruitment, student data, and administrative tasks—all
                        in one platform.
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
                              Our platform is designed to be easy to use for all
                              users – whether you're a student, faculty member,
                              or administrator.
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

                          <h1 className="text-black font-medium">Efficiency</h1>
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
                        recruitment, student data, and administrative tasks—all
                        in one platform.
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

        <div className="mt-60 flex justify-around items-center">
          <div className="">
            <div className="w-fit pb-7 flex items-center gap-2">
              <div className="">
                <p className="text-sm font-semibold text-[#1d68bd]">
                  ORGANIZATIONS
                </p>
                <div className="bg-[#1d68bd] w-full h-[2px]"></div>
              </div>
            </div>
            <h1 className="text-black text-3xl text-center lg:text-4xl">
              Save your{" "}
              <span className="font-medium text-[#1d68bd]">bandwidth</span>
            </h1>
            <p className="text-center text-gray-800 pt-2 text-base lg:text-lg">
              Save Time and Resources in just 2 steps
            </p>
            <div className="register-btn bg-gradient-to-r  from-black to-black text-white text-center w-[250px] mx-auto mt-6 p-4 rounded-full flex items-center justify-center hover:bg-gray-900 ">
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
          <div className="">
            <img
              src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6790a3a7b431b1439b15ca8a_unsplash_Kz8nHVg_tGI.png"
              alt=""
              className="w-[500px]"
            />
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="">
          <div className="">
            <div
              className=" flex items-center justify-center
        "
            >
              <div className="w-fit flex items-center gap-[9px] bg-[#F4F7F9] rounded-full border border-[#DDE5ED] py-[6px] pl-[7px] pr-[12px]">
                <div className="flex">
                  <img
                    src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6734a0fb60d081bdda9028b5_Design%20Templates-Portrait_Intervue%20(19)%201.png"
                    width="29.5"
                    height="29.5"
                    loading="lazy"
                    className="rounded-full image-black-border "
                  />
                  <img
                    src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6734a11ab27574be137c4ca1_Design%20Templates-Portrait_Intervue%20(19)%201%20(1).png"
                    width="29.5"
                    height="29.5"
                    loading="lazy"
                    className="rounded-full image-black-border -ml-[15.5px] "
                  />
                  <img
                    src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6734a14081a246fbb68851d7_Design%20Templates-Portrait_Intervue%20(334%20x%20212%20px)%20(6).png"
                    width="29.5"
                    height="29.5"
                    loading="lazy"
                    className="rounded-full image-black-border -ml-[15.5px]"
                  />
                </div>
                <span className="font-[600] text-[13px] md:text-[14px] leading-[19.5px] md:leading-[21px] text-black">
                  Built for 60K+ Future Users
                </span>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-gray-800 text-2xl text-center mt-5  mx-auto font-extralight">
          Get an{" "}
          <span className=" text-black font-medium">all-in-one solution</span>{" "}
          for
          <span className="font-medium text-black">
            {" "}
            all manage problems
          </span>{" "}
        </h1>

        <div className="flex items-center justify-center">
          <p className="text-[#fff]  text-md bg-[#1d68bd] w-fit border border-[#dde5ed] px-5 py-2 rounded-full flex items-center gap-2 mt-[30px] md:mt-[26px]  font-[600] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px]  ">
            <img
              src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6734a35f2af1829d3c66f691_Frame%20427321098.png"
              alt=""
              className="w-5 h-5 "
            />
            Our top notch benefits
          </p>
        </div>
      </div>
      <div className="px-4 md:px-12 lg:px-48 py-6">
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] text-black">
          <ul
            ref={logosRef}
            className="flex items-center justify-center md:justify-start gap-4 text-lg infinite-scroll"
          >
            <li className="bg-white border-[#dcdcdc] border px-4 py-4 rounded-lg flex items-center gap-2 w-64 h-14 ml-4">
              <GrSchedules className="text-gray-800 text-xl" />
              <span className="text-base">Manage Scheduling</span>
            </li>
            <li className="bg-white border-[#dcdcdc] border px-4 py-4 rounded-lg flex items-center gap-2 w-[500px] h-14">
              <img
                src="https://cdn.vectorstock.com/i/500p/16/66/biometric-identification-face-recognition-system-vector-29671666.jpg"
                alt="Face Recognition"
                className="w-10 h-10"
              />
              <span className="text-base">
                GPS & Face Recognition Attendances
              </span>
            </li>
            <li className="bg-white border-[#dcdcdc] border px-4 py-2 rounded-lg flex items-center gap-2 w-60 h-14">
              <RiRobot3Line className="text-gray-800 text-xl" />
              <span className="text-base">AI Assistant</span>
            </li>
            <li className="bg-white border-[#dcdcdc] border px-4 py-4 rounded-lg flex items-center gap-2 w-60 h-14">
              <img
                src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/672a22f8ca8959e6ac6fc48d_Frame%20427321047.svg"
                alt="Report"
                className="w-8 h-8"
              />
              <span className="text-base">Report in Minutes</span>
            </li>
            <li className="bg-white border-[#dcdcdc] border px-4 py-4 rounded-lg flex items-center gap-2 w-60 h-14">
              <img
                src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/672a2288e35c53ec8756c04e_Frame%20427321046.svg"
                alt="Dashboard"
                className="w-7 h-7"
              />
              <span className="text-base">Dashboard</span>
            </li>
            <li className="bg-white border-[#dcdcdc] border px-4 py-4 rounded-lg flex items-center gap-2 w-56 h-14">
              <img
                src="https://cdn3.iconfinder.com/data/icons/basic-ui-elements-2-4-line/512/Basic_UI_Elements_2.4_-_Line-13-512.png"
                alt="Live Coding"
                className="w-6 h-6"
              />
              <span className="text-base">Live Coding</span>
            </li>
            <li className="bg-white border-[#dcdcdc] border px-4 py-4 rounded-lg flex items-center gap-2 w-96 h-14">
              <RiCopperCoinFill className="text-gray-800 text-xl" />
              <span className="text-base">Rewarded Learning Platform</span>
            </li>
            {/* <li className="bg-white border-[#dcdcdc] border px-4 py-4 rounded-lg flex items-center gap-2 w-72 h-14">
              <img
                src="https://static.vecteezy.com/system/resources/previews/004/823/984/non_2x/secure-payment-line-style-icon-vector.jpg"
                alt="Fees Management"
                className="w-10 h-10"
              />
              <span className="text-base">Fees Management</span>
            </li> */}
            <li className="bg-white border-[#dcdcdc] border px-4 py-4 rounded-lg flex items-center gap-2 w-60 h-14">
              <img
                src="https://www.shutterstock.com/image-vector/simple-exam-icon-can-be-260nw-2452810207.jpg"
                alt="Questions Bank"
                className="w-10 h-10"
              />
              <span className="text-base">Questions Bank</span>
            </li>
            <li className="bg-white border-[#dcdcdc] border px-4 py-4 rounded-lg flex items-center gap-2 w-60 h-14">
              <img
                src="https://media.istockphoto.com/id/1226420829/vector/video-conference-icon-people-on-computer-screen-home-office-in-quarantine-times-digital.jpg?b=1&s=170x170&k=20&c=acBo7Da-vLBhYzDQMXFeFtokKvwDxD3pul3ag-zWTco="
                alt="Stream & Chat"
                className="w-10 h-10"
              />
              <span className="text-base">Stream & Chat</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-slate-100 pb-20">
        <div className="relative flex flex-wrap items-center justify-center gap-10 mt-10 ">
          <div className="absolute inset-32 z-0 ">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1381 145"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 131.656C34.4253 149.586 106.713 153.448 150.584 88.3478C185.096 37.1351 293.343 0.942893 406.831 23.5172C559.382 53.8619 614.221 136.62 813.635 117.586C915.065 107.904 962.199 1.99853 1154.63 2C1273.78 2.00091 1340.75 119.517 1370 117.586"
                stroke="#1D68BD"
                strokeWidth="3"
                strokeDasharray="6 6"
              ></path>
              <circle cx="1374.5" cy="117.5" r="6.5" fill="#2168B7"></circle>
              <circle cx="6.5" cy="128.5" r="6.5" fill="#2168B7"></circle>
            </svg>
          </div>
          <div className="flex mx-52 gap-24 my-10 relative z-10 items-center">
            <div className="space-y-5">
              <h1 className="text-[#1d68bd] font-medium text-xl">
                Our products
              </h1>
              <p className="text-black text-2xl">
                Comprehensive support for every aspect of your college
                management journey.
              </p>
            </div>
            <div className="text-black">
              Combining human expertise with advanced technology, our college
              management system seamlessly integrates into your operations,
              adding value at every stage of the academic and administrative
              journey.
            </div>
          </div>
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-10">
            <Card className="w-[350px] bg-[#1d1e1f] rounded-3xl  h-[470px] transform transition-transform duration-300 hover:scale-105">
              <CardHeader></CardHeader>
              <CardContent>
                <img
                  src="https://cdn.dribbble.com/userupload/13217976/file/original-c9f041ecad063a46101b72206ae5aefa.jpg?resize=752x&vertical=center"
                  alt=""
                  className="rounded-2xl"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-3 text-white">
                <h1 className="font-medium text-2xl">
                  AI-Driven Questions & Insights
                </h1>
                <p className="text-sm">
                  Optimize college operations with AI-powered question
                  generation and actionable insights.
                </p>
              </CardFooter>
            </Card>
            <Card className="w-[350px] bg-[#badafe] rounded-3xl h-[470px] transform transition-transform duration-300 hover:scale-105">
              <CardHeader></CardHeader>
              <CardContent>
                <img
                  src="https://d2b1cooxpkirg1.cloudfront.net/publicAssets/homepage/our-product/IntervuePlatform.webp"
                  alt=""
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-3">
                <h1 className="font-medium text-2xl">
                  Management as a Service
                </h1>
                <p className="text-sm">
                  Scalable solutions for streamlined college management and
                  efficiency.
                </p>
              </CardFooter>
            </Card>
            <Card className="w-[350px] rounded-3xl  h-[470px] transform transition-transform duration-300 hover:scale-105">
              <CardHeader></CardHeader>
              <CardContent>
                <img
                  src="https://d2b1cooxpkirg1.cloudfront.net/publicAssets/homepage/our-product/our-product-3.webp"
                  alt=""
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-3">
                <h1 className="font-medium text-2xl">Insights</h1>
                <p className="text-sm">
                  Gain Insights to Enhance and Optimize College Operations.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className="main-showcase w-full h-full  bg-[#27282c]  pb-10 ">
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
              <motion.div
                className="student-animated flex items-center justify-center"
                key="student"
                initial={{ y: 50 }} // Initial position below
                animate={{ y: 0 }} // Animate to normal position
                exit={{ y: -50 }} // Move upwards when exiting
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <img src={image1} alt="Student" />
              </motion.div>
            )}

            {currentIndex === 1 && (
              <motion.div
                className="faulty-animated flex items-center justify-center"
                key="faculty"
                initial={{ y: 50 }} // Initial position below
                animate={{ y: 0 }} // Animate to normal position
                exit={{ y: -50 }} // Move upwards when exiting
                transition={{ duration: 0.2, ease: "easeOut" }} // Slower animation
              >
                <img src={image2} alt="Faculty" />
              </motion.div>
            )}

            {currentIndex === 2 && (
              <motion.div
                className="admin-animated flex items-center justify-center"
                key="admin"
                initial={{ y: 50 }} // Initial position below
                animate={{ y: 0 }} // Animate to normal position
                exit={{ y: -50 }} // Move upwards when exiting
                transition={{ duration: 0.2, ease: "easeOut" }} // Slower animation
              >
                <img src={image3} alt="Admin" />
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className=" pb-5 bg-[#ffffff] flex items-center flex-wrap justify-around py-24">
        <div className="w-full max-w-[350px] sm:max-w-[1200px] px-4">
          <div className="">
            <h1 className="text-black text-2xl text-center lg:text-3xl font-extralight">
              How do you want to <span className="font-medium">login</span>{" "}
              <span className=" font-medium">CampusFlow?</span>
            </h1>
            <p className="text-[#5e5e5e]  text-center text-base pt-1 lg:text-lg">
              We will personalize your experience accordingly
            </p>
          </div>

          {/* <div className="flex space-x-[50px] sm:space-x-[150px] mt-[100px] mb-[50px] justify-center">
            <Card className="w-[350px] rounded-3xl  h-[300px] bg-[#a2ceff]">
              <CardHeader></CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card className="w-[350px] rounded-3xl  h-[300px] bg-[#a2ceff]">
              <CardHeader></CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            <Card className="w-[350px] rounded-3xl  h-[300px] bg-[#a2ceff]">
              <CardHeader></CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>

      <div className=" pt-20  grid md:grid-cols-3 gap-[15px] md:gap-[33px] items-end mx-auto max-w-[1200px]">
        <div className="bg-[#e9ecf1] py-[38px] px-[24px] rounded-[15px] md:h-[235px] shadow-md">
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
          <div className="">
            <div className="">
              <div className="flex items-center justify-center pt-[80px] gap-2">
                <svg
                  width="20"
                  height="21"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <path
                    stroke="#1D68BD"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    d="M18.3 9.7v.8a8.3 8.3 0 1 1-5-7.6"
                  ></path>
                  <path
                    stroke="#1D68BD"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    d="M18.3 3.8 10 12.2 7.5 9.7"
                  ></path>
                </svg>
                <h1 className=" text-black text-center text-2xl">{texts[0]}</h1>
              </div>
              <p className="pt-2 text-[#5e5e5e] text-center text-lg">
                {description[0]}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#4a805f] py-[38px] px-[24px] rounded-[15px] md:h-[322px] shadow-xl">
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
          <div className="">
            <div className="flex items-center justify-center gap-2 pt-[80px]">
              <svg width="20" height="21" fill="none" className="flex-shrink-0">
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  d="M18.3 9.7v.8a8.3 8.3 0 1 1-5-7.6"
                ></path>
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  d="M18.3 3.8 10 12.2 7.5 9.7"
                ></path>
              </svg>
              <h1 className=" text-white text-center text-2xl">{texts[1]}</h1>
            </div>
            <p className="pt-2 text-[#f7fbff] text-center text-lg">
              {description[1]}
            </p>
          </div>
        </div>
        <div className="bg-[#c40000] py-[38px] px-[24px] rounded-[15px] md:h-[396px] shadow-xl">
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
          <div className="">
            <div className="flex items-center justify-center gap-2 pt-[80px]">
              <svg width="20" height="21" fill="none" className="flex-shrink-0">
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  d="M18.3 9.7v.8a8.3 8.3 0 1 1-5-7.6"
                ></path>
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  d="M18.3 3.8 10 12.2 7.5 9.7"
                ></path>
              </svg>
              <h1 className=" text-[#ffffff] text-center text-2xl">
                {texts[2]}
              </h1>
            </div>
            <p className="pt-2 text-[#f7fbff] text-center text-lg">
              {description[2]}
            </p>
          </div>
        </div>
      </div>
      <div className="relative my-20">
        {/* Background Map Image */}
        <div className="inset-0 -z-10">
          <img
            src={mapImg}
            alt="World Map"
            className="w-full h-[750px] object-cover opacity-80"
          />
        </div>

        {/* Content Section */}
        <div className="absolute top-36 w-full px-4">
          <div className="container mx-auto max-w-screen-lg flex flex-col items-center justify-center gap-12">
            {/* Impact Title Section */}
            <div className="text-center space-y-5">
              <p className="text-[#1d68bd] font-medium text-xl sm:text-2xl">
                Impact
              </p>
              <h2 className="text-black text-3xl sm:text-4xl lg:text-4xl font-medium mt-2">
                Industry leader
                <br />
                <span className="font-light">
                  {" "}
                  in College Management Solutions
                </span>{" "}
                <br />
              </h2>
            </div>

            {/* Impact Cards Section */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 lg:gap-20">
              {/* Card 1 */}
              <div className="impact-card text-center space-y-5">
                <p className="text-[#1d68bd] text-5xl sm:text-6xl lg:text-7xl font-semibold">
                  2.5x
                </p>
                <p className="text-black text-base sm:text-lg">
                  faster academic and administrative operations
                </p>
              </div>
              {/* Card 2 */}
              <div className="impact-card text-center space-y-5">
                <p className="text-[#1d68bd] text-5xl sm:text-6xl lg:text-7xl font-semibold">
                  93%
                </p>
                <p className="text-black text-base sm:text-lg">
                  reduction workload or bandwidth saved
                </p>
              </div>
              {/* Card 3 */}
              <div className="impact-card text-center space-y-5">
                <p className="text-[#1d68bd] text-5xl sm:text-6xl lg:text-7xl font-semibold">
                  4.8/5
                </p>
                <p className="text-black text-base sm:text-lg">
                  satisfaction rate from users recommending our system
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-3">
        <h1 className="text-[#1d68bd] font-medium text-xl">Testimonials</h1>
        <h1 className="text-black font-medium text-3xl">
          <span className="font-light">Hear from our</span> customer stories
        </h1>
      </div>
      <div className=" w-full h-full mt-16  bg-[#27282c]    ">
        <VideoProgress
          isActive={isActive}
          color="#1d68bd"
          src={videos[currentVideo].src}
          currentAvatar={currentAvatar}
          currentName={currentName}
          allAvatars={allAvatars}
          backgroundImage={videos[currentVideo].background}
          onVideoEnd={handleVideoEnd}
        />
      </div>
      {/* <div className="bg-[#fdf4e35f] w-full py-10  flex justify-center items-center  mt-12">
        <h1 className="text-black text-xl text-center">
          {" "}
          Let’s Make College Management{" "}
          <span className="text-[#114a65] font-bold text-3xl">
            " Better Together "
          </span>
          <div className="w-24 h-1 bg-yellow-500 ml-auto mr-32"></div>
        </h1>
        <img src={dot} alt="" className="w-40  relative right-20  opacity-40" />
      </div> */}

      {/* <div className="bg-[#2b2b2b] px-10 py-10">
        <div className="text-center pt-20 pb-28 ">
          <h1 className="text-5xl">CampusFlow are platform-driven</h1>
          <p className="text-xl text-gray-500">
            A unified interface , coding environment, and trackpad-friendly
            whiteboarding ensures a smooth codeing for every students.
          </p>
        </div>
        <div className="w-[1200px] mx-auto">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            className="rounded-3xl shadow-2xl"
          >
            <source src={CodeLive} />
          </video>
        </div>
      </div> */}
      <div className="my-28">
        <h1 className="text-black text-center text-2xl lg:text-3xl pb-3">
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
        <div className="pt-3">
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
      <section className="mt-[78.29px] md:mt-[64.28px] grid md:grid-cols-3 text-[#004FA9] font-[600]">
        <div className="py-[47.5px] md:py-[80px] bg-[#F3F9FF] w-full flex justify-center">
          <div className="text-[9.76px] md:text-[16.24px] leading-[14.67px] md:leading-[24.36px]">
            <span className="text-[60.03px] md:text-[87.64px] leading-[75.64px] md:leading-[110.42px]">
              87%
            </span>
            <div className="flex items-center gap-[4.51px]">
              <span>of</span>
              <div className="-rotate-2 flex items-center bg-[#004FA9] text-white w-fit rounded-full py-[2.5px] md:py-[5px] px-[10px] md:px-[20px] gap-[3.63px]">
                <svg
                  width="33"
                  height="20"
                  fill="none"
                  className="hidden md:block"
                >
                  <path
                    fill="#fff"
                    d="M6.6 8.7c1.5 0 2.8-2.2 2.7-3.8C9.3 3.3 8 2 6.3 2a2.9 2.9 0 0 0-2.6 3c0 1.5 1.4 3.6 3 3.6ZM26.7 8c1.5 0 2.8-2.2 2.7-3.8 0-1.6-1.4-2.8-2.9-2.8a2.9 2.9 0 0 0-2.7 3c0 1.5 1.5 3.6 3 3.6ZM16.7 10c2-.1 3.6-2.8 3.5-5 0-2-1.8-3.6-3.8-3.5-2 0-3.6 1.8-3.5 3.8 0 2.1 1.9 4.7 3.8 4.7ZM26.8 10c-2 0-4 .9-5 2 1.6.8 2.7 1.9 3.3 3.1 3.2.2 6.6-.4 7.5-1.2.1 0 .2-.1.2-.3-.1-2-2.8-3.8-6-3.6ZM11.7 12.4a6.8 6.8 0 0 0-5-1.7c-3.2 0-5.8 2-5.8 4.1l.2.2c.9.8 4.4 1.1 7.6.8a7 7 0 0 1 3-3.4ZM24.1 15.9c-.8-2.2-3.8-3.8-7.3-3.7-3.5.1-6.4 2-7 4.2l-.2 1c0 .8 2.7 1.7 7.4 1.5 4.7-.2 7.4-1.3 7.3-2 0-.3 0-.7-.2-1Z"
                  ></path>
                </svg>
                <svg width="20" height="12" fill="none" className="md:hidden">
                  <path
                    fill="#fff"
                    d="M4 5.4c.8 0 1.6-1.2 1.6-2.2 0-1-.9-1.7-1.8-1.7s-1.7.9-1.6 1.8c0 1 .8 2.2 1.8 2.1ZM16 5c1 0 1.7-1.3 1.7-2.3 0-1-.8-1.6-1.8-1.6-.9 0-1.6.8-1.6 1.8S15.2 5 16 5Zm-6 1.2c1.2 0 2.2-1.6 2.1-3a2 2 0 0 0-2.2-2c-1.2 0-2.2 1-2.2 2.2C7.7 4.7 9 6.3 10 6.2Zm6.1 0c-1.2 0-2.3.6-3 1.3a4 4 0 0 1 2 1.9c1.9 0 4-.3 4.5-.8l.1-.2c0-1.2-1.6-2.2-3.6-2.2ZM7 7.7a4.1 4.1 0 0 0-3-1C2 6.7.5 7.8.5 9.2h.1c.6.6 2.7.7 4.6.5.3-.8 1-1.5 1.8-2Zm7.5 2.1C14 8.5 12.2 7.5 10 7.6c-2 0-3.8 1.1-4.1 2.4l-.1.6c0 .5 1.6 1 4.4 1 2.9-.2 4.4-.8 4.4-1.3l-.1-.6Z"
                  ></path>
                </svg>
                students
              </div>
            </div>
            <p className="my-[3.8px] md:my-[6.31px]">recommends our platform</p>
            <p>for streamlined academic processes.</p>
          </div>
        </div>
        <div className="py-[47.5px] md:py-[80px] bg-[#DFEEFF] w-full flex justify-center">
          <div className="text-[9.76px] md:text-[16.24px] leading-[14.67px] md:leading-[24.36px]">
            <span className="text-[60.03px] md:text-[87.64px] leading-[75.64px] md:leading-[110.42px]">
              90%
            </span>
            <div className="flex items-center gap-[4.51px]">
              <span>of</span>
              <div className="rotate-3 flex items-center bg-[#D3E9FF] text-[#004FA9] w-fit rounded-full py-[2.5px] md:py-[5px] px-[10px] md:px-[20px] gap-[3.63px]">
                <svg
                  width="33"
                  height="20"
                  fill="none"
                  className="hidden md:block"
                >
                  <path
                    fill="#004FA9"
                    d="M6.4 7.6c1.4 0 2.8-1.9 3-3.5 0-1.5-1.2-2.8-2.7-2.9a2.8 2.8 0 0 0-3 2.6c0 1.6 1.2 3.7 2.7 3.8ZM26 8.6c1.5.1 2.9-1.8 3-3.4 0-1.6-1.1-2.9-2.6-3a2.8 2.8 0 0 0-3 2.7c0 1.5 1.2 3.7 2.6 3.7ZM16.1 9.7c2 .1 3.7-2.4 3.8-4.4.1-2-1.4-3.7-3.4-3.8-2-.1-3.6 1.4-3.7 3.4-.1 2 1.4 4.7 3.3 4.8ZM26 10.6c-2-.1-4 .5-5 1.6 1.3.9 2.3 2 2.8 3.3 3.1.5 6.5.2 7.5-.6l.1-.2c.1-2-2.3-4-5.5-4.1ZM11 11.7c-1-1.2-2.8-2-4.8-2.1C3.1 9.4.4 11 .3 13l.1.2c.8.9 4.2 1.5 7.4 1.4a6.8 6.8 0 0 1 3.2-3ZM22.8 16.1c-.6-2.2-3.3-4-6.8-4.2-3.5-.2-6.4 1.3-7.2 3.5-.2.3-.2.7-.2 1 0 .7 2.5 1.8 7 2 4.7.3 7.3-.5 7.3-1.2v-1Z"
                  ></path>
                </svg>
                <svg width="20" height="12" fill="none" className="md:hidden">
                  <path
                    fill="#004FA9"
                    d="M4.1 4.2c.9 0 1.7-1 1.7-2 0-.9-.6-1.6-1.5-1.7-.8 0-1.6.7-1.7 1.5 0 1 .7 2.2 1.5 2.2Zm11.5.6c.8 0 1.6-1 1.7-2 0-.9-.7-1.6-1.5-1.7-.9 0-1.7.7-1.7 1.5 0 1 .6 2.2 1.5 2.2Zm-5.8.7C11 5.5 12 4 12 2.9c0-1.2-.8-2.2-2-2.2-1-.1-2 .8-2.1 2 0 1.2.8 2.7 2 2.8Zm5.7.5c-1.2 0-2.2.3-2.9 1 .8.4 1.4 1 1.7 1.8 1.8.3 3.8.1 4.3-.3l.1-.1C18.7 7 17.4 6 15.5 6Zm-8.7.6A3.9 3.9 0 0 0 4 5.4c-1.8-.1-3.3.8-3.4 2v.2c.5.5 2.5.8 4.4.8a4 4 0 0 1 1.8-1.8Zm6.9 2.6c-.3-1.3-2-2.4-4-2.5-2 0-3.7.8-4.2 2v.7c-.1.4 1.4 1 4 1.1 2.7.2 4.3-.3 4.3-.7v-.6Z"
                  ></path>
                </svg>
                faculty
              </div>
            </div>
            <p className="my-[3.8px] md:my-[6.31px]">
              love using our system for
            </p>
            <p>managing classes and scheduling efficiently.</p>
            <div className="flex items-center bg-[#004FA9] gap-[3.04px] text-white w-fit rounded-full py-[2.5px] md:py-[5px] px-[10px] md:px-[20px] mt-[7px]">
              <svg
                width="17"
                height="17"
                fill="none"
                className="hidden md:block"
              >
                <path
                  fill="#F8F8EE"
                  d="M16 14.4a1.9 1.9 0 0 0-1.2-1l-1-.3a.2.2 0 0 1-.2-.2.2.2 0 0 1 0-.2 2.4 2.4 0 0 0 .8-1.9c0-1.2-1-2.2-2-2.1-1 0-1.9 1-1.8 2.3a2.4 2.4 0 0 0 .9 1.8.2.2 0 0 1 0 .2.2.2 0 0 1 0 .1l-1.1.4a2 2 0 0 0-1.2 1.2l-.2.5a.4.4 0 0 0 0 .4.4.4 0 0 0 .4.1l6.5-.2a.4.4 0 0 0 .4-.2.4.4 0 0 0 0-.3l-.3-.6ZM8.3 11.9l-.3-.6a2 2 0 0 0-1.3-1.1l-1.2-.4a.2.2 0 0 1-.1-.1.2.2 0 0 1 0-.2 2.6 2.6 0 0 0 .9-2C6.3 6 5.3 5 4 5c-1.1 0-2 1.2-2 2.5a2.5 2.5 0 0 0 1 2 .2.2 0 0 1 .1.2.2.2 0 0 1-.1.1l-1.2.5a2 2 0 0 0-1.2 1.2l-.2.6a.4.4 0 0 0 0 .3.4.4 0 0 0 .4.2l7-.2a.4.4 0 0 0 .4-.2.4.4 0 0 0 0-.4ZM7.3 7.5h3c1 0 1.9-.5 2.5-1.1.7-.7 1.1-1.5 1.1-2.4A3.5 3.5 0 0 0 12.3.9a3.7 3.7 0 0 0-5 .8 3.5 3.5 0 0 0 .7 5l-.8.5v.1a.2.2 0 0 0 0 .2h.1Zm4.5-4.1a.5.5 0 0 1 .4.2.4.4 0 0 1 0 .5.5.5 0 0 1-.5.1l-.3-.1a.4.4 0 0 1 0-.6l.4-.1Zm-1.5 0a.5.5 0 0 1 .4.3.4.4 0 0 1 0 .5.5.5 0 0 1-.6 0H10a.4.4 0 0 1 0-.6l.4-.2Zm-1.5 0 .2.1.2.2a.4.4 0 0 1-.1.5.5.5 0 0 1-.5.1l-.2-.1a.4.4 0 0 1 0-.6l.4-.1Z"
                ></path>
              </svg>
              <svg width="11" height="10" fill="none" className="md:hidden">
                <path
                  fill="#F8F8EE"
                  d="M10 9a1 1 0 0 0-.7-.6l-.6-.2a.1.1 0 0 1 0-.2A1.4 1.4 0 0 0 9 7c0-.8-.5-1.4-1.1-1.4-.7 0-1.1.7-1.1 1.4a1.4 1.4 0 0 0 .5 1 .1.1 0 0 1 0 .2l-.6.3A1.1 1.1 0 0 0 6 9l-.1.3a.2.2 0 0 0 0 .3.2.2 0 0 0 .2 0H10a.2.2 0 0 0 .2-.2.2.2 0 0 0 0-.2l-.1-.3ZM5.6 7.5l-.2-.3a1.2 1.2 0 0 0-.8-.7L4 6.3a.1.1 0 0 1 0-.2A1.5 1.5 0 0 0 4.4 5c0-.7-.6-1.4-1.3-1.3C2.5 3.6 2 4.2 2 5a1.5 1.5 0 0 0 .5 1.2.1.1 0 0 1 .1 0 .1.1 0 0 1 0 .2l-.8.2a1.2 1.2 0 0 0-.7.7v.4a.2.2 0 0 0 0 .2.2.2 0 0 0 .1 0h4.1a.2.2 0 0 0 .2-.2.2.2 0 0 0 0-.2ZM5 5h1.7c.6-.1 1.1-.3 1.5-.7a2 2 0 0 0-.3-3.2 2.2 2.2 0 0 0-2.9.5 2 2 0 0 0 .4 2.8l-.5.4a.1.1 0 0 0 0 .2Zm2.6-2.5h.1a.3.3 0 0 1 .2.3l-.1.2a.3.3 0 0 1-.3 0h-.1a.3.3 0 0 1 0-.4h.2Zm-.9 0a.3.3 0 0 1 .3.2.3.3 0 0 1 0 .3.3.3 0 0 1-.4 0h-.1a.3.3 0 0 1 0-.3l.2-.1Zm-.9.1H6v.2A.3.3 0 0 1 6 3a.3.3 0 0 1-.3.1.3.3 0 0 1 0-.4h.1Z"
                ></path>
              </svg>
              faculty's
            </div>
          </div>
        </div>
        <div className="py-[47.5px] md:py-[80px] bg-[#EFF6FE] w-full flex justify-center">
          <div className="text-[9.76px] md:text-[16.24px] leading-[14.67px] md:leading-[24.36px]">
            <span className="text-[60.03px] md:text-[87.64px] leading-[75.64px] md:leading-[110.42px]">
              85%
            </span>
            <div className="flex items-center gap-[4.51px]">
              <span>of our</span>
              <div className="-rotate-[1.39deg] flex items-center bg-[#004FA9] text-white w-fit rounded-full py-[2.5px] md:py-[5px] px-[10px] md:px-[20px] gap-[3.63px]">
                <svg
                  width="33"
                  height="20"
                  fill="none"
                  className="hidden md:block"
                >
                  <path
                    fill="#fff"
                    d="M6.6 8.7c1.5 0 2.8-2.2 2.7-3.8C9.3 3.3 8 2 6.3 2a2.9 2.9 0 0 0-2.6 3c0 1.5 1.4 3.6 3 3.6ZM26.7 8c1.5 0 2.8-2.2 2.7-3.8 0-1.6-1.4-2.8-2.9-2.8a2.9 2.9 0 0 0-2.7 3c0 1.5 1.5 3.6 3 3.6ZM16.7 10c2-.1 3.6-2.8 3.5-5 0-2-1.8-3.6-3.8-3.5-2 0-3.6 1.8-3.5 3.8 0 2.1 1.9 4.7 3.8 4.7ZM26.8 10c-2 0-4 .9-5 2 1.6.8 2.7 1.9 3.3 3.1 3.2.2 6.6-.4 7.5-1.2.1 0 .2-.1.2-.3-.1-2-2.8-3.8-6-3.6ZM11.7 12.4a6.8 6.8 0 0 0-5-1.7c-3.2 0-5.8 2-5.8 4.1l.2.2c.9.8 4.4 1.1 7.6.8a7 7 0 0 1 3-3.4ZM24.1 15.9c-.8-2.2-3.8-3.8-7.3-3.7-3.5.1-6.4 2-7 4.2l-.2 1c0 .8 2.7 1.7 7.4 1.5 4.7-.2 7.4-1.3 7.3-2 0-.3 0-.7-.2-1Z"
                  ></path>
                </svg>
                <svg width="19" height="12" fill="none" className="md:hidden">
                  <path
                    fill="#fff"
                    d="M3.8 5c.9 0 1.6-1.1 1.6-2 0-1-.8-1.6-1.7-1.6C3 1.3 2.1 2 2.1 3c0 .9.8 2 1.7 2Zm11.6-.2c.9 0 1.6-1.3 1.6-2.2 0-1-.8-1.6-1.7-1.6-.8 0-1.6.8-1.5 1.7 0 .9.8 2 1.6 2ZM9.7 5.9c1 0 2-1.6 2-2.8 0-1.2-1-2.1-2.2-2.1-1.1 0-2 1-2 2.2 0 1.2 1 2.7 2.2 2.7Zm5.8.1a4 4 0 0 0-2.9 1 4 4 0 0 1 1.8 2c1.9.1 3.9-.2 4.4-.7v-.1C18.8 7 17.3 6 15.5 6ZM6.7 7.3a4 4 0 0 0-2.9-1.1C2 6.2.5 7.3.5 8.6c.6.6 2.6.7 4.5.6a4 4 0 0 1 1.7-2Zm7.2 2c-.5-1.3-2.2-2.2-4.2-2.2-2 .1-3.7 1.1-4.1 2.4v.6c0 .4 1.5 1 4.2 1 2.7-.1 4.2-.8 4.2-1.2l-.1-.6Z"
                  ></path>
                </svg>
                administrators
              </div>
            </div>
            <p className="my-[3.8px] md:my-[6.31px]">
              {" "}
              say our solution has matched or{" "}
            </p>
            <p> surpassed their expectations for campus management.</p>
            <div className="flex items-center bg-[#004FA9] gap-[3.04px] text-white w-fit rounded-full py-[2.5px] md:py-[5px] px-[10px] md:px-[20px] mt-[7px]">
              <svg
                width="19"
                height="20"
                fill="none"
                className="hidden md:block"
              >
                <path
                  fill="white"
                  d="M1.1 12.5h1.4c.4 0 .7.4.7.8v5.2c0 .4-.3.7-.7.7H1.1a.7.7 0 0 1-.7-.7v-5.2c0-.4.3-.8.7-.8Zm5.2-3.7h1.3c.4 0 .7.3.7.7v9c0 .4-.3.7-.7.7H6.3a.7.7 0 0 1-.8-.7v-9c0-.4.4-.7.8-.7Zm5.1-4h1.3c.4 0 .8.3.8.7v13c0 .4-.4.7-.8.7h-1.3a.7.7 0 0 1-.8-.7v-13c0-.4.4-.7.8-.7ZM16.5 1h1.4c.4 0 .7.3.7.7v16.8c0 .4-.3.7-.7.7h-1.4a.7.7 0 0 1-.7-.7V1.7c0-.4.3-.8.7-.8Z"
                ></path>
              </svg>
              <svg width="11" height="11" fill="none" className="md:hidden">
                <path
                  fill="white"
                  d="M.5 6.7h.8c.2 0 .4.2.4.4V10c0 .2-.2.4-.4.4H.5a.4.4 0 0 1-.4-.4V7c0-.1.2-.3.4-.3Zm2.8-2.1h.8c.2 0 .4.2.4.4v5c0 .2-.2.4-.4.4h-.8A.4.4 0 0 1 3 10V5c0-.2.2-.4.4-.4Zm2.9-2.2H7c.2 0 .4.2.4.4V10c0 .2-.2.4-.4.4h-.8a.4.4 0 0 1-.4-.4V2.8c0-.2.2-.4.4-.4ZM9 .2h.8c.2 0 .4.2.4.4V10c0 .2-.2.4-.4.4H9a.4.4 0 0 1-.4-.4V.6c0-.2.2-.4.4-.4Z"
                ></path>
              </svg>
              management bar
            </div>
          </div>
        </div>
      </section>
      {/* <div className="my-10 bg-[#2a2a2a] py-20">
        <div className="flex items-center justify-center flex-wrap gap-10">
          <Card className="w-[350px] bg-[#246cbe]  rounded-3xl shadow-2xl border-0 transform transition duration-300 hover:scale-105">
            
            <CardHeader></CardHeader>
            <CardContent className="rounded-lg">
              <img src={card2} alt="" className="rounded-xl" />
            </CardContent>
            <div className="w-full bg-[#ffce6cf5] h-2 rounded-t-3xl "></div>
            <CardFooter className="bg-black rounded-b-3xl pt-5">
              <div className="flex items-center gap-2">
                <span className="border border-gray-300 p-2 rounded-full">
                  {" "}
                  <SiAnalogue className="text-white" />
                </span>

                <h1 className="text-white ">Report & Analysis</h1>
              </div>
            </CardFooter>
          </Card>
          <Card className="w-[350px] bg-[#246cbe]  rounded-3xl shadow-2xl border-0 transform transition duration-300 hover:scale-105">
            <CardHeader></CardHeader>
            <CardContent>
              <img src={card1} alt="" />
            </CardContent>
            <div className="w-full bg-[#ffce6cf5] h-2 rounded-t-3xl "></div>
            <CardFooter className="bg-black rounded-b-3xl pt-5">
              <div className="flex items-center gap-2">
                <span className="border border-gray-300 p-2 rounded-full">
                  {" "}
                  <TbReport className="text-white" />
                </span>

                <h1 className="text-white ">Manage Data insights</h1>
              </div>
            </CardFooter>
          </Card>
          <Card className="w-[350px] bg-[#1b5eaa] rounded-3xl shadow-2xl border-0 transform transition duration-300 hover:scale-105">
            <CardHeader></CardHeader>
            <CardContent>
              <img
                src=" https://www.intervue.io/publicAssets/homepage/resources-section/hrMatrix.png"
                alt=""
              />
            </CardContent>
            <div className="w-full bg-[#ffce6cf5] h-2 rounded-t-3xl "></div>
            <CardFooter className="bg-black rounded-b-3xl pt-5">
              <div className="flex items-center gap-2">
                <span className="border border-gray-300 p-2 rounded-full">
                  {" "}
                  <MdManageAccounts className="text-white" />
                </span>

                <h1 className="text-white "> Faster Efficiency & Managing</h1>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div> */}
      <div className="my-10 bg-[#2b2b2b] py-14 ">
        <div className="flex  items-center justify-around gap-8 mx-auto w-full flex-wrap px-5">
          <div className="flex gap-4 flex-col space-y-7">
            <div className="w-96 space-y-3">
              <h1 className="text-red-600 font-medium text-2xl">Resources</h1>
              <h1 className="text-white font-semibold text-4xl">
                Get real-time data with us
              </h1>
            </div>
            <div className="flex items-center  gap-5">
              {" "}
              <button
                onClick={handlePrevious}
                className="relative w-12 h-12 bg-[#000000] rounded-full   flex items-center justify-center border border-slate-800"
              >
                <svg
                  width="14"
                  height="22"
                  fill="none"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <path stroke="#fff" strokeWidth="3" d="m12 20-9-9 9-9"></path>
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="relative w-12 h-12 bg-[#0000008f] rounded-full  flex items-center justify-center  border border-slate-800"
              >
                <svg
                  width="14"
                  height="22"
                  fill="none"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <path stroke="#fff" strokeWidth="3" d="m2 2 9 9-9 9"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="relative w-[500px] h-[500px] px-5">
            {cards.map((card, index) => {
              const isActive = index === currentCard;
              const isNext = index === (currentCard + 1) % cards.length;

              return (
                <Card
                  key={index}
                  className={`absolute w-[255px] sm:w-[280px] md:w-[300px] lg:w-[350px]  rounded-3xl  shadow-2xl border border-slate-500 transform transition-all duration-700 ${
                    isActive
                      ? "opacity-100 translate-x-0 scale-100 z-10" // Fully visible
                      : isNext
                      ? "opacity-50 translate-x-40 scale-90 z-0" // Next card (less opacity)
                      : "opacity-0 scale-75 z-0" // Hidden cards
                  }`}
                  style={{ backgroundColor: "#353535" }}
                >
                  <CardHeader></CardHeader>
                  <CardContent className="rounded-lg">
                    <img src={card.image} alt="" className="rounded-xl" />
                  </CardContent>
                  <div className="w-full bg-[#b2b2b2f5] h-2 rounded-t-3xl "></div>
                  <CardFooter className="bg-[#116752] rounded-b-3xl pt-5">
                    <div className="flex items-center gap-2">
                      <span className="border border-gray-300 p-2 rounded-full">
                        {card.footerIcon}
                      </span>
                      <h1 className="text-white">{card.footerText}</h1>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
            <div className="relative top-96 -left-16 ">
              <img
                src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/673c6120b1e903b2c3fe2a82_dots.png"
                alt=""
                className="w-40"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col space-y-7 py-24 px-4 sm:px-8 lg:px-16">
        <div className="bg-[#1d68bd] flex items-center w-fit p-2 gap-3 rounded-full">
          <svg width="21" height="18" fill="none">
            <path
              fill="#fff"
              d="m20.56 4.77-3 1.12-5.72-2.13a2.7 2.7 0 0 0-2.02 0L4.1 5.89l-3-1.12c-.35-.13-.35-.63 0-.78L10.35.6c.31-.11.65-.11.97 0L20.56 4c.36.15.36.65 0 .78Z"
            ></path>
            <path
              fill="#fff"
              d="m20.56 9.38-3 1.12-5.72-2.11a2.78 2.78 0 0 0-2.02 0l-5.73 2.1-2.99-1.1c-.35-.13-.35-.63 0-.78l9.25-3.39c.31-.13.65-.13.97 0l9.24 3.41a.4.4 0 0 1 0 .76Z"
            ></path>
            <path
              fill="#fff"
              d="m1.1 13.23 9.25-3.4c.31-.11.65-.11.97 0l9.24 3.4c.36.13.36.66 0 .78l-9.24 3.41c-.32.11-.66.11-.97 0l-9.25-3.4c-.35-.13-.35-.66 0-.79Z"
            ></path>
          </svg>
          <span className="text-sm">One platform, endless possibilities</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-light text-center text-black">
          Scale your <span className="font-medium">college effortlessly</span>
        </h1>
        <p className="text-black text-sm sm:text-lg font-light text-center max-w-[90%] md:max-w-[700px] lg:max-w-[900px]">
          Whether you're a{" "}
          <span className="font-semibold">
            growing institution, scaling operations,
          </span>{" "}
          or{" "}
          <span className="font-semibold">
            an established college managing complex administrative tasks,
          </span>
          our system adapts to meet your needs.
        </p>

        <div className="pb-10">
          <div className="register-btn bg-gradient-to-r  from-black to-black text-white text-center w-[250px] mx-auto mt-6 p-3 rounded-full flex items-center justify-center hover:bg-gray-900 ">
            <Link to="/register" className="px-5 ">
              Register Now
            </Link>
            <div className="bg-white rounded-full">
              <IoIosArrowRoundForward
                style={{ color: "black", fontSize: "40" }}
              />
            </div>
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <svg
            className="absolute lg:w-[1400px] sm:w-[600px] md:w-[900px] h-auto"
            viewBox="0 0 1432 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="#1D68BD"
              strokeDasharray="15 15"
              d="M1 159c15 35 94 56 186-14C237 106 333 8 457 24c194 25 191 134 407 115 109-9 180-203 368-115 90 42 61 121 201 142"
            ></path>
          </svg>

          <div className="flex justify-center  items-center gap-5 relative z-10 flex-wrap">
            <Card className="w-full max-w-[350px] h-80 bg-slate-100 rounded-3xl duration-300">
              <CardHeader></CardHeader>
              <CardContent>
                <img
                  src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6734ab310d5bbd80cf71569a_Vector.png"
                  alt=""
                  className="w-9"
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-5">
                <div>
                  <h1 className="font-semibold text-xl">
                    Dynamic Scaling for Effortless College Management
                  </h1>
                </div>
                <p className="font-light">
                  Automatically adjust resources and staff allocation based on
                  your college's administrative workload and requirements.
                </p>
              </CardFooter>
            </Card>

            <Card className="w-full max-w-[350px] h-80 bg-slate-100 rounded-3xl duration-300">
              <CardHeader></CardHeader>
              <CardContent>
                <img
                  src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6734ab4eda67ea2bf3c35e91_Vector%20(1).png"
                  alt=""
                  className="w-8"
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-5">
                <div>
                  <h1 className="font-semibold text-xl">
                    Get unmatched reliability
                  </h1>
                </div>
                <p className="font-light">
                  Ensure a smooth academic management process with scheduling
                  support, keeping every student on track, even in high-volume
                  periods.
                </p>
              </CardFooter>
            </Card>

            <Card className="w-full max-w-[350px] h-80 bg-slate-100 rounded-3xl duration-300">
              <CardHeader></CardHeader>
              <CardContent>
                <img
                  src="https://cdn.prod.website-files.com/608e9cc36cbcc089f0998643/6734ab9b1a6507e31d9cc21e_Group.png"
                  alt=""
                  className="w-8"
                />
              </CardContent>
              <CardFooter className="flex flex-col space-y-5">
                <div>
                  <h1 className="font-semibold text-xl">
                    Enterprise level security
                  </h1>
                </div>
                <p className="font-light">
                  Protect your data with robust privacy measures designed for
                  today’s challenges.
                </p>
              </CardFooter>
            </Card>
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

export default HomePage;
