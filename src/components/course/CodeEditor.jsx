import React, { useState, useEffect, useCallback, useRef } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { python } from "@codemirror/lang-python";
import CodeMirror from "@uiw/react-codemirror";
import { BsCursorFill } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuSquareCode } from "react-icons/lu";
import { FaExpand, FaCompress } from "react-icons/fa";
import { MdOutlineArrowCircleDown } from "react-icons/md";
import { FaHtml5 } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { TbVectorSpline } from "react-icons/tb";
import Draggable from "react-draggable";
import DrawBoard from "../DrawBoard";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCss3Alt } from "react-icons/fa";
import { FaJsSquare } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
function App() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const [leftPanelWidth, setLeftPanelWidth] = useState(400); // Initial width of the left panel

  const [isDragging, setIsDragging] = useState(false);
  const startDragging = () => setIsDragging(true);
  const stopDragging = () => setIsDragging(false);
  const handleDragging = (e) => {
    if (!isDragging) return;
    const newWidth = e.clientX; // Adjust based on cursor position
    if (newWidth > 200 && newWidth < window.innerWidth - 200) {
      setLeftPanelWidth(newWidth);
    }
  };
  const [code, setCode] = useState({
    html: "",
    css: "",
    javascript: "",
    python: "",
  });
  const [selectedLanguages, setSelectedLanguages] = useState(["python"]);

  const [pythonOutput, setPythonOutput] = useState("");
  const [isPyodideReady, setIsPyodideReady] = useState(false);
  const editorRef = useRef(null);
  const cursorBoxRef = useRef(null);
  const languageExtensions = {
    javascript: javascript({ jsx: true }),
    html: html(),
    css: css(),
    python: python(),
  };

  // Load Pyodide for Python execution
  useEffect(() => {
    if (selectedLanguages.includes("python")) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.2/full/pyodide.js";
      script.onload = async () => {
        setIsPyodideReady(true);
        console.log("Pyodide loaded!");
      };
      script.onerror = () => console.error("Failed to load Pyodide");
      document.body.appendChild(script);
    }
  }, [selectedLanguages]);

  // Handle code changes
  const onChangeCode = useCallback((language, value) => {
    setCode((prevCode) => ({ ...prevCode, [language]: value }));
  }, []);

  // Handle language selection
  const handleLanguageSelect = (language) => {
    setSelectedLanguages((prevLanguages) =>
      prevLanguages.includes(language)
        ? prevLanguages.filter((lang) => lang !== language)
        : [...prevLanguages, language]
    );
  };
  const downloadCode = (language) => {
    const codeContent = code[language];
    const fileExtension =
      language === "html"
        ? ".html"
        : language === "css"
        ? ".css"
        : language === "javascript"
        ? ".js"
        : ".py";
    const blob = new Blob([codeContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${language}_code${fileExtension}`; // Dynamically set file extension
    link.click();
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  // Handle file upload
  //   const handleFileUpload = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         setCode({
  //           html: e.target.result,
  //           css: e.target.result,
  //           javascript: e.target.result,
  //           python: e.target.result,
  //         });
  //       };
  //       reader.readAsText(file);
  //     }
  //   };

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
  const updateCursorPosition = () => {
    const editor = editorRef.current;
    if (editor) {
      const cursor = editor.view.state.selection.main;
      const cursorPosition = editor.view.coordsAtPos(cursor.head);
      if (cursorBoxRef.current && cursorPosition) {
        cursorBoxRef.current.style.left = `${cursorPosition.left}px`;
        cursorBoxRef.current.style.top = `${cursorPosition.top}px`;
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(updateCursorPosition, 50);
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);
  const problems = [
    {
      title: "Palindrome Number",
      description:
        "Write a program to find the smallest palindrome number that is larger than the given number",
      hint: "Increment the number by 1 in a loop until you find a palindrome.",
      example: { input: "123", output: "131" },
      done: false,
    },
    {
      title: "Prime Number",
      description: "Write a program to check if a given number is prime.",
      hint: "Check if the number is divisible by any number between 2 and its square root.",
      example: { input: "7", output: "True" },
      done: false,
    },
    {
      title: "Fibonacci Sequence",
      description: "Generate the first N numbers in the Fibonacci sequence.",
      hint: "Use a loop to calculate each number as the sum of the previous two.",
      example: { input: "5", output: "0, 1, 1, 2, 3" },
    },
  ];
  const getLanguageIcon = (language) => {
    switch (language) {
      case "html":
        return <FaHtml5 className="text-orange-500" />;
      case "css":
        return <FaCss3Alt className="text-blue-500" />;
      case "javascript":
        return <FaJsSquare className="text-yellow-500" />;
      case "python":
        return <FaPython className="text-green-500" />;
      default:
        return null;
    }
  };
  // State for questions and index
  const [questions, setQuestions] = useState(problems); // Remaining questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
  const [showQuestions, setShowQuestions] = useState(false); // Toggle between sheet and questions view

  // Handle "Skip" button click
  const handleSkip = () => {
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  // Handle "Submit" button click
  const handleSubmit = () => {
    const updatedQuestions = questions.filter(
      (_, index) => index !== currentQuestionIndex
    );

    setQuestions(updatedQuestions);

    // Reset index or end questions if list is empty
    if (updatedQuestions.length > 0) {
      setCurrentQuestionIndex(0);
    }
  };
  return (
    <div className=" text-white bg-[#23272f] ">
      <div className="flex flex-col md:flex-row ">
        <div className="bg-[#171717] w-full border-b-2 border-[#6a758c48]">
          <h1 className="text-2xl pt-5 pl-5">Questions</h1>
          <div className="bg-[#1d2129] w-full h-5 mt-5"></div>
        </div>
        <div className="bg-[#171717] space-y-5 pt-3 pl-3 w-full border-b-2 border-[#6a758c25]">
          <div className="flex justify-around items-center ">
            {" "}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-[2px]">
                <div className="bg-[#2b2b2b] p-2 rounded-r-none rounded">
                  <IoIosInformationCircleOutline />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className=" px-3 py-1 rounded rounded-l-none bg-[#2b2b2b]  text-gray-300 flex items-center gap-1 ">
                    <LuSquareCode /> Select Languages
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Languages</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {["html", "css", "javascript", "python"].map((language) => (
                      <DropdownMenuItem
                        key={language}
                        onClick={() => {
                          handleLanguageSelect(language);
                        }}
                      >
                        {selectedLanguages.includes(language) ? "✓ " : ""}{" "}
                        {language.toUpperCase()}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="dragdiv">
                <Popover className="">
                  <PopoverTrigger asChild>
                    <button className="bg-[#ffffff] px-3 py-1 rounded text-black flex items-center gap-1">
                      <TbVectorSpline />
                      Drawing board
                    </button>
                  </PopoverTrigger>

                  {/* Draggable for the entire PopoverContent with fixed width and height */}
                  <Draggable handle=".drag-handle">
                    <PopoverContent className="w-[800px] h-[500px] p-0 m-0 relative bg-transparent shadow-none border-2 border-[#a1a3a5]">
                      {/* Draggable handle area */}
                      <div className="drag-handle absolute top-0 left-0 w-full bg-opacity-30  cursor-move py-5">
                        {/* Custom header for dragging */}
                      </div>

                      {/* Scrollable content area */}
                      <div className="overflow-auto h-full rounded-xl scroll-container">
                        <div className="bg-[#2b2b2b] w-full px-5 py-3 ">
                          <p className="text-black bg-white w-fit px-3 pb-1 rounded-full">
                            Draw
                          </p>
                        </div>
                        <DrawBoard />
                      </div>
                    </PopoverContent>
                  </Draggable>
                </Popover>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-[#146243]  px-3 py-1 rounded text-white"
            >
              Submit Answer
            </button>
          </div>

          <div className="bg-[#2e34414f] rounded-t-md border-t-2 border-[#6a758c29]">
            <div className="flex gap-2">
              {selectedLanguages.map((language) => (
                <button
                  key={language}
                  onClick={() => downloadCode(language)}
                  className=" bg-[#23272f] text-gray-400   text-sm px-10 py-1 rounded-t-md flex items-center gap-1  border-t-2 border-[#92abcc64]"
                >
                  {getLanguageIcon(language)}
                  {language.toLowerCase()} <MdOutlineArrowCircleDown />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* File Upload */}
      {/* <div className="mb-4">
        <label className="font-semibold mr-2">Upload File:</label>
        <input
          type="file"
          accept=".js,.html,.css,.py,.java"
          onChange={handleFileUpload}
          className="border p-2 rounded"
        />
      </div> */}
      <div
        className="flex h-screen"
        onMouseMove={handleDragging}
        onMouseUp={stopDragging}
      >
        <div
          className="bg-[#141a22] w-1/2  overflow-y-auto scroll-container"
          style={{ width: `${leftPanelWidth}px` }}
        >
          <div className="flex items-center justify-around  bg-[#171717] w-full py-3 ">
            <div
              onClick={() => setShowQuestions(false)}
              className={`${
                !showQuestions ? "bg-slate-800 text-white" : "text-gray-400"
              } px-5 py-2 rounded-sm border border-gray-600 cursor-pointer`}
            >
              <p>Question</p>
            </div>
            <div
              onClick={() => setShowQuestions(true)}
              className={`${
                showQuestions ? "bg-slate-800 text-white" : "text-gray-400"
              } px-5 py-2 rounded-sm border border-gray-600 cursor-pointer`}
            >
              <p> Questions Sheet</p>
            </div>
          </div>
          <div className="p-5">
            {!showQuestions ? (
              questions.length > 0 ? (
                // Questions Sheet
                <div className="mb-4">
                  {/* Header Section */}
                  <div className="p-3 rounded-t-lg bg-[#79c1ff23] border border-b-[#343a42]">
                    <h1 className="text-white text-lg">
                      {questions[currentQuestionIndex].title}
                    </h1>
                  </div>

                  {/* Problem Content */}
                  <div className="border border-[#343a42] rounded-b-lg">
                    <h1 className="text-[16px] bg-[#0f151c] px-2 py-3">
                      Problem Description
                    </h1>
                    <div className="space-y-2 bg-[#151b23] p-5 rounded-b-lg border-t-2 border-[#343a4264]">
                      <p className="text-gray-400">
                        {questions[currentQuestionIndex].description}
                      </p>
                      <div>
                        <span className="text-gray-400">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-normal animate-gradient bg-[length:200%_200%]">
                            Hint:
                          </span>{" "}
                          {questions[currentQuestionIndex].hint}
                        </span>
                      </div>
                      <div>
                        <h1 className="text-white bg-[#3a78aeaf] w-fit px-2 rounded-sm mb-2 mt-5">
                          Example:
                        </h1>
                        <ul className="text-gray-300">
                          <li>
                            Input:{" "}
                            {questions[currentQuestionIndex].example.input}
                          </li>
                          <li>
                            Output:{" "}
                            {questions[currentQuestionIndex].example.output}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={handleSkip}
                      className="bg-slate-400  px-4 py-2 rounded text-gray-800"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              ) : (
                // No questions left
                <div className="text-gray-400">
                  <h2>All questions have been submitted!</h2>
                </div>
              )
            ) : (
              // All Questions
              <div>
                {problems.map((problem, index) => (
                  <div key={index} className="mb-4">
                    {/* Header Section */}
                    <div className="p-3 rounded-t-lg bg-[#79c1ff23] border border-b-[#343a42]">
                      <h1 className="text-white text-xl">{problem.title}</h1>
                    </div>

                    {/* Problem Content */}
                    <div className="border border-[#343a42] rounded-b-lg">
                      <h1 className="text-xl bg-[#0f151c] px-2 py-3">
                        Problem Description
                      </h1>
                      <div className="space-y-2 bg-[#151b23] p-5 rounded-b-lg border-t-2 border-[#343a4264]">
                        <p className="text-gray-400">{problem.description}</p>
                        <div>
                          <span className="text-gray-400">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-thin animate-gradient bg-[length:200%_200%]">
                              Hint:
                            </span>{" "}
                            {problem.hint}
                          </span>
                        </div>
                        <div>
                          <h1 className="text-white bg-[#3a78aeaf] w-fit px-2 rounded-sm mb-2 mt-5">
                            Example:
                          </h1>
                          <ul className="text-gray-300">
                            <li>Input: {problem.example.input}</li>
                            <li>Output: {problem.example.output}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Divider */}
        <div
          className="bg-gray-700 cursor-col-resize"
          style={{ width: "5px" }}
          onMouseDown={startDragging}
        ></div>
        <div className=""></div>
        <div className="flex-1 px-5 py-2 overflow-y-auto scroll-container">
          <div className="bg-[#282c34] p-5 rounded-2xl  ">
            {/* Code Editors  #282c34*/}
            {selectedLanguages.includes("html") && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold">HTML Editor</h2>
                <div className="bg-[#151b23] w-full h-5 flex items-center gap-2 px-3 py-5 rounded-t-xl border-t-2 border-[#92abcc1d] ">
                  <div className="w-2 h-2 bg-[#f75355] rounded-full"></div>
                  <div className="w-2 h-2 bg-[#f9b227] rounded-full"></div>
                  <div className="w-2 h-2 bg-[#24c133] rounded-full"></div>
                </div>
                <CodeMirror
                  value={code.html}
                  height="300px"
                  theme="dark"
                  extensions={[languageExtensions.html]}
                  onChange={(value) => onChangeCode("html", value)}
                  ref={editorRef}
                />
              </div>
            )}

            {selectedLanguages.includes("css") && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold">CSS Editor</h2>
                <CodeMirror
                  value={code.css}
                  height="300px"
                  theme="dark"
                  extensions={[languageExtensions.css]}
                  onChange={(value) => onChangeCode("css", value)}
                  ref={editorRef}
                />
              </div>
            )}

            {selectedLanguages.includes("javascript") && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold">JavaScript Editor</h2>
                <CodeMirror
                  value={code.javascript}
                  height="300px"
                  theme="dark"
                  extensions={[languageExtensions.javascript]}
                  onChange={(value) => onChangeCode("javascript", value)}
                  ref={editorRef}
                />
              </div>
            )}

            {selectedLanguages.includes("python") && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Python Editor</h2>
                <CodeMirror
                  value={code.python}
                  height="300px"
                  theme="dark"
                  extensions={[languageExtensions.python]}
                  onChange={(value) => onChangeCode("python", value)}
                  ref={editorRef}
                />
                <button
                  onClick={executePythonCode}
                  disabled={!isPyodideReady}
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                  {isPyodideReady ? "Run Python Code" : "Loading Pyodide..."}
                </button>
              </div>
            )}
            {/* Red Square Cursor */}
            {selectedLanguages.length > 0 && (
              <>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 614 390"
                  height={390}
                  width={614}
                  ref={cursorBoxRef}
                >
                  <g id="Frame">
                    <g id="box-figma">
                      <g id="box"></g>
                      <g id="cursor">
                        <path
                          strokeWidth={2}
                          stroke="white"
                          fill="#2563EB"
                          d="M453.383 343L448 317L471 331L459.745 333.5L453.383 343Z"
                          id="Vector 273"
                        />
                        <path
                          fill="#2563EB"
                          d="M587 343H469.932V376H587V343Z"
                          id="Rectangle 786"
                        />
                        <g id="Darlley Brito">
                          <path
                            fill="white"
                            d="M479.592 364.208C479.197 364.208 479 364.011 479 363.616V354.128C479 353.733 479.197 353.536 479.592 353.536H483.448C484.819 353.536 485.824 353.859 486.464 354.504C487.104 355.144 487.424 356.149 487.424 357.52V360.224C487.424 361.595 487.104 362.603 486.464 363.248C485.829 363.888 484.824 364.208 483.448 364.208H479.592ZM480.176 363.032H483.448C484.141 363.032 484.693 362.944 485.104 362.768C485.515 362.592 485.808 362.299 485.984 361.888C486.16 361.477 486.248 360.923 486.248 360.224V357.52C486.248 356.827 486.16 356.275 485.984 355.864C485.808 355.453 485.515 355.16 485.104 354.984C484.693 354.803 484.141 354.712 483.448 354.712H480.176V363.032Z"
                          />
                          <path
                            fill="white"
                            d="M492.729 364.208C491.854 364.208 491.206 363.997 490.785 363.576C490.363 363.155 490.153 362.507 490.153 361.632C490.153 360.757 490.36 360.109 490.776 359.688C491.198 359.267 491.849 359.056 492.729 359.056H496.193C496.171 358.448 496.022 358.029 495.745 357.8C495.467 357.571 494.995 357.456 494.328 357.456H493.401C492.819 357.456 492.387 357.504 492.104 357.6C491.827 357.696 491.641 357.864 491.545 358.104C491.47 358.296 491.387 358.432 491.297 358.512C491.211 358.587 491.078 358.624 490.896 358.624C490.699 358.624 490.544 358.571 490.432 358.464C490.326 358.352 490.294 358.205 490.337 358.024C490.465 357.421 490.779 356.981 491.281 356.704C491.782 356.421 492.489 356.28 493.401 356.28H494.328C495.369 356.28 496.136 356.528 496.632 357.024C497.128 357.52 497.377 358.288 497.377 359.328V363.616C497.377 364.011 497.182 364.208 496.792 364.208C496.398 364.208 496.201 364.011 496.201 363.616V363.112C495.651 363.843 494.793 364.208 493.625 364.208H492.729ZM492.729 363.032H493.625C494.057 363.032 494.454 362.989 494.817 362.904C495.179 362.819 495.483 362.669 495.729 362.456C495.974 362.243 496.131 361.944 496.201 361.56V360.232H492.729C492.179 360.232 491.808 360.331 491.616 360.528C491.424 360.72 491.328 361.088 491.328 361.632C491.328 362.181 491.424 362.552 491.616 362.744C491.808 362.936 492.179 363.032 492.729 363.032Z"
                          />
                          <path
                            fill="white"
                            d="M501.029 364.208C500.635 364.208 500.438 364.011 500.438 363.616V356.864C500.438 356.475 500.635 356.28 501.029 356.28C501.419 356.28 501.614 356.475 501.614 356.864V357.696C501.918 357.232 502.317 356.88 502.813 356.64C503.315 356.4 503.896 356.28 504.558 356.28C504.952 356.28 505.149 356.475 505.149 356.864C505.149 357.259 504.952 357.456 504.558 357.456C503.624 357.456 502.909 357.643 502.413 358.016C501.917 358.384 501.651 358.888 501.614 359.528V363.616C501.614 364.011 501.419 364.208 501.029 364.208Z"
                          />
                          <path
                            fill="white"
                            d="M509.344 364.208C508.549 364.208 507.96 364.016 507.576 363.632C507.192 363.243 507 362.651 507 361.856V353.584C507 353.195 507.197 353 507.592 353C507.981 353 508.176 353.195 508.176 353.584V361.856C508.176 362.32 508.253 362.632 508.408 362.792C508.568 362.952 508.88 363.032 509.344 363.032C509.744 363.032 509.944 363.227 509.944 363.616C509.955 364.011 509.755 364.208 509.344 364.208Z"
                          />
                          <path
                            fill="white"
                            d="M514.563 364.208C513.768 364.208 513.179 364.016 512.795 363.632C512.411 363.243 512.219 362.651 512.219 361.856V353.584C512.219 353.195 512.416 353 512.811 353C513.2 353 513.395 353.195 513.395 353.584V361.856C513.395 362.32 513.472 362.632 513.627 362.792C513.787 362.952 514.099 363.032 514.563 363.032C514.963 363.032 515.163 363.227 515.163 363.616C515.173 364.011 514.973 364.208 514.563 364.208Z"
                          />
                          <path
                            fill="white"
                            d="M517.973 360.72V361.168C517.973 361.877 518.106 362.365 518.373 362.632C518.64 362.899 519.133 363.032 519.853 363.032H521.165C521.752 363.032 522.181 362.971 522.453 362.848C522.73 362.72 522.909 362.499 522.989 362.184C523.032 362.008 523.098 361.872 523.189 361.776C523.285 361.68 523.426 361.632 523.613 361.632C523.81 361.632 523.96 361.685 524.061 361.792C524.162 361.893 524.197 362.043 524.165 362.24C524.064 362.907 523.762 363.403 523.261 363.728C522.765 364.048 522.066 364.208 521.165 364.208H519.853C518.813 364.208 518.042 363.96 517.541 363.464C517.045 362.968 516.797 362.203 516.797 361.168V359.328C516.797 358.272 517.045 357.499 517.541 357.008C518.042 356.512 518.813 356.269 519.853 356.28H521.165C522.205 356.28 522.973 356.528 523.469 357.024C523.965 357.515 524.213 358.283 524.213 359.328V360.128C524.213 360.523 524.018 360.72 523.629 360.72H517.973ZM519.853 357.456C519.133 357.445 518.64 357.573 518.373 357.84C518.106 358.107 517.973 358.603 517.973 359.328V359.544H523.037V359.328C523.037 358.608 522.904 358.117 522.637 357.856C522.376 357.589 521.885 357.456 521.165 357.456H519.853Z"
                          />
                          <path
                            fill="white"
                            d="M529.158 367.408C528.411 367.408 527.854 367.221 527.486 366.848C527.123 366.48 526.942 365.92 526.942 365.168C526.942 364.779 527.136 364.584 527.526 364.584C527.92 364.584 528.118 364.779 528.118 365.168C528.118 365.595 528.184 365.877 528.318 366.016C528.456 366.16 528.736 366.232 529.158 366.232H532.15C532.571 366.232 532.851 366.16 532.99 366.016C533.128 365.877 533.198 365.595 533.198 365.168V363.08C532.883 363.533 532.507 363.835 532.07 363.984C531.632 364.133 531.147 364.208 530.614 364.208H529.942C528.912 364.208 528.155 363.965 527.67 363.48C527.184 362.995 526.942 362.243 526.942 361.224V356.864C526.942 356.469 527.136 356.272 527.526 356.272C527.92 356.272 528.118 356.469 528.118 356.864V361.224C528.118 361.917 528.246 362.392 528.502 362.648C528.763 362.904 529.243 363.032 529.942 363.032H530.614C531.51 363.032 532.163 362.883 532.574 362.584C532.99 362.285 533.198 361.832 533.198 361.224V356.864C533.198 356.469 533.392 356.272 533.782 356.272C534.176 356.272 534.374 356.469 534.374 356.864V365.168C534.374 365.92 534.19 366.48 533.822 366.848C533.454 367.221 532.896 367.408 532.15 367.408H529.158Z"
                          />
                          <path
                            fill="white"
                            d="M542.873 364.208C542.479 364.208 542.281 364.011 542.281 363.616V354.128C542.281 353.733 542.479 353.536 542.873 353.536H547.049C547.876 353.536 548.508 353.752 548.945 354.184C549.383 354.616 549.601 355.237 549.601 356.048V356.48C549.601 357.237 549.361 357.805 548.881 358.184C549.756 358.632 550.193 359.488 550.193 360.752V361.28C550.193 362.24 549.943 362.968 549.441 363.464C548.94 363.96 548.212 364.208 547.257 364.208H542.873ZM543.457 363.032H547.257C547.881 363.032 548.329 362.896 548.601 362.624C548.879 362.347 549.017 361.899 549.017 361.28V360.752C549.017 360.133 548.884 359.691 548.617 359.424C548.351 359.152 547.897 359.016 547.257 359.016H543.457V363.032ZM543.457 357.84H547.281C547.703 357.84 547.999 357.72 548.169 357.48C548.34 357.235 548.425 356.901 548.425 356.48V356.048C548.425 355.563 548.321 355.219 548.113 355.016C547.905 354.813 547.551 354.712 547.049 354.712H543.457V357.84Z"
                          />
                          <path
                            fill="white"
                            d="M553.358 364.208C552.963 364.208 552.766 364.011 552.766 363.616V356.864C552.766 356.475 552.963 356.28 553.358 356.28C553.747 356.28 553.942 356.475 553.942 356.864V357.696C554.246 357.232 554.646 356.88 555.142 356.64C555.643 356.4 556.224 356.28 556.886 356.28C557.28 356.28 557.478 356.475 557.478 356.864C557.478 357.259 557.28 357.456 556.886 357.456C555.952 357.456 555.238 357.643 554.742 358.016C554.246 358.384 553.979 358.888 553.942 359.528V363.616C553.942 364.011 553.747 364.208 553.358 364.208Z"
                          />
                          <path
                            fill="white"
                            d="M559.704 354.92C559.245 354.92 559.016 354.685 559.016 354.216V353.784C559.016 353.325 559.245 353.096 559.704 353.096H560.136C560.579 353.096 560.8 353.325 560.8 353.784V354.216C560.8 354.685 560.579 354.92 560.136 354.92H559.704ZM559.92 364.208C559.525 364.208 559.328 364.011 559.328 363.616V356.864C559.328 356.475 559.525 356.28 559.92 356.28C560.309 356.28 560.504 356.475 560.504 356.864V363.616C560.504 364.011 560.309 364.208 559.92 364.208Z"
                          />
                          <path
                            fill="white"
                            d="M567.031 364.208C566.001 364.208 565.244 363.965 564.759 363.48C564.273 362.995 564.031 362.24 564.031 361.216V357.456H563.191C562.796 357.456 562.599 357.259 562.599 356.864C562.599 356.475 562.796 356.28 563.191 356.28H564.031V354.928C564.031 354.533 564.225 354.336 564.615 354.336C565.009 354.336 565.207 354.533 565.207 354.928V356.28H567.103C567.492 356.28 567.687 356.475 567.687 356.864C567.687 357.259 567.492 357.456 567.103 357.456H565.207V361.216C565.207 361.92 565.335 362.4 565.591 362.656C565.852 362.907 566.332 363.032 567.031 363.032C567.223 363.032 567.369 363.08 567.471 363.176C567.572 363.267 567.623 363.413 567.623 363.616C567.623 364.011 567.425 364.208 567.031 364.208Z"
                          />
                          <path
                            fill="white"
                            d="M572.197 364.208C571.157 364.208 570.386 363.96 569.885 363.464C569.389 362.968 569.141 362.203 569.141 361.168V359.328C569.141 358.277 569.389 357.507 569.885 357.016C570.386 356.52 571.157 356.275 572.197 356.28H573.509C574.549 356.28 575.317 356.528 575.813 357.024C576.309 357.52 576.557 358.288 576.557 359.328V361.152C576.557 362.192 576.309 362.963 575.813 363.464C575.317 363.96 574.549 364.208 573.509 364.208H572.197ZM570.317 361.168C570.317 361.877 570.45 362.365 570.717 362.632C570.983 362.899 571.477 363.032 572.197 363.032H573.509C574.229 363.032 574.719 362.899 574.981 362.632C575.247 362.365 575.381 361.872 575.381 361.152V359.328C575.381 358.608 575.247 358.117 574.981 357.856C574.719 357.589 574.229 357.456 573.509 357.456H572.197C571.717 357.456 571.341 357.512 571.069 357.624C570.797 357.736 570.602 357.928 570.485 358.2C570.373 358.472 570.317 358.848 570.317 359.328V361.168Z"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg> */}
                <div
                  ref={cursorBoxRef}
                  className="cursor-box w-fit h-fit px-3  rounded-sm"
                  style={{
                    position: "absolute",

                    backgroundColor: "#ec511a",

                    opacity: 0.8,
                  }}
                >
                  <div className=" ">
                    {/* <Avatar className="w-6 h-6">
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/23?v=4"
              alt="@shadcn"
            />
          </Avatar> */}
                    <p className="text-center text-white "> Sara </p>
                  </div>
                  <div className="absolute bottom-8 left-3/4">
                    <BsCursorFill className="text-[#ec511a] " />
                  </div>
                </div>
                <div className="flex justify-end p-4">
                  <button onClick={toggleFullScreen} className="p-2 text-white">
                    {isFullScreen ? (
                      <FaCompress size={20} />
                    ) : (
                      <FaExpand size={20} />
                    )}
                  </button>
                </div>
              </>
            )}
            {/* Output Section */}
            <div
              className="mt-4 bg-[#212334] p-3 rounded-xl shadow-top-a371f7 "
              style={{
                boxShadow: "0 -5px 85px -5px #486f8e",
              }}
            >
              <div className="flex items-center gap-1 bg-[#212334] p-3">
                <LuSquareCode />
                <h2 className="text-white text-sm">Output</h2>
              </div>
              {selectedLanguages.includes("html") ||
              selectedLanguages.includes("css") ||
              selectedLanguages.includes("javascript") ? (
                <iframe
                  className={`w-full transition-all duration-500 ease-in-out border rounded`}
                  srcDoc={`<html><style>${code.css}</style><script>${code.javascript}</script>${code.html}</html>`}
                  sandbox="allow-scripts"
                  title="Output"
                  style={{
                    height: isFullScreen ? "100vh" : "30vh", // Full height in fullscreen, 60% height in normal mode
                    transition: "height 0.5s ease-in-out", // Smooth height transition
                  }}
                />
              ) : (
                <div className="mt-4">
                  <pre className="p-4 bg-gray-800 text-white rounded">
                    {selectedLanguages.includes("python")
                      ? pythonOutput
                      : "Write your code above."}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
