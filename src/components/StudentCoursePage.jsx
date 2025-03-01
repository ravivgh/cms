import React from "react";
import { useState, useEffect } from "react";
import quizCard from "@/assets/le.jpg";
import { Button } from "@/components/ui/button";
import { RiCopperCoinFill } from "react-icons/ri";
import { MdOutlineRecentActors } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CircleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Avatar } from "@mui/material";
const StudentCoursePage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedCourses, setConfirmedCourses] = useState([]);
  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("confirmedCourses"));
    if (storedCourses) {
      setConfirmedCourses(storedCourses);
    }
  }, []);
  const handleConfirms = (courseTitle) => {
    // Add the course title to the confirmedCourses array
    setConfirmedCourses((prev) => [...prev, courseTitle]);
    const updatedCourses = [...confirmedCourses, courseTitle];
    setConfirmedCourses(updatedCourses);
    localStorage.setItem("confirmedCourses", JSON.stringify(updatedCourses));
  };
  const [selectedCategory, setSelectedCategory] = useState("Frontend");

  const handleConfirm = () => {
    setIsConfirmed(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    setInputValue("");
  };
  const courses = [
    {
      id: 1,
      points: 30,
      image:
        "https://miro.medium.com/v2/resize:fit:612/1*ch9YznwxmrH971Aeyw261w.png",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
      title: "React Scratch Course",
      description: "Learn React.js from scratch! Learn React, Hooks",
      progress: 0,
      category: "Frontend",
    },
    {
      id: 2,
      points: 80,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwyDvG74hXU-tEysrQqKtQX5TgxEDdxX-jYg&s",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3qAb3e9auwnxJ1RmaypTdsieWkl2wb4u3cg&s",
      title: "Angular Scratch Course",
      description: "Learn Angular from scratch! Learn Components, Services",
      progress: 50,
      category: "Backend",
    },
    {
      id: 3,
      points: 80,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp2LxGazqpKZkbhsEuahgbhIaAwbMLeGL9gA&s",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAXKDEpLJgjO4gALMslMWnCMmB0xRo7szjfw&s",
      title: "SQL Scratch Course",
      description: "Learn SQL from scratch! Learn Queries, Joins",
      progress: 75,
      category: "Databases",
    },
    {
      id: 4,
      points: 10,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp2LxGazqpKZkbhsEuahgbhIaAwbMLeGL9gA&s",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAXKDEpLJgjO4gALMslMWnCMmB0xRo7szjfw&s",
      title: "AI Scratch Course",
      description: "Learn SQL from scratch! Learn Queries, Joins",
      progress: 75,
      category: "AI",
    },
    {
      id: 5,
      points: 20,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp2LxGazqpKZkbhsEuahgbhIaAwbMLeGL9gA&s",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAXKDEpLJgjO4gALMslMWnCMmB0xRo7szjfw&s",
      title: "SQL Scratch Course",
      description: "Learn SQL from scratch! Learn Queries, Joins",
      progress: 75,
      category: "Databases",
    },
  ];
  // Extract unique categories
  const uniqueCategories = [
    ...new Set(courses.map((course) => course.category)),
  ];

  // Limit categories to first three, plus 'All'
  const limitedCategories = [...uniqueCategories.slice(0, 3), "All"];
  return (
    <>
      <div className="assistant-about  flex items-center justify-around mx-auto  ">
        <div
          className="  w-full h-44 relative rounded-md  bg-cover bg-center "
          style={{ backgroundImage: `url(${quizCard})` }}
        >
          {" "}
          <div className="absolute inset-0 bg-[#040404] opacity-70 rounded-md"></div>
          <div className="faculty-intro-card bg-[#002a5c] max-w-[1200px] max-h-[450px] mx-auto absolute left-0 right-0 top-10 rounded-br-[80px] overflow-hidden ">
            <div className="flex flex-col md:flex-row items-center justify-between ">
              <div className="text-white p-10 flex items-center justify-center flex-col">
                <div className=" my-4 flex items-center justify-center space-x-2 bg-blue-800 px-5 py-2 rounded-full text-sm">
                  {" "}
                  <span className="text-white text-sm">
                    CampusFlow{" "}
                    <span className="bg-blue-600 text-white px-1 rounded-sm">
                      PLUS
                    </span>
                  </span>
                  <p className="text-gray-300"> / Course Library</p>
                </div>
                <div className="mb-5">
                  <h1 className=" text-center  text-white text-2xl mb-1">
                    Shape Your Future with Every Lesson with Course Library
                  </h1>
                  <div className="border-[1px] border-transparent bg-gradient-to-r from-[#b2ddfc] via-[#85cef7]  to-[#d5ebff] border-image animate-gradient bg-[length:200%_200%] mx-32 py-[0.5px]"></div>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  {" "}
                  <RiCopperCoinFill className="text-yellow-500" />
                  <p className="text-gray-300 text-sm">
                    Collect points use them to unlock exclusive courses
                  </p>
                </div>

                <h1 className="text-md text-center text-gray-400 pt-2">
                  Subscribe to build skills from world-class institutions.
                </h1>
                <div className="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5 mt-5">
                  <div className="flex -space-x-1.5 ">
                    <Avatar
                      style={{ width: "30px", height: "30px" }}
                      className="rounded-full ring-1 ring-background"
                      src="https://avatars.githubusercontent.com/u/1?v=4"
                      alt="Avatar 01"
                    />
                    <Avatar
                      style={{ width: "30px", height: "30px" }}
                      className="rounded-full ring-1 ring-background"
                      src="https://avatars.githubusercontent.com/u/2?v=4"
                      alt="Avatar 02"
                    />
                    <Avatar
                      style={{ width: "30px", height: "30px" }}
                      className="rounded-full ring-1 ring-background"
                      src="https://avatars.githubusercontent.com/u/3?v=4"
                      alt="Avatar 03"
                    />
                    <Avatar
                      style={{ width: "30px", height: "30px" }}
                      className="rounded-full ring-1 ring-background"
                      src="https://avatars.githubusercontent.com/u/4?v=4"
                      alt="Avatar 04"
                    />
                  </div>
                  <p className="px-2 text-xs text-muted-foreground">
                    Joined by{" "}
                    <strong className="font-medium text-foreground">60+</strong>{" "}
                    students
                  </p>
                </div>
              </div>

              <div className="w-full  flex justify-end ">
                <img
                  src="https://images.ctfassets.net/2pudprfttvy6/6fVqKtw5ClOzHiJ0qFTh15/05c78ba1942b67122612c00ff3b263c5/BC-3836_Job_Skills_Report_2025_Campaign_Assets_LOHP_C4C_720x500.png"
                  alt="Quiz Card"
                  className="w-full h-auto max-w-[300px] md:max-w-[600px] object-contain rounded-br-[80px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-80 mb-24 ">
        <div className="border-[1px] border-transparent bg-gradient-to-r from-[#b2ddfc] via-[#85cef7]  to-[#d5ebff] border-image animate-gradient bg-[length:200%_200%]  py-[0.5px] w-52 mx-auto"></div>
        <div className=" space-y-4 px-5 mt-10 mb-4">
          <h1 className="text-black text-2xl font-semibold  my-3 ">
            Your Courses
          </h1>
          <p className="text-black">
            Turn your tech expertise into a rewarding journey with CampusFlow.
            Shape futures, earn more
          </p>
        </div>
        <hr />
        <div className="filter flex items-center gap-3 flex-wrap cursor-pointer py-2 bg-slate-50 px-5">
          {" "}
          {limitedCategories.map((category) => (
            <span
              key={category}
              className={`text-sm w-fit px-5 py-2 rounded-full flex items-center gap-1 my-3 ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </span>
          ))}
          <div className="ml-auto">
            {/* <Button
              className="bg-[#755485] rounded-full"
              onClick={() => navigate("/courses/addcourse")}
            >
              Add Courses +
            </Button> */}
          </div>
        </div>
        <hr />
        <div className=" bg-[#f2f5fa8a] mt-5 p-5 flex flex-wrap justify-center gap-5">
          {courses
            .filter(
              (course) =>
                selectedCategory === "All" ||
                course.category === selectedCategory
            )
            .map((course) => (
              <Card
                key={course.id}
                onClick={() => navigate(`/course-student/${course.id}`)}
                className="w-[350px] rounded-3xl bg-[#e2e8f098]  shadow-sm border border-gray-200"
              >
                <div className="flex justify-end mt-3 mx-3">
                  <span className="text-gray-200 bg-gray-600 flex items-center space-x-1 px-3 py-1 rounded-full text-sm">
                    <RiCopperCoinFill className="text-yellow-400" />
                    {course.points}
                  </span>
                </div>
                <CardHeader>
                  <div className="pb-5">
                    <img
                      src={course.image}
                      className="rounded-2xl"
                      alt={course.title}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <img
                      src={course.icon}
                      alt={course.title}
                      className="w-5 h-5"
                    />
                    <h1 className="text-2xl">{course.title}</h1>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {confirmedCourses.includes(course.title) && (
                    <div className="flex items-center justify-between gap-2">
                      <Progress value={course.progress} />
                      <span className="text-gray-600">{course.progress}%</span>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-[#f0f6ff] text-blue-600 hover:bg-gray-100 border border-blue-600">
                        View Details{" "}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
                      <ScrollArea className="flex max-h-full flex-col">
                        <DialogHeader className="contents space-y-0 text-left">
                          <DialogTitle className="px-6 pt-6">
                            Frequently Asked Questions (FAQ)
                          </DialogTitle>
                          <DialogDescription asChild>
                            <div className="p-6">
                              <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
                                <div className="space-y-1">
                                  <p>
                                    <strong>Account Management</strong>
                                  </p>
                                  <p>
                                    Navigate to the registration page, provide
                                    required information, and verify your email
                                    address. You can sign up using your email or
                                    through social media platforms.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Password Reset Process</strong>
                                  </p>
                                  <p>
                                    Users can reset their password through the
                                    account settings page. Click &quot;Forgot
                                    Password&quot; and follow the email
                                    verification steps to regain account access
                                    quickly and securely.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Service Pricing Tiers</strong>
                                  </p>
                                  <p>
                                    We offer three primary subscription levels
                                    designed to meet diverse user needs: Basic
                                    (free with limited features), Professional
                                    (monthly fee with comprehensive access), and
                                    Enterprise (custom pricing with full
                                    platform capabilities).
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Technical Support Channels</strong>
                                  </p>
                                  <p>
                                    Customer support is accessible through
                                    multiple communication methods including
                                    email support, live chat during business
                                    hours, an integrated support ticket system,
                                    and phone support specifically for
                                    enterprise-level customers.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Data Protection Strategies</strong>
                                  </p>
                                  <p>
                                    Our platform implements rigorous security
                                    measures including 256-bit SSL encryption,
                                    regular comprehensive security audits,
                                    strict data access controls, and compliance
                                    with international privacy protection
                                    standards.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Platform Compatibility</strong>
                                  </p>
                                  <p>
                                    The service supports multiple device and
                                    operating system environments, including web
                                    browsers like Chrome and Firefox, mobile
                                    applications for iOS and Android, and
                                    desktop applications compatible with Windows
                                    and macOS.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Subscription Management</strong>
                                  </p>
                                  <p>
                                    Subscriptions can be cancelled at any time
                                    through account settings, with pro-rated
                                    refunds available within 30 days of payment.
                                    Both monthly and annual billing options are
                                    provided, with special discounts offered for
                                    annual commitments.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Payment Method Options</strong>
                                  </p>
                                  <p>
                                    We accept a wide range of payment methods
                                    including major credit cards such as Visa,
                                    MasterCard, and American Express, digital
                                    payment platforms like PayPal, and direct
                                    bank transfers. Regional payment options may
                                    also be available depending on user
                                    location.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Customer Support</strong>
                                  </p>
                                  <p>
                                    Our dedicated customer support team is
                                    available 24/7, providing quick and
                                    efficient assistance to address any
                                    inquiries or issues you may have.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Privacy Policy</strong>
                                  </p>
                                  <p>
                                    Our privacy policy outlines how we collect,
                                    use, and protect your personal data,
                                    ensuring your privacy is protected at all
                                    times.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="px-6 pb-6 sm:justify-start">
                          <DialogClose asChild>
                            <Button type="button" variant="outline">
                              Cancel
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button type="button">Okay</Button>
                          </DialogClose>
                        </DialogFooter>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <div className="relative">
                    {showConfetti && (
                      <div
                        className="fixed inset-0 z-[9999] pointer-events-none"
                        style={{ top: 0, left: 0 }}
                      >
                        <Confetti
                          width={window.innerWidth}
                          height={window.innerHeight}
                        />
                      </div>
                    )}
                    <Dialog
                      onOpenChange={(isOpen) => {
                        if (!isOpen) setInputValue("");
                        setIsConfirmed(false);
                      }}
                    >
                      <DialogTrigger asChild>
                        {!confirmedCourses.includes(course.title) && (
                          <Button className="bg-[#116752] text-white  rounded-full hover:bg-[#116752] hover:text-white">
                            Buy Now
                          </Button>
                        )}
                      </DialogTrigger>
                      <DialogContent>
                        {isConfirmed ? (
                          <motion.div
                            initial={{ opacity: 0 }} // Start from invisible
                            animate={{ opacity: 1 }} // Fade in to visible
                            exit={{ opacity: 0 }} // Fade out when leaving
                            transition={{ duration: 1 }} // Fade duration
                            className="flex flex-col items-center gap-4"
                          >
                            <div className="flex flex-col items-center gap-4">
                              <DialogHeader>
                                <DialogTitle className="text-center text-green-500">
                                  Congratulations! <span>🎉</span>
                                </DialogTitle>
                              </DialogHeader>
                              <p className="text-center">
                                Your course "{course.title}" has been
                                successfully confirmed.
                              </p>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" className="bg-gray-800">
                                    Close
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </div>
                          </motion.div>
                        ) : (
                          <>
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
                                aria-hidden="true"
                              >
                                <CircleAlert
                                  className="opacity-80"
                                  size={16}
                                  strokeWidth={2}
                                />
                              </div>
                              <DialogHeader>
                                <DialogTitle className="sm:text-center">
                                  Final confirmation
                                </DialogTitle>
                                <DialogDescription className="sm:text-center">
                                  This action cannot be undone. To confirm,
                                  please enter the course name{" "}
                                  <span className="text-foreground">
                                    {course.title}
                                  </span>
                                  .
                                </DialogDescription>
                              </DialogHeader>
                            </div>

                            <form className="space-y-5">
                              <div className="space-y-2">
                                <Label htmlFor="project-name">
                                  Course name
                                </Label>
                                <Input
                                  id={`course-name-${course.id}`}
                                  type="text"
                                  placeholder={`Type ${course.title} to confirm`}
                                  value={inputValue}
                                  onChange={(e) =>
                                    setInputValue(e.target.value)
                                  }
                                />
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                  >
                                    Cancel
                                  </Button>
                                </DialogClose>
                                <Button
                                  type="button"
                                  className="flex-1"
                                  disabled={inputValue !== course.title}
                                  onClick={() => {
                                    handleConfirms(course.title);
                                    handleConfirm();
                                  }}
                                >
                                  Confirm
                                </Button>
                              </DialogFooter>
                            </form>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default StudentCoursePage;
