import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Assistant } from "@/components/Assistant";
import Quiz from "../components/Quiz";
const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const toggleChat = () => {
    if (isOpen) {
      setSelectedOption(null); // Reset selected option when closing
    }
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="fixed bottom-4 right-4 z-50 ">
        <motion.button
          aria-label={isOpen ? "Close live chat" : "Open live chat"}
          aria-haspopup="dialog"
          onClick={toggleChat}
          className="flex items-center justify-center w-[60px] h-[60px] rounded-full shadow-lg transition-all "
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
            className="absolute bottom-3 right-0 h-96 bg-white shadow-xl rounded-lg flex flex-col -z-10"
            initial={{ opacity: 0, y: 50, width: "24rem", height: "24rem" }}
            animate={{
              opacity: 1,
              y: 0,
              width: selectedOption ? "88rem" : "24rem",
              height: selectedOption ? "41rem" : "24rem",
            }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.5, // Smooth opening effect
            }}
          >
            {/* Chat Messages (Scrollable Area) */}
            <div className="flex-1 overflow-y-auto scroll-container p-4 space-y-4">
              {!selectedOption ? (
                <>
                  <h1 className="text-gray-500 bg-[#eaf0f6] p-3 text-sm">
                    Hey 👋 How do you want to get started with CampusFlow?
                  </h1>
                  <p className=" bg-[#eaf0f6] p-3 text-sm text-gray-500">
                    Personalize Your Needs by Selecting an Option Below
                  </p>

                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={() => setSelectedOption("assistant")}
                      className="px-4 py-2 bg-slate-100  rounded-full text-black  transition border border-black hover:bg-black hover:text-white"
                    >
                      Ask Assistant
                    </button>
                    <button
                      onClick={() => setSelectedOption("generate")}
                      className="px-4 py-2 bg-slate-100  rounded-full text-black  transition border border-black hover:bg-black hover:text-white"
                    >
                      Generate Question
                    </button>
                  </div>
                </>
              ) : (
                // Show selected component
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
                >
                  {selectedOption === "assistant" ? <Assistant /> : <Quiz />}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
