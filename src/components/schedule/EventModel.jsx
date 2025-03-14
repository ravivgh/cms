import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "@/context/GlobalContext";
import { Input } from "../ui/input";
import { TextField } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { IoIosCheckmark } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { TbCalendarEvent } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoMdTime } from "react-icons/io";
import { HiOutlineSortDescending } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [startTime, setStartTime] = useState(
    selectedEvent ? selectedEvent.startTime : ""
  );
  const [endTime, setEndTime] = useState(
    selectedEvent ? selectedEvent.endTime : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  const [selectedFaculty, setSelectedFaculty] = useState(
    selectedEvent ? selectedEvent.selectedFaculty : ""
  );
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [staffList, setStaffList] = useState([]);
  const [staffLoading, setStaffLoading] = useState(true);
  const [staffError, setStaffError] = useState(null);

  const [classArray, setClassArray] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const [classLoading, setClassLoading] = useState(true);
  const [classError, setClassError] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch(
          "http://localhost:5472/services/retrievestaffforcal",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch staff data");
        }

        const data = await response.json();
        if (data.length > 0) {
          setStaffList(data);
        } else {
          setStaffError("No staff found");
        }
      } catch (err) {
        setStaffError("Error fetching staff data");
        console.error("Error fetching staff data:", err);
      } finally {
        setStaffLoading(false);
      }
    };

    fetchStaff();
  }, []);

  useEffect(() => {
    const fetchClassArray = async () => {
      try {
        const response = await fetch(
          "http://localhost:5472/services/getclassarray",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch class data");
        }

        const data = await response.json();
        if (data.length > 0) {
          setClassArray(data);
        } else {
          setClassError("No class data found");
        }
      } catch (err) {
        setClassError("Error fetching class data");
        console.error("Error fetching class data:", err);
      } finally {
        setClassLoading(false);
      }
    };

    fetchClassArray();
  }, []);

  const handleClassChange = (selectedClass) => {
    setSelectedClass(selectedClass);
    const selectedClassData = classArray.find(
      (cls) => cls.Class === selectedClass
    );
    if (selectedClassData) {
      setSectionList(selectedClassData.Sections);
      setSelectedSection(""); // Reset section when class changes
      setSubjectList([]); // Reset subjects when class changes
    }
  };

  const handleSectionChange = (selectedSection) => {
    setSelectedSection(selectedSection);
    const selectedSectionData = sectionList.find(
      (sec) => sec.Section === selectedSection
    );
    if (selectedSectionData) {
      setSubjectList(selectedSectionData.Subjects);
    }
  };

  const handleSubjectChange = (subject) => {
    setTitle(subject);
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Selected Class:", selectedClass);
    console.log("Selected Section:", selectedSection);

    // Time validation
    if (!startTime || !endTime) {
      alert("Please select both start and end times.");
      return;
    }

    if (endTime <= startTime) {
      alert("End time must be after start time.");
      return;
    }

    const eventData = {
      subjectName: title,
      subjectDescription: description,
      from: startTime,
      to: endTime,
      faculty: selectedFaculty.id,
      selectedDate: daySelected.format("DD-MM-YYYY"),
      Class: selectedClass,
      section: selectedSection,
      college_id: localStorage.getItem("college_id"),
    };

    try {
      const response = await fetch("http://localhost:5472/services/addsubject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.status == 409) {
       
        
        alert("Another Schedule already exsist for the Given Time");
        return; // Stop further execution
      }
      else if (response.status == 408) {
       
        
        alert("Faculty is already scheduled for another class at this time");
        return; // Stop further execution
      }

      const result = await response.json(); // Parse JSON

      if (!result) {
        console.error("Unable to Save Schedule");
        alert(result.message);
        return;
      }

      const calendarEvent = {
        title,
        description,
        label: selectedLabel,
        day: daySelected.valueOf(),
        id: selectedEvent ? selectedEvent.id : Date.now(),
        startTime,
        endTime,
        selectedFaculty,
        Class: selectedClass,
        section: selectedSection,
      };

      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
        dispatchCalEvent({ type: "push", payload: calendarEvent });
      }

      setShowEventModal(false);
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to save event. Please try again.");
    }
  };
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center text-black z-40 bg-black bg-opacity-50">
      <form className="bg-[#f0f4f9] rounded-3xl shadow-2xl w-full md:w-1/2 lg:w-1/3">
        <header className="bg-gray-800 px-4 py-2 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-lg font-semibold text-white">
            {selectedEvent ? "Edit Event" : "Create Event"}
          </h2>
          <div className="flex items-center gap-3">
            {selectedEvent && (
              <button
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="text-gray-400 hover:text-red-500 cursor-pointer"
              >
                <MdDelete className="text-xl" />
              </button>
            )}
            <button
              onClick={() => setShowEventModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <IoIosClose className="text-3xl" />
            </button>
          </div>
        </header>
        <div className="p-4">
          <div className="space-y-4">
            {/* Class Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Class
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="bg-[#e9eef6] text-gray-500 px-3 py-2 rounded w-full flex items-center justify-between">
                    {selectedClass ? (
                      <span className="text-black font-medium">
                        {selectedClass}
                      </span>
                    ) : (
                      <span className="text-gray-400">Select a class</span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-white shadow-md rounded">
                  {classLoading ? (
                    <DropdownMenuItem className="p-2">
                      Loading...
                    </DropdownMenuItem>
                  ) : classError ? (
                    <DropdownMenuItem className="p-2 text-red-500">
                      {classError}
                    </DropdownMenuItem>
                  ) : (
                    classArray.map((cls, index) => (
                      <DropdownMenuItem
                        key={index}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleClassChange(cls.Class)}
                      >
                        <span className="text-black font-medium">{cls.Class}</span>
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Section Dropdown */}
            {selectedClass && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Section
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="bg-[#e9eef6] text-gray-500 px-3 py-2 rounded w-full flex items-center justify-between">
                      {selectedSection ? (
                        <span className="text-black font-medium">
                          {selectedSection}
                        </span>
                      ) : (
                        <span className="text-gray-400">Select a section</span>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 bg-white shadow-md rounded">
                    {sectionList.map((sec, index) => (
                      <DropdownMenuItem
                        key={index}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSectionChange(sec.Section)}
                      >
                        <span className="text-black font-medium">{sec.Section}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Subject Dropdown */}
            {selectedSection && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Subject
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="bg-[#e9eef6] text-gray-500 px-3 py-2 rounded w-full flex items-center justify-between">
                      {title ? (
                        <span className="text-black font-medium">{title}</span>
                      ) : (
                        <span className="text-gray-400">Select a subject</span>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 bg-white shadow-md rounded">
                    {subjectList.map((subject, index) => (
                      <DropdownMenuItem
                        key={index}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSubjectChange(subject)}
                      >
                        <span className="text-black font-medium">{subject}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Subject Description */}
            <div>
              <TextField
                id="standard-basic"
                label="Subject Description"
                variant="standard"
                name="description"
                value={description}
                required
                className="w-full"
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={2}
              />
            </div>

            {/* Date and Time Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FaRegCalendarAlt className="text-gray-500" />
                <p className="text-sm">{daySelected.format("dddd, MMMM DD")}</p>
              </div>
              <div className="flex items-center gap-2">
                <IoMdTime className="text-gray-500" />
                <input
                  type="time"
                  id="start-time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="p-1 border rounded bg-[#e9eef6]"
                />
                <input
                  type="time"
                  id="end-time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="p-1 border rounded bg-[#e9eef6]"
                />
              </div>
            </div>

            {/* Member Section */}
            <div>
              <div className="flex items-center justify-center gap-2 pb-3">
                <HiMiniUsers className="text-gray-500" />
                <DropdownMenu className="flex items-center justify-center">
                  <DropdownMenuTrigger asChild>
                    <button className="bg-[#e9eef6] text-gray-500 px-3 py-2 rounded w-full flex items-center gap-2">
                      {selectedFaculty ? (
                        <>
                          <Avatar className="w-6 h-6 rounded-full">
                            <AvatarImage
                              src={selectedFaculty.avatarUrl}
                              alt={selectedFaculty.name}
                            />
                          </Avatar>
                          <span className="text-black font-medium">
                            {selectedFaculty.name}
                          </span>
                        </>
                      ) : (
                        <p className="flex justify-start">Add member</p>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 bg-white shadow-md rounded">
                    {staffLoading ? (
                      <DropdownMenuItem className="p-2">
                        Loading...
                      </DropdownMenuItem>
                    ) : staffError ? (
                      <DropdownMenuItem className="p-2 text-red-500">
                        {staffError}
                      </DropdownMenuItem>
                    ) : (
                      staffList.map((staff) => (
                        <DropdownMenuItem
                          key={staff.id}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            setSelectedFaculty({
                              id: staff._id,
                              name: staff.Staff_name,
                              avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
                            })
                          }
                        >
                          <Avatar className="w-8 h-8 rounded-full">
                            <AvatarImage
                              src="https://avatars.githubusercontent.com/u/1?v=4"
                              alt={staff.Staff_name}
                            />
                          </Avatar>
                          <span className="text-black font-medium">
                            {staff.Staff_name}
                          </span>
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Labels */}
            <div className="flex items-center gap-2 py-3">
              <TbCalendarEvent className="text-gray-500" />
              <div className="flex gap-x-2">
                {labelsClasses.map((lblClass, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  >
                    {selectedLabel === lblClass && (
                      <span className="material-icons-outlined text-gray-300 text-2xl">
                        <IoIosCheckmark />
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-3 bg-slate-300 rounded-b-3xl">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-black hover:bg-gray-800 px-6 py-2 rounded-full text-white transition-colors"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}