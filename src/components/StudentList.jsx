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

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Updated data with assignment property
const allData = [
  {
    id: 1,
    avatar:
      "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/0f6fee60-187e-44ed-8ccf-e0bc3b56eeac.jpg",
    studentName: "John Doe",
    rollNo: "1001",
    class: "Physics 101",
    examName: "Midterm Exam",
    attempted: "Yes",
    marks: 45,
    submissionStatus: "Submitted",
    assignment: "Assignment 1",
  },
  {
    id: 2,
    avatar:
      "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/68935ce6-16ff-437f-bc4a-5f85c7e238fe.jpg",
    studentName: "Jane Smith",
    rollNo: "1002",
    class: "Mathematics 101",
    examName: "Final Exam",
    attempted: "No",
    marks: 42,
    submissionStatus: "Not Submitted",
    assignment: "Assignment 1",
  },
  {
    id: 3,
    avatar:
      "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/bb34b3a9-006d-4b7e-b885-8cd040cd60b5.jpg",
    studentName: "Michael Johnson",
    rollNo: "1003",
    class: "Chemistry 101",
    examName: "Quiz 1",
    attempted: "Yes",
    marks: 28,
    submissionStatus: "Submitted",
    assignment: "Assignment 2",
  },
  {
    id: 4,
    avatar:
      "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/5fa1f3f4-f66c-44d8-a814-fd08ee85beca.jpg",
    studentName: "Emily Brown",
    rollNo: "1004",
    class: "Biology 101",
    examName: "Lab Test",
    attempted: "Yes",
    marks: 38,
    submissionStatus: "Submitted",
    assignment: "Assignment 2",
  },
  {
    id: 5,
    avatar:
      "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/0f6fee60-187e-44ed-8ccf-e0bc3b56eeac.jpg",
    studentName: "Robert Wilson",
    rollNo: "1005",
    class: "Physics 101",
    examName: "Midterm Exam",
    attempted: "Yes",
    marks: 49,
    submissionStatus: "Submitted",
    assignment: "Assignment 3",
  },
  {
    id: 6,
    avatar:
      "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/68935ce6-16ff-437f-bc4a-5f85c7e238fe.jpg",
    studentName: "Sarah Miller",
    rollNo: "1006",
    class: "Mathematics 101",
    examName: "Final Exam",
    attempted: "No",
    marks: 0,
    submissionStatus: "Not Submitted",
    assignment: "Assignment 3",
  },
];

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
      <Avatar className="rounded-lg w-16 h-16">
        <AvatarImage src={row.getValue("avatar")} alt="Avatar" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("studentName")}</div>
    ),
  },
  {
    accessorKey: "rollNo",
    header: "Roll No",
    cell: ({ row }) => row.getValue("rollNo"),
  },
  {
    accessorKey: "class",
    header: "Class",
    cell: ({ row }) => row.getValue("class"),
  },
  {
    accessorKey: "examName",
    header: "Exam Name",
    cell: ({ row }) => row.getValue("examName"),
  },
  {
    accessorKey: "attempted",
    header: "Attempted",
    cell: ({ row }) => row.getValue("attempted"),
  },
  {
    accessorKey: "marks",
    header: "Marks",
    cell: ({ row }) => row.getValue("marks"),
  },
  {
    accessorKey: "submissionStatus",
    header: "Submission Status",
    cell: ({ row }) => {
      const submissionStatus = row.getValue("submissionStatus");
      return (
        <span
          className="transition-all duration-300"
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
  {
    accessorKey: "assignment",
    header: "Assignment",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("assignment")}</div>
    ),
  },
];

function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [currentAssignment, setCurrentAssignment] = useState("All Assignments");
  const [filteredData, setFilteredData] = useState(allData);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Handle assignment change with transition
  const handleAssignmentChange = (newAssignment) => {
    setIsTransitioning(true);

    // Short delay before changing data for visual effect
    setTimeout(() => {
      setCurrentAssignment(newAssignment);

      // Apply both assignment and search filters
      const newData = allData.filter((item) => {
        const matchesAssignment =
          newAssignment === "All Assignments" ||
          item.assignment === newAssignment;
        const matchesSearch =
          searchValue === "" ||
          item.studentName.toLowerCase().includes(searchValue.toLowerCase());
        return matchesAssignment && matchesSearch;
      });

      setFilteredData(newData);

      // End transition effect
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 200);
  };

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchValue(value);

    // Apply both search and assignment filters
    const newData = allData.filter((item) => {
      const matchesAssignment =
        currentAssignment === "All Assignments" ||
        item.assignment === currentAssignment;
      const matchesSearch =
        value === "" ||
        item.studentName.toLowerCase().includes(value.toLowerCase());
      return matchesAssignment && matchesSearch;
    });

    setFilteredData(newData);
  };

  // Initialize data
  useEffect(() => {
    setFilteredData(allData);
  }, []);

  const table = useReactTable({
    data: filteredData,
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
  });

  // Get unique assignment values for the dropdown
  const assignments = [
    "All Assignments",
    ...new Set(allData.map((item) => item.assignment)),
  ];

  return (
    <div className="w-full text-black">
      <div className="flex items-center justify-between py-4 bg-[#1d1e22] px-5">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search students"
            value={searchValue}
            onChange={(event) => handleSearchChange(event.target.value)}
            className="max-w-sm bg-[#2b2b2b] border-0 text-white rounded-full transition-all duration-300 focus:ring-2 focus:ring-[#9ca92b]"
          />

          <div className="flex items-center space-x-2">
            <Select
              value={currentAssignment}
              onValueChange={handleAssignmentChange}
            >
              <SelectTrigger className="w-[180px] bg-[#2b2b2b] border-0 text-white transition-all duration-300 hover:bg-[#3a3a3a] focus:ring-2 focus:ring-[#9ca92b]">
                <SelectValue placeholder="Select Assignment" />
              </SelectTrigger>
              <SelectContent className="bg-[#2b2b2b] text-white border-[#3a3a3a]">
                {assignments.map((assignment) => (
                  <SelectItem
                    key={assignment}
                    value={assignment}
                    className="focus:bg-[#3a3a3a] hover:bg-[#3a3a3a]"
                  >
                    {assignment}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-x-5">
          <Button className="bg-[#9ca92b] hover:bg-[#8a952a] transition-all duration-300">
            Add to Mark attendance
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto bg-[#116752] text-white hover:bg-[#0e574a] transition-all duration-300"
              >
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#2b2b2b] text-white border-[#3a3a3a]"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize focus:bg-[#3a3a3a] hover:bg-[#3a3a3a]"
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
      <div
        className={`rounded-md transition-opacity duration-300 ${
          isTransitioning ? "opacity-100" : "opacity-100"
        }`}
      >
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
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="transition-all duration-300 hover:bg-gray-50"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isTransitioning
                      ? "none"
                      : "fadeIn 0.5s ease forwards",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="transition-all duration-300"
                    >
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
            className="transition-all duration-300 hover:bg-gray-100"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="transition-all duration-300 hover:bg-gray-100"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
export default DataTableDemo;
