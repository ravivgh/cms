import { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from "moment";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { deepPurple } from "@mui/material/colors";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { IoFilterOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";

const AttendanceGrid = ({ selectedMonth, selectedDate }) => {
  const gridRef = useRef(null);
  const [pageInfo, setPageInfo] = useState({ currentPage: 0, totalPages: 0 });
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "id" },
    { field: "name" },
    { field: "avatar" },
  ]);
  const [selectedColumns, setSelectedColumns] = useState({
    id: true,
    name: true,
    avatar: true,
  });
  const [searchTerm, setSearchTerm] = useState("");

  // const rowHeight = 50;
  // const headerHeight = 2;
  // const gridHeight = rowData.length * rowHeight + headerHeight;

  const handleColumnChange = (column, isChecked) => {
    setSelectedColumns((prevState) => ({ ...prevState, [column]: isChecked }));
  };

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

  const checkboxCellRenderer = (params) => {
    return (
      <input
        type="checkbox"
        checked={params.value}
        onChange={(e) => {
          const updatedValue = e.target.checked;
          params.node.setDataValue(params.colDef.field, updatedValue);
        }}
      />
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
        user[date.toString()] = false; // Initial attendance is false (unchecked)
      });
    });

    setRowData(userList);

    const dateCols = selectedDate
      ? [
          {
            field: selectedDate.getDate().toString(),
            width: 50,
            editable: true,
            cellRenderer: checkboxCellRenderer,
          },
        ]
      : daysArray.map((date) => ({
          field: date.toString(),
          width: 50,
          editable: true,
          cellRenderer: checkboxCellRenderer, // Add checkbox renderer for each day
        }));

    const selectedColDefs = [];
    if (selectedColumns.id) selectedColDefs.push({ field: "id" });
    if (selectedColumns.name) selectedColDefs.push({ field: "name" });
    if (selectedColumns.avatar)
      selectedColDefs.push({
        field: "avatar",
        cellRenderer: avatarCellRenderer,
      });
    selectedColDefs.push(...dateCols);

    setColDefs(selectedColDefs);
  }, [selectedMonth, selectedDate, selectedColumns]);

  // Filter row data based on search term (name and id)
  const filteredData = rowData.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.id.toString().includes(searchTerm)
  );

  const onGridReady = (params) => {
    const totalPages = params.api.paginationGetTotalPages();
    setPageInfo({ currentPage: 0, totalPages });
  };

  const handlePreviousPage = () => {
    if (gridRef.current.api.paginationGetCurrentPage() > 0) {
      gridRef.current.api.paginationGoToPreviousPage();
      updatePageInfo();
    }
  };

  const handleNextPage = () => {
    if (
      gridRef.current.api.paginationGetCurrentPage() <
      gridRef.current.api.paginationGetTotalPages() - 1
    ) {
      gridRef.current.api.paginationGoToNextPage();
      updatePageInfo();
    }
  };

  const updatePageInfo = () => {
    const currentPage = gridRef.current.api.paginationGetCurrentPage();
    const totalPages = gridRef.current.api.paginationGetTotalPages();
    setPageInfo({ currentPage, totalPages });
  };
  return (
    <>
      <div className="flex items-center justify-between pb-5">
        <div className="flex gap-2">
          {/* Existing column selection */}
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <IoFilterOutline />
                  <span className="pl-2">Filters</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Columns to Display</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={selectedColumns.id}
                  onCheckedChange={(checked) =>
                    handleColumnChange("id", checked)
                  }
                >
                  ID
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedColumns.name}
                  onCheckedChange={(checked) =>
                    handleColumnChange("name", checked)
                  }
                >
                  Name
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedColumns.avatar}
                  onCheckedChange={(checked) =>
                    handleColumnChange("avatar", checked)
                  }
                >
                  Avatar
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex items-center justify-end gap-5">
          <div className="">
            <Input
              type="search"
              placeholder="Search for name or ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              className="text-black w-96"
            />
          </div>
        </div>
      </div>
      <div
        className="ag-theme-quartz"
        style={{ height: `520px`, width: "100%" }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={onGridReady}
          columnDefs={colDefs}
          rowData={filteredData}
          pagination={true}
          paginationPageSize={10}
        ></AgGridReact>
        <div className="space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={pageInfo.currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={pageInfo.currentPage === pageInfo.totalPages - 1}
          >
            Next
          </Button>
          <span>
            Page {pageInfo.currentPage + 1} of {pageInfo.totalPages}
          </span>
        </div>
      </div>
    </>
  );
};

export default AttendanceGrid;
