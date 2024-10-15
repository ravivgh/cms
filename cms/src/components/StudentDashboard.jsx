import React, { useState, useEffect } from "react";
import MonthSelection from "./MonthSelection";
import Card from "./Card";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import Chart from "./Chart";
import SessionRedirect from "@/scripts/checksession.mjs";

const StudentDashboard = () => {
  const [total, setTotal] = useState(0);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const url = 'http://localhost:5472/services/getstuddashatt';

  async function fetchData() {
    const postData = {
      sid: parseInt(localStorage.getItem("student_id")),
      month: selectedMonth,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTotal(data.Total);
      setAbsent(data.absent);
      setPresent(data.present);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  return (
    <>
      <div className="bg-[#f7f7f7] p-5 rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-black">Dashboard</h2>
          <div>
            <MonthSelection selectedMonth={selectedMonth} onSelectDate={handleMonthChange} />
          </div>
        </div>
        <hr
          className="mx-auto bg-[#0000003b] my-2 rounded-sm"
          style={{ width: "100%", height: "1px", borderWidth: 0 }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
          <Card icon={<GraduationCap />} title="Total Days" value={total} />
          <Card icon={<TrendingUp />} title="Present" value={present} />
          <Card icon={<TrendingDown />} title="Absent" value={absent} />
        </div>
        <div className="my-6">
          <Chart present={present} absent={absent} total={total} month={selectedMonth} />
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
