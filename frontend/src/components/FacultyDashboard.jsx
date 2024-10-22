import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import MonthSelection from "./MonthSelection";
import Cards from "./Card";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import { Pie, PieChart, Tooltip, Cell, Label } from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FacultyChart from "./ui/FacultyChart";
import SessionRedirect from "@/scripts/checksession.mjs";

const FacultyDashboard = ({ selectedMonth }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [presentcount, setPresentcount] = useState(0);
  const [absentcount, setAbsentcount] = useState(0);
  const [totalstud, setTotalstud] = useState(0);
  const [name, setName] = useState("om");
  const [staffname, setStaffname] = useState("");
  const [staffclass, setStaffclass] = useState("");

  console.log(selectedMonth);

  const fetchAttendancePercentage = async (month) => {
    console.log(month);
    try {
      const response = await axios.post(
        "http://localhost:5472/services/getstafdashcount",
        {
          month: new Date().getMonth() + 1,
          staff_id: parseInt(localStorage.getItem("staff_id")),
        }
      );

      setPresentcount(response.data.present || 0);
      setAbsentcount(response.data.absent || 0);
      setTotalstud(response.data.students || 0);
      setStaffname(response.data.staffname || "");
      setStaffclass(response.data.Class || "");
    } catch (error) {
      console.error("Error fetching attendance percentage:", error);
    }
  };

  useEffect(() => {
    const staffId = parseInt(localStorage.getItem("staff_id"));

    const fetchSubjectsByStaffId = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5472/services/getsubjectsbystaffid",
          {
            staff_id: staffId,
          }
        );

        console.log("API Response:", response.data);

        const subjectsData = response.data.map((item) => item.subject) || [];
        setSubjects(subjectsData);

        if (subjectsData.length > 0) {
          setSelectedSubject(subjectsData[0]);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjectsByStaffId();
  }, [name]);

  useEffect(() => {
    fetchAttendancePercentage(selectedMonth);
  }, []);

  useEffect(() => {
    const data = [
      {
        status: "Present",
        count: presentcount,
        fill: "#27a1dd",
      },
      {
        status: "Absent",
        count: absentcount,
        fill: "#27282c",
      },
    ];
    setChartData(data);
  }, [selectedSubject, presentcount, absentcount]);

  const totalCount = chartData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <>
      <div className="bg-[#f7f7f7] p-5 rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-black">Dashboard</h2>
          <h2 className="text-2xl text-black">Name : {staffname}</h2>
          <h2 className="text-2xl text-black">Class :{staffclass}</h2>
        </div>
        <hr
          className="mx-auto bg-[#0000003b] my-2 rounded-sm"
          style={{
            width: "100%",
            height: "1px",
            color: "white",
            borderWidth: 0,
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
          <Cards
            icon={<GraduationCap />}
            title="Total Students"
            value={totalstud}
          />
          <Cards
            icon={<TrendingUp />}
            title="Present"
            value={`${presentcount}%`}
          />
          <Cards
            icon={<TrendingDown />}
            title="Absent"
            value={`${absentcount}%`}
          />
        </div>
      </div>
      <div>
        <FacultyChart present={presentcount} absent={absentcount} />
      </div>
      <div className="flex flex-wrap justify-between gap-6">
        <div className="w-full md:w-[48%] lg:w-[40%]">
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Overall Attendance</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <div className="mx-auto aspect-square max-h-[250px] w-full flex justify-center">
                <PieChart width={250} height={250}>
                  <Tooltip />
                  <Pie
                    data={chartData}
                    dataKey="count"
                    nameKey="status"
                    innerRadius={60}
                    outerRadius={80}
                    strokeWidth={5}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="text-foreground text-3xl font-bold"
                              >
                                {totalCount.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="text-muted-foreground"
                              >
                                Attendance
                              </tspan>
                            </text>
                          );
                        }
                        return null;
                      }}
                    />
                  </Pie>
                </PieChart>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total attendance for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default FacultyDashboard;
