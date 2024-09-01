import React from "react";
import MonthSelection from "./MonthSelection";
import Card from "./Card";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import Chart from "./Chart";
const StudentDashboard = ({ selectedMonth }) => {
  return (
    <>
      <div className="bg-[#f7f7f7] p-5 rounded-lg  ">
        <div className="flex items-center justify-between">
          <h2 className=" text-2xl text-black">Dashboard</h2>
          <div>
            <MonthSelection selectedMonth={selectedMonth} />
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
          <Card
            icon={<GraduationCap />}
            title="Total Attendance"
            value={"30"}
          />
          <Card icon={<TrendingUp />} title="Present" value={"90%"} />
          <Card icon={<TrendingDown />} title="Absent" value={"10%"} />
        </div>
        <div className="my-6">
          <Chart />
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
