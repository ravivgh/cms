// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import MonthSelection from "./MonthSelection";
import Cards from "./Card";
import { MdOutlineGroups } from "react-icons/md";
import { GraduationCap, TrendingDown, TrendingUp, Library } from "lucide-react";
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
import Chart from "./Chart";
const FacultyDashboard = ({ selectedMonth }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [name, setName] = useState("om");
  useEffect(() => {
    // Retrieve subjects from local storage
    const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(storedSubjects);

    // Retrieve faculty-specific subjects
    const facultySubjects =
      JSON.parse(localStorage.getItem("facultySubjects")) || {};
    if (facultySubjects[name]) {
      setSelectedSubject(facultySubjects[name][0]); // Set default to first subject
    }
  }, [name]);
  useEffect(() => {
    // Update chart data based on selected subject
    if (selectedSubject) {
      const data = [
        {
          status: "Present",
          count: Math.floor(Math.random() * 100) + 50,
          fill: "#755485",
        },
        {
          status: "Absent",
          count: Math.floor(Math.random() * 100) + 20,
          fill: "#27282c",
        },
      ];
      setChartData(data);
    }
  }, [selectedSubject]);

  const totalCount = chartData.reduce((acc, curr) => acc + curr.count, 0);
  return (
    <>
      <div className=" bg-[#f7f7f7] p-5 rounded-lg ">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-black ">Dashboard</h2>
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
          <Cards
            icon={<GraduationCap />}
            title="Total Students"
            value={"120"}
          />

          <Cards icon={<TrendingUp />} title="Present" value={"90%"} />
          <Cards icon={<TrendingDown />} title="Absent" value={"10%"} />
        </div>
      </div>
      <div className="">
        <Chart />
      </div>
      <div className="flex flex-wrap justify-between gap-6">
        <div className="w-full md:w-[48%] lg:w-[40%]">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white bg-black p-3 rounded-sm my-3">
              Select Subject
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Subjects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                onValueChange={setSelectedSubject}
                value={selectedSubject}
              >
                {subjects
                  .filter((subject) => subject === selectedSubject)
                  .map((subject, index) => (
                    <DropdownMenuRadioItem key={index} value={subject}>
                      {subject}
                    </DropdownMenuRadioItem>
                  ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Attendance</CardTitle>
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
