import React from "react";
import SmallCalendar from "../schedule/SmallCalender";
import Labels from "../schedule/Labels";
import CreateEventButtonStudent from "./CreateEventButtonStudent";
export default function Sidebar() {
  return (
    <aside className=" p-5 w-64 bg-[#333332] ">
      <CreateEventButtonStudent />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
