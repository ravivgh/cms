import React, { useEffect, useState } from "react";
import {
  Label,
  Pie,
  PieChart,
  LabelList,
  Tooltip,
  Cell,
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
} from "recharts";
import DashProgress from "./DashboardProgress/DashProgress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

// const chartData = [
//   { status: "Present", count: 120, fill: "#755485" },
//   { status: "Absent", count: 30, fill: "#27282c" },
// ];
const chartDatas = [
  { month: "January", present: 186, absent: 170 },
  { month: "February", present: 305, absent: 295 },
  { month: "March", present: 237, absent: 50 },
  { month: "April", present: 73, absent: 10 },
  { month: "May", present: 209, absent: 40 },
  { month: "June", present: 214, absent: 35 },
];

const chartConfig = {
  present: {
    label: "Present",
    color: "#344bfd", // Customize this color for Present
  },
  absent: {
    label: "Absent",
    color: "#49a677", // Customize this color for Absent
  },
};

const Chart = (present,absent,total) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Retrieve subjects from local storage
    const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(storedSubjects);
    if (storedSubjects.length > 0) {
      setSelectedSubject(storedSubjects[0].name);
      console.log(storedSubjects);
    }
  }, []);
  useEffect(() => {
    // Update chart data based on selected subject
    const subjectObj = subjects.find((s) => s.name === selectedSubject);
    if (subjectObj) {
      // Simulated data based on the selected subject
      const data = [
        {
          status: "Present",
          count: present,
          fill: "#4a805f",
        },
        {
          status: "Absent",
          count: absent,
          fill: "#27282c",
        },
      ];
      setChartData(data);
    }
  }, [selectedSubject, subjects]);
  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <>
      <div className="flex items-center justify-around bg-white flex-wrap">
        <div className="">
          <Card className=" py-10 bg-[#fff] shadow-md rounded-2xl ">
            <CardHeader></CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-20 flex-wrap ">
                <div className="flex items-center justify-center gap-5">
                  <div className="bg-black ">
                    <h1 className="text-white px-2 ">1</h1>
                  </div>
                  <DashProgress
                    color=" #4a805f"
                    text="Present"
                    description="Total Present"
                    percentage={90}
                  />
                </div>
                <div className="flex items-center justify-center gap-5">
                  <div className="bg-black ">
                    <h1 className="text-white px-2 ">2</h1>
                  </div>
                  <DashProgress
                    color="#b03d3d"
                    text="Absent"
                    description="Total Absent"
                    percentage={60}
                  />
                </div>
                <div className="flex items-center justify-center gap-5">
                  <div className="bg-black ">
                    <h1 className="text-white px-2 ">3</h1>
                  </div>
                  <DashProgress
                    color="#1d68bd"
                    text="Total Students"
                    description="Total Students"
                    percentage={75}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        </div>
        <div className="">
          <Card className="rounded-2xl shadow-md">
            <CardHeader className="items-center pb-4">
              <CardTitle>Attendance Insights</CardTitle>
              <CardDescription>
                Showing total present or absent for the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <RadarChart
                  data={chartDatas}
                  margin={{
                    top: -40,
                    bottom: -10,
                  }}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <PolarAngleAxis dataKey="month" />
                  <PolarGrid />
                  <Radar dataKey="present" fill="#1d68bd" fillOpacity={0.6} />
                  <Radar dataKey="absent" fill="#228276" />
                  <ChartLegend
                    className="mt-8"
                    content={<ChartLegendContent />}
                  />
                </RadarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 pt-4 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-6 bg-white">
        <div className="w-full md:w-[48%] lg:w-[40%] ">
          <Card className=" bg-[#fff] shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle>Attendance Bar Chart</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={chartDatas}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  {/* Present Bar */}
                  <Bar
                    dataKey="present"
                    fill={chartConfig.present.color}
                    radius={8}
                  >
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                  {/* Absent Bar */}
                  <Bar
                    dataKey="absent"
                    fill={chartConfig.absent.color}
                    radius={8}
                  >
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing attendance data for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full md:w-[48%] lg:w-[40%]">
          <DropdownMenu className="bg-black text-black">
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
                {subjects.map((subject, index) => (
                  <DropdownMenuRadioItem key={index} value={subject.name}>
                    {subject.subject}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Card className="flex flex-col  bg-[#fff] rounded-2xl shadow-md">
            <CardHeader className="items-center pb-0">
              <CardTitle>Attendance</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
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
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
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

export default Chart;
