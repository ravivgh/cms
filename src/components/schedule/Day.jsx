import dayjs from "dayjs";
import React, { useContext, useState, useEffect, useMemo } from "react";
import GlobalContext from "@/context/GlobalContext";
import axios from "axios";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { MdDelete } from "react-icons/md"; // Import delete icon

dayjs.extend(customParseFormat);

export default function Day({ day, rowIdx }) {
  const [allEvents, setAllEvents] = useState([]);
  const { setDaySelected } = useContext(GlobalContext);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchTimeTable() {
      try {
        const response = await axios.post("http://localhost:5472/services/getTimeTable", {
          signal: controller.signal,
        });

        if (response.status === 200 && response.data.data) {
          console.log("Fetched events:", response.data.data);
          setAllEvents(response.data.data);
        } else {
          setAllEvents([]);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching timetable:", error);
        }
      }
    }

    fetchTimeTable();

    return () => {
      controller.abort();
    };
  }, []);

  // Filter events for the selected day
  const dayEvents = useMemo(() => {
    const filteredEvents = allEvents.filter((evt) => evt.date === day.format("DD-MM-YYYY"));
    console.log("Events for", day.format("DD-MM-YYYY"), ":", filteredEvents);
    return filteredEvents;
  }, [allEvents, day]);

  const currentDayClass = useMemo(() => {
    return day.format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
      ? "bg-black text-white rounded-full w-7"
      : "";
  }, [day]);

  // Convert time to 12-hour format
  function formatTimeTo12Hour(time) {
    return dayjs(time, "HH:mm").format("hh:mm A");
  }

  // Handle event deletion using POST request
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;

    try {
      const response = await axios.post(
        "http://localhost:5472/services/deletesubject",
        { id: eventId },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        // Remove deleted event from state to update UI
        setAllEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>}
        <p className={`text-sm p-1 my-1 text-center ${currentDayClass}`}>{day.format("DD")}</p>
      </header>

      <div className="flex-1">
        {dayEvents.length === 0 ? (
          <p className="text-gray-400 text-center text-sm p-2">No events</p>
        ) : (
          dayEvents.map((evt, index) => (
            <div
              key={`${evt._id}-${index}`} // Ensure each event has a unique key
              className="flex items-center justify-between bg-blue-200 p-2 mx-2 my-1 text-gray-700 text-sm rounded shadow"
            >
              <div className="flex-1">
                <p className="font-medium">{evt.Subject_Name}</p>
                <p className="text-xs">{formatTimeTo12Hour(evt.Sub_From)} - {formatTimeTo12Hour(evt.Sub_to)}</p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteEvent(evt._id)}
                className="text-red-500 hover:text-red-700 p-1 ml-2"
                title="Delete Subject"
              >
                <MdDelete className="text-lg" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
