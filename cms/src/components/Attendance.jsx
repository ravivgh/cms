import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from "moment";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { deepPurple } from "@mui/material/colors";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

const AttendanceGrid = ({ selectedMonth, setSelectedMonth }) => {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const defaultAvatarUrl = "https://example.com/default-avatar.jpg";
    const rowHeight = 70;
    const headerHeight = 50;
    const gridHeight = rowData.length * rowHeight + headerHeight;

    const fetchAttendanceRecords = async () => {
        try {
            const response = await axios.post('http://localhost:5472/services/getattendance', {
                subject: localStorage.getItem("subject"),
                month: moment(selectedMonth).format('M'),
                year: moment(selectedMonth).year()
            });
            return response.data.logs || [];
        } catch (error) {
            console.error('Error fetching attendance records:', error);
            return [];
        }
    };

    const getUniqueRecord = async () => {
        try {
            const response = await axios.post('http://localhost:5472/services/getattesubstud', {
                subject: localStorage.getItem("subject"),
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

    const fetchHolidays = async () => {
        try {
            const response = await axios.post('http://localhost:5472/services/getholidays');
            return response.data || [];
        } catch (error) {
            console.error('Error fetching holidays:', error);
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

    const logAttendance = async (studentId, date, isChecked) => {
        const month = moment(selectedMonth).format('M');
        const year = moment(selectedMonth).year();

        const logEntry = {
            Student_id: studentId,
            Date: `${date}/${month}/${year}`,
            Subject: localStorage.getItem("subject"),
            present: isChecked ? "Y" : "N"
        };
        try {
            const response = await axios.post('http://localhost:5472/services/insertattendance', { logs: logEntry });
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
                Sub: localStorage.getItem("subject")
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

    const checkboxCellRenderer = (params) => {
        const dateKey = params.colDef.field; // day of the month
        const month = moment(selectedMonth).format('M');
        const year = moment(selectedMonth).year();
        const fullDate = `${dateKey}/${month}/${year}`;
        const holiday = holidays.find(holiday => holiday.date === fullDate);
        const isHoliday = Boolean(holiday);

        return (
            <div>
                <Tooltip title={isHoliday ? `Holiday: ${holiday.name}` : ''} arrow>
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
            </div>
        );
    };

    useEffect(() => {
        const loadData = async () => {
            const holidaysData = await fetchHolidays();
            setHolidays(holidaysData);

            const numberOfDays = moment(selectedMonth).daysInMonth();
            const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

            const userList = await getUniqueRecord();
            const attendanceLogs = await fetchAttendanceRecords();

            if (userList.length > 0) {
                userList.forEach((user) => {
                    daysArray.forEach((date) => {
                        const attendanceRecord = attendanceLogs.find(
                            log => log.Student_id === user._id && log.Date === `${date}/${moment(selectedMonth).format('M')}/${moment(selectedMonth).year()}`
                        );
                        user[date.toString()] = attendanceRecord?.present === "Y";
                    });
                });

                const usersWithAvatars = generateUserAvatars(userList);
                setRowData(usersWithAvatars);
            } else {
                setRowData([]);
            }

            const dateCols = daysArray.map((date) => ({
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
        };

        loadData();
    }, [selectedMonth, sessionStorage.getItem("subject")]);

    const handlePreviousMonth = () => {
        setSelectedMonth(moment(selectedMonth).subtract(1, 'months'));
    };

    const handleNextMonth = () => {
        setSelectedMonth(moment(selectedMonth).add(1, 'months'));
    };

    return (
        <div>
            <div className="month-selector">
                <button onClick={handlePreviousMonth}>
                    Previous Month
                </button>
                <span>{moment(selectedMonth).format("M YYYY")}</span>
                <button onClick={handleNextMonth}>
                    Next Month
                </button>
            </div>
            <div
                className="ag-theme-quartz"
                style={{
                    height: `${gridHeight}px`,
                    width: "100%",
                }}
            >
                {rowData.length > 0 ? (
                    <AgGridReact columnDefs={colDefs} rowData={rowData} rowHeight={rowHeight}></AgGridReact>
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
