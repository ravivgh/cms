import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RiRobot3Line } from "react-icons/ri";
import { RiFileExcel2Fill } from "react-icons/ri";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { BiSolidFilePdf } from "react-icons/bi";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { IoMdArrowRoundUp } from "react-icons/io";
import quizCard from "../assets/quiz.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuUpload } from "react-icons/lu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiCopperCoinFill } from "react-icons/ri";
const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "black",
          color: "white",
          paddingLeft: "15px",
          paddingRight: "15px",
          paddingTop: "10px",
          paddingBottom: "10px",
          borderRadius: "10px",
          fontSize: "13px",
        },
        arrow: {
          color: "black",
        },
      },
    },
  },
});

const ScratchCard = ({ ans }) => {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);

  // Initialize the canvas when the component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas is not mounted");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get 2D context");
      return;
    }

    canvas.width = 300;
    canvas.height = 50;

    // Draw rounded rectangle
    const borderRadius = 30; // Adjust border radius
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(borderRadius, 0);
    ctx.lineTo(canvas.width - borderRadius, 0);
    ctx.quadraticCurveTo(canvas.width, 0, canvas.width, borderRadius);
    ctx.lineTo(canvas.width, canvas.height - borderRadius);
    ctx.quadraticCurveTo(
      canvas.width,
      canvas.height,
      canvas.width - borderRadius,
      canvas.height
    );
    ctx.lineTo(borderRadius, canvas.height);
    ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - borderRadius);
    ctx.lineTo(0, borderRadius);
    ctx.quadraticCurveTo(0, 0, borderRadius, 0);
    ctx.closePath();

    // Clip to rounded rectangle
    ctx.clip();

    // Fill the rounded rectangle
    ctx.fillStyle = "#999";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Start scratching
  const startScratching = () => {
    setIsScratching(true);
  };

  // Stop scratching
  const stopScratching = () => {
    setIsScratching(false);
  };

  // Scratch effect logic
  const scratch = (e) => {
    if (!isScratching || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get 2D context");
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out"; // Remove the scratched part
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2, true);
    ctx.fill();
  };

  return (
    <div style={{ position: "relative", width: 300, height: 50 }}>
      {/* The canvas for the scratchable layer */}
      <canvas
        ref={canvasRef}
        onMouseDown={startScratching}
        onMouseUp={stopScratching}
        onMouseMove={scratch}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          cursor: "pointer",
        }}
      ></canvas>

      {/* The content behind the scratchable layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
        className="rounded-full  bg-[#242424]"
      >
        <h1 style={{ color: "white" }}>{ans}</h1>
      </div>
    </div>
  );
};

const Assistant = () => {
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [requestMessage, setRequestMessage] = useState(""); // Tracks the textarea input
  const [conversation, setConversation] = useState([]);
  const [isAssistanceVisible, setIsAssistanceVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isHover, setIsHever] = useState(false);
  const messageEndRef = useRef(null);

  const fileInputRef = React.useRef(null);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log(jsonData);
      setFile(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };
  const handleRemoveFile = () => {
    setFileName("");
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setRequestMessage(value);
  };

  const circleVariants = {
    animate: {
      y: [0, 20, 0],
      opacity: [0.8, 1, 0.8],
      transition: { repeat: Infinity, duration: 2 },
    },
  };

  const rectVariants = {
    animate: {
      x: [0, 30, -30, 0],
      opacity: [1, 0.8, 1],
      rotate: [0, 10, -10, 0],
      transition: { repeat: Infinity, duration: 3 },
    },
  };
  const ribbonVariants = {
    initial: { pathLength: 0 },
    animate: { pathLength: 1, transition: { duration: 2, ease: "easeInOut" } },
  };
  const quizData = [
    {
      id: 1,
      question: "What causes black holes?",
      options: [
        "Massive stars collapsing",
        "Aliens",
        "Time travel",
        "Dark energy",
      ],
      answer: "Massive stars collapsing",
    },
    {
      id: 2,
      question: "What causes black holes?",
      options: [
        "Massive stars collapsing",
        "Aliens",
        "Time travel",
        "Dark energy",
      ],
      answer: "Massive stars collapsing",
    },

    // Add more questions as needed
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (requestMessage.trim() || fileName) {
      setConversation((prev) => [
        ...prev,
        {
          request: requestMessage,
          response: "",
          file: fileName,
        },
      ]);
      setIsLoading(true);
      setTimeout(() => {
        let responseMessage = "";

        // Dynamic response based on user input
        if (
          (requestMessage.toLowerCase() === "hi" && file) ||
          requestMessage.toLowerCase() === "hi"
        ) {
          responseMessage = (
            <>
              <p className="py-3 text-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-300  font-thin animate-gradient bg-[length:200%_200%] ">
                Import Excel Successfully
              </p>

              {quizData.map((item) => (
                <Card className="my-4" key={item.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="">Question {item.id}</div>
                      <div className="flex items-center bg-slate-100 rounded-full px-2 py-1">
                        <RiCopperCoinFill className="text-orange-300" />
                        <p className="pl-1">coin</p>
                      </div>
                    </div>
                    <CardDescription>{item.question}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup className="gap-2">
                      {item.options.map((option, index) => (
                        <div
                          key={index}
                          className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring"
                        >
                          <RadioGroupItem
                            value={`q${item.id}-o${index}`}
                            id={`q${item.id}-o${index}`}
                            aria-describedby={`q${item.id}-o${index}-description`}
                            className="order-1 after:absolute after:inset-0"
                          />
                          <div className="flex grow items-center gap-3">
                            <svg
                              className="shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              width={32}
                              height={32}
                              aria-hidden="true"
                            >
                              <circle cx="16" cy="16" r="16" fill="#121212" />
                              <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dy=".3em"
                                fill="#ffffff"
                                fontSize="14"
                              >
                                {String.fromCharCode(65 + index)}{" "}
                                {/* Converts index 0 to A, 1 to B, etc. */}
                              </text>
                            </svg>
                            <div className="grid grow gap-2">
                              <Label htmlFor={`q${item.id}-o${index}`}>
                                {option}
                              </Label>
                              <p
                                id={`q${item.id}-o${index}-description`}
                                className="text-xs text-muted-foreground"
                              >
                                Option {index + 1} for Question {item.id}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <div className="mb-5 -z-40 ml-5 ">
                    <p className="text-black pl-2  text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-300  font-thin animate-gradient bg-[length:200%_200%]">
                      Answer
                    </p>
                    <ScratchCard ans={item.answer} />
                  </div>
                </Card>
              ))}
            </>
          );
        } else {
          responseMessage = `I don't understand "${requestMessage}" yet.`;
        }

        // Update the last conversation entry with the response
        setConversation((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].response = responseMessage;
          return updated;
        });

        setIsLoading(false); // Stop loading after response is set
      }, 2000);

      setInputValue(""); // Clear the input field
      setRequestMessage("");
      setFileName("");
      setFile("");
      scrollToBottom();
      setIsAssistanceVisible(false);
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // UseEffect to handle scrolling when a new message is added
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    // Start the launch after 3 seconds
    const launchTimer = setTimeout(() => {
      setIsLaunching(true);
    }, 3000); // 3 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(launchTimer);
  }, []);
  return (
    <>
      {/* <div className="flex items-center justify-center mt-20 overflow-hidden">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-purple-600 text-4xl  font-thin animate-gradient bg-[length:200%_200%]">
            Hello, <span>Ravi</span>
          </h1>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-purple-600 text-xl pt-1">
            Talk about me
          </h1>
          <p className="text-gray-400 w-[300px] text-center py-5">
            Choose a prompt below or write your own to start chatting with Seam
          </p>
        </div>
      </div> */}

      {isAssistanceVisible ? (
        <div className="assistant-about  flex items-center justify-around mx-auto  ">
          <div className="bg-gradient-to-t from-[#2b2d42] via-[#8d5524]  to-[#d8a7b1]  w-full h-64 relative rounded-md">
            {" "}
            <div className="faculty-intro-card bg-[#0f0f0e] max-w-[1200px] h-80 mx-auto absolute left-0 right-0 top-10 rounded-br-[80px] overflow-hidden shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between ">
                <div className="text-white p-10 flex items-center justify-center flex-col">
                  <div className="mb-5">
                    <h1 className=" text-center  text-white text-3xl mb-1 font-medium">
                      Campus Quiz Quest
                    </h1>
                    {/* <div className="border-[1px] border-transparent bg-gradient-to-r from-[#b2ddfc] via-[#85cef7]  to-[#d5ebff] border-image animate-gradient bg-[length:200%_200%] mx-10 py-[0.5px]"></div> */}
                  </div>
                  <h1 className="text-xl text-center text-gray-400 flex flex-col items-center gap-2">
                    {/* First Line */}
                    <div className="flex justify-center space-x-1">
                      <span className="text-white">160+</span>
                      <span style={{ color: "#8889d8" }}>General</span>
                      <span style={{ color: "#d77856" }}>Knowledge</span>
                      <span style={{ color: "#7dba8a" }}>Quiz</span>
                      <span style={{ color: "#8889d8" }}>Questions</span>
                    </div>
                    {/* Second Line */}
                    <div className="flex justify-center space-x-1">
                      <span style={{ color: "#d77856" }}>for</span>
                      <span style={{ color: "#7dba8a" }}>Any</span>
                      <span style={{ color: "#8889d8" }}>Occasion</span>
                    </div>
                  </h1>
                </div>

                <div className="w-full  flex justify-end ">
                  <img
                    src="https://ahaslides.com/wp-content/uploads/2024/04/2-1024x576.png"
                    alt="Quiz Card"
                    className="w-full h-auto max-w-[300px] md:max-w-[600px] object-contain rounded-br-[80px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          className="loaded-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Loaded Content */}
          {conversation.map((entry, index) => (
            <div key={index} style={{ marginBottom: "10px", color: "black" }}>
              <div className="user-message flex items-center">
                <span className="mr-3">
                  <Avatar>
                    <AvatarImage src="" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </span>

                <div className="bg-gray-100 p-3 rounded-lg">
                  <p>{entry.request}</p>
                  {entry.file && (
                    <div className="bg-gray-200 py-2 w-fit  rounded-md flex items-center border border-[#bdbdbd]">
                      <div className="pl-2">
                        <div className="bg-[#ee628a] p-2 rounded-md">
                          <BiSolidFilePdf
                            style={{ fontSize: "20px", color: "white" }}
                          />
                        </div>
                      </div>

                      <div className="px-2"> {entry.file}</div>
                    </div>
                  )}
                </div>
              </div>
              <br />
              <div className="bot-message flex items-center">
                <span
                  className={`mr-3 ${
                    entry.role === "Faculty"
                      ? "bg-[#f1ce8b]"
                      : entry.role === "Student"
                      ? "bg-[#a7d6aa]"
                      : "bg-[#acc7e7]"
                  } p-3 rounded-full`}
                >
                  <RiRobot3Line />
                </span>
                <div className="bg-gray-100 p-3 rounded-lg w-full border-gray-300 ">
                  {entry.response ? (
                    // If response exists, show it
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="">{entry.response}</div>
                    </motion.div>
                  ) : (
                    // If response is not ready, show skeleton loader
                    <div className=" ">
                      <div className="loader"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
      <div ref={messageEndRef}></div>
      <div className="sticky bottom-0 z-10 ">
        <div className="container mx-auto  max-w-[900px] ">
          <div className="showcase rounded-2xl mt-48 ">
            <div className="">
              <form>
                <div className="w-full mb-4   rounded-3xl bg-[#efefef] dark:bg-gray-700 dark:border-gray-600 border-gray-300">
                  <div className="px-4 py-2  bg-[#efefef] rounded-t-3xl dark:bg-gray-800">
                    {/* <label htmlFor="comment" className=" text-gray-400">
                      Prompt
                    </label> */}

                    <div className="bg-[#efefef] rounded-lg pt-2">
                      {fileName && (
                        <div className="file-info flex items-center bg-[#ffffff] px-3 py-2 w-fit my-2 rounded-md">
                          <div className="bg-[#ee628a] p-2 rounded-md">
                            <BiSolidFilePdf
                              style={{ fontSize: "20px", color: "white" }}
                            />
                          </div>
                          <p className="text-[#303030] pl-2 "> {fileName}</p>
                          <div className="pl-3 cursor-pointer ">
                            <IoIosClose
                              className="text-white bg-[#8c8c8c] rounded-full text-xl hover:bg-red-700"
                              onClick={handleRemoveFile}
                            />
                          </div>
                        </div>
                      )}
                      <div className="relative w-full">
                        <Textarea
                          id="comment"
                          rows="4"
                          className="w-full p-2  text-sm text-black bg-[#efefef] border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 rounded-lg"
                          placeholder="Ask AI a question or make a request"
                          required
                          value={inputValue}
                          onChange={handleInputChange}
                        />

                        <Button
                          className="absolute right-3 bottom-3 p-3 w-10 bg-gradient-to-r  bg-[#000000]  rounded-full  transition-all duration-300 cursor-pointer hover:bg-[#545454] "
                          aria-label="Send"
                          onClick={handleSend}
                        >
                          <IoMdArrowRoundUp className="flex items-center justify-center text-white text-4xl" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-3 py-2  dark:border-gray-600">
                    <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                      <Popover>
                        <PopoverTrigger>
                          <ThemeProvider theme={theme}>
                            <Tooltip title="Attach File" arrow>
                              <button
                                type="button"
                                className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-400  dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 "
                              >
                                <svg
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 12 20"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                                  />
                                </svg>
                                <span className="sr-only">Attach file</span>
                              </button>
                            </Tooltip>
                          </ThemeProvider>
                        </PopoverTrigger>
                        <PopoverContent className="w-full  border-0 rounded-2xl bg-[#f9f9f9]">
                          <div className="flex items-center justify-center flex-col ">
                            <div className="">
                              <input
                                ref={fileInputRef}
                                id="file-input"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                            </div>
                            <label
                              htmlFor="file-input"
                              className={`cursor-pointer mt-4 `}
                            >
                              <Button
                                className="cursor-pointer hover:bg-[#f9f9f9] border-[#cbcbcb] border bg-[#efefef]"
                                onClick={handleButtonClick}
                              >
                                <LuUpload className="text-[#9c9c9c] " />
                                <span className="pl-2 text-gray-600">
                                  Upload from computer
                                </span>
                              </Button>
                            </label>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <p className=" pt-3  text-xs text-gray-500 dark:text-gray-400 text-center">
            Remember, contributions to this topic should follow our{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Community Guidelines
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};
export default Assistant;
