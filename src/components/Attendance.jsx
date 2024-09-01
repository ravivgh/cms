import { useState } from "react";
import AttendanceGrid from "../components/AttendanceGrid";
import MonthSelection from "../components/MonthSelection";
import { Button } from "@/components/ui/button";

function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayMonth, setDisplayMonth] = useState(selectedMonth);
  const [displayDate, setDisplayDate] = useState(selectedDate);

  const handleSearch = () => {
    setDisplayMonth(selectedMonth);
    setDisplayDate(selectedDate);
  };

  return (
    <div className=" bg-[#f7f7f7] p-5 rounded-lg ">
      <div className="attendance-heading">
        <h2 className="text-2xl  text-black py-10">Attendance Sheet</h2>
      </div>
      <hr
        className="mx-auto bg-[#0000003b] my-2 rounded-sm"
        style={{
          width: "100%",
          height: "1px",
          color: "white",
          borderWidth: 0,
        }}
      ></hr>
      <div className="flex gap-4 my-5 p-3 border rounded-lg">
        <MonthSelection
          selectedMonth={(value) => setSelectedMonth(value)}
          onSelectDate={(date) => setSelectedDate(date)}
        />
        <div className="search-button">
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>
      <div>
        <AttendanceGrid
          selectedMonth={displayMonth}
          selectedDate={displayDate}
        />
      </div>
    </div>
  );
}

export default Attendance;
