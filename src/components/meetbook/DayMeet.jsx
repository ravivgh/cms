/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "@/context/GlobalContext";
import { Avatar, AvatarImage } from "../ui/avatar";
export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? `bg-black text-white rounded-full w-7`
      : "";
  }
  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
            <p className="text-xs">
              {evt.startTime} - {evt.endTime}
            </p>
            {evt.selectedFaculty && (
              <div className="flex items-center gap-2 mt-1">
                <Avatar className="w-6 h-6">
                  <AvatarImage
                    src={evt.selectedFaculty.avatarUrl}
                    alt={evt.selectedFaculty.name}
                  />
                </Avatar>
                <span className="text-sm">{evt.selectedFaculty.name}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
