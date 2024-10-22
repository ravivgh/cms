import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from "moment";
import { Avatar, Tooltip } from "@mui/material";
import Stack from "@mui/material/Stack";
import { deepPurple } from "@mui/material/colors";
import axios from "axios";

const AttendanceGrid = ({ selectedMonth }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const defaultAvatarUrl = "https://example.com/default-avatar.jpg";
  const rowHeight = 70;
  const headerHeight = 50;
  const gridHeight = rowData.length * rowHeight + headerHeight;

  const fetchStudents = async (subject) => {
    try {
      const response = await axios.post("http://localhost:5472/services/getattesubstud", { subject });
      return response.data.Students || [];
    } catch (error) {
      console.error("Error fetching students:", error);
      return [];
    }
  };

  const fetchAttendanceRecords = async (subject, month, year) => {
    try {
      const response = await axios.post("http://localhost:5472/services/getattendance", {
        subject,
        month,
        year,
      });
      return response.data.logs || [];
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      return [];
    }
  };

  const fetchHolidays = async () => {
    try {
      const response = await axios.post("http://localhost:5472/services/getholidays");
      return response.data || [];
    } catch (error) {
      console.error("Error fetching holidays:", error);
      return [];
    }
  };

  const generateUserAvatars = (users) => {
    return users.map((user) => ({
      ...user,
      avatar: (
        <Avatar
          src={user.avatarUrl || defaultAvatarUrl}
          sx={{ bgcolor: deepPurple[500] }}
          onError={(e) => (e.currentTarget.src = defaultAvatarUrl)}
        />
      ),
    }));
  };

  const avatarCellRenderer = (params) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Stack direction="row" spacing={2}>
        {params.data.avatar}
      </Stack>
    </div>
  );

  const logAttendance = async (studentId, date, isChecked) => {
    const month = moment(selectedMonth).format("M");
    const year = moment(selectedMonth).year();
    const logEntry = {
      Student_id: studentId,
      Date: `${date}/${month}/${year}`,
      Subject: localStorage.getItem("subject"),
      present: isChecked ? "Y" : "N",
    };
    try {
      await axios.post("http://localhost:5472/services/insertattendance", { logs: logEntry });
    } catch (error) {
      console.error("Error logging attendance:", error);
    }
  };

  const deleteAttendance = async (studentId, date, month, year) => {
    const formattedDate = `${date}/${month}/${year}`;
    try {
      await axios.post("http://localhost:5472/services/deleteattendance", {
        sid: studentId,
        date: formattedDate,
        Sub: localStorage.getItem("subject"),
      });
    } catch (error) {
      console.error("Error deleting attendance:", error);
    }
  };

  const checkboxCellRenderer = (params) => {
    const dateKey = params.colDef.field;
    const month = moment(selectedMonth).format("M");
    const year = moment(selectedMonth).year();
    const fullDate = `${dateKey.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    const holiday = holidays.find((holiday) => holiday.date === fullDate);
    const isHoliday = Boolean(holiday);

    return (
      <Tooltip title={isHoliday ? `Holiday: ${holiday.name}` : ""} arrow>
        <span>
          <input
            type="checkbox"
            checked={params.value}
            disabled={isHoliday}
            onChange={async (e) => {
              const updatedValue = e.target.checked;
              params.node.setDataValue(params.colDef.field, updatedValue);
              const studentId = params.data._id;

              if (updatedValue) {
                await logAttendance(studentId, dateKey, updatedValue);
              } else {
                await deleteAttendance(studentId, dateKey, month, year);
              }
            }}
          />
        </span>
      </Tooltip>
    );
  };

  useEffect(() => {
    const loadData = async () => {
      const subject = localStorage.getItem("subject");
      if (!subject) return;

      
      if (students.length === 0) {
        const fetchedStudents = await fetchStudents(subject);
        setStudents(fetchedStudents);
      }

      const month = moment(selectedMonth).format("M");
      const year = moment(selectedMonth).year();

      
      if (attendanceLogs.length === 0) {
        const fetchedAttendanceLogs = await fetchAttendanceRecords(subject, month, year);
        setAttendanceLogs(fetchedAttendanceLogs);
      }

      
      if (holidays.length === 0) {
        const holidaysData = await fetchHolidays();
        setHolidays(holidaysData);
      }

      
      if (students.length > 0 && attendanceLogs.length > 0) {
        const numberOfDays = moment(selectedMonth).daysInMonth();
        const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

        students.forEach((student) => {
          daysArray.forEach((date) => {
            const attendanceRecord = attendanceLogs.find(
              (log) =>
                log.Student_id === student._id &&
                log.Date === `${date}/${month}/${year}`
            );
            student[date.toString()] = attendanceRecord?.present === "Y";
          });
        });

        setRowData(generateUserAvatars(students));

        const dateCols = daysArray.map((date) => ({
          field: date.toString(),
          width: 50,
          editable: true,
          cellRenderer: checkboxCellRenderer,
        }));

        setColDefs([
          { field: "_id", headerName: "Student ID" },
          {
            field: "avatar",
            headerName: "Profile Pic",
            cellRenderer: avatarCellRenderer,
          },
          { field: "Student_Name", headerName: "Student Name" },
          ...dateCols,
        ]);
      }
    };

    loadData();
  }, [selectedMonth, students, attendanceLogs, holidays]);

  return (
    <div>
      <div
        className="ag-theme-quartz"
        style={{
          height: `${gridHeight}px`,
          width: "100%",
        }}
      >
        {rowData.length > 0 ? (
          <AgGridReact
            columnDefs={colDefs}
            rowData={rowData}
            rowHeight={rowHeight}
          />
        ) : (
          <div className="text-center text-gray-500">
            <h2>No Students Found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceGrid;
