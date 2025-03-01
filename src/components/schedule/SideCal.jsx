import React from "react";
import CreateEventButton from "../schedule/CreateEventButton";
import SmallCalendar from "../schedule/SmallCalender";
import Labels from "../schedule/Labels";
export default function Sidebar() {
  return (
    <aside className=" p-5 w-64 bg-[#333332] ">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
