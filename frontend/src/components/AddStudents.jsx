import { useState, useEffect } from "react";
import axios from "axios";
import deleteStudent from "@/scripts/DeleteStudents.mjs";
import insertStudent from "@/scripts/AddStudent.mjs";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Cell = ({ row, setEditFormData, onDelete }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const handleEdit = () => {
    setEditFormData(row.original);
    setIsSheetOpen(true);
  };
  const deleterecord = async (row) => {
    try {
      const response = await deleteStudent(row.original._id);

      if (response) {
        setIsAlertOpen(false);
        onDelete(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4 text-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
          Delete Profile
        </DropdownMenuItem>
      </DropdownMenuContent>
      {/* Add a Sheet for editing the profile */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        {/* Form to edit profile (similar to Add Form) */}
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
                deleterecord(row);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
};

export function AddStudents() {
  const [data, setData] = useState([]); // State for table data
  const [editFormData, setEditFormData] = useState(null); // Data for editing the form
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [section, setSection] = useState("");
  const [Class, setClass] = useState("");
  const [subject, setSubject] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);
  const [student, setStudentData] = useState({});
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isSectionValid, setIsSectionValid] = useState(true);
  const [isClassValid, setIsClassValid] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    setIsPhoneNumberValid(validatePhoneNumber(newPhoneNumber));
  };
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setIsNameValid(validateName(newName));
  };
  const validateSection = (section) => {
    const sectionRegex = /^[A-Za-z\s]+$/;
    return sectionRegex.test(section);
  };

  const handleSectionChange = (e) => {
    const newSection = e.target.value;
    setSection(newSection);
    setIsSectionValid(validateSection(newSection));
  };
  const validateClass = (Class) => {
    const classRegex = /^[A-Za-z\s]+$/;
    return classRegex.test(Class);
  };
  const handleSave = () => {
    setDialogMessage("Record added successfully!");
    setIsDialogOpen(true);
    setIsSheetOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleClassChange = (e) => {
    const newClass = e.target.value;
    setClass(newClass);
    setIsClassValid(validateClass(newClass));
  };
  const addstudent = async () => {
    try {
      let response = await insertStudent(
        name,
        Class,
        section,
        dob,
        email,
        phoneNumber
      );
      if (response) {
        setIsSheetOpen(false);

        setRefreshCount((p) => p + 1);
      } else {
        console.log("Error with the script");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5472/services/retrievestudents"
        );
        debugger;
        setStudentData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setStudentData(Array.isArray(response.data) ? response.data : []);
        console.error(error);
      }
    };

    fetchStudentData();
  }, [refreshCount]);

  const columns = [
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "Student_Name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Student Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="sentencecase">{row.getValue("Student_Name")}</div>
      ),
    },
    {
      accessorKey: "Class",
      header: "Class",
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <Cell
          row={row}
          setEditFormData={setEditFormData}
          onDelete={() => setRefreshCount((p) => p + 1)}
        />
      ),
    },
  ];

  const table = useReactTable({
    data: student,
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
          value={table.getColumn("Student_Name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("Student_Name")?.setFilterValue(event.target.value)
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
        <div className="px-3 add-faculty-btn">
          <Button onClick={() => setIsSheetOpen(true)}>Add +</Button>
        </div>
      </div>

      {/* Data Table */}
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

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-[425px]" side="right">
          <SheetHeader>
            <SheetTitle>Add Student</SheetTitle>
            <SheetDescription>Add Student</SheetDescription>
          </SheetHeader>
          <div className="space-y-2 py-4">
            <TextField
              label="Student Name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter here"
              error={!isNameValid && name !== ""}
              helperText={
                !isNameValid && name !== "" ? "Only letters are allowed" : ""
              }
              fullWidth
            />
            <TextField
              label="Date of Birth"
              type="date"
              onChange={(e) => setDob(e.target.value)}
              fullWidth
            />

            <TextField
              label="Class"
              value={Class}
              onChange={handleClassChange}
              placeholder="Enter here"
              error={!isClassValid && Class !== ""}
              helperText={
                !isClassValid && Class !== "" ? "Only letters are allowed" : ""
              }
              fullWidth
            />
            <TextField
              label="Section"
              value={section}
              onChange={handleSectionChange}
              placeholder="Enter here"
              error={!isSectionValid && section !== ""}
              helperText={
                !isSectionValid && section !== ""
                  ? "Only letters are allowed"
                  : ""
              }
              fullWidth
            />

            <TextField
              label="Student Email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter here"
              error={!isEmailValid && email !== ""}
              helperText={
                !isEmailValid && email !== "" ? "Invalid email format" : ""
              }
              fullWidth
            />
            <TextField
              label="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter here"
              error={!isPhoneNumberValid && phoneNumber !== ""}
              helperText={
                !isPhoneNumberValid && phoneNumber !== ""
                  ? "Phone number must be exactly 10 digits"
                  : ""
              }
              fullWidth
            />
          </div>
          <Button
            type="Submit"
            className="w-full"
            onClick={() => {
              addstudent();
              handleSave();
            }}
            disabled={
              !isEmailValid ||
              !isPhoneNumberValid ||
              email === "" ||
              phoneNumber === "" ||
              !isNameValid ||
              name === "" ||
              !isClassValid ||
              Class === "" ||
              !isSectionValid ||
              section === ""
            }
          >
            Add
          </Button>
        </SheetContent>
      </Sheet>
      {isDialogOpen && (
        <div className="blank">
          <div className="show-popup">
            <div className="close-btn" onClick={handleCloseDialog}></div>
            <div className="pt-5">
              <IoIosCheckmarkCircleOutline
                style={{ color: "green", fontSize: "80px " }}
                className="mx-auto"
              />
            </div>
            <div className="heading text-white text-2xl text-center">
              <h1>{dialogMessage}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AddStudents;
