// DataTableDemo.jsx
import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from 'react-router-dom';
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Keep Popover imports
import { useToast } from "@/components/ui/use-toast";
import axios from 'axios';
import moment from 'moment';
import { customAlphabet } from 'nanoid';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatePicker } from './DatePicker'; // Adjust the path if needed

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => (
      <Avatar className="rounded-lg w-16 h-16  ">
        <AvatarImage src={row.getValue("avatar")} alt="Avatar" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "studid",
    header: "Student ID",
    cell: ({ row }) => row.getValue("studid"),
    meta: {
      isVisible: false,
    },
  },
  {
    accessorKey: "Student_Name",
    header: "Student Name",
    cell: ({ row }) => row.getValue("Student_Name"),
  },
  {
    accessorKey: "Class",
    header: "Class",
    cell: ({ row }) => row.getValue("Class"),
  },
  {
    accessorKey: "Section",
    header: "Section",
    cell: ({ row }) => row.getValue("Section"),
  },
  {
    accessorKey: "LoyaltyPoints",
    header: "Loyalty Points",
    cell: ({ row }) => row.getValue("LoyaltyPoints"),
  },
  {
    accessorKey: "Status",
    header: "Submission Status",
    cell: ({ row }) => {
      const submissionStatus = row.getValue("Status");
      return (
        <span
          style={{
            color: submissionStatus === "Submitted" ? "white" : "white",
            backgroundColor:
              submissionStatus === "Submitted" ? "#008d00" : "red",
            padding: "10px",
            borderRadius: "2px",
          }}
        >
          {submissionStatus}
        </span>
      );
    },
  },
];

function StudentListFaculty() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const location = useLocation();
  const receivedData = location.state;
  const subject = receivedData?.subject;
  const staff = receivedData?.staff;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAttendancePopupOpen, setIsAttendancePopupOpen] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState(new Date());
  const [popupAttendanceDate, setPopupAttendanceDate] = useState(new Date()); // New state for the popup's date
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:5472/services/getstudentdetailsfromclasssection",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              
              staff: staff,
              subject: subject,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `Failed to fetch student details (status ${response.status})`
          );
        }

        const responseData = await response.json();
        setData(responseData.values || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (Class && section && subject) {
      fetchStudentDetails();
    }
  }, [Class, section, subject]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    defaultColumn: {
      meta: {
        isVisible: (column) => column.id !== 'Student ID',
      },
    },
  });

  useEffect(() => {
    const initialVisibility = {};
    columns.forEach(column => {
      if (column.meta?.isVisible === false) {
        initialVisibility[column.id || column.accessorKey] = false;
      }
    });
    table.setColumnVisibility(initialVisibility);
  }, [table]);

  const handleAddToMarkAttendanceClick = () => {
    if (table.getSelectedRowModel().rows.length > 0) {
      setPopupAttendanceDate(new Date()); // Reset the popup date when opening
      setIsAttendancePopupOpen(true);
    } else {
      toast({
        title: "No students selected.",
        description: "Please select one or more students to mark attendance.",
      });
    }
  };

  async function handleSaveAttendance() {
    console.log("handleSaveAttendance called with date:", popupAttendanceDate); // Log the popup date
    const selectedStudents = table.getSelectedRowModel().rows;
    const formattedDay = format(popupAttendanceDate, "d");
    const month = format(popupAttendanceDate, "M");
    const year = format(popupAttendanceDate, "yyyy");

    console.log("Formatted Day in handleSaveAttendance:", formattedDay);
    console.log("Formatted Month in handleSaveAttendance:", month);
    console.log("Formatted Year in handleSaveAttendance:", year);

    for (const row of selectedStudents) {
      const studentId = row.original.studid;
      const submissionStatus = row.original.Status;
      const isPresent = submissionStatus === "Submitted" ? "Y" : "N";
      await logAttendance(studentId, formattedDay, isPresent, month, year);
      console.log("Arguments passed to logAttendance:", studentId, formattedDay, isPresent, month, year);
    }

    setAttendanceDate(popupAttendanceDate); // Update the main state if needed
    setIsAttendancePopupOpen(false);
    table.resetRowSelection();
    toast({
      title: "Attendance Marked",
      description: `Attendance marked for ${selectedStudents.length} students on ${formattedDay}-${month}-${year}. Present status based on submission status.`,
    });
    // Optionally, you might want to refresh the student data here
  }

  const handleCancelAttendance = () => {
    setIsAttendancePopupOpen(false);
  };

  const logAttendance = async (studentId, date, isPresent, month, year) => {
    const genid = customAlphabet('123456789', 4);
    const logEntry = {
      _id: parseInt(genid(4)),
      Student_id: parseInt(studentId),
      Date: `${date}/${month}/${year}`, // Ensure 'date' here is the formattedDay
      Subject: subject,
      present: isPresent
    };
    console.log("logEntry being sent:", logEntry);

    try {
      const response = await axios.post('http://localhost:5472/services/insertattendanceqb', {
        logs: [logEntry],
      });
      if (response.status === 200) {
        console.log(`Attendance marked as ${isPresent} for student ${studentId} on ${date}/${month}/${year}.`);
        toast({
          title: "Attendance Marked",
          description: `Attendance marked for student ${studentId} on ${date}-${month}-${year}.`,
        });
      } else {
        console.error(`Failed to send attendance log for student ${studentId}. Server responded with status:`, response.status);
        toast({
          title: "Error Marking Attendance",
          description: `Failed to mark attendance for student ${studentId}.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error sending attendance log to the server:', error);
      toast({
        title: "Error Marking Attendance",
        description: "Failed to connect to the server while marking attendance.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="w-full text-center py-8">Loading student details...</div>;
  }

  if (error) {
    return <div className="w-full text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full text-black">
      <div className="flex items-center justify-between py-4 bg-[#1d1e22]  px-5">
        <Input
          placeholder="Search students"
          value={table.getColumn("Student_Name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("Student_Name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-[#2b2b2b] border-0 text-white rounded-full"
        />
        <div className="space-x-5 ">
          <Button
            className="bg-[#9ca92b] hover:bg-[#9ca92b] "
            onClick={handleAddToMarkAttendanceClick}
          >
            Add to Mark attendance
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto bg-[#116752] text-white"
              >
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md ">
        <Table>
          <TableHeader className="bg-[#2b2b2b] text-white hover:bg-[#2b2b2b]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-white p-7" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Attendance Popup */}
      <Popover open={isAttendancePopupOpen} onOpenChange={setIsAttendancePopupOpen}>
        <PopoverTrigger asChild>
          <Button
            className="bg-[#9ca92b] hover:bg-[#9ca92b] "
            onClick={handleAddToMarkAttendanceClick}
          >
            Add to Mark attendance
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="text-lg font-medium">Mark Attendance</h4>
              <p className="text-sm text-muted-foreground">
                Select the date for marking attendance.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <DatePicker onDateChange={(date) => setPopupAttendanceDate(date)} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={handleCancelAttendance}>
                Cancel
              </Button>
              <Button onClick={handleSaveAttendance}>Save</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default StudentListFaculty;