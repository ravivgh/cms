import MonthSelection from "./MonthSelection";
import Card from "./Card";
import MainChart from "./ui/MainChart";
import { MdOutlineGroups } from "react-icons/md";
import { useEffect, useState } from "react";
import { GraduationCap, TrendingDown, TrendingUp, Library } from "lucide-react";
import fetchCounts from "@/scripts/Getcounts";

const Dashboard = ({ isSidebarOpen }) => {
  const [Studentc, setStudentc] = useState(0);
  const [Staffc, setStaffc] = useState(0);
  const [Subc, setSubc] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [present, setPresent] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const counts = async (month) => {
    try {
      let res = await fetchCounts(month);
      if (res) {
        setStudentc(res.Studentcount || 0);
        setStaffc(res.staffcount || 0);
        setSubc(res.Subjects || 0);
        setAbsent(res.absent || 0);
        setPresent(res.present || 0);
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  useEffect(() => {
    if (selectedMonth) {
      counts(selectedMonth);
    }
  }, [selectedMonth]);

  const sidebarWidth = isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)";
  const marginLeft = isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]";

  return (
    <main
      className={`p-4 transition-all duration-500 ${marginLeft}`}
      style={{
        width: sidebarWidth,
      }}
    >
      <div className="bg-[#f7f7f7] p-5 rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-black">Dashboard</h2>
          <div>
            <MonthSelection onSelectDate={setSelectedMonth} />
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
          <Card icon={<GraduationCap />} title="Total Students" value={Studentc} />
          <Card
            icon={<MdOutlineGroups style={{ fontSize: "25px" }} />}
            title="Total Faculty"
            value={Staffc}
          />
          <Card icon={<Library />} title="Total Subject" value={Subc} />
          <Card icon={<TrendingUp />} title="Present" value={present + "%"} />
          <Card icon={<TrendingDown />} title="Absent" value={absent + "%"} />
        </div>
        <div className="my-6">
          <MainChart present={parseFloat(present)} absent={parseFloat(absent)} month={selectedMonth} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
