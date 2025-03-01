import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "../components/schedule/CalendarHeader";

import Month from "../components/schedule/Month";
import GlobalContext from "@/context/GlobalContext";
import EventModal from "../components/schedule/EventModel";
import { getMonth } from "@/utils/getMonth";
import SidebarFaculty from "./schedule/SideCalFaculty";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    if (typeof monthIndex === "number") {
      setCurrentMonth(getMonth(monthIndex));
    }
  }, [monthIndex]);

  return (
    <>
      <React.Fragment>
        {showEventModal && <EventModal />}
        <div className="h-screen flex flex-col">
          <CalendarHeader />
          <div className="flex flex-1">
            <SidebarFaculty className="text-black" />
            <Month month={currentMonth} className="text-black" />
          </div>
        </div>
      </React.Fragment>
    </>
  );
}

export default App;
