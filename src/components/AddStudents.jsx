import React, { useState, useEffect } from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import TextField from "@mui/material/TextField";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Popover from "@mui/material/Popover";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label, Pie, PieChart, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoIosClose } from "react-icons/io";

const Cell = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPopOpen, setPopOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [section, setSection] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setPopOpen(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopOpen(false);
  };
  const sections = {
    FY: ["FY-A", "FY-B", "FY-C", "FY-D", "FY-E"],
  };
  const selectedYear = "FY";
  const handleSectionChange = (value) => {
    setSection(value);
    console.log(value);
  };
  // const chartData = [
  //   { status: "Present", count: 120, fill: "#755485" },
  //   { status: "Absent", count: 30, fill: "#27282c" },
  // ];
  useEffect(() => {
    // Retrieve subjects from local storage
    const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(storedSubjects);
  }, []);

  useEffect(() => {
    // Simulated data based on the selected subject
    if (subjects.length > 0) {
      const data = subjects.map((subject, index) => ({
        subject,
        status: "Present",

        count: Math.floor(Math.random() * 100) + 50,
        fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
      }));
      setChartData(data);
    }
  }, [subjects]);
  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4 text-black" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsSheetOpen(true)}>
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
            Delete Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handlePopoverOpen}>View</DropdownMenuItem>
        </DropdownMenuContent>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit Profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when
              </SheetDescription>
            </SheetHeader>
            <div className="flex items-center flex-col justify-center space-y-3 pt-5">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter here"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black",
                    width: "350px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiInputLabel-outlined": {
                    color: "black",
                  },
                }}
              />
              <div>
                <Select onValueChange={handleSectionChange} value={section}>
                  <SelectTrigger className="w-[350px] border border-black">
                    <SelectValue placeholder="Select a section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sections</SelectLabel>
                      {sections[selectedYear].map((sec) => (
                        <SelectItem key={sec} value={sec}>
                          {sec}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter here"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black",
                    width: "350px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiInputLabel-outlined": {
                    color: "black",
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter here"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black",
                    width: "350px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiInputLabel-outlined": {
                    color: "black",
                  },
                }}
              />
              <TextField
                id="outlined-basic"
                label="Phone number"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter here"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "black",
                    width: "350px",

                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                  },
                  "& .MuiInputLabel-outlined": {
                    color: "black",
                  },
                }}
              />
              <div className="">
                <Button className="bg-black text-white mt-14 w-[350px]">
                  Save
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                profile.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setIsAlertOpen(false);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenu>
      <Popover
        open={isPopOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className="mr-10"
      >
        <div className="">
          {" "}
          <div className="w-full max-w-sm mx-auto">
            <Card className="flex flex-col ">
              <div className="flex justify-end p-3">
                <IoIosClose
                  onClick={() => setPopOpen(false)}
                  className="text-[30px]  text-gray-600  border rounded-full border-[#a0a0a086] hover:bg-[#00000071] hover:text-white"
                />
              </div>

              <CardHeader className="items-center pb-0">
                <CardTitle>Attendance</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <div className="mx-auto aspect-square max-h-[250px] w-full flex justify-center">
                  <PieChart width={250} height={250}>
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length) {
                          const { subject, status, count } = payload[0].payload;
                          return (
                            <div className="custom-tooltip">
                              <p className="label">{`${subject} - ${status}`}</p>
                              <p className="intro">{`Count: ${count}`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Pie
                      data={chartData}
                      dataKey="count"
                      nameKey="status"
                      innerRadius={60}
                      outerRadius={80}
                      strokeWidth={5}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="text-foreground text-3xl font-bold"
                                >
                                  {totalCount.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="text-muted-foreground"
                                >
                                  Attendance
                                </tspan>
                              </text>
                            );
                          }
                          return null;
                        }}
                      />
                    </Pie>
                  </PieChart>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing total attendance for the last 6 months
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Popover>
    </>
  );
};

// Sample data
const data = [
  {
    id: "m5gr84i9",
    name: "manish raj",
    class: "FYA",
    address: "123 Main St",
    mobile: "123-456-7890",
    email: "johndoe@example.com",
  },
  {
    id: "3u1reuv4",
    name: "Jane Smith",
    class: "FYA",
    address: "456 Elm St",
    mobile: "987-654-3210",
    email: "janesmith@example.com",
  },
  {
    id: "3u1reuv4",
    name: "Jane Smith",
    class: "FYA",
    address: "456 Elm St",
    mobile: "987-654-3210",
    email: "janesmith@example.com",
  },
];

// Column definitions
const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: Cell,
  },
];

export function AddStudents() {
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter Name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
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
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
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
export default AddStudents;
