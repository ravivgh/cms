import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from "moment";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { deepPurple } from "@mui/material/colors";
import axios from "axios";
import { customAlphabet } from "nanoid";

const AttendanceGrid = ({ selectedMonth, setSelectedMonth, selectedSubject }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const [loading, setLoading] = useState(false);
  const defaultAvatarUrl = "https://example.com/default-avatar.jpg";

  const rowHeight = 80;
  const headerHeight = 30;
  const gridHeight = rowData.length * rowHeight + headerHeight;

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.post('http://localhost:5472/services/getattendance', {
        subject: selectedSubject,
        month: moment(selectedMonth).format('M'),
        year: moment(selectedMonth).year(),
      });
      return response.data.logs || [];
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      return [];
    }
  };

  const fetchHolidays = async () => {
    try {
      const response = await axios.post('http://localhost:5472/services/getholidays', {
        month: moment(selectedMonth).format('M'),
        year: moment(selectedMonth).year(),
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
        subject: selectedSubject,
      });
      const fetchedUsers = response.data.Students || [];
      return fetchedUsers.map(user => ({
        ...user,
        avatarUrl: user.avatarUrl || defaultAvatarUrl,
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const generateUserAvatars = (users) => {
    return users.map(user => ({
      ...user,
      avatar: (
        <Avatar
          src={user.avatarUrl}
          sx={{ bgcolor: deepPurple[500] }}
          onError={(e) => (e.currentTarget.src = defaultAvatarUrl)}
        />
      ),
    }));
  };

  const avatarCellRenderer = (params) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Stack direction="row" spacing={2}>
          {params.data.avatar}
        </Stack>
      </div>
    );
  };

  const checkboxCellRenderer = (params) => {
    const day = params.colDef.field;
    const attendanceInfo = params.data[day.toString()];
    const isHoliday = attendanceInfo?.isHoliday;
    const holidayName = attendanceInfo?.holidayName;

    const handleCheckboxChange = async (e) => {
      const updatedValue = e.target.checked;
      const studentId = params.data._id;
      const month = moment(selectedMonth).format("M");
      const year = moment(selectedMonth).format("YYYY");
      const date = day.toString();

      params.node.setDataValue(params.colDef.field, {
        ...attendanceInfo,
        present: updatedValue,
      });

      if (updatedValue) {
        await logAttendance(studentId, date, updatedValue);
      } else {
        await deleteAttendance(studentId, date, month, year);
      }
    };

    return (
      <Tooltip title={isHoliday ? `Holiday: ${holidayName}` : ""} arrow>
        <div>
          <input
            type="checkbox"
            checked={attendanceInfo?.present || false}
            onChange={handleCheckboxChange}
            disabled={isHoliday}
          />
        </div>
      </Tooltip>
    );
  };

  const logAttendance = async (studentId, date, isChecked) => {
    const month = moment(selectedMonth).format('M');
    const year = moment(selectedMonth).year();
    const genid = customAlphabet('123456789', 4)
    const logEntry = {
      _id: parseInt(genid(4)),
      Student_id: parseInt(studentId),
      Date: `${date}/${month}/${year}`,
      Subject: selectedSubject,
      present: isChecked ? "Y" : "N"
    };

    try {
      const response = await axios.post('http://localhost:5472/services/insertattendance', {
        logs: logEntry,
      });
      if (response.status === 200) {
        console.log('Attendance added successfully.');
      } else {
        console.error('Failed to send attendance logs. Server responded with status:', response.status);
      }
    } catch (error) {
      console.error('Error sending attendance logs to the server:', error);
    }
  };

  const deleteAttendance = async (studentId, date, month, year) => {
    const formattedDate = `${date}/${month}/${year}`;
    try {
      const response = await axios.post('http://localhost:5472/services/deleteattendance', {
        sid: studentId,
        date: formattedDate,
        Sub: selectedSubject
      });
      if (response.status === 200) {
        console.log('Attendance deleted successfully.');
      } else {
        console.error('Failed to delete attendance record. Server responded with status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting attendance record from the server:', error);
    }
  };

  const loadData = async () => {
    setLoading(true);
    const numberOfDays = moment(selectedMonth).daysInMonth();
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

    const userList = await getUniqueRecord();
    const attendanceLogs = await fetchAttendanceRecords();
    const holidays = await fetchHolidays();

    if (userList.length > 0) {
      userList.forEach((user) => {
        daysArray.forEach((date) => {
          const attendanceRecord = attendanceLogs.find(
            log => log.Student_id === user._id && log.Date === `${date}/${moment(selectedMonth).format('M')}/${moment(selectedMonth).year()}`
          );
          const holiday = holidays.find(h => h.date === `${String(date).padStart(2, '0')}/${moment(selectedMonth).format('MM')}/${moment(selectedMonth).year()}`);
          user[date.toString()] = {
            present: attendanceRecord?.present === "Y",
            isHoliday: !!holiday,
            holidayName: holiday?.name || ''
          };
        });
      });

      const usersWithAvatars = generateUserAvatars(userList);
      setRowData(usersWithAvatars);
    } else {
      setRowData([]);
    }

    // Function to format date to "1 Mon", "2 Tue", etc.
    const getDayAndDateLabel = (date) => {
      const dateObj = moment(selectedMonth).date(date);
      const dayOfWeek = dateObj.format('ddd'); // 'Mon', 'Tue', etc.
      const dayOfMonth = dateObj.date(); // Numeric day
      return `${dayOfMonth} ${dayOfWeek}`; // '1 Mon', '2 Tue', etc.
    };

    const dateCols = daysArray.map((date) => ({
      headerName: getDayAndDateLabel(date),
      field: date.toString(),
      width: 50,
      editable: true,
      cellRenderer: checkboxCellRenderer,
    }));

    setColDefs([
      { field: "_id", headerName: "Student ID" },
      { field: "avatar", headerName: "Profile Pic", cellRenderer: avatarCellRenderer },
      { field: "Student_Name", headerName: "Student Name" },
      ...dateCols,
    ]);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [selectedMonth, selectedSubject]);

  const handlePreviousMonth = () => {
    setSelectedMonth(moment(selectedMonth).subtract(1, 'months'));
  };

  const handleNextMonth = () => {
    setSelectedMonth(moment(selectedMonth).add(1, 'months'));
  };

  return (
    <div>
      <div className="month-selector">
        <button onClick={handlePreviousMonth}>Previous Month</button>
        <span>{moment(selectedMonth).format("M YYYY")}</span>
        <button onClick={handleNextMonth}>Next Month</button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader" style={{ color: 'black' }}>Loading...</div>
        </div>
      ) : (
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
            ></AgGridReact>
          ) : (
            <div className="text-center text-gray-500">
              <h2>No Students Found</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceGrid;
