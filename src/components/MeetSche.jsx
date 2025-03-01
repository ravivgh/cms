import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction"; // for drag & drop and selectable
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MenuItem, Select, Box, Button, Typography } from "@mui/material";

import { IoMdTime } from "react-icons/io";
import { LuArrowRight } from "react-icons/lu";
import { IoMdList } from "react-icons/io";
import { MdChevronLeft } from "react-icons/md";
import { motion } from "framer-motion";
import { MdChevronRight } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import MeetBook from "./meetbook/MeetBook";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Calendar = () => {
  const calendarRef = useRef(null); // Reference to FullCalendar
  const [currentView, setCurrentView] = useState("dayGridMonth"); // Default view
  const [currentDate, setCurrentDate] = useState(new Date());
  const notifications = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com" },
  ];
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleViewChange = (event) => {
    const newView = event.target.value;
    setCurrentView(newView); // Update the dropdown value
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(newView); // Change FullCalendar view
    }
  };
  const handlePreviousClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev(); // Navigate to the previous period
      setCurrentDate(calendarApi.getDate()); // Update the displayed date
    }
  };

  const handleNextClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next(); // Navigate to the next period
      setCurrentDate(calendarApi.getDate()); // Update the displayed date
    }
  };
  const handleTodayClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today(); // Navigate to today
      setCurrentDate(new Date());
    }
  };
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, options); // Format: January 2025
  };
  const [showComponent, setShowComponent] = useState(true);

  const handleButtonClick = () => {
    setShowComponent(!showComponent); // Toggle the component visibility
  };
  const handleClose = () => {
    setShowComponent(false);
  };
  const [events, setEvents] = useState([
    {
      id: "1", // Unique ID for each event
      title: "Team Meeting",
      start: "2025-01-10T10:00:00",
      end: "2025-01-10T11:00:00",
      descriptions: [], // Store multiple descriptions here
      classNames: ["bg-green-500 text-black border-none "],
    },
    {
      id: "2",
      title: "Project Demo",
      start: "2025-01-12T14:00:00",
      end: "2025-01-12T15:00:00",
      descriptions: [],
      classNames: ["bg-yellow-500 text-black border-none"],
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
  });

  const [newDescription, setNewDescription] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Handle input changes for event details
  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add new event
  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert("Please fill out all fields!");
      return;
    }

    const newEventObject = {
      id: `${Date.now()}`, // Unique ID using the current timestamp
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      descriptions: [],
      classNames: ["bg-blue-500 text-white border-none"],
    };

    setEvents((prevEvents) => [...prevEvents, newEventObject]);
    setNewEvent({ title: "", start: "", end: "" }); // Clear inputs
  };

  const handleInputChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleAddDescriptionClick = (eventId) => {
    setSelectedEventId(eventId); // Set the event that will be edited
  };

  const handleDescriptionSave = () => {
    if (newDescription.trim() === "") return; // Avoid saving empty descriptions

    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === selectedEventId
          ? {
              ...event,
              descriptions: [...event.descriptions, newDescription], // Add the new description
            }
          : event
      )
    );
    setNewDescription(""); // Clear the input field after saving
    setSelectedEventId(null); // Deselect the event
  };

  const renderEventContent = (eventInfo) => {
    const { event } = eventInfo;
    const eventDetails = events.find((e) => e.id === event.id);

    return (
      <Card className="shadow-xl ">
        <CardHeader>
          <div className="flex justify-between items-center gap-3">
            <h1 className="text-2xl"> {event.title}</h1>
            <div className="flex items-center gap-1 border border-gray-600 rounded-full text-sm px-2 py-1">
              <IoMdTime />
              <span>
                {(() => {
                  const durationInMinutes = Math.round(
                    (new Date(event.end) - new Date(event.start)) / (1000 * 60)
                  );
                  const hours = Math.floor(durationInMinutes / 60); // Calculate hours
                  const minutes = durationInMinutes % 60; // Calculate remaining minutes

                  // Format output
                  if (hours > 0) {
                    return `${hours}h ${minutes}min`;
                  } else {
                    return `${minutes}min`;
                  }
                })()}
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">Your Scheduling </p>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between">
            {" "}
            <div className="">
              <CardDescription className="text-xl text-black">
                {
                  new Date(event.start)
                    .toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .split(" ")[0]
                }{" "}
                <span className="text-gray-400">
                  {
                    new Date(event.start)
                      .toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      .split(" ")[1]
                  }
                </span>
              </CardDescription>
              <CardDescription>
                {new Date(event.start).toLocaleDateString()}{" "}
                {/* Extracts only the date */}
              </CardDescription>
            </div>
            <div className=" ">
              <LuArrowRight className="border border-gray-400 rounded-full w-5 h-5" />
            </div>
            <div className="">
              <CardDescription className="text-xl text-black">
                {
                  new Date(event.end)
                    .toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .split(" ")[0]
                }{" "}
                <span className="text-gray-400">
                  {
                    new Date(event.end)
                      .toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                      .split(" ")[1]
                  }
                </span>
              </CardDescription>
              <CardDescription>
                {new Date(event.end).toLocaleDateString()}{" "}
                {/* Extracts only the date */}
              </CardDescription>
            </div>
          </div>
        </CardContent>
        <div className="w-full h-[0.5px] bg-gray-300 mb-2"></div>

        <CardFooter className="">
          {/* Show existing descriptions */}

          <div>
            <CardDescription className="font-medium mt-2">
              <div className="flex items-center gap-1">
                <IoMdList />
                Descriptions
              </div>
            </CardDescription>
            {eventDetails.descriptions.length > 0 && (
              <ul className="list-disc ml-5">
                {eventDetails.descriptions.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="ml-auto">
            {/* Show 'Add Description' button if no active description being added */}
            {selectedEventId !== event.id && (
              <button
                onClick={() => handleAddDescriptionClick(event.id)}
                className="bg-blue-500 text-white rounded px-4 py-1 mt-2"
              >
                Add Description
              </button>
            )}
          </div>
          <div className="">
            {/* Display textarea and save button if adding description */}
            {selectedEventId === event.id && (
              <div className="mt-2">
                <textarea
                  value={newDescription}
                  onChange={handleInputChange}
                  placeholder="Add a description..."
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={handleDescriptionSave}
                  className="bg-green-500 text-white rounded px-4 py-1 mt-2"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </CardFooter>
        <div className="w-full h-[0.5px] bg-gray-300 mt-2"></div>
        <div className="py-3 px-3">
          {" "}
          <div className="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5 bg-slate-200">
            <div className="flex -space-x-1.5">
              <img
                className="rounded-full ring-1 ring-background"
                src="https://avatars.githubusercontent.com/u/1?v=4"
                width={30}
                height={30}
                alt="Avatar 01"
              />
              <img
                className="rounded-full ring-1 ring-background"
                src="https://avatars.githubusercontent.com/u/2?v=4"
                width={30}
                height={30}
                alt="Avatar 02"
              />
            </div>
            <p className="px-2 text-xs text-muted-foreground">
              Join
              <strong className="font-medium text-foreground pl-1">
                Member
              </strong>{" "}
            </p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      <div className="flex ">
        {showComponent && (
          <motion.div
            initial={{ x: "-100%" }} // Start from left (outside the view)
            animate={{ x: 0 }} // Move to the default position
            exit={{ x: "100%" }} // Slide out to the right
            transition={{ type: "spring", stiffness: 300, damping: 70 }}
            className=""
          >
            <MeetBook
              onClose={handleClose}
              value={newEvent.title}
              start={newEvent.start}
              end={newEvent.end}
              onChange={handleEventInputChange}
              onClick={handleAddEvent}
            />
          </motion.div>
        )}
        <div className="text-black px-4 w-full bg-slate-50 rounded-xl">
          {/* Event form for adding new events */}
          <div className="">
            {/* <h2 className="font-bold mb-2">Add New Event</h2>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleEventInputChange}
              placeholder="Event Title"
              className="p-2 border mb-2 w-full"
            />
            <input
              type="datetime-local"
              name="start"
              value={newEvent.start}
              onChange={handleEventInputChange}
              className="p-2 border mb-2 w-full bg-slate-100"
            /> */}
            {/* <input
              type="datetime-local"
              name="end"
              value={newEvent.end}
              onChange={handleEventInputChange}
              className="p-2 border mb-2 w-full"
            /> */}
            {/* <button
              onClick={handleAddEvent}
              className="bg-blue-500 text-white rounded px-4 py-1"
            >
              Add Event
            </button> */}
          </div>
          <div className="bg-[#dde3eac3] p-3 rounded-t-xl">
            <Box display="flex" alignItems="center">
              <Button
                style={{
                  width: "100px",
                  borderRadius: "50px",
                  border: "1px solid #000",
                  backgroundColor: "black",
                  color: "white",
                  padding: "10px 50px",
                  marginRight: "10px",
                  textTransform: "capitalize",
                }}
                onClick={handleButtonClick}
              >
                create{" "}
                <span className="ml-2">
                  <IoMdCreate />
                </span>
              </Button>

              {/* Today Button */}
              <Button
                onClick={handleTodayClick}
                style={{
                  width: "100px",
                  borderRadius: "50px",
                  border: "1px solid #000",
                  backgroundColor: "transparent",
                  color: "#000",
                  padding: "10px 50px",
                }}
              >
                Today
              </Button>

              {/* Navigation Buttons */}
              <Box
                display="flex"
                alignItems="center"
                className="flex justify-start items-center "
              >
                <Button
                  onClick={handlePreviousClick}
                  style={{ marginRight: "10px" }}
                >
                  <MdChevronLeft className="w-7 h-7 text-gray-500" />
                </Button>
                <Typography variant="h6" style={{ margin: "0 10px" }}>
                  {formatDate(currentDate)}
                </Typography>
                <Button
                  onClick={handleNextClick}
                  style={{ marginLeft: "10px" }}
                >
                  <MdChevronRight className="w-7 h-7 text-gray-500" />
                </Button>
              </Box>
              <div className="">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="relative"
                      onClick={handleClick}
                      aria-label="Notifications"
                    >
                      <BellIcon size={16} aria-hidden="true" />
                      {notifications.length > 0 && (
                        <Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
                          {notifications.length > 99
                            ? "99+"
                            : notifications.length}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex flex-col gap-3 mb-4"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src="/avatar.png" alt="User" />
                            <AvatarFallback>
                              {notification.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{notification.name}</p>
                            <p className="text-sm text-gray-500">
                              {notification.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Pair</Button>
                        </div>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                {/* Dropdown for view selection */}
                <Select
                  value={currentView}
                  onChange={handleViewChange}
                  style={{
                    width: "150px",
                    borderRadius: "50px",
                    border: "1px solid #000",
                  }}
                >
                  <MenuItem value="dayGridMonth">Month</MenuItem>
                  <MenuItem value="timeGridWeek">Week</MenuItem>
                  <MenuItem value="timeGridDay">Day</MenuItem>
                  <MenuItem value="listWeek">List</MenuItem>
                </Select>
              </div>
            </Box>
          </div>
          <FullCalendar
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            initialView={currentView}
            headerToolbar={false}
            events={events}
            editable={true}
            selectable={true}
            eventClassNames={({ event }) => event.classNames.join(" ")}
            eventContent={renderEventContent} // Use the custom renderEventContent function
          />
        </div>
      </div>
    </>
  );
};

export default Calendar;
