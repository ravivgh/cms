/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from "moment";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { deepPurple } from "@mui/material/colors";

const AttendanceGrid = ({ selectedMonth, selectedDate }) => {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([{ field: "id" }, { field: "name" }]);

  const rowHeight = 50;
  const headerHeight = 30;
  const gridHeight = rowData.length * rowHeight + headerHeight;

  const getUniqueRecord = () => {
    const defaultAvatarUrl = "https://example.com/default-avatar.jpg";

    const users = [
      {
        id: 1,
        name: "Bread Doe",
        avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
      },
      {
        id: 2,
        name: "John Doe",
        avatarUrl: "https://avatars.githubusercontent.com/u/2?v=4",
      },
      {
        id: 3,
        name: "John Doe",
        avatarUrl: "https://avatars.githubusercontent.com/u/3?v=4",
      },
      {
        id: 4,
        name: "John Doe",
        avatarUrl: "https://avatars.githubusercontent.com/u/4?v=4",
      },
      {
        id: 5,
        name: "John Doe",
        avatarUrl: "https://avatars.githubusercontent.com/u/5?v=4",
      },
    ];

    return users.map((user) => ({
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

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    const numberOfDays = daysInMonth(
      moment(selectedMonth).year(),
      moment(selectedMonth).month()
    );

    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);
    const userList = getUniqueRecord();

    userList.forEach((user) => {
      daysArray.forEach((date) => {
        user[date.toString()] = false;
      });
    });

    setRowData(userList);

    const dateCols = selectedDate
      ? [
          {
            field: selectedDate.getDate().toString(),
            width: 50,
            editable: true,
          },
        ]
      : daysArray.map((date) => ({
          field: date.toString(),
          width: 50,
          editable: true,
        }));

    setColDefs([
      { field: "id" },
      { field: "Avatar", cellRenderer: avatarCellRenderer },
      { field: "name" },
      ...dateCols,
    ]);
  }, [selectedMonth, selectedDate]);

  return (
    <div
      className="ag-theme-quartz"
      style={{
        height: `${gridHeight}px`,
        width: "100%",
      }}
    >
      <AgGridReact columnDefs={colDefs} rowData={rowData}></AgGridReact>
    </div>
  );
};

export default AttendanceGrid;
