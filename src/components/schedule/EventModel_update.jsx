import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "@/context/GlobalContext";
import { TextField } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { IoMdTime } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent, setSelectedEvent } =
    useContext(GlobalContext);

  // State variables for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");

  const [staffList, setStaffList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [staffLoading, setStaffLoading] = useState(true);
  const [subjectLoading, setSubjectLoading] = useState(true);

  // Populate data when editing an event
  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.Subject_Name || "");
      setDescription(selectedEvent.Subject_Desc || "");
      setStartTime(selectedEvent.Sub_From || "");
      setEndTime(selectedEvent.Sub_to || "");
      setSelectedSubject(selectedEvent.Subject_Name || "");
      setSelectedFaculty(selectedEvent.faculty || null);
    }
  }, [selectedEvent]);

  // Fetch faculty list
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch("http://localhost:5472/services/retrievestaffforcal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        if (!response.ok) throw new Error("Failed to fetch staff data");

        const data = await response.json();
        setStaffList(data);

        if (selectedEvent && selectedEvent.faculty) {
          const matchedFaculty = data.find((staff) => staff._id === selectedEvent.faculty);
          if (matchedFaculty) {
            setSelectedFaculty({ id: matchedFaculty._id, name: matchedFaculty.Staff_name });
          }
        }
      } catch (err) {
        console.error("Error fetching staff data:", err);
      } finally {
        setStaffLoading(false);
      }
    };

    fetchStaff();
  }, [selectedEvent]);

  // Fetch subjects list
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:5472/services/getsubjects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        if (!response.ok) throw new Error("Failed to fetch subjects data");

        const data = await response.json();
        setSubjectList(data);

        if (selectedEvent && selectedEvent.Subject_Name) {
          const matchedSubject = data.find((subject) => subject === selectedEvent.Subject_Name);
          if (matchedSubject) {
            setSelectedSubject(matchedSubject);
          }
        }
      } catch (err) {
        console.error("Error fetching subjects data:", err);
      } finally {
        setSubjectLoading(false);
      }
    };

    fetchSubjects();
  }, [selectedEvent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      subjectName: selectedSubject,
      subjectDescription: description,
      from: startTime,
      to: endTime,
      faculty: selectedFaculty ? selectedFaculty.id : null,
      selectedDate: daySelected.format("DD-MM-YYYY"),
      college_id: selectedEvent ? selectedEvent.college_id : 5912,
    };

    try {
      let response;
      if (selectedEvent) {
        eventData._id = selectedEvent._id;
        response = await fetch("http://localhost:5472/services/updatesubject", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        });
      } else {
        response = await fetch("http://localhost:5472/services/addsubject", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        });
      }

      if (!response.ok) throw new Error("Failed to save event");

      dispatchCalEvent({ type: selectedEvent ? "update" : "push", payload: eventData });

      setShowEventModal(false);
    } catch (error) {
      alert("Failed to save event. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center text-black z-40 bg-black bg-opacity-50">
      <form className="bg-white rounded-xl shadow-lg w-full md:w-1/2 lg:w-1/3 p-6">
        {/* Modal Header */}
        <header className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">{selectedEvent ? "Edit Event" : "Create Event"}</h2>
          <button onClick={() => setShowEventModal(false)} className="text-gray-500 hover:text-black">
            <IoIosClose className="text-3xl" />
          </button>
        </header>

        <div className="space-y-4 mt-4">
          {/* Subject Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-gray-100 text-black px-3 py-2 rounded w-full text-left">
                {selectedSubject || "Select a subject"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full bg-white shadow-md rounded">
              {subjectList.map((subject, index) => (
                <DropdownMenuItem key={index} onClick={() => setSelectedSubject(subject)}>
                  {subject}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Faculty Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-gray-100 text-black px-3 py-2 rounded w-full text-left">
                {selectedFaculty ? selectedFaculty.name : "Select a faculty"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full bg-white shadow-md rounded">
              {staffList.map((staff) => (
                <DropdownMenuItem key={staff._id} onClick={() => setSelectedFaculty({ id: staff._id, name: staff.Staff_name })}>
                  {staff.Staff_name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Submit Button */}
        <footer className="flex justify-end mt-6">
          <button type="submit" onClick={handleSubmit} className="bg-black hover:bg-gray-800 px-6 py-2 rounded text-white">
            {selectedEvent ? "Update" : "Save"}
          </button>
        </footer>
      </form>
    </div>
  );
}
