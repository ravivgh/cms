import GlobalContext from "@/context/GlobalContext";
import React, { useContext } from "react";
import { IoCreateOutline } from "react-icons/io5";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl "
    >
      <IoCreateOutline className="text-black w-5 h-5" />

      <span className="pl-3 pr-7 text-black"> Create</span>
    </button>
  );
}
