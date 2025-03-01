import React, { useContext, useState } from "react";
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

const facultyList = [
  {
    id: 1,
    name: "Mitesh",
    avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
  },
  {
    id: 2,
    name: "Aditi",
    avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
  },
  {
    id: 3,
    name: "Raj",
    avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
  },
];
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

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
      startTime,
      endTime,
      selectedFaculty,
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center text-black z-40">
      <form className="bg-[#f0f4f9] rounded-3xl shadow-2xl w-1/4">
        <header className="bg-gray-800 px-4 py-2 flex justify-end items-center rounded-t-3xl ">
          <div className="flex items-center gap-3">
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                <MdDelete className="text-xl" />
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400 ">
                <IoIosClose className="text-3xl" />
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end ">
            <div className=""></div>
            <div className="mx-5">
              {" "}
              <TextField
                id="standard-basic"
                label="Add subject title"
                variant="standard"
                name="title"
                value={title}
                required
                className="pt-3 border-0 text-gray-600  pb-2 w-full  border-gray-200 "
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 pt-5">
              {" "}
              <span className="material-icons-outlined text-black">
                <FaRegCalendarAlt className="text-gray-500" />
              </span>
              <p>{daySelected.format("dddd, MMMM DD")}</p>
            </div>
            <div className="flex items-center gap-2 ">
              <div className="flex items-center gap-2 py-5 ">
                <IoMdTime className="text-gray-500" />
                <label htmlFor="start-time" className="font-medium">
                  from
                </label>
                <input
                  type="time"
                  id="start-time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="p-1 border rounded bg-[#e9eef6]"
                />
              </div>
              <div className="flex items-center gap-2 py-5 ">
                <label htmlFor="end-time" className="font-medium">
                  to
                </label>
                <input
                  type="time"
                  id="end-time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="p-1 border rounded bg-[#e9eef6]"
                />
              </div>
            </div>

            <div className=" ">
              <div className="flex items-center justify-center gap-2 pb-3">
                <HiMiniUsers className="text-gray-500" />
                <DropdownMenu className="flex items-center justify-center">
                  <DropdownMenuTrigger asChild>
                    <button className="bg-[#e9eef6] text-gray-500 px-4 py-2 rounded w-full flex items-center gap-2">
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
                    {facultyList.map((faculty) => (
                      <DropdownMenuItem
                        key={faculty.id}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                        value={selectedFaculty}
                        onClick={() => setSelectedFaculty(faculty)}
                      >
                        <Avatar className="w-8 h-8 rounded-full">
                          <AvatarImage
                            src={faculty.avatarUrl}
                            alt={faculty.name}
                          />
                        </Avatar>
                        <span className="text-black font-medium">
                          {faculty.name}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center gap-2 ">
              {" "}
              <span className="material-icons-outlined text-gray-500">
                <HiOutlineSortDescending />
              </span>
              <Input
                type="text"
                name="description"
                placeholder="Add a description"
                value={description}
                required
                className="  text-gray-600  w-full  border-gray-200 bg-[#e9eef6]"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 py-5">
              {" "}
              <span className="material-icons-outlined text-gray-500">
                <TbCalendarEvent className="text-lg" />
              </span>
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
        <footer className="flex justify-end border-t p-3 mt-5 bg-slate-300 rounded-b-3xl">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-black  px-6 py-2 rounded-full text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
