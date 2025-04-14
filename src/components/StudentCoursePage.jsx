import React, { useState, useEffect, useCallback } from "react";
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
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [enrollingCourseTitle, setEnrollingCourseTitle] = useState("");
  const [studentRewards, setStudentRewards] = useState(0);
  const [enrollError, setEnrollError] = useState("");
  const [enrollingCoursePoints, setEnrollingCoursePoints] = useState(0);
  const [isEnrolling, setIsEnrolling] = useState(false); // To disable button during enrollment

  const fetchStudentRewards = useCallback(async (studentId) => {
    try {
      const rewardsResponse = await fetch("http://localhost:5472/services/getstudentrewards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sid: studentId }),
      });
      if (rewardsResponse.ok) {
        const rewardsData = await rewardsResponse.json();
        return rewardsData.values?.total_rewards || 0;
      } else {
        console.error("Error fetching student rewards");
        return 0;
      }
    } catch (error) {
      console.error("Error fetching student rewards:", error);
      return 0;
    }
  }, []);

  const updateStudentRewards = useCallback(async (studentId, pointsUsed) => {
    console.log("updateStudentRewards called with:", studentId, pointsUsed);
    try {
      const response = await fetch("http://localhost:5472/services/updatereward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sid: studentId, course_points: pointsUsed }), // Subtract points
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating rewards:", errorData);
        // Optionally handle the error in the UI, e.g., display a message
      } else {
        const updatedRewardsData = await response.json();
        setStudentRewards(updatedRewardsData.values?.total_rewards || 0);
        const rewards = await fetchStudentRewards(studentId);
        setStudentRewards(rewards);
        console.log("Reward points updated successfully:", updatedRewardsData);
        
      }
    } catch (error) {
      console.error("Error updating rewards:", error);
      // Optionally handle the error in the UI
    }
  }, []);

  const getYouTubeThumbnail = useCallback(async (youtubeUrl) => {
    try {
      const videoId = extractVideoId(youtubeUrl);
      if (!videoId) {
        throw new Error("Invalid YouTube URL");
      }
      const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      const response = await fetch(thumbnailUrl);
      if (response.ok) {
        return thumbnailUrl;
      } else {
        const fallbackThumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        const fallbackResponse = await fetch(fallbackThumbnailUrl);
        if (fallbackResponse.ok) {
          return fallbackThumbnailUrl;
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error("Error fetching YouTube thumbnail:", error);
      return null;
    }
  }, []);

  const fetchCoursesAndRewards = useCallback(async () => {
    const cid = localStorage.getItem("cid");
    const sid = localStorage.getItem("sid");
    const studentId = localStorage.getItem("student_id");
    try {
      const coursesResponse = await fetch(
        "http://localhost:5472/services/get-all-course-forstudent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Class: cid, section: sid }),
        }
      );
      if (!coursesResponse.ok) {
        throw new Error(`HTTP error! status: ${coursesResponse.status}`);
      }
      const coursesData = await coursesResponse.json();

      const coursesWithThumbnails = await Promise.all(
        coursesData.map(async (course) => {
          if (course.youtube_link) {
            const thumbnail = await getYouTubeThumbnail(course.youtube_link);
            return { ...course, thumbnail };
          }
          return course;
        })
      );
      setCourses(coursesWithThumbnails);

      if (studentId) {
        const rewards = await fetchStudentRewards(studentId);
        setStudentRewards(rewards);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [fetchStudentRewards, getYouTubeThumbnail]);

  useEffect(() => {
    fetchCoursesAndRewards();

    const storedCourses = JSON.parse(localStorage.getItem("confirmedCourses"));
    if (storedCourses) {
      setConfirmedCourses(storedCourses);
    }
  }, [fetchCoursesAndRewards]);

  function extractVideoId(youtubeUrl) {
    const regExp = /^.*((http:\/\/googleusercontent\.com\/youtube\.com\/2\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = youtubeUrl.match(regExp);
    return match && match[7] && match[7].length === 11 ? match[7] : false;
  }

  const handleEnrollCourse = async (crid, courseTitle, pointsreq) => {
    const student_id = localStorage.getItem("student_id");
    if (!student_id) {
      console.error("Student ID not found in local storage.");
      return;
    }

    const currentRewards = await fetchStudentRewards(student_id);
    if (currentRewards < pointsreq) {
      setEnrollError(`You don't have enough reward point to enroll it  (requires ${pointsreq} points). Attempt Question Bank to earn Reward Points.`);
      return;
    }
    setEnrollError("");

    if (inputValue !== courseTitle) {
      setEnrollError("Course name does not match.");
      return;
    }

    setIsEnrolling(true); // Disable the enroll button
    try {
      const response = await fetch("http://localhost:5472/services/enrollcourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student_id, crid }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error enrolling in course:", errorData);
        alert(`Error enrolling in course: ${errorData}`);
        return;
      }

      const result = await response.text();
      console.log("Enrollment successful:", result);
      setEnrollingCourseTitle(courseTitle);
      setEnrollingCoursePoints(pointsreq);
      handleConfirms(courseTitle);
      handleConfirm(pointsreq); // Pass pointsreq to handleConfirm
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Failed to enroll in course. Please try again.");
    } finally {
      setIsEnrolling(false); // Enable the enroll button
    }
  };

  const handleConfirms = (title) => {
    setConfirmedCourses((prev) => [...prev, title]);
    localStorage.setItem("confirmedCourses", JSON.stringify([...confirmedCourses, title]));
  };

  const handleConfirm = useCallback(async (pointsUsed) => {
    console.log("handleConfirm called with points:", pointsUsed);
    setIsConfirmed(true);
    setShowConfetti(true);
    const studentId = localStorage.getItem("student_id");
    console.log("Student ID from localStorage:", studentId);
    console.log("Enrolling Course Points:", pointsUsed);
    if (studentId && pointsUsed > 0) {
      await updateStudentRewards(studentId, pointsUsed);
    }
    setTimeout(() => {
      setShowConfetti(false);
      setIsConfirmed(false);
      setEnrollingCoursePoints(0);
    }, 3000); // Reduced confetti time
    setInputValue("");
  }, [updateStudentRewards]);

  const uniqueCategories = [...new Set(courses.map((course) => course.category))];
  const limitedCategories = [...uniqueCategories.slice(0, 3), "All"];

  const handleDeleteCourse = useCallback(async (courseId) => {
    try {
      const response = await fetch(
        "http://localhost:5472/services/delete-course-by-id",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedCourses = courses.filter((course) => course._id !== courseId);
      setCourses(updatedCourses);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }, []);

  return (
    <>
      <div className="assistant-about flex items-center justify-around mx-auto ">
        <div
          className=" w-full h-44 relative rounded-md bg-cover bg-center "
          style={{ backgroundImage: `url(${quizCard})` }}
        >
          <div className="absolute inset-0 bg-[#040404] opacity-70 rounded-md"></div>
          <div className="faculty-intro-card bg-[#002a5c] max-w-[1200px] max-h-[450px] mx-auto absolute left-0 right-0 top-10 rounded-br-[80px] overflow-hidden ">
            <div className="flex flex-col md:flex-row items-center justify-between ">
              <div className="text-white p-10 flex items-center justify-center flex-col">
                <div className=" my-4 flex items-center justify-center space-x-2 bg-blue-800 px-5 py-2 rounded-full text-sm">
                  <span className="text-white text-sm">
                    CampusFlow
                    <span className="bg-blue-600 text-white px-1 rounded-sm">
                      PLUS
                    </span>
                  </span>
                  <p className="text-gray-300"> / Course Library</p>
                </div>
                <div className="mb-5">
                  <h1 className=" text-center text-white text-2xl mb-1">
                    Shape Your Future with Every Lesson with Course Library
                  </h1>
                  <div className="border-[1px] border-transparent bg-gradient-to-r from-[#b2ddfc] via-[#85cef7] to-[#d5ebff] border-image animate-gradient bg-[length:200%_200%] mx-32 py-[0.5px]"></div>
                </div>
                <div className="flex items-center justify-center space-x-1">
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
                    Joined by <strong className="font-medium text-foreground">60+</strong> students
                  </p>
                </div>
              </div>

              <div className="w-full flex justify-end ">
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
        <div className="border-[1px] border-transparent bg-gradient-to-r from-[#b2ddfc] via-[#85cef7] to-[#d5ebff] border-image animate-gradient bg-[length:200%_200%] py-[0.5px] w-52 mx-auto"></div>
        <div className=" space-y-4 px-5 mt-10 mb-4">
          <h1 className="text-black text-2xl font-semibold my-3 ">Your Courses</h1>
          <p className="text-black">
            Turn your tech expertise into a rewarding journey with CampusFlow. Shape futures, earn more
          </p>
        </div>
        <hr />
        <div className="filter flex items-center gap-3 flex-wrap cursor-pointer py-2 bg-slate-50 px-5">
          {limitedCategories.map((category) => (
            <span
              key={category}
              className={`text-sm w-fit px-5 py-2 rounded-full flex items-center gap-1 my-3 ${
                selectedCategory === category ? "bg-black text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </span>
          ))}
        </div>
        <hr />
        <div className=" bg-[#f2f5fa8a] mt-5 p-5 flex flex-wrap justify-center gap-5">
          {courses
            .filter(
              (course) =>
                selectedCategory === "All" || course.category === selectedCategory
            )
            .map((course) => (
              <Card
                key={course._id}
                className="w-[350px] rounded-3xl bg-[#e2e8f098] shadow-sm border border-gray-200"
              >
                <div className="flex justify-end mt-3 mx-3">
                  <span className="text-gray-200 bg-gray-600 flex items-center space-x-1 px-3 py-1 rounded-full text-sm">
                    <RiCopperCoinFill className="text-yellow-400" />
                    {course.pointsreq}
                  </span>
                </div>
                <CardHeader>
                  <div className="pb-5">
                    <img
                      src={course.thumbnail || course.image}
                      className="rounded-2xl"
                      alt={course.crsid}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <img
                      src={course.icon}
                      alt={course.crsid}
                      className="w-5 h-5"
                    />
                    <h1 className="text-2xl">{course.crsid}</h1>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {confirmedCourses.includes(course.crsid) && (
                    <div className="flex items-center justify-between gap-2">
                      
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogContent className="flex flex-col gap-0 p-0 sm::max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
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
                                    Navigate to the registration page, provide required information, and verify your email
                                    address. You can sign up using your email or through social media platforms.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Password Reset Process</strong>
                                  </p>
                                  <p>
                                    Users can reset their password through the account settings page. Click &quot;Forgot
                                    Password&quot; and follow the email verification steps to regain account access
                                    quickly and securely.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Service Pricing Tiers</strong>
                                  </p>
                                  <p>
                                    We offer three primary subscription levels designed to meet diverse user needs: Basic
                                    (free with limited features), Professional (monthly fee with comprehensive access), and
                                    Enterprise (custom pricing with full platform capabilities).
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Technical Support Channels</strong>
                                  </p>
                                  <p>
                                    Customer support is accessible through multiple communication methods including
                                    email support, live chat during business hours, an integrated support ticket system,
                                    and phone support specifically for enterprise-level customers.</p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Data Protection Strategies</strong>
                                  </p>
                                  <p>
                                    Our platform implements rigorous security measures including 256-bit SSL encryption,
                                    regular comprehensive security audits, strict data access controls, and compliance
                                    with international privacy protection standards.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Platform Compatibility</strong>
                                  </p>
                                  <p>
                                    The service supports multiple device and operating system environments, including web
                                    browsers like Chrome and Firefox, mobile applications for iOS and Android, and
                                    desktop applications compatible with Windows and macOS.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Subscription Management</strong>
                                  </p>
                                  <p>
                                    Subscriptions can be cancelled at any time through account settings, with pro-rated
                                    refunds available within 30 days of payment. Both monthly and annual billing options are
                                    provided, with special discounts offered for annual commitments.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Payment Method Options</strong>
                                  </p>
                                  <p>
                                    We accept a wide range of payment methods including major credit cards such as Visa,
                                    MasterCard, and American Express, digital payment platforms like PayPal, and direct
                                    bank transfers. Regional payment options may also be available depending on user
                                    location.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Customer Support</strong>
                                  </p>
                                  <p>
                                    Our dedicated customer support team is available 24/7, providing quick and
                                    efficient assistance to address any inquiries or issues you may have.
                                  </p>
                                </div>
                                <div className="space-y-1">
                                  <p>
                                    <strong>Privacy Policy</strong>
                                  </p>
                                  <p>
                                    Our privacy policy outlines how we collect, use, and protect your personal data,
                                    ensuring your privacy is protected at all times.
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
                        <Confetti width={window.innerWidth} height={window.innerHeight} />
                      </div>
                    )}
                    {confirmedCourses.includes(course.crsid) ? (
                      <Button
                        className="bg-[#f0f6ff] text-blue-600 hover:bg-gray-100 border border-blue-600"
                        onClick={() => navigate(`/studentcourse/${course._id}`)}
                      >
                        View Details
                      </Button>
                    ) : (
                      <Dialog
                        onOpenChange={(isOpen) => {
                          if (!isOpen) setInputValue("");
                          setIsConfirmed(false);
                          setEnrollError(""); // Clear error on dialog close
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            className="bg-[#116752] text-white rounded-full hover:bg-[#116752] hover:text-white"
                            disabled={isEnrolling}
                          >
                            {isEnrolling ? "Enrolling..." : "Enroll"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          {isConfirmed ? (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                              className="flex flex-col items-center gap-4"
                            >
                              <div className="flex flex-col items-center gap-4">
                                <DialogHeader>
                                  <DialogTitle className="text-center text-green-500">
                                    Congratulations! <span>🎉</span>
                                  </DialogTitle>
                                </DialogHeader>
                                <p className="text-center">
                                  You have been enrolled in "{enrollingCourseTitle}" successfully.
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
                              {enrollError && (
                                <div className="mb-4 p-3 rounded-md bg-red-100 text-red-600">
                                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: enrollError }}></p>
                                  <p className="text-xs text-gray-600 mt-1">Your current reward points: {studentRewards}</p>
                                </div>
                              )}
                              <div className="flex flex-col items-center gap-2">
                                <div
                                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border"
                                  aria-hidden="true"
                                >
                                  <CircleAlert className="opacity-80" size={16} strokeWidth={2} />
                                </div>
                                <DialogHeader>
                                  <DialogTitle className="sm:text-center">
                                    Final confirmation
                                  </DialogTitle>
                                  <DialogDescription className="sm:text-center">
                                    This action cannot be undone. To confirm, please enter the course name{" "}
                                    <span className="text-foreground">{course.crsid}</span>.
                                    .
                                  </DialogDescription>
                                </DialogHeader>
                              </div>

                              <form className="space-y-5">
                                <div className="space-y-2">
                                  <Label htmlFor={`course-name-${course._id}`}>
                                    Course name
                                  </Label>
                                  <Input
                                    id={`course-name-${course._id}`}
                                    type="text"
                                    placeholder={`Type ${course.crsid} to confirm`}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                  />
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button type="button" variant="outline" className="flex-1">
                                      Cancel
                                    </Button>
                                  </DialogClose>
                                  <Button
                                    type="button"
                                    className="flex-1"
                                    disabled={inputValue !== course.crsid || enrollError !== "" || isEnrolling}
                                    onClick={() => {
                                      handleEnrollCourse(course._id, course.crsid, course.pointsreq);
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
                    )}
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