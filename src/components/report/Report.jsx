import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { MdThumbUpAlt, MdThumbDownAlt } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { TrendingUp } from "lucide-react";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import logo from "@/assets/logo.png";
import StudentDashboard from "../StudentDashboard";
import MainStudentDashboard from "@/pages/MainStudentDashboard";

const ReportComponent = () => {
  const reportRef = useRef();
  const profilePic =
    "https://img.freepik.com/premium-photo/face-smiling-indian-man_130568-534.jpg";

  // Function to generate PDF
  const generatePDF = async (reportRef) => {
    const element = reportRef.current;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const canvas = await html2canvas(element, {
      scale: 5,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    if (imgHeight > 297) {
      // A4 page height in mm
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    } else {
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    }
    pdf.save("Rahul_Report.pdf");
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "Strong No":
        return <MdThumbDownAlt />;
      case "No":
        return <FaExclamationCircle color="#FFA500" />;
      case "Yes":
        return <FaCheckCircle color="#FFD700" />;
      case "Strong Yes":
        return <MdThumbUpAlt />;
      default:
        return null;
    }
  };
  // Function to return the background color based on response type
  const getBackgroundColor = (status) => {
    switch (status) {
      case "Strong No":
        return "bg-red-800"; // Light Red
      case "No":
        return "bg-orange-800"; // Light Orange
      case "Yes":
        return "bg-yellow-800"; // Light Yellow
      case "Strong Yes":
        return "bg-green-800"; // Light Green
      default:
        return "bg-white";
    }
  };
  const reportData = [{ name: "John Doe", response: "Strong Yes" }];
  const chartValues = [
    {
      present: 120, // Number of students present
      absent: 30, // Number of students absent
      total: 150, // Total students
    },
  ];

  const chartData = [
    { key: "present", label: "Present", color: "#4a805f" }, // Green
    { key: "absent", label: "Absent", color: "#b03d3d" }, // Red
    { key: "total", label: "Total Students", color: "#ff9e2a" }, // Blue
  ];

  return (
    <div>
      <MainStudentDashboard onDownload={generatePDF} />
      {/* <button
        onClick={generatePDF}
        style={{
          marginBottom: "10px",
          padding: "8px 12px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download Report
      </button> */}

      {/* Report Section */}
      <div
        ref={reportRef}
        style={{
          color: "#fff",
          maxWidth: "700px",
        }}
      >
        <div
          className=""
          style={{
            padding: "20px",
            background: "#000",
            color: "#fff",
          }}
        >
          <img src={logo} alt="" className="w-32 pb-7 pt-2 " />

          {/* Profile Picture */}
          <div className="">
            <div className="flex items-center gap-5 ">
              <img
                src={profilePic}
                alt="Profile"
                // crossOrigin="anonymous"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "3px",
                  objectFit: "cover",
                  border: "2px solid white",
                  marginBottom: "10px",
                  display: "block", // Ensures no extra spacing
                }}
                className="w-20 h-20 object-cover rounded-sm"
              />

              <div className="">
                <div className="flex items-center justify-around gap-20">
                  <div className="">
                    <div className="">
                      <h1 className="text-sm font-semibold">Person</h1>
                      <span className="text-xs text-gray-400">John Doe</span>
                    </div>
                    <div className="">
                      <h1 className="text-sm font-semibold">Person Email</h1>
                      <span className="text-xs text-gray-400">
                        johndoegmail.com
                      </span>
                    </div>
                    <div className="mt-3">
                      {reportData.map((data, index) => (
                        <div
                          key={index}
                          className={`flex items-center px-3  w-fit  gap-1 ${getBackgroundColor(
                            data.response
                          )}`}
                        >
                          <span className="pb-4">{data.response}</span>
                          <span>{getStatusIcon(data.response)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="">
                    <div className="">
                      <h1 className="text-sm font-semibold">Role Position</h1>
                      <span className="text-xs text-gray-400">Faculty</span>
                    </div>
                    <div className="">
                      <h1 className="text-sm font-semibold">Current Date</h1>
                      <span className="text-xs text-gray-400">
                        29th September 2022, 8:00 PM IST
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                background: "black",
                color: "#000",
                padding: "10px",
              }}
            >
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="">
                    <h1 className="text-sm font-semibold text-white">
                      Contact Number
                    </h1>
                    <span className="text-xs text-gray-400">
                      +91 9879586045
                    </span>
                  </div>
                  <div className="bg-[#242424] px-3 py-2 rounded-sm mt-3">
                    <div className="text-sm font-semibold text-white flex items-center gap-2 ">
                      <div className="bg-black p-2 rounded-full border border-gray-500">
                        <FaUniversity className="text-gray-200" />
                      </div>
                      <h1 className="pb-4"> Register College</h1>
                    </div>
                    <span className="text-xs text-gray-400 py-1">
                      Vivekanand College for BCA
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="">
                    <h1 className="text-sm font-semibold text-white">
                      {" "}
                      Department / Course
                    </h1>
                    <span className="text-xs text-gray-400">BCA</span>
                  </div>
                  <div className="">
                    <h1 className="text-sm font-semibold text-white">
                      {" "}
                      Assigned Class
                    </h1>
                    <span className="text-xs text-gray-400">TYBCA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rating " style={{ padding: "20px" }}>
          <div className="text-black font-semibold mt-7 mb-5">
            <h1>Person rating legend</h1>
          </div>
          <div className="flex items-center space-x-5 ">
            <div className="text-black flex items-center gap-2 font-medium text-sm">
              <div className="w-3 h-3 bg-red-500"></div>
              <span>Strong No</span>
            </div>
            <div className="text-black flex items-center gap-2 font-medium text-sm">
              <div className="w-3 h-3 bg-orange-500"></div>
              <span>No</span>
            </div>
            <div className="text-black flex items-center gap-2 font-medium text-sm">
              <div className="w-3 h-3 bg-yellow-500"></div>
              <span>Yes</span>
            </div>
            <div className="text-black flex items-center gap-2 font-medium text-sm">
              <div className="w-3 h-3 bg-green-700"></div>
              <span>Strong Yes</span>
            </div>
          </div>
        </div>
        <div className="p-[20px]">
          <div className="flex items-center justify-center ">
            {chartData.map(({ key, label, color }) => (
              <Card key={key} className="flex flex-col border-0">
                <CardHeader className="items-center pb-0">
                  <CardTitle></CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                  <RadialBarChart
                    width={180}
                    height={180}
                    data={[{ visitors: chartValues[0][key] }]}
                    startAngle={0}
                    endAngle={250}
                    innerRadius={68}
                    outerRadius={95}
                  >
                    <PolarGrid
                      gridType="circle"
                      radialLines={false}
                      stroke="none"
                      className="first:fill-muted last:fill-background"
                      polarRadius={
                        chartValues[0][key] > 180 ? [50, 50, 50] : [70, 62]
                      }
                    />
                    <RadialBar
                      dataKey="visitors"
                      background
                      cornerRadius={10}
                      fill={color} // Apply dynamic colors
                    />
                    <PolarRadiusAxis
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                    >
                      <Label
                        content={({ viewBox }) =>
                          viewBox && "cx" in viewBox && "cy" in viewBox ? (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="fill-foreground text-xl font-bold"
                            >
                              {chartValues[0][key].toLocaleString()}
                            </text>
                          ) : null
                        }
                      />
                    </PolarRadiusAxis>
                  </RadialBarChart>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    <h1 className="text-lg font-semibold">{label}</h1>
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Total {label}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportComponent;
