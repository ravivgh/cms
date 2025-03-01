import React, { useState } from "react";
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

const data = [
  {
    avatar:
      "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/0f6fee60-187e-44ed-8ccf-e0bc3b56eeac.jpg",
    studentName: "John Doe",
    rollNo: "1001",
    class: "Physics 101",
    examName: "Midterm Exam",
    attempted: "Yes",
    marks: 45,
    submissionStatus: "Submitted",
  },
  {
    avatar:
      "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/68935ce6-16ff-437f-bc4a-5f85c7e238fe.jpg",
    studentName: "Jane Smith",
    rollNo: "1002",
    class: "Mathematics 101",
    examName: "Final Exam",
    attempted: "No",
    marks: 42,
    submissionStatus: "Not Submitted",
  },
  {
    avatar:
      "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/bb34b3a9-006d-4b7e-b885-8cd040cd60b5.jpg",
    studentName: "Michael Johnson",
    rollNo: "1003",
    class: "Chemistry 101",
    examName: "Quiz 1",
    attempted: "Yes",
    marks: 28,
    submissionStatus: "Submitted",
  },
  {
    avatar:
      "https://dersyb7nfifdf.cloudfront.net/production/interviewer-profile-pictures/5fa1f3f4-f66c-44d8-a814-fd08ee85beca.jpg",
    studentName: "Michael Johnson",
    rollNo: "1003",
    class: "Chemistry 101",
    examName: "Quiz 1",
    attempted: "Yes",
    marks: 28,
    submissionStatus: "Submitted",
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
      <Avatar className="rounded-lg w-16 h-16  ">
        <AvatarImage src={row.getValue("avatar")} alt="Avatar" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "studentName",
    header: "Student Name",
    cell: ({ row }) => row.getValue("studentName"),
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
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const student = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(student.rollNo)}
  //           >
  //             Copy Roll No
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View Student Details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

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
  });

  return (
    <div className="w-full text-black">
      <div className="flex items-center justify-between py-4 bg-[#1d1e22]  px-5">
        <Input
          placeholder="Search students"
          value={table.getColumn("studentName")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("studentName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-[#2b2b2b] border-0 text-white rounded-full"
        />
        <div className="space-x-5 ">
          <Button className="bg-[#9ca92b] hover:bg-[#9ca92b] ">
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
    </div>
  );
}
export default DataTableDemo;
