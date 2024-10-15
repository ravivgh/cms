import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Label,
  Pie,
  PieChart,
  Tooltip,
  Cell,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";
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
} from "@/components/ui/chart";

const Chart = ({ present, absent, total, month }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [getpresent, setPresent] = useState(0);
  const [getabsent, setAbsent] = useState(0);

  const getMonthName = (month) => {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString('default', { month: 'long' });
  };

  const barChartData = [
    { month: getMonthName(month), present: present, absent: absent }
  ];

  const chartConfig = {
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
    layout: "vertical",
    barCategoryGap: "20%",
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      const sid = parseInt(localStorage.getItem("student_id"));

      try {
        const response = await axios.post('http://localhost:5472/services/getsubjectsbysid', {
          sid: sid,
        });

        setSubjects(response.data.subjectList || []);
        if (response.data.subjectList.length > 0) {
          setSelectedSubject(response.data.subjectList[0]);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      postAttendanceData();
    }
  }, [selectedSubject, month]);

  useEffect(() => {
    const data = [
      {
        status: "Present",
        count: getpresent,
        fill: "#755485",
      },
      {
        status: "Absent",
        count: getabsent,
        fill: "#27282c",
      },
    ];
    setChartData(data);
  }, [getpresent, getabsent]);

  const postAttendanceData = async () => {
    const sid = parseInt(localStorage.getItem("student_id"));

    try {
      const response = await axios.post('http://localhost:5472/services/getstuddashattforpie', {
        sid: sid,
        subject: selectedSubject,
        month: month,
      });

      setPresent(response.data.present);
      setAbsent(response.data.absent);
    } catch (error) {
      console.error('Error submitting attendance:', error);
    }
  };

  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <>
      <div className="flex flex-wrap justify-between gap-6">
        <div className="w-full md:w-[48%] lg:w-[40%] ">
          <Card>
            <CardHeader>
              <CardTitle>Attendance for {getMonthName(month)}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart data={barChartData}>
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
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar dataKey="present" fill="#755485" radius={4} />
                  <Bar dataKey="absent" fill="#27282c" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total for the last 6 months
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
                  <DropdownMenuRadioItem key={index} value={subject}>
                    {subject}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Card className="flex flex-col ">
            <CardHeader className="items-center pb-0">
              <CardTitle>Attendance</CardTitle>
              <CardDescription>Month : {getMonthName(month)}</CardDescription>
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
