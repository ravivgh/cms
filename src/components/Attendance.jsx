import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import AttendanceGridforFaculty from "./AttendanceGridforFaculty";
import MonthSelectionforAtten from "./MonthSelectionforAtten";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { setMonth, getMonth } from "date-fns";
import CalendarIcon from "@/components/ui/CalendarIcon";
import { GraduationCap, TrendingDown, TrendingUp, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";

const defaultAvatarUrl = "/images/avatars/01.png";

function Attendances() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayMonth, setDisplayMonth] = useState(
    setMonth(new Date(), new Date().getMonth())
  );
  const [displayDate, setDisplayDate] = useState(new Date());
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const formattedDate = moment(new Date()).format("DD MMM");
  const [dashboardCounts, setDashboardCounts] = useState({
    students: 0,
    present: 0,
    absent: 0,
  });
  const staff_id = localStorage.getItem("staff_id");
  const placeholders = ["Subject", "Name", "Class"];
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [summaryFromDate, setSummaryFromDate] = useState(new Date());
  const [summaryToDate, setSummaryToDate] = useState(new Date());
  const [summaryReport, setSummaryReport] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [isDetailedSummaryOpen, setIsDetailedSummaryOpen] = useState(false);
  const [detailedSummaryData, setDetailedSummaryData] = useState(null);

  const fetchAttendanceRecordsForMonth = async (month) => {
    try {
      const response = await axios.post('http://localhost:5472/services/getattendance', {
        subject: localStorage.getItem("subject"),
        month: moment(month).format('M'),
        year: moment(month).year(),
      });
      return response.data.logs || [];
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      return [];
    }
  };

  const fetchHolidaysForMonth = async (month) => {
    try {
      const response = await axios.post('http://localhost:5472/services/getholidays', {
        month: moment(month).format('M'),
        year: moment(month).year(),
      });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching holidays:', error);
      return [];
    }
  };

  const getUniqueRecord = async () => {
    try {
      const response = await axios.post('http://localhost:5472/services/getattesubstud', {
        subject: localStorage.getItem("subject"),
      });
      return response.data.Students || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const getStaffDetailsForAdminAttendance = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5472/services/getstaffdetailsforadminatte"
      );

      if (response.status === 200) {
        return response.data.values;
      } else if (response.status === 404) {
        throw new Error(response.data.message || "Record not found");
      } else {
        throw new Error(response.data.message || "Unknown error");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(error.response.data.message || "Server error");
        } else {
          throw new Error("Network error. Please try again.");
        }
      } else {
        throw error;
      }
    }
  };

  const fetchStaffDashboardCounts = async (month, staffId) => {
    try {
      const response = await axios.post(
        "http://localhost:5472/services/getstafdashcount",
        {
          month: month,
          staff_id: staffId,
        }
      );
      if (response.status === 200) {
        setDashboardCounts({
          students: response.data.students || 0,
          present: response.data.present || 0,
          absent: response.data.absent || 0,
        });
      } else {
        console.error("Failed to fetch dashboard counts");
        setDashboardCounts({ students: 0, present: 0, absent: 0 });
      }
    } catch (error) {
      console.error("Error fetching dashboard counts:", error);
      setDashboardCounts({ students: 0, present: 0, absent: 0 });
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (selectedSubject) {
        const students = await getUniqueRecord();
        setUniqueStudents(students);
        const attendanceLogs = await fetchAttendanceRecordsForMonth(selectedMonth);
        setStudentAttendance(attendanceLogs);
        const fetchedHolidays = await fetchHolidaysForMonth(selectedMonth);
        setHolidays(fetchedHolidays);
      } else {
        setUniqueStudents([]);
        setStudentAttendance([]);
        setHolidays([]);
      }
    };

    fetchInitialData();
  }, [selectedSubject, selectedMonth]);

  useEffect(() => {
    const fetchStaffDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getStaffDetailsForAdminAttendance();
        setSubjects(response);

        const storedSubjectString = localStorage.getItem("subject");
        if (storedSubjectString) {
          const foundSubject = response.find(
            (sub) => sub.subject === storedSubjectString
          );
          if (foundSubject) {
            setSelectedSubject(foundSubject);
          }
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || "Server Error");
        } else {
          setError("Network Error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStaffDetails();
  }, []);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    localStorage.setItem("subject", subject.subject);
  };

  console.log("Selected Subject:", selectedSubject);

  const dataToPass = selectedSubject
    ? {
        subject: selectedSubject.subject,
        staff: staff_id,
      }
    : null;

  const handleNavigate = () => {
    if (dataToPass) {
      navigate("/attendances/viewall/all", { state: dataToPass });
    } else {
      console.warn("No subject selected to navigate to view all attendance.");
    }
  };

  useEffect(() => {
    if (selectedSubject) {
      fetchStaffDashboardCounts(selectedMonth, staff_id);
    } else {
      setDashboardCounts({ students: 0, present: 0, absent: 0 });
    }
  }, [selectedMonth, selectedSubject, staff_id]);

  const handleSearch = () => {
    setDisplayMonth(setMonth(new Date(), selectedMonth - 1));
    setDisplayDate(selectedDate);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      (subject.name && subject.name.toLowerCase().includes(searchQuery)) ||
      (subject.assignedClass &&
        subject.assignedClass.toLowerCase().includes(searchQuery)) ||
      (subject.subject && subject.subject.toLowerCase().includes(searchQuery))
  );

  const handleBack = () => {
    setSelectedSubject(null);
    localStorage.removeItem("subject");
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex(
        (prevIndex) => (prevIndex + 1) % placeholders.length
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, [placeholders.length]);

  const fetchSummaryData = async () => {
    if (summaryFromDate && summaryToDate) {
      try {
        const response = await axios.post('http://localhost:5472/services/getattendancetotal', {
          subject: localStorage.getItem("subject"),
          fromDate: moment(summaryFromDate).format('YYYY-MM-DD'),
          toDate: moment(summaryToDate).format('YYYY-MM-DD'),
        });
        setDetailedSummaryData(response.data);
        setIsDetailedSummaryOpen(true);
      } catch (error) {
        console.error('Error fetching summary attendance:', error);
        setDetailedSummaryData(null);
        setIsDetailedSummaryOpen(false);
      }
    } else {
      alert("Please select both From and To dates for the summary.");
      setDetailedSummaryData(null);
      setIsDetailedSummaryOpen(false);
    }
  };

  const daysInRange = detailedSummaryData?.fromDate && detailedSummaryData?.toDate
    ? Array.from({ length: moment(detailedSummaryData.toDate, 'D/M/YYYY').diff(moment(detailedSummaryData.fromDate, 'D/M/YYYY'), 'days') + 1 }, (_, i) =>
        moment(detailedSummaryData.fromDate, 'D/M/YYYY').add(i, 'days').format('D/M/YYYY')
      )
    : [];

  const getAttendanceStatusForDate = (studentId, date) => {
    const record = detailedSummaryData?.summary?.find(
      (item) => item.Student_id === studentId && item.logs.some(log => log.Date === date)
    );
    if (record) {
      const log = record.logs.find(log => log.Date === date);
      return log?.Present === 'Y' ? 'P' : 'A';
    }
    const holiday = holidays.find(h => moment(h.date).format('YYYY-MM-DD') === moment(moment(date, 'D/M/YYYY')).format('YYYY-MM-DD'));
    if (holiday) {
      return 'H';
    }
    return 'A'; // Default to Absent if no record and not a holiday
  };

  return (
    <div className="">


      <motion.div key="attendance">
        <div className="bg-gradient-to-t from-[#2b2b2b] via-[#2b2b2b]  to-[#3b3c3f]  w-full h-72   rounded-xl pt-10">
          <div className="flex items-center justify-around w-full">
            <div className="py-10">
              <h2 className="text-2xl text-white ">Attendance Sheet</h2>

              <p className="text-xs text-gray-400 pt-1">
                {selectedSubject?.subject} (
                {selectedSubject?.assignedClass} -{" "}
                {selectedSubject?.section})
              </p>
            </div>
            <div className="flex items-center gap-5">
              {" "}
              <div>
                <Button className="bg-[#111111]">
                  {" "}
                  <TbReport />
                  <span className="pl-1">Report</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative   bottom-28 mx-10 ">
          <div className="from-[#3b3c3f] via-[#116752]   to-[#1d68bd] rounded-t-lg bg-gradient-to-t shadow-[0px_-20px_90px_rgba(0,0,0,0.3)] ">
            <div className="attendance-heading flex items-center justify-around">
              <Button
                onClick={handleBack}
                className="   mr-5 rounded-full bg-black border border-gray-800   hover:text-white text-white "
              >
                
              </Button>
              <div className="flex items-center gap-2">
                <Avatar className="rounded-lg w-28 h-28 border border-[#ffffff] p-[3px]   relative bottom-10">
                  <AvatarImage
                    src={selectedSubject?.avatar}
                    alt={selectedSubject?.name}
                    className="rounded-lg"
                  />
                  <AvatarFallback>
                    {selectedSubject?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="">
                  <h1>Faculty</h1>
                  <span>{localStorage.getItem("staff_name")}</span>
                  <br></br>
                  <span className="text-gray-300 text-sm">
                    {localStorage.getItem("subject")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f7f7f7]">
            <div className="bg-[#f7f7f7]   rounded-lg   ">
              <div className="attendance-dataFlow py-5 flex items-center justify-between   p-5 rounded-b-lg from-[#1f1f1f] via-[#1f1f1f]   to-[#3b3c3f] bg-gradient-to-t   bg-[#1f1f1f] flex-wrap">
                <div className="flex items-center">
                  <div className="attendance-icon bg-gray-700 p-3 rounded-full">
                    <CalendarIcon className="text-3xl" />
                  </div>

                  <div className="flex items-center flex-col pl-3">
                    <h2 className="text-xl   text-white     ">
                      Today,{formattedDate}
                    </h2>

                    <div className="flex items-center gap-2 pt-1">
                      <p className="text-gray-300 text-xs ">
                        This show daily data in real-time |{" "}
                      </p>
                      <span className="text-yellow-500 text-xs flex items-center gap-1">
                        Insight <FaArrowRightLong />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="header-card flex items-center gap-3">
                  <Popover open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
                    <PopoverTrigger asChild>
                      <Button className="bg-[#282828] p-5 rounded-lg border-gray-500 border flex items-center justify-center">
                        <span className="text-gray-200 text-xs block text-center">View Summary</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[90vw] max-w-2xl p-6 rounded-md shadow-lg bg-white">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Attendance Summary</h2>
                        <Button variant="ghost" size="sm" className="p-2" onClick={() => setIsSummaryOpen(false)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="from">From Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] justify-start text-left font-normal",
                                  !summaryFromDate && "text-muted-foreground"
                                )}
                              >{summaryFromDate ? (
                                moment(summaryFromDate).format("DD MMM")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={summaryFromDate}
                              onSelect={setSummaryFromDate}
                              disabledDate={(date) => date > new Date() || (summaryToDate && date > summaryToDate)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to">To Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] justify-start text-left font-normal",
                                !summaryToDate && "text-muted-foreground"
                              )}
                            >
                              {summaryToDate ? (
                                moment(summaryToDate).format("DD MMM")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 over">
                            <Calendar
                              mode="single"
                              selected={summaryToDate}
                              onSelect={setSummaryToDate}
                              disabledDate={(date) => date > new Date() || (summaryFromDate && date < summaryFromDate)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Button onClick={fetchSummaryData} disabled={!summaryFromDate || !summaryToDate}>
                        Generate Summary
                      </Button>
                    </div>
                    <div className="overflow-x-scrollbar ">
                    {detailedSummaryData?.summary && detailedSummaryData.summary.length > 0 ? (
                      <div className="">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[120px]">Student ID</TableHead>
                              <TableHead>Student Name</TableHead>
                              {daysInRange.map((date) => (
                                <TableHead key={date} className="text-center w-12">
                                  {moment(date, 'D/M/YYYY').format('DD')}
                                </TableHead>
                              ))}
                              <TableHead className="text-right">Present</TableHead>
                              <TableHead className="text-right">Absent</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {detailedSummaryData.summary.map((record) => (
                              <TableRow key={record.Student_id}>
                                <TableCell className="font-medium">{record.Student_id}</TableCell>
                                <TableCell>{record.Student_Name || 'Unknown'}</TableCell>
                                {daysInRange.map((date) => (
                                  <TableCell key={`${record.Student_id}-${date}`} className="text-center">
                                    {record.logs.find(log => log.Date === date)?.Present === 'Y' ? 'P' : 'A'}
                                  </TableCell>
                                ))}
                                <TableCell className="text-right">{record.presentDays}</TableCell>
                                <TableCell className="text-right">{record.absentDays}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : summaryFromDate && summaryToDate ? (
                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        No attendance records found for the selected date range.
                      </div>
                    ) : (
                      <div className="mt-4 text-center text-sm text-muted-foreground">
                        Select a date range to view the summary.
                      </div>
                    )}
                    </div>
                  </PopoverContent>
                </Popover>
                <div className="bg-[#282828] p-5 rounded-lg border-gray-500 border">
                  <p className="text-gray-200 text-xs">Total Students</p>
                  <div className="flex items-center justify-between pt-3 ">
                    <h1 className="text-white text-2xl pr-4">
                      {dashboardCounts.students}
                    </h1>
                    <div className="bg-[#2d2649] p-1 rounded-md">
                      <GraduationCap className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-[#2822828] p-5 rounded-lg border-gray-500 border">
                  <p className="text-gray200 text-xs">Present Students</p>
                  <div className="flex items-center justify-between pt-3">
                    <h1 className="text-white text-2xl">
                      {dashboardCounts.present}
                    </h1>
                    <div className="bg-green-600 p-1 rounded-md">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-[#282828] p-5 rounded-lg border-gray-500 border">
                  <p className="text-gray-200 text-xs">Absent Students</p>
                  <div className="flex items-center justify-between pt-3">
                    <h1 className="text-white text-2xl">
                      {dashboardCounts.absent}
                    </h1>
                    <div className="bg-red-600 p-1 rounded-md">
                      <TrendingDown className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <hr
                className="mx-auto bg-slate-200 my-2 rounded-sm"
                style={{ width: "100%", height: "0.5px", borderWidth: 0 }}
              ></hr>
            </div>
            <div className="px-5 pb-5">
              <div className="flex items-center justify-between">
                <div className="">
                  <h1 className="text-black text-lg">
                    Students Attendance
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Keep track students attendance on a daily basis
                  </p>
                </div>
                <div className="flex gap-4 my-5 p-3 border rounded-lg">
                  <MonthSelectionforAtten
                    selectedMonth={getMonth(displayMonth) + 1}
                    selectedDate={selectedDate}
                    onSelectMonth={(month) => {
                      setSelectedMonth(month);
                      setDisplayMonth(setMonth(displayMonth, month - 1));
                    }}
                    onSelectDate={(date) => {
                      setSelectedDate(date);
                      setDisplayDate(date);
                    }}
                  />

                  <div className="search-button">
                    <Button onClick={handleSearch}>Search</Button>
                  </div>
                </div>
              </div>

              <div>
                <AttendanceGridforFaculty
                  selectedMonth={displayMonth}
                  selectedDate={displayDate}
                  selectedSubject={selectedSubject?.subject}
                  assignedClass={selectedSubject?.assignedClass}
                  section={selectedSubject?.section}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>

  </div>
);
}

export default Attendances;