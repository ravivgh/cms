import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";
import { BiSolidFilePdf } from "react-icons/bi";
import { AiFillFileWord } from "react-icons/ai";
import wordLogo from "@/assets/word.webp";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { RiCopperCoinFill } from "react-icons/ri";
import { HiDownload } from "react-icons/hi";
import { IoVideocam } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import dot from "@/assets/dots.png";
import quizCard from "@/assets/le.jpg";
import banner from "@/assets/add.png";
import { Input } from "@/components/ui/input";
import { TriangleAlert, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import Check from "@mui/icons-material/Check";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoVideocamOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Bell, ChevronDown, LifeBuoy, Link2, ShieldCheck } from "lucide-react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaCode } from "react-icons/fa6";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { python } from "@codemirror/lang-python";
import CodeMirror from "@uiw/react-codemirror";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#e2e8f098",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "white",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#e2e8f098",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: ownerState.active ? "blue" : "orange",
  display: "flex",
  height: 22,
  alignItems: "center",
  "& .QontoStepIcon-completedIcon": {
    color: "white",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const steps = ["Course Details", "Course Manage & Reward"];

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = useState(0);
  const [videos, setVideos] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [dropdownItems, setDropdownItems] = useState([50, 100]);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState("");
  const [apiClasses, setApiClasses] = useState([]);
  const [apiSections, setApiSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({
    courseTitle: '',
    courseDescription: '',
    courseCategory: '',
    courseLevel: '',
    classes: '',
    sections: '',
    rewardPoints: ''
  });
  const navigate = useNavigate();

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {
      courseTitle: !courseTitle ? 'Course title is required' : '',
      courseDescription: !courseDescription ? 'Course description is required' : '',
      courseCategory: !courseCategory ? 'Category is required' : '',
      courseLevel: !courseLevel ? 'Level is required' : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const validateStep2 = () => {
    const newErrors = {
      ...errors,
      classes: selectedClasses.length === 0 ? 'At least one class must be selected' : '',
      sections: selectedSections.length === 0 ? 'At least one section must be selected' : '',
      rewardPoints: !selectedPoint ? 'Reward points must be selected' : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  // Fetch classes and sections from API
  useEffect(() => {
    const fetchClassesAndSections = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5472/services/getclassarray", {
          method: "POST"
        });
        const data = await response.json();
        
        if (data && data.length > 0) {
          const classes = data.map(item => item.Class);
          setApiClasses(classes);
          
          const allSections = data.flatMap(item => 
            item.Sections.map(section => section.Section)
          );
          const uniqueSections = [...new Set(allSections)];
          setApiSections(uniqueSections);
        }
      } catch (error) {
        console.error("Error fetching classes and sections:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassesAndSections();
  }, []);

  const allClasses = [...new Set([...apiClasses])];
  const allSections = [...new Set([...apiSections])];

  const handleAddItem = () => {
    const number = parseInt(inputValue, 10);
    if (!isNaN(number) && number > 0 && !dropdownItems.includes(number)) {
      setDropdownItems((prevItems) => [...prevItems, number].sort((a, b) => a - b));
      setInputValue("");
      setShowInput(false);
      setErrors({...errors, rewardPoints: ''});
    } else {
      setErrors({...errors, rewardPoints: 'Please enter a valid positive number'});
    }
  };

  const handleSelectItem = (item) => {
    setSelectedPoint(item);
    setErrors({...errors, rewardPoints: ''});
  };

  const toggleClass = (cls) => {
    setSelectedClasses((prev) => {
      const newClasses = prev.includes(cls) 
        ? prev.filter((c) => c !== cls) 
        : [...prev, cls];
      setErrors({...errors, classes: newClasses.length === 0 ? 'At least one class must be selected' : ''});
      return newClasses;
    });
  };

  const toggleSection = (section) => {
    setSelectedSections((prev) => {
      const newSections = prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section];
      setErrors({...errors, sections: newSections.length === 0 ? 'At least one section must be selected' : ''});
      return newSections;
    });
  };

  const formatFileVideoSize = (size) => {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / 1048576).toFixed(2)} MB`;
  };

  const handleFileVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newVideo = {
        name: file.name,
        size: file.size,
        progress: 0,
        preview: URL.createObjectURL(file),
      };

      setVideos((prevVideos) => [...prevVideos, newVideo]);

      const interval = setInterval(() => {
        setVideos((prevVideos) =>
          prevVideos.map((video) =>
            video.name === newVideo.name
              ? {
                  ...video,
                  progress: Math.min(video.progress + 10, 100),
                }
              : video
          )
        );
        if (newVideo.progress === 100) clearInterval(interval);
      }, 500);
    }
  };

  const handleRemoveVideoFile = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateStep1()) return;
    if (activeStep === 1 && !validateStep2()) return;
    
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const [files, setFiles] = useState([]);
  const formatFileSize = (size) => {
    if (size < 1024) return `${size} bytes`;
    else if (size >= 1024 && size < 1048576)
      return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / 1048576).toFixed(2)} MB`;
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      file,
      name: file.name,
      progress: 0,
      size: file.size,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);

    uploadedFiles.forEach((file, index) => {
      const fileIndex = files.length + index;
      const interval = setInterval(() => {
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];
          const currentFile = updatedFiles[fileIndex];
          if (currentFile.progress < 100) {
            currentFile.progress += 2;
          } else {
            clearInterval(interval);
          }
          return updatedFiles;
        });
      }, 100);
    });
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const [textareaValue, setTextareaValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const termsAndConditions = `
  1. You agree to use the service responsibly.
  2. Your data will remain confidential and secure.
  3. Unauthorized usage is strictly prohibited.
  4. We reserve the right to update terms at any time.
  5. Contact us for clarifications regarding the terms.`;

  const handleTypewriting = () => {
    setIsTyping(true);
    setTextareaValue("");
    let index = 0;

    const typingInterval = setInterval(() => {
      setTextareaValue((prev) => prev + termsAndConditions[index]);
      index++;
      if (index === termsAndConditions.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 50);
  };

  useEffect(() => {
    if (activeStep === 1) {
      handleTypewriting();
    }
  }, [activeStep]);

  const [activeItem, setActiveItem] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoList, setVideoList] = useState([]);

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddVideo = () => {
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      setVideoList((prevList) => [...prevList, videoId]);
      setVideoUrl("");
    } else {
      alert("Invalid YouTube URL");
    }
  };

  const handleRemoveVideo = (index) => {
    setVideoList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const handleSubmitCourse = async () => {
    if (!validateStep2()) return;
    
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      
      // Add basic course info
      formData.append('crsid', courseTitle);
      formData.append('description', courseDescription);
      formData.append('category', courseCategory);
      formData.append('level', courseLevel);
      
      // Add selected classes and sections
      formData.append('Class', selectedClasses.join(','));
      formData.append('Section', selectedSections.join(','));
      
      // Add reward points
      formData.append('pointsreq', selectedPoint);
      
      
      files.forEach((file) => {
        formData.append('courseDocument', file.file);
      });
      
      // Add YouTube links (filter out empty ones)
      videoList.forEach((videoId) => {
        formData.append('youtube_link', `https://www.youtube.com/watch?v=${videoId}`);
      });

      const response = await fetch("http://localhost:5472/services/upload-course-document", {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload course');
      }

      setSubmitMessage({ type: 'success', text: 'Course uploaded successfully!' });
      
      // Reset form
      setCourseTitle('');
      setCourseDescription('');
      setCourseCategory('');
      setCourseLevel('');
      setSelectedClasses([]);
      setSelectedSections([]);
      setSelectedPoint('');
      setFiles([]);
      setVideoList([]);
      setActiveStep(0);
      navigate("/course")
      
    } catch (error) {
      console.error('Error uploading course:', error);
      setSubmitMessage({ type: 'error', text: error.message || 'Error uploading course' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const items = [
    {
      id: "1",
      icon: IoDocumentTextOutline,
      title: "Pdf and Docx",
      sub: "Choose your pdf and word file to upload here ",
      content: (
        <>
          <div className="bg-[#fcfcfc] py-5 px-5 rounded-2xl  w-full flex items-center justify-around flex-wrap">
            <div className="">
              <div
                className="bg-[#efefef73] py-14 px-10 rounded-sm border-2 border-dashed border-[#ee628a] flex items-center flex-col justify-center w-full sm:w-96"
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
              >
                <div className="flex items-center justify-center pb-5 "></div>
                <Input
                  id="excelFile"
                  type="file"
                  accept=".pdf, .docx"
                  className="bg-[#116752] text-gray-400 rounded-full cursor-pointer"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="excelFile"
                  className="custom-file-upload text-gray-400 flex items-center flex-col cursor-pointer"
                >
                  <span>
                    <IoCloudUploadOutline className="cursor-pointer text-gray-800" />
                  </span>
                  <span className="text-gray-800 cursor-pointer">
                    {" "}
                    Browse File
                  </span>
                </label>

                <p className="text-gray-500 text-[12px]">
                  Drag and drop files here
                </p>
              </div>
              <div className="pt-3">
                <p className="text-sm text-gray-500 ">
                  Supported formats: PDF, DOCX{" "}
                </p>
              </div>
            </div>
            <div className="w-96">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  className="file-info bg-[#f3f5f7] py-1 px-4 my-3 rounded-sm flex flex-col border border-gray-200"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    key={index}
                    className="file-info bg-[#f3f5f7] py-1 px-4 my-3 rounded-sm flex flex-col"
                  >
                    <div className="flex items-center">
                      {file.name.toLowerCase().endsWith(".pdf") && (
                        <>
                          <BiSolidFilePdf className="text-red-600 w-8 h-8" />
                        </>
                      )}
                      {(file.name.toLowerCase().endsWith(".doc") ||
                        file.name.toLowerCase().endsWith(".docx")) && (
                        <img src={wordLogo} alt="" className="w-6 h-6" />
                      )}
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col ">
                          <p className="text-gray-800 truncate ml-3">
                            {file.name.replace(/\.[^/.]+$/, "")}
                          </p>
                          <div className="flex items-center">
                            <span className="text-gray-500 text-[10px] pl-3">
                              {file.name.toLowerCase().endsWith(".pdf")
                                ? "Pdf"
                                : file.name.toLowerCase().endsWith(".doc") ||
                                  file.name.toLowerCase().endsWith(".docx")
                                ? "Docx"
                                : "Unknown"}
                            </span>
                            <span className="text-gray-400 text-[10px] pl-3">
                              {formatFileSize(file.size)}
                            </span>
                          </div>
                        </div>
                        <IoIosClose
                          className="text-gray-500 w-6 h-6 cursor-pointer"
                          onClick={() => handleRemoveFile(index)}
                        />
                      </div>
                    </div>
                    {file.progress < 100 ? (
                      <>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                          <motion.div
                            className={`h-2.5 rounded-full ${
                              file.name.toLowerCase().endsWith(".pdf")
                                ? "bg-red-500"
                                : file.name.toLowerCase().endsWith(".doc") ||
                                  file.name.toLowerCase().endsWith(".docx")
                                ? "bg-blue-500"
                                : "bg-green-500"
                            }`}
                            initial={{ width: "0%" }}
                            animate={{ width: `${file.progress}%` }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                          ></motion.div>
                        </div>

                        <div className="text-right text-gray-500 mt-1">
                          {file.progress}%
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between mt-1">
                        <Button
                          href={file.preview}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 "
                          style={{
                            textTransform: "none",
                            color: "blue",
                          }}
                        >
                          View
                        </Button>

                        <Button
                          href={file.preview}
                          download={file.name}
                          style={{
                            textTransform: "none",
                            backgroundColor: "#0056d2",
                            color: "white",
                            borderRadius: "100px",
                            paddingLeft: "15px",
                            paddingRight: "15px",
                          }}
                          className=" "
                        >
                          <span className="flex items-center gap-1">
                            {" "}
                            Download <HiDownload />
                          </span>
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      ),
    },
    {
      id: "2",
      icon: AiOutlineYoutube,
      title: "Link Youtube Video",
      sub: "Add your youtube video link here",
      content: (
        <>
          <div
            style={{ padding: "20px", textAlign: "center" }}
            className="flex items-center justify-around flex-wrap"
          >
            <Card className="w-96">
              <CardHeader>
                <h2 className="text-black">Upload YouTube Videos</h2>
                <CardDescription>
                  Add your YouTube video links here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  placeholder="Enter YouTube URL"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="border border-gray-300 rounded-md text-black"
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={handleAddVideo}
                  style={{
                    padding: "8px 16px",
                    textTransform: "none",
                    backgroundColor: "#0056d2",
                    color: "white",
                    borderRadius: "100px",
                  }}
                >
                  Add Video
                </Button>
              </CardFooter>
            </Card>

            <div style={{ marginTop: "20px" }}>
              <h3 className="text-gray-500">Video Previews</h3>
              {videoList.length === 0 ? (
                <p className="text-gray-700">No videos added yet</p>
              ) : (
                <ScrollArea className="max-h-[400px] border border-gray-300 rounded-lg p-4 overflow-y-auto">
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
                  >
                    {videoList.map((videoId, index) => (
                      <motion.div
                        key={index}
                        style={{
                          position: "relative",
                          display: "inline-block",
                          marginBottom: "20px",
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                      >
                        <iframe
                          width="300"
                          height="169"
                          className=" w-full  "
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`YouTube video ${index + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ borderRadius: "8px" }}
                        ></iframe>
                        <Button
                          onClick={() => handleRemoveVideo(index)}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            cursor: "pointer",
                            color: "red",
                            fontSize: "20px",
                          }}
                          title="Remove Video"
                        />
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="bg-slate-100 p-5 rounded-md">
        <div
          className="  w-full h-44 relative rounded-md  bg-cover bg-center shadow-md "
          style={{ backgroundImage: `url(${quizCard})` }}
        >
          <div className="absolute inset-0 bg-[#002a5c] opacity-70 rounded-md"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            {" "}
            <Stack sx={{ width: "100%" }} spacing={4}>
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<QontoConnector />}
              >
                {steps.map((label, index) => (
                  <Step key={label} completed={activeStep > index}>
                    <StepLabel StepIconComponent={QontoStepIcon}>
                      <div className="text-white">{label}</div>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
          </div>
        </div>
        {activeStep === 0 && (
          <>
            <div className="pt-10 px-5">
              <h1 className="text-gray-900 font-medium text-xl">
                Create New Course
              </h1>
              <p className="text-gray-500 text-sm">
                Decide on the timeframe covered in the course. Whether its a
                specific historical period, from the topic you've entered
              </p>
            </div>
            {isVisible && (
              <div className="relative rounded-lg border border-amber-500/50 px-4 py-5 text-amber-600 bg-[#ffa72d25] my-5">
                <button
                  className="absolute top-2 right-2 text-amber-600 hover:text-amber-800"
                  onClick={() => setIsVisible(false)}
                  aria-label="Close alert"
                >
                  <X size={16} strokeWidth={2} aria-hidden="true" />
                </button>
                <p className="text-sm">
                  <TriangleAlert
                    className="-mt-0.5 me-3 inline-flex opacity-60"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  Here's where you add course content like course details
                  ,choice of classes and sections, and course materials.
                </p>
              </div>
            )}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-300 my-5 space-y-4 ">
              <div className="text-blue-900 ">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  type="title"
                  id="title"
                  placeholder="Ex. React Scratch Course"
                  className={`bg-[#e2e8f054] p-5 ${errors.courseTitle ? 'border-red-500' : ''}`}
                  value={courseTitle}
                  onChange={(e) => {
                    setCourseTitle(e.target.value);
                    setErrors({...errors, courseTitle: ''});
                  }}
                />
                {errors.courseTitle && (
                  <p className="text-red-500 text-sm mt-1">{errors.courseTitle}</p>
                )}
              </div>

              <div className="text-gray-700">
                <Label htmlFor="description">Course Description *</Label>
                <Textarea
                  placeholder="Type your message here."
                  className={`bg-[#e2e8f054] ${errors.courseDescription ? 'border-red-500' : ''}`}
                  value={courseDescription}
                  onChange={(e) => {
                    setCourseDescription(e.target.value);
                    setErrors({...errors, courseDescription: ''});
                  }}
                />
                {errors.courseDescription && (
                  <p className="text-red-500 text-sm mt-1">{errors.courseDescription}</p>
                )}
              </div>
              <div className="flex justify-between space-x-4">
                <div className="text-gray-700 w-1/2">
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    type="text"
                    id="category"
                    placeholder="Ex. Frontend"
                    className={`bg-[#e2e8f054] w-full ${errors.courseCategory ? 'border-red-500' : ''}`}
                    value={courseCategory}
                    onChange={(e) => {
                      setCourseCategory(e.target.value);
                      setErrors({...errors, courseCategory: ''});
                    }}
                  />
                  {errors.courseCategory && (
                    <p className="text-red-500 text-sm mt-1">{errors.courseCategory}</p>
                  )}
                </div>
                <div className="text-gray-700 w-1/2">
                  <Label htmlFor="level">Level *</Label>
                  <Input
                    type="text"
                    id="level"
                    placeholder="Ex. Beginner"
                    className={`bg-[#e2e8f054] w-full ${errors.courseLevel ? 'border-red-500' : ''}`}
                    value={courseLevel}
                    onChange={(e) => {
                      setCourseLevel(e.target.value);
                      setErrors({...errors, courseLevel: ''});
                    }}
                  />
                  {errors.courseLevel && (
                    <p className="text-red-500 text-sm mt-1">{errors.courseLevel}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="text-black   ">
              <div className="space-y-4">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  value={activeItem}
                  onValueChange={setActiveItem}
                >
                  {items.map((item, index) => (
                    <AccordionItem
                      value={item.id}
                      key={item.id}
                      className="border-b border-gray-300"
                    >
                      <AccordionPrimitive.Header className="flex">
                        <AccordionPrimitive.Trigger
                          className={`flex w-full items-center justify-between px-4 py-3 text-left text-[15px] font-semibold leading-6 ${
                            activeItem === item.id ||
                            (index === 0 && activeItem === null)
                              ? "bg-black text-white rounded-sm"
                              : "bg-gray-100 text-black"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border"
                              aria-hidden="true"
                            >
                              <item.icon
                                size={16}
                                strokeWidth={2}
                                className={` ${
                                  activeItem === item.id ||
                                  (index === 0 && activeItem === null)
                                    ? "text-g"
                                    : "text-gray-600"
                                }`}
                              />
                            </span>
                            <span className="flex flex-col space-y-1">
                              <span>{item.title}</span>
                              {item.sub && (
                                <span className="text-sm font-normal">
                                  {item.sub}
                                </span>
                              )}
                            </span>
                          </span>
                          <ChevronDown
                            size={16}
                            strokeWidth={2}
                            className="shrink-0 opacity-60 transition-transform duration-200"
                            aria-hidden="true"
                          />
                        </AccordionPrimitive.Trigger>
                      </AccordionPrimitive.Header>
                      <AccordionContent
                        className={`${
                          activeItem === item.id ? "bg-[#ffffff]" : "hidden"
                        } px-4 py-3 text-white`}
                      >
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </>
        )}
        {activeStep === 1 && (
          <>
            <h1 className="text-gray-600 font-medium text-xl py-5">
              Course Manage
            </h1>
            <div className="mb-14 flex items-center justify-around flex-wrap gap-10 mt-10">
              {" "}
              <div className="relative flex items-center space-x-4 ">
                <div className="absolute -top-6 -left-4">
                  <img
                    src={dot}
                    alt="Decorative dots"
                    className="w-32 opacity-60"
                  />
                </div>

                <div className="relative z-10">
                  <Card>
                    <CardHeader className="w-full sm:w-[450px] ">
                      <CardTitle className="flex items-center gap-2">
                        <span>
                          <SiGoogleclassroom className="text-blue-800" />
                        </span>
                        Classes & Section *
                      </CardTitle>
                      <CardDescription>
                        Your need according select{" "}
                      </CardDescription>
                      {errors.classes && (
                        <p className="text-red-500 text-sm mt-1">{errors.classes}</p>
                      )}
                      {errors.sections && (
                        <p className="text-red-500 text-sm mt-1">{errors.sections}</p>
                      )}
                    </CardHeader>
                    <CardContent className="flex relative">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Select Classes
                        </label>
                        <div className="mt-2 bg-[#ebebebe9] flex items-center flex-col w-40 py-3 rounded-xl ">
                          {allClasses.map((cls) => (
                            <button
                              key={cls}
                              type="button"
                              onClick={() => toggleClass(cls)}
                              className={`px-3 py-2 my-2 rounded-full border ${
                                selectedClasses.includes(cls)
                                  ? "bg-[#1d68bd] text-gray-200 border-[2px] border-gray-200"
                                  : "bg-[#ececec] text-gray-700 border-1 border-gray-300"
                              }`}
                            >
                              {cls}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        {selectedClasses.length > 0 && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Select Sections
                            </label>
                            <div className="">
                              {allSections.map((section, index) => (
                                <motion.div
                                  key={section}
                                  className="flex items-center"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    duration: 0.6,
                                    delay: index * 0.2,
                                  }}
                                >
                                  <div className="flex items-center">
                                    <div className="w-10 h-[2px] bg-gray-300 mx-4"></div>
                                    <button
                                      type="button"
                                      onClick={() => toggleSection(section)}
                                      className={`px-4 py-2 border flex items-center gap-4 bg-white p-3 rounded-full shadow-lg justify-center my-1 ${
                                        selectedSections.includes(section)
                                          ? "bg-[#1d68bd09] text-gray-700 border-2 border-[#1d68bd]"
                                          : "bg-gray-100 text-gray-700"
                                      }`}
                                    >
                                      {section}
                                      {selectedSections.includes(section) && (
                                        <motion.div
                                          initial={{ scale: 0, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          transition={{ duration: 0.3 }}
                                          className="w-5 h-5 bg-[#1d68bd] rounded-full flex items-center justify-center text-white"
                                        >
                                          ✔
                                        </motion.div>
                                      )}
                                    </button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter>
                      {(selectedClasses.length > 0 ||
                        selectedSections.length > 0) && (
                        <div>
                          <h4 className="text-xs font-medium text-[#004fa9] bg-[#cbe3fc] w-fit px-2 py-1 rounded-full">
                            Selected
                          </h4>
                          <p className="mt-1 text-[#004fa9]">
                            Classes :{" "}
                            <strong>{selectedClasses.sort().join(", ")}</strong>
                          </p>
                          <p className="mt-1 text-[#004fa9]">
                            Sections :{" "}
                            <strong>
                              {selectedSections.sort().join(", ")}
                            </strong>
                          </p>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              </div>
              <div className="relative flex items-center space-x-4 ">
                <div className="absolute -bottom-6 -left-4">
                  <img
                    src={dot}
                    alt="Decorative dots"
                    className="w-32 opacity-60"
                  />
                </div>

                <div className="relative z-10">
                  <Card>
                    <CardHeader>
                      <div className="relative max-w-[450px]">
                        <img src={banner} alt="" className="w-full" />
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
                          <h1 className="text-white text-xl">Reword *</h1>
                          <p className="text-gray-400 flex items-center gap-2 text-sm">
                            Add the point{" "}
                            <RiCopperCoinFill className="text-yellow-500" />
                          </p>
                          {errors.rewardPoints && (
                            <p className="text-red-500 text-sm mt-1">{errors.rewardPoints}</p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardDescription className="pt-3 pb-1  text-center">
                      Select a Point
                    </CardDescription>
                    <CardContent>
                      <div className="flex flex-col items-center ">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              style={{
                                backgroundColor: "#cbe1f2",
                                color: "black",
                                borderRadius: "10px",
                                textTransform: "none",
                                paddingLeft: "50px",
                                paddingRight: "50px",
                              }}
                            >
                              {selectedPoint ? (
                                <span className="flex items-center">
                                  Selected Point: {selectedPoint}{" "}
                                  <RiCopperCoinFill className="text-yellow-500 ml-1" />
                                </span>
                              ) : (
                                "Select a point"
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56 rounded-xl ">
                            {dropdownItems.map((item, index) => (
                              <DropdownMenuItem
                                key={index}
                                className="flex items-center"
                                onClick={() => handleSelectItem(item)}
                              >
                                <RiCopperCoinFill className="text-yellow-500 mr-2" />
                                {item}
                              </DropdownMenuItem>
                            ))}
                            <div className="p-2">
                              {!showInput ? (
                                <Button
                                  variant="ghost"
                                  onClick={() => setShowInput(true)}
                                  className=" flex items-center justify-center  "
                                  style={{
                                    backgroundColor: "#0056d2",
                                    color: "white",
                                    borderRadius: "100px",
                                    textTransform: "none",
                                  }}
                                >
                                  <Plus className="mr-2 w-4 h-4" /> Add New
                                </Button>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Input
                                    placeholder="Enter point"
                                    value={inputValue}
                                    onChange={(e) =>
                                      setInputValue(e.target.value)
                                    }
                                    className="mb-2"
                                    type="number"
                                    min="1"
                                  />
                                  <Button
                                    onClick={handleAddItem}
                                    className="w-full "
                                    style={{
                                      backgroundColor: "#0056d2",
                                      color: "white",
                                      borderRadius: "100px",
                                      textTransform: "none",
                                    }}
                                  >
                                    Add
                                  </Button>
                                </motion.div>
                              )}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex flex-col items-center space-y-4 mt-4 ">
                        <p>Terms & Conditions</p>

                        <textarea
                          value={textareaValue}
                          onChange={(e) => setTextareaValue(e.target.value)}
                          rows={8}
                          className="w-full sm:w-96 p-4 border border-gray-100 rounded-lg shadow-md resize-none focus:outline-none bg-slate-200 "
                          placeholder="Terms and Conditions will appear here..."
                        />
                      </div>
                    </CardContent>
                    <CardFooter></CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}

        {submitMessage.text && (
          <div className={`mt-4 p-3 rounded ${
            submitMessage.type === 'success' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {submitMessage.text}
          </div>
        )}

        <div className="flex justify-between mt-5">
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              style={{
                textTransform: "none",
              }}
              disabled={activeStep === 0}
              onClick={handleBack}
              className=""
            >
              Back
            </Button>
            <Button
              style={{
                backgroundColor: "#0056d2",
                color: "white",
                borderRadius: "100px",
                textTransform: "none",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
              className="bg-[#0056d2] text-white normal-case gap-2"
              onClick={activeStep === steps.length - 1 ? handleSubmitCourse : handleNext}
              disabled={activeStep === steps.length - 1 ? isSubmitting : false}
            >
              {activeStep === steps.length - 1 ? (
                isSubmitting ? 'Submitting...' : 'Finish'
              ) : (
                <>
                  Continue <FaArrowRightLong />
                </>
              )}
            </Button>
          </Stack>
        </div>
      </div>
    </>
  );
}