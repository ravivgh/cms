import React, { useState, useEffect, useCallback, useRef } from "react";
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

export function Editor() {
  const [code, setCode] = useState({
    html: "",
    css: "",
    javascript: "",
    python: "",
  });
  const [selectedLanguage, setSelectedLanguage] = useState("javascript"); // Default language
  const [pythonOutput, setPythonOutput] = useState("");
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const iframeRef = useRef(null);

  // Load Pyodide on mount
  useEffect(() => {
    const loadPyodide = async () => {
      if (!window.loadPyodide) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
        script.onload = async () => {
          await window.loadPyodide();
          setIsPyodideReady(true);
        };
        document.body.appendChild(script);
      } else {
        setIsPyodideReady(true);
      }
    };
    loadPyodide();
  }, []);

  // Language extensions
  const languageExtensions = {
    javascript: javascript({ jsx: true }),
    html: html(),
    css: css(),
    python: python(),
  };

  // Handle code changes
  const onChangeCode = useCallback(
    (value) => {
      setCode((prevCode) => ({
        ...prevCode,
        [selectedLanguage]: value,
      }));
    },
    [selectedLanguage]
  );

  // Update iframe content for HTML, CSS, and JavaScript
  useEffect(() => {
    if (
      selectedLanguage === "html" ||
      selectedLanguage === "css" ||
      selectedLanguage === "javascript"
    ) {
      const iframe = iframeRef.current;
      const document = iframe.contentDocument || iframe.contentWindow.document;
      document.open();
      document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <style>${code.css}</style>
          </head>
          <body>
            ${code.html}
            <script>${code.javascript}<\/script>
          </body>
        </html>
      `);
      document.close();
    }
  }, [code.html, code.css, code.javascript]);

  // Execute Python code
  const executePythonCode = async () => {
    if (!isPyodideReady) {
      setPythonOutput("Pyodide is still loading. Please wait...");
      return;
    }
    if (!code.python.trim()) {
      setPythonOutput("Please write some Python code to execute.");
      return;
    }
    try {
      setPythonOutput("Running...");
      const pyodide = await window.loadPyodide();
      pyodide.runPython(`
        import sys
        from io import StringIO
        
        output_buffer = StringIO()
        sys.stdout = output_buffer
        sys.stderr = output_buffer
      `);
      pyodide.runPython(code.python);
      const output = pyodide.runPython("output_buffer.getvalue()");
      setPythonOutput(output || "No output from Python code");
    } catch (err) {
      setPythonOutput(`Error: ${err.message}`);
    }
  };

  // Handle file selection and read content
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode((prevCode) => ({
          ...prevCode,
          [selectedLanguage]: e.target.result,
        }));
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-4 text-black">
      <h1 className="text-2xl font-semibold mb-4">
        Multi-Language Code Editor
      </h1>

      <div className="flex gap-4 mb-4">
        {/* Language Selection Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="p-2 bg-blue-500 text-white rounded">
              Select Language: {selectedLanguage.toUpperCase()}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border rounded shadow-lg">
            {Object.keys(languageExtensions).map((lang) => (
              <DropdownMenuItem
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {lang.toUpperCase()}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* File Input */}
      <div className="mb-4">
        <input
          type="file"
          accept=".js,.html,.css,.py"
          onChange={handleFileChange}
          className="p-2 border rounded"
        />
      </div>

      {/* Code Editor */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">
          {selectedLanguage.toUpperCase()} Editor
        </h2>
        <CodeMirror
          value={code[selectedLanguage]}
          height="300px"
          theme="dark"
          extensions={[languageExtensions[selectedLanguage]]}
          onChange={onChangeCode}
        />
      </div>

      {/* Output Section */}
      {selectedLanguage === "python" ? (
        <div className="mt-4">
          <button
            onClick={executePythonCode}
            className="p-2 bg-purple-500 text-white rounded"
          >
            Run Python Code
          </button>
          <div className="mt-2 p-4 bg-gray-800 text-white rounded">
            <h2 className="font-semibold">Output:</h2>
            <pre>{pythonOutput}</pre>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Live Output</h2>
          <iframe
            ref={iframeRef}
            title="Live Output"
            className="w-full h-64 border border-gray-300 rounded"
          />
        </div>
      )}
    </div>
  );
}

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

const steps = ["Course Details", "Course Manage & Reword"];

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = useState(0);
  const [videos, setVideos] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);
  const [dropdownItems, setDropdownItems] = useState([50, 100]); // Default items
  const [inputValue, setInputValue] = useState(""); // Input field value
  const [showInput, setShowInput] = useState(false); // Toggle for textbox and button
  const [selectedPoint, setSelectedPoint] = useState("");

  const handleAddItem = () => {
    const number = parseInt(inputValue, 10);
    if (!isNaN(number) && !dropdownItems.includes(number)) {
      setDropdownItems((prevItems) => [...prevItems, number]); // Add new number to dropdown
      setInputValue(""); // Clear input
      setShowInput(false); // Hide input after adding
    }
  };
  const handleSelectItem = (item) => {
    setSelectedPoint(item); // Update selected point
  };
  const classes = ["FY", "SY", "TY"];
  const sections = ["A", "B", "C", "D", "E"];

  const toggleClass = (cls) => {
    setSelectedClasses((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  };

  const toggleSection = (section) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };
  const formatFileVideoSize = (size) => {
    if (size < 1024) return `${size} bytes`;
    else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
    else return `${(size / 1048576).toFixed(2)} MB`;
  };

  const handleFileVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Initialize video object with file details and progress
      const newVideo = {
        name: file.name,
        size: file.size,
        progress: 0,
        preview: URL.createObjectURL(file),
      };

      setVideos((prevVideos) => [...prevVideos, newVideo]);

      // Simulate file upload progress (Replace with your actual upload logic)
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
      progress: 0, // Initialize progress
      size: file.size,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);

    // Start progress for each uploaded file
    uploadedFiles.forEach((file, index) => {
      const fileIndex = files.length + index; // Get the index in the final array
      const interval = setInterval(() => {
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];
          const currentFile = updatedFiles[fileIndex];
          if (currentFile.progress < 100) {
            currentFile.progress += 2; // Increment by 2% every 100ms
          } else {
            clearInterval(interval); // Stop when progress reaches 100%
          }
          return updatedFiles;
        });
      }, 100);
    });
  };
  // Handle file drag-and-drop
  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  // Prevent the default behavior of the drop (opening the file)
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

  // Function to extract YouTube video ID
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
      setVideoUrl(""); // Clear input after adding
    } else {
      alert("Invalid YouTube URL");
    }
  };

  const handleRemoveVideo = (index) => {
    setVideoList((prevList) => prevList.filter((_, i) => i !== index));
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
                    {/* Progress Bar */}

                    {file.progress < 100 ? (
                      <>
                        {/* Progress Bar */}
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
                        {/* View Button */}
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
    {
      id: "3",
      icon: FaCode,
      title: "Code Snippet",
      sub: "Add your code snippet here",
      content: (
        <>
          <Editor />
        </>
      ),
    },
    {
      id: "4",
      icon: IoVideocamOutline,
      title: "Videos ",
      sub: " Add your video here",
      content: (
        <>
          <div className="bg-white py-5 px-5 rounded-sm w-full flex items-center justify-around flex-wrap">
            <div className="">
              <div className="bg-[#f2f7ff] py-14 px-10 rounded-sm border-2 border-dashed border-blue-500 flex items-center flex-col justify-center w-full sm:w-96">
                <div className="flex items-center justify-center pb-5 "></div>
                <Input
                  id="videoFile"
                  type="file"
                  accept="video/mp4, video/webm, video/ogg"
                  className="bg-[#116752] text-gray-400 rounded-full cursor-pointer"
                  onChange={handleFileVideoUpload}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="videoFile"
                  className="custom-file-upload text-gray-400 flex items-center flex-col cursor-pointer"
                >
                  <span>
                    <IoCloudUploadOutline className="cursor-pointer text-gray-700" />
                  </span>
                  <span className="text-gray-600 cursor-pointer">
                    Browse File
                  </span>
                </label>
              </div>
              <div className="pt-3">
                <p className="text-sm text-gray-500">
                  Supported formats: MP4, WebM, OGG
                </p>
              </div>
            </div>
            <div className="w-96">
              {videos.map((video, index) => (
                <motion.div
                  key={index}
                  className="file-info bg-[#f3f5f7] py-5 px-4 my-3 rounded-sm flex flex-col border border-gray-200"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center  w-full">
                    <IoVideocam className="text-gray-700 w-6 h-6" />
                    <div className="flex flex-col">
                      <p className="text-gray-800 truncate ml-3">
                        {video.name.replace(/\.[^/.]+$/, "")}
                      </p>
                      <div className="flex items-center">
                        <span className="text-gray-500 text-[10px] pl-3">
                          {video.name.toLowerCase().endsWith(".mp4")
                            ? "MP4"
                            : video.name.toLowerCase().endsWith(".webm") ||
                              video.name.toLowerCase().endsWith(".ogg")
                            ? "Webm"
                            : "Unknown"}
                        </span>
                        <span className="text-gray-400 text-[10px] pl-3">
                          {formatFileVideoSize(video.size)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-auto">
                      {" "}
                      <IoIosClose
                        className="text-gray-500 w-6 h-6 cursor-pointer"
                        onClick={() => handleRemoveVideoFile(index)}
                      />
                    </div>
                  </div>
                  {/* Progress Bar */}
                  {video.progress < 100 ? (
                    <>
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                        <motion.div
                          className={`h-2.5 rounded-full ${
                            video.name.toLowerCase().endsWith(".mp4")
                              ? "bg-gray-600"
                              : video.name.toLowerCase().endsWith(".webm") ||
                                video.name.toLowerCase().endsWith(".ogg")
                              ? "bg-blue-500"
                              : "bg-green-500"
                          }`}
                          initial={{ width: "0%" }}
                          animate={{ width: `${video.progress}%` }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        ></motion.div>
                      </div>

                      <div className="text-right text-gray-500 mt-1">
                        {video.progress}%
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between mt-1">
                      {/* View Button */}
                      <Button
                        href={video.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                        style={{ textTransform: "none", color: "blue" }}
                      >
                        View
                      </Button>

                      <Button
                        href={video.preview}
                        download={video.name}
                        style={{
                          textTransform: "none",
                          backgroundColor: "#0056d2",
                          color: "white",
                          borderRadius: "100px",
                          paddingLeft: "15px",
                          paddingRight: "15px",
                        }}
                      >
                        <span className="flex items-center gap-1">
                          {" "}
                          Download <HiDownload />
                        </span>
                      </Button>
                    </div>
                  )}
                </motion.div>
              ))}
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
                <Label htmlFor="title">Course Title</Label>
                <Input
                  type="title"
                  id="title"
                  placeholder="Ex. React Scratch Course"
                  className="bg-[#e2e8f054] p-5"
                />
              </div>

              <div className="text-gray-700">
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  placeholder="Type your message here."
                  className="bg-[#e2e8f054]"
                />
              </div>
              <div className="flex justify-between space-x-4">
                <div className="text-gray-700 w-1/2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    type="text"
                    id="category"
                    placeholder="Ex. Frontend"
                    className="bg-[#e2e8f054] w-full"
                  />
                </div>
                <div className="text-gray-700 w-1/2">
                  <Label htmlFor="level">Level</Label>
                  <Input
                    type="text"
                    id="level"
                    placeholder="Ex. Beginner"
                    className="bg-[#e2e8f054] w-full"
                  />
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

            {/* <div className="p-4 max-w-md mx-auto space-y-4 bg-[#ffff] rounded-xl shadow-sm border border-gray-300">
             

              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Select Classes
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {classes.map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => toggleClass(cls)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedClasses.includes(cls)
                          ? "bg-[#2b2b2b] text-gray-200 border-2 border-gray-600"
                          : "bg-[#ececec] text-gray-700"
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>
              <div className="">
                {" "}
              
                {selectedClasses.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Select Sections
                    </label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {sections.map((section) => (
                        <button
                          key={section}
                          type="button"
                          onClick={() => toggleSection(section)}
                          className={`px-4 py-2 rounded-md border ${
                            selectedSections.includes(section)
                              ? "bg-[#e8f5e8] text-gray-700 border-2 border-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {section}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-[#dfeeff] p-4 rounded-t-2xl ">
               
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
                      <strong>{selectedSections.sort().join(", ")}</strong>
                    </p>
                  </div>
                )}
              </div>
            </div> */}
            <div className="mb-14 flex items-center justify-around flex-wrap gap-10 mt-10">
              {" "}
              <div className="relative flex items-center space-x-4 ">
                {/* Decorative Dots */}
                <div className="absolute -top-6 -left-4">
                  <img
                    src={dot}
                    alt="Decorative dots"
                    className="w-32 opacity-60"
                  />
                </div>

                {/* Card */}
                <div className="relative z-10">
                  <Card>
                    <CardHeader className="w-full sm:w-[450px] ">
                      <CardTitle className="flex items-center gap-2">
                        <span>
                          <SiGoogleclassroom className="text-blue-800" />
                        </span>
                        Classes & Section
                      </CardTitle>
                      <CardDescription>
                        Your need according select{" "}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex relative">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Select Classes
                        </label>
                        <div className="mt-2 bg-[#ebebebe9] flex items-center flex-col w-40 py-3 rounded-xl ">
                          {classes.map((cls) => (
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
                              {sections.map((section, index) => (
                                <motion.div
                                  key={section}
                                  className="flex items-center"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    duration: 0.6,
                                    delay: index * 0.2, // Delay each section animation
                                  }}
                                >
                                  <div
                                    key={section}
                                    className="flex items-center"
                                  >
                                    {/* Connecting Line */}
                                    <div className="w-10 h-[2px] bg-gray-300 mx-4"></div>

                                    {/* Section Button */}
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

                                      {/* Conditional Checkmark Display */}
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
                {/* Decorative Dots */}

                <div className="absolute -bottom-6 -left-4">
                  <img
                    src={dot}
                    alt="Decorative dots"
                    className="w-32 opacity-60"
                  />
                </div>

                {/* Card */}
                <div className="relative z-10">
                  <Card>
                    <CardHeader>
                      <div className="relative max-w-[450px]">
                        <img src={banner} alt="" className="w-full" />
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
                          <h1 className="text-white text-xl">Reword</h1>
                          <p className="text-gray-400 flex items-center gap-2 text-sm">
                            Add the point{" "}
                            <RiCopperCoinFill className="text-yellow-500" />
                          </p>
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
                                // Plus Icon (Click to reveal input)
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
                        {/* <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Button
                            onClick={handleTypewriting}
                            disabled={isTyping}
                            style={{
                              backgroundColor: isTyping ? "gray" : "#0056d2",
                              color: "white",
                              borderRadius: "100px",
                              textTransform: "none",
                              fontSize: "11px",
                            }}
                          >
                            {isTyping ? "Typing..." : "Auto-Fill Terms"}
                          </Button>
                        </motion.div> */}
                      </div>
                    </CardContent>
                    <CardFooter></CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </>
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
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              {activeStep === steps.length - 1 ? (
                "Finish"
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
