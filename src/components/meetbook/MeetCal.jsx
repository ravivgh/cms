import React from "react";
import MeetEvent from "../meetbook/MeetEvent";
import MeetSamllCal from "../meetbook/MeetSamllCal";
import MeetLabel from "../meetbook/MeetLabel";
export default function Sidebar() {
  return (
    <aside className="border p-5 w-64 bg-[#f9f9f9] rounded-b-xl">
      <MeetEvent />
      <MeetSamllCal />
      <MeetLabel />
    </aside>
  );
}
