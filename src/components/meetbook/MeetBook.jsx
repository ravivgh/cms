import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import MeetSche from "../MeetSche";
import { HiUsers } from "react-icons/hi";

import { MdDateRange } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { PiVideoConference } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import Switch from "@mui/material/Switch";
import { MdOutlineLink, MdContentCopy } from "react-icons/md";
import { Button } from "../ui/button";
import { TriangleAlert, X } from "lucide-react";
import { FaUniversity } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { IoClose } from "react-icons/io5";

const MeetBook = ({ onClose, onChange, value, start, end, onClick }) => {
  const [showAvailability, setShowAvailability] = useState(false);
  const [showAvailabilityPerson, setShowAvailabilityPerson] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("day"); // Tracks current view: "day", "week", or "month"
  const [startTime, setStartTime] = useState(null); // Selected start time
  const [endTime, setEndTime] = useState(null); // Selected end time
  const [checked, setChecked] = React.useState(false);
  const [title, setTitle] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  // Generate time slots
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 6; hour <= 23; hour++) {
      const time = `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`;
      timeSlots.push(time);
    }
    return timeSlots;
  };

  // Generate weekly dates
  const generateWeekDates = () => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 0 }); // Start of week (Sunday)
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i));
    }
    return days;
  };
  // Generate monthly dates
  const generateMonthDates = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const days = [];
    let current = start;
    while (current <= end) {
      days.push(current);
      current = addDays(current, 1);
    }
    return days;
  };

  // Handle time selection
  const handleTimeSelection = (time) => {
    if (!startTime) {
      setStartTime(time); // Set start time
    } else if (!endTime && time > startTime) {
      setEndTime(time); // Set end time if valid
    } else {
      // Reset if both are already selected
      setStartTime(time);
      setEndTime(null);
    }
  };
  const [copySuccess, setCopySuccess] = useState(false);
  const link = "https://metting24522";

  // Function to handle copy to clipboard
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset the success state after 2 seconds
      })
      .catch((error) => {
        console.error("Copy failed:", error);
        setCopySuccess(false);
      });
  };
  const [email, setEmail] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // List of dummy email addresses
  const dummyEmails = ["john@gmail.com", "sara@gmail.com"];

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Extract the part before @
    const namePart = value.includes("@") ? value.split("@")[0] : value;

    // Suggest emails that start with the name part
    if (namePart.length > 0) {
      setSuggestions(
        dummyEmails.filter((email) =>
          email.toLowerCase().startsWith(namePart.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestedEmail) => {
    setEmail(suggestedEmail);
    setSuggestions([]);
  };
  return (
    <>
      <div className="text-black ">
        <div className="bg-[#f0f4f9] h-auto p-5 w-[450px] rounded-xl shadow-2xl border border-gray-300 ">
          <div className="flex justify-between">
            <div className="">
              <h1 className="text-xl">Schedule Your meeting</h1>
              <p className="text-gray-500">
                Add recipients and choose meeting time
              </p>
            </div>
            <div className="" onClick={onClose}>
              <IoClose className="text-gray-500 cursor-pointer border border-gray-400 rounded-full p-2 text-4xl" />
            </div>
          </div>
          <div className="w-full h-[0.5px] bg-gray-300 mt-5"></div>
          {isVisible && (
            <div className="relative rounded-lg border border-slate-400/50 px-4 py-5 text-blue-800 bg-[#4d78c210] my-5">
              <button
                className="absolute top-2 right-2 text-blue-800 hover:text-blue-800"
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
                Remember to check recurrence or repeat in calendar invitation
              </p>
            </div>
          )}

          <div className="pt-5">
            <h1>Details</h1>
            <div className="">
              <div className="mx-10 mt-2 mb-3">
                <TextField
                  id="standard-basic"
                  label="Add title"
                  variant="standard"
                  fullWidth
                  name="title"
                  value={value}
                  onChange={onChange}
                  InputProps={{
                    style: {
                      color: "black", // Text color
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "gray", // Label color
                    },
                  }}
                  sx={{
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "gray", // Default underline color
                    },
                    "& .MuiInput-underline:hover:before": {
                      borderBottomColor: "black", // Underline color on hover
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "blue", // Underline color on focus
                    },
                  }}
                />
              </div>
              <div className="flex items-center">
                <IoMdTime className="w-5 h-5" />
                <div className=" space-y-3 ml-5">
                  <div className="">
                    {" "}
                    <h1>General availability</h1>
                    <p className="text-gray-500 text-xs">
                      {" "}
                      Set when you're regularly available for appointments.
                    </p>
                  </div>

                  <Button
                    className="bg-[#dde3ea] text-[#1650d0] gap-2 hover:bg-[#dde3ea]"
                    onClick={() => setShowAvailability(!showAvailability)}
                  >
                    Add Date / Time{" "}
                    <span>
                      <MdDateRange className="h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </div>

              {showAvailability && (
                <motion.div
                  className="max-w-lg p-4 bg-[#dae1e96c] shadow-sm rounded-lg mt-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <input
                    type="datetime-local"
                    name="start"
                    value={start}
                    onChange={onChange}
                    className="p-2 border mb-2 w-full bg-[#dde3ea]"
                  />
                  <input
                    type="datetime-local"
                    name="end"
                    value={end}
                    onChange={onChange}
                    className="p-2 border mb-2 w-full bg-[#dde3ea]"
                  />
                  {/* Tabs for Day/Week/Month */}
                  {/* <Tabs.Root
                    defaultValue="day"
                    className="mb-4"
                    onValueChange={(value) => setView(value)}
                  >
                    <Tabs.List className="flex border-b border-gray-300 bg-[#efefef] p-3 rounded-xl">
                      {["Day", "Week", "Month"].map((tab) => (
                        <Tabs.Trigger
                          key={tab}
                          value={tab.toLowerCase()}
                          className={clsx(
                            "flex-1 p-2 text-center text-sm font-medium",
                            "hover:bg-blue-100 hover:text-blue-800 rounded-md",
                            "radix-state-active:border-black radix-state-active:text-black",
                            "radix-state-inactive:border-transparent radix-state-inactive:text-gray-500  ",
                            "data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800",
                            "data-[state=inactive]:text-gray-500"
                          )}
                        >
                          {tab}
                        </Tabs.Trigger>
                      ))}
                    </Tabs.List>
                  </Tabs.Root> */}

                  {/* Date Header */}
                  {/* <div className="flex items-center justify-between py-2">
                    <button
                      onClick={() =>
                        setSelectedDate(
                          new Date(
                            view === "day"
                              ? selectedDate.setDate(selectedDate.getDate() - 1)
                              : view === "week"
                              ? selectedDate.setDate(selectedDate.getDate() - 7)
                              : selectedDate.setMonth(
                                  selectedDate.getMonth() - 1
                                )
                          )
                        )
                      }
                      className="text-sm text-gray-500 hover:underline"
                    >
                      &lt;
                    </button>
                    <div className="text-lg font-medium">
                      {view === "day"
                        ? format(selectedDate, "EEE dd MMMM")
                        : view === "week"
                        ? `${format(
                            startOfWeek(selectedDate),
                            "dd MMM"
                          )} - ${format(
                            addDays(startOfWeek(selectedDate), 6),
                            "dd MMM"
                          )}`
                        : format(selectedDate, "MMMM yyyy")}
                    </div>
                    <button
                      onClick={() =>
                        setSelectedDate(
                          new Date(
                            view === "day"
                              ? selectedDate.setDate(selectedDate.getDate() + 1)
                              : view === "week"
                              ? selectedDate.setDate(selectedDate.getDate() + 7)
                              : selectedDate.setMonth(
                                  selectedDate.getMonth() + 1
                                )
                          )
                        )
                      }
                      className="text-sm text-gray-500 hover:underline"
                    >
                      &gt;
                    </button>
                  </div> */}

                  {/* Render Dates */}
                  {/* <div className="mt-4">
                    {view === "day" && (
                      <div className="grid grid-cols-3 gap-2">
                        {generateTimeSlots().map((time) => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelection(time)}
                            className={clsx(
                              "p-2 border rounded-lg text-sm text-center",
                              startTime === time
                                ? "bg-[#1b4577] text-white"
                                : endTime === time
                                ? "bg-[#9c8f2d86] text-white"
                                : "hover:bg-gray-100"
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    )}
                    {view === "week" && (
                      <div className="grid grid-cols-7 gap-2">
                        {generateWeekDates().map((date) => (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={clsx(
                              "p-2 border rounded-lg text-sm text-center",
                              selectedDate.toDateString() ===
                                date.toDateString()
                                ? "bg-blue-500 text-white"
                                : "hover:bg-gray-100"
                            )}
                          >
                            {format(date, "EEE dd")}
                          </button>
                        ))}
                      </div>
                    )}
                    {view === "month" && (
                      <div className="grid grid-cols-7 gap-2">
                        {generateMonthDates().map((date) => (
                          <button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            className={clsx(
                              "p-2 border rounded-lg text-sm text-center",
                              selectedDate.toDateString() ===
                                date.toDateString()
                                ? "bg-blue-500 text-white"
                                : "hover:bg-gray-100"
                            )}
                          >
                            {format(date, "d")}
                          </button>
                        ))}
                      </div>
                    )}
                  </div> */}

                  {/* Selected Time Range */}
                  {/* {(startTime || endTime) && (
                    <div className="mt-4 p-2 bg-[#dde3ea] text-gray-800 rounded-lg flex items-center gap-2">
                      <span>Selected Time:</span>
                      {startTime && (
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-blue-800 rounded-full"></span>
                          <span>{startTime}</span>
                        </div>
                      )}
                      {endTime && (
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-[#9c8f2d86] rounded-full"></span>
                          <span>{endTime}</span>
                        </div>
                      )}
                    </div>
                  )} */}
                </motion.div>
              )}
            </div>
            <div className="w-full h-[0.5px] bg-gray-300 mt-3"></div>
            <div className="">
              <div className="flex items-center gap-2 my-5">
                <HiUsers />
                <div className="w-full ml-5 relative">
                  {" "}
                  <TextField
                    label="Add guest"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={handleEmailChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#dde3ea",
                        color: "black",
                        borderColor: "white",
                        "& fieldset": {
                          borderColor: "white",
                        },
                      },
                    }}
                  />
                  {suggestions.length > 0 && (
                    <Paper
                      elevation={3}
                      style={{ marginTop: "8px" }}
                      sx={{
                        marginTop: "8px",
                        position: "absolute",
                        borderRadius: "4px", // Rounded corners
                        maxHeight: "200px", // Limit height if there are many suggestions
                        overflowY: "auto", // Add scroll for overflow
                      }}
                    >
                      <List>
                        {suggestions.map((suggestion, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemButton
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              <ListItemText primary={suggestion} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-gray-300 mt-3"></div>
            <div className="flex items-center gap-2 mt-5">
              <PiVideoConference className="w-5 h-5" />

              <div className="ml-5 space-y-3">
                <div className="">
                  <h1>Meetup Link</h1>
                  <p className="text-gray-500 text-xs">
                    Ensure your mic and camera are ready!{" "}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineLink className="text-blue-800" />
                  <span className="text-blue-800">{link}</span>

                  <div className="">
                    {" "}
                    <button
                      onClick={handleCopyClick}
                      aria-label="Copy link"
                      className="text-blue-800 p-2  rounded cursor-pointer bg-slate-200"
                    >
                      <MdContentCopy size={15} />
                    </button>
                    {copySuccess && (
                      <span className="text-gray-500 text-sm ml-2">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-gray-300 mt-3"></div>
            <div className="">
              <div className="flex items-center gap-2 mt-5">
                <FaRegBell />
                <div className="flex items-center gap-2 justify-between w-full">
                  {" "}
                  <h1 className="ml-5">Reminder 15 minutes before meeting</h1>
                  <Switch checked={checked} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-gray-300 mt-3"></div>

            <div className="flex items-center gap-2 mt-5">
              <FaUser />
              <div className="space-y-3 ml-5">
                {" "}
                <div
                  className=" cursor-pointer"
                  onClick={() =>
                    setShowAvailabilityPerson(!showAvailabilityPerson)
                  }
                >
                  <h1>Personal Details</h1>
                  <p className="text-gray-500 text-xs">
                    Your some kind personal details.
                  </p>
                </div>
                {showAvailabilityPerson && (
                  <motion.div
                    className="max-w-lg"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <FaUniversity />

                      <h1>Vivekananda College</h1>
                    </div>
                    <div className="w-full h-[0.5px] bg-gray-300 mt-3"></div>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar>
                        <AvatarImage
                          src="https://avatars.githubusercontent.com/u/2?v=4"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h1>sara smith</h1>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            <div className="">
              <Button
                className="bg-[#1650d0] text-white mt-5 rounded-full"
                onClick={onClick}
              >
                Add to calendar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetBook;
