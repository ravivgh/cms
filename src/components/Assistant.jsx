import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RiRobot3Line } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiFileExcel2Fill } from "react-icons/ri";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { IoIosArrowForward } from "react-icons/io";
import { MdSupervisorAccount } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { VscSend } from "react-icons/vsc";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LuUpload } from "react-icons/lu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoMdArrowRoundUp } from "react-icons/io";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const Assistant = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedRole, setSelectedRole] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [requestMessage, setRequestMessage] = useState(""); // Tracks the textarea input
  const [conversation, setConversation] = useState([]);
  const [isAssistanceVisible, setIsAssistanceVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const messageEndRef = useRef(null);
  const dummyQuestions = [
    "Count total students",
    "Count total faculty",
    "What is the total attendance?",
    "Show all registered students",
  ];
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
  // Function to filter suggestions based on input
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setRequestMessage(value);
    // If input value is not empty, filter and show matching suggestions
    if (value) {
      const filteredSuggestions = dummyQuestions.filter((question) =>
        question.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  // Handle arrow key navigation and selection
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      setInputValue(suggestions[selectedIndex]); // Insert selected suggestion into textarea
      setSuggestions([]); // Clear suggestions after selection
    }
  };
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
  ];
  // Update input value when a suggestion is selected
  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
      setInputValue(suggestions[selectedIndex]);
    }
  }, [selectedIndex]);

  const handleSend = (e) => {
    e.preventDefault();
    if (requestMessage.trim() || fileName) {
      setConversation((prev) => [
        ...prev,
        {
          request: requestMessage,
          response: "",
          file: fileName,
          role: selectedRole,
        },
      ]);
      setIsLoading(true);
      setTimeout(() => {
        let responseMessage = "";

        // Dynamic response based on user input
        if (requestMessage.toLowerCase() === "hi" && file) {
          responseMessage = (
            <>
              <p className="py-3 text-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-300  font-thin animate-gradient bg-[length:200%_200%] ">
                Import Excel Successfully
              </p>
              <Table className="rounded-xl">
                <TableHeader>
                  <TableRow className="bg-black text-white hover:bg-black">
                    <TableHead className="w-[100px] text-white">
                      Invoice
                    </TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Method</TableHead>
                    <TableHead className="text-right text-white">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="">
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">
                        {invoice.invoice}
                      </TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        {invoice.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
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
        <div className="assistant-about  flex items-center justify-around mx-auto flex-wrap mt-10">
          <div className="faculty-intro-card">
            <Card className="w-[300px] h-[180px] shadow-[5px_0_10px_-11px_rgba(0,0,0,0.5)] rounded-3xl bg-[#e3dacc] ">
              <div className="faulty-icon-intro flex items-center justify-center pt-10 pb-3">
                <div className="faulty-band flex items-center justify-around bg-[#f1ce8b] p-2 w-fit rounded-full">
                  <MdSupervisorAccount style={{ fontSize: "20px" }} />
                  <p className="text-sm">Manage & Monitor Academic</p>
                </div>
              </div>
              <CardHeader>
                <CardDescription className="text-center  text-sm text-black">
                  Assistance to manage your classes attendance, and academic
                  resources
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center pt-5"></CardContent>
            </Card>
          </div>

          <div className="student-intro-card">
            <Card className="w-[300px] h-[180px] rounded-3xl bg-[#4a805f] ">
              <div className="student-icon-intro flex items-center justify-center pt-10 pb-3">
                <div className="student-band flex items-center justify-around bg-[#a7d6aa] p-2 w-fit rounded-full">
                  <PiStudentFill style={{ fontSize: "20px" }} />
                  <p className="text-sm">Track Your Attendance</p>
                </div>
              </div>
              <CardHeader>
                <CardDescription className="text-center  text-sm text-white">
                  Assistance the student portal for a seamless academic
                  experience
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center pt-5"></CardContent>
            </Card>
          </div>
          <div className="oration-intro-card">
            <Card className="w-[300px] h-[180px] shadow-[-5px_0_10px_-11px_rgba(0,0,0,0.5)]  rounded-3xl bg-[#badafe] ">
              <div className="admin-icon-intro flex items-center justify-center pt-10 pb-3">
                <div className="admin-band flex items-center justify-around bg-[#acc7e7] p-2 w-fit rounded-full">
                  <MdOutlineAdminPanelSettings style={{ fontSize: "20px" }} />
                  <p className="text-sm">Manage Operations</p>
                </div>
              </div>
              <CardHeader>
                <CardDescription className="text-center  text-sm text-black">
                  Assistance to manage college operations, and student
                  information
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center pt-5"></CardContent>
              <CardFooter></CardFooter>
            </Card>
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
                        <RiFileExcel2Fill
                          style={{
                            fontSize: "20px",
                            color: "#116752",
                          }}
                        />
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
                      <div className="three-body ">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                      </div>

                      <div className="space-y-4">
                        {/* Gemini Skeleton Effect */}
                        <div className="h-4 w-3/4 bg-gradient-to-r from-purple-500 via-gray-100 to-gray-300 animate-pulse rounded-md"></div>
                        <div className="h-4 w-1/2 bg-gradient-to-r from-purple-500 via-gray-100 to-gray-300 animate-pulse rounded-md"></div>
                        <div className="h-4 w-5/6 bg-gradient-to-r from-purple-500 via-gray-100 to-gray-300 animate-pulse rounded-md"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
      <div ref={messageEndRef}></div>
      <div className="sticky bottom-0">
        <div className="container mx-auto  max-w-[900px] ">
          <div className="showcase assistance-cover px-1 pt-2 pb-1 rounded-2xl mt-32 ">
            <div className="assistant-logo p-3 flex items-center">
              <RiRobot3Line className="text-purple-400" />
              <p className="pl-3 ">Campus Assistant</p>
            </div>
            <div className="">
              <form>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    {/* <label htmlFor="comment" className=" text-gray-600">
                      Prompt
                    </label> */}
                    <div className="suggest-section">
                      {suggestions.length > 0 && (
                        <motion.div
                          className="bg-[#23272f] h-auto p-3 rounded-xl mb-3"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="pb-2 flex items-center">
                            <label
                              htmlFor="comment"
                              className=" text-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-300  font-thin animate-gradient bg-[length:200%_200%] "
                            >
                              Suggested
                            </label>
                            <Sparkles
                              className="-me-1 ms-2 opacity-60 text-purple-300"
                              size={16}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                          </div>
                          {suggestions.map((suggestion, index) => (
                            <motion.div
                              key={index}
                              className={`h-auto p-2 rounded-md ${
                                selectedIndex === index ? "bg-[#74747461]" : ""
                              }`} // Highlight selected suggestion
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.2,
                                ease: "easeInOut",
                              }}
                            >
                              <div className="flex items-center">
                                {selectedIndex === index && (
                                  <span className="text-xl text-[#9a9a9a] pr-2">
                                    <IoIosArrowForward />
                                  </span>
                                )}
                                <p className="text-[#b0b0b0] ">{suggestion}</p>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                    <div className="bg-gray-200 rounded-lg pt-2">
                      {fileName && (
                        <div className="file-info flex items-center   bg-gray-300 px-3 py-2 w-fit ml-3 rounded-md">
                          <RiFileExcel2Fill
                            style={{ fontSize: "20px", color: "#116752" }}
                          />
                          <p className="text-gray-500 pl-2"> {fileName}</p>
                          <div className="pl-3 cursor-pointer ">
                            <IoIosClose
                              className="text-white bg-gray-600 rounded-full text-xl hover:bg-red-700"
                              onClick={handleRemoveFile}
                            />
                          </div>
                        </div>
                      )}
                      <div className="relative w-full">
                        <Textarea
                          id="comment"
                          rows="4"
                          className="w-full p-2  text-sm text-gray-900 bg-gray-200 border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 rounded-lg"
                          placeholder="Ask AI a question or make a request"
                          required
                          value={inputValue}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                        />

                        <Button
                          className="absolute right-3 bottom-3 p-3 w-10 bg-gradient-to-r  from-[#141413] to-[#141413] text-white rounded-full  transition-all duration-300 cursor-pointer "
                          aria-label="Send"
                          onClick={handleSend}
                        >
                          <IoMdArrowRoundUp className="text-xl text-gray-300 flex items-center justify-center" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                    <Select onValueChange={(value) => setSelectedRole(value)}>
                      <SelectTrigger className="w-[280px] text-[#e2e8f0] bg-[#334155]">
                        <SelectValue placeholder="Select a Role" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1e293b] border-0">
                        <SelectGroup>
                          <SelectLabel className="text-[#cdcccc]">
                            Select a Role
                          </SelectLabel>
                          <SelectItem
                            value="Faculty"
                            className="  bg-[#334155] hover:bg-[#475569]"
                          >
                            <div className="flex items-center ">
                              <MdSupervisorAccount
                                style={{ fontSize: "25px" }}
                                className="text-black bg-[#f1ce8b] p-[3.5px] rounded-full"
                              />
                              <p className="pl-3 text-gray-300">Faculty</p>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="Student"
                            className="bg-[#334155] hover:bg-[#475569]"
                          >
                            <div className="flex items-center ">
                              <PiStudentFill
                                style={{ fontSize: "25px" }}
                                className="text-black bg-[#a7d6aa] p-[3.5px] rounded-full"
                              />
                              <p className="pl-3 text-[#e2e8f0]">Student</p>
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
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
                        </PopoverTrigger>
                        <PopoverContent className="w-full  border-0 rounded-2xl">
                          <div className="flex items-center justify-center flex-col ">
                            <div className="upload-intro flex items-center py-5 bg-slate-100 w-full justify-center rounded-xl mb-2">
                              {selectedRole === "Faculty" ? (
                                <MdSupervisorAccount
                                  style={{ fontSize: "25px" }}
                                  className="text-black bg-[#f1ce8b] p-[3.5px] rounded-full"
                                />
                              ) : selectedRole === "Student" ? (
                                <PiStudentFill
                                  style={{ fontSize: "25px" }}
                                  className="text-black bg-[#a7d6aa] p-[3.5px] rounded-full"
                                />
                              ) : (
                                <p className="text-gray-500">Select a Role</p>
                              )}
                              <p className="pl-3">{selectedRole}</p>
                            </div>
                            <div className="border-t border-dashed border-gray-500 w-full pb-2"></div>
                            <div className="">
                              <input
                                ref={fileInputRef}
                                id="file-input"
                                type="file"
                                accept=".xlsx, .xls"
                                onChange={handleFileUpload}
                                className="hidden"
                              />
                            </div>
                            <label
                              htmlFor="file-input"
                              className={`cursor-pointer mt-4 ${
                                !(
                                  selectedRole === "Faculty" ||
                                  selectedRole === "Student"
                                )
                                  ? "pointer-events-none opacity-50"
                                  : ""
                              }`}
                            >
                              <Button
                                className="cursor-pointer bg-[#23272f]"
                                onClick={handleButtonClick}
                                disabled={
                                  !(
                                    selectedRole === "Faculty" ||
                                    selectedRole === "Student"
                                  )
                                }
                              >
                                <LuUpload className="text-white " />
                                <span className="pl-2">
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
