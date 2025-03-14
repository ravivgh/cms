import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Plus,
  MoreHorizontal,
  X,
  FileSpreadsheet,
  Check,
  Upload,
} from "lucide-react";
import { TextField, Button } from "@mui/material";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import * as XLSX from "xlsx";
import { RiFileExcel2Fill } from "react-icons/ri";
import axios from "axios";

const AdvancedStudentManagement = () => {
  const [activeView, setActiveView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [importStatus, setImportStatus] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [SectionName, setSectionName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const[studentpro,setStudentpro] = useState({})
  const [studentData, setStudentData] = useState([
    {
      id: "ST001",
      name: "John Doe",
      className: "FYBCA",
      address: "123 Main Street",
      mobile: "(555) 123-4567",
      email: "john.doe@example.com",
      avatar: "https://avatars.githubusercontent.com/u/1?v=4",
      
    },
    {
      id: "ST002",
      name: "Jane Smith",
      className: "SYBCA",
      address: "456 Oak Avenue",
      mobile: "(555) 234-5678",
      email: "jane.smith@example.com",
      avatar: "https://avatars.githubusercontent.com/u/2?v=4",
    },
    {
      id: "ST003",
      name: "Mike Johnson",
      className: "TYBCA",
      address: "789 Pine Road",
      mobile: "(555) 345-6789",
      email: "mike.johnson@example.com",
      avatar: "https://avatars.githubusercontent.com/u/3?v=4",
    },
  ]);
  const [editStudent, setEditStudent] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [deleteStudentId, setDeleteStudentId] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    className: "",
    mobile: "",
    email: "",
  });
  const studentId = localStorage.getItem("student_id");

  useEffect(() => {
    fetchData();
  }, []);

  const classStats = studentData.reduce((acc, student) => {
    acc[student.className] = (acc[student.className] || 0) + 1;
    return acc;
  }, {});
  const uniqueClasses = Object.keys(classStats);

  const validateFields = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!className.trim()) {
      newErrors.className = "Class is required";
    }

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9()-\s]{10,}$/.test(mobile.replace(/\s/g, ""))) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const newStudent = {
      _id: Math.floor(Math.random() * 1000),
      Student_Name: name,
      Class: className,
      Section: SectionName,
      DOB: dob,
      Email: email,
      address: address,
      Mobile: mobile,
      avatar: "https://example.com/default-avatar.jpg", 
    };

    try {
      const response = await axios.post('http://localhost:5472/services/addstudent', {
        studentdata: [newStudent],
        collecname: "Student_Master",
      });

      if (response.status === 200) {
        setStudentData([...studentData, newStudent]);
        setIsAddModalOpen(false);
        setName("");
        setClassName("");
        setSectionName("");
        setAddress("");
        setMobile("");
        setEmail("");
        setDob("");
        setErrors({ name: "", className: "", mobile: "", email: "" });
      }
    } catch (error) {
      console.error('Error adding students:', error);
    }
  };

  const selectAll = async () => {
    try {
      let response;
      if (!localStorage.getItem("staff_id")) {
        response = await axios.post("http://localhost:5472/services/retrievestudentsadmin");
      } else {
        response = await axios.post("http://localhost:5472/services/retrievestudents", {
          staffid: parseInt(localStorage.getItem("staff_id")),
        });
      }
  
      const apiStudents = response.data.map((student) => ({
        id: student._id,
        name: student.Student_Name,
        className: student.Class,
        dob: student.DOB,
        email: student.Email,
        mobile: student.Mobile,
        section: student.Section,
        address: student.address,
        avatar:  student._id 
          ? `http://localhost:5472/profilepics/${student._id}.png`
          : "https://example.com/default-avatar.jpg",
      }));
  
      setStudentData(apiStudents);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const fetchData = async () => {
    await selectAll();
  };
  const handleEditStudent = (student) => {
    setEditStudent(student);
    setName(student.name);
    setClassName(student.className);
    setAddress(student.address);
    setMobile(student.mobile);
    setEmail(student.email);
    setOpenDropdownId(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedStudent = {
      ...editStudent,
      name,
      className,
      address,
      mobile,
      email,
    };
    setStudentData(
      studentData.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    setEditStudent(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteStudentId(id);
    setOpenDropdownId(null);
  };
  const deleteStudent = async (id) => {
    try {
      const response = await axios.post("http://localhost:5472/services/deletestudent", {
        id: id,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to delete student");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteStudent(deleteStudentId);
      
      setStudentData((prevData) =>
        prevData.filter((student) => student.id !== deleteStudentId)
      );

      
      setDeleteStudentId(null);

      
      console.log(response.message); 
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student. Please try again.");
    }
  };

  const cancelDelete = () => {
    setDeleteStudentId(null);
  };

  const filteredData = studentData
    .filter((student) => {
      if (classFilter === "all") return true;
      return student.className === classFilter || student.Class === classFilter;
    })
    .filter((student) => {
      const name = student.name || "";
      const className = student.className || "";
      let mobile = student.mobile || "";
      const email = student.email || "";
      const address = student.address || "";

      const searchTermLower = searchTerm.toLowerCase();

      if (typeof mobile === 'number') {
        mobile = mobile.toString();
      }

      return (
        name.toLowerCase().includes(searchTermLower) ||
        className.toLowerCase().includes(searchTermLower) ||
        address.toLowerCase().includes(searchTermLower) ||
        (typeof mobile === 'string' && mobile.toLowerCase().includes(searchTermLower)) ||
        email.toLowerCase().includes(searchTermLower)
      );
    })
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      const valueA = a[sortBy] || "";
      const valueB = b[sortBy] || "";
      return valueA.toString().localeCompare(valueB.toString()) * order;
    });

  const totalStudents = filteredData.length;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result); // Use e.target.result
        const workbook = XLSX.read(data, { type: "array" });
  
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let jsonData = XLSX.utils.sheet_to_json(worksheet);
        let header = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
        if (!header || header.length === 0) {
          alert("The Excel file is empty or improperly formatted.");
          return;
        }
  
        const firstRow = header[0];
        const requiredHeaders = [
          "_id",
          "Student_Name",
          "Class",
          "Section",
          "DOB",
          "Email",
          "Mobile",
          "Address"
        ];
  
        const isValidFormat = requiredHeaders.every((header) =>
          firstRow.includes(header)
        );
  
        if (isValidFormat) {
          jsonData = jsonData.map((student) => ({
            ...student,
            college_id: parseInt(localStorage.getItem("college_id")), 
          }));
  
          if (insertstudents(jsonData)) {
            
            setImportStatus("Success");
  
            
            setStudentData((prev) => [...prev, ...jsonData]);
            setImportStatus("success");
            setTimeout(() => {
              setImportStatus(null);
              setIsImportModalOpen(false);
            }, 2000);
          }
        } else {
          alert("Excel file should be in the correct format.");
        }
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        alert("Invalid Excel file. Please upload a valid file.");
      }
    };
  
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      alert("Failed to read the file. Please try again.");
    };
  
    reader.readAsArrayBuffer(file); // Use file, not excel
  };
  
  const insertstudents = async (studentdata) => {
        try {
          let addstudent = await axios.post(
            "http://localhost:5472/services/addstudentimport",
            { studentdata, collecname: "Student_Master" },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          if (addstudent) {
            selectAll()
            return true;
            
          } else {
            console.log("Error");
            setImportStatus("Error");
            return false;
          }
        } catch (err) {
          console.log(err);
        }
      };

  const ImportModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Import Faculty Data</h2>
          <button
            onClick={() => setIsImportModalOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {importStatus === "success" ? (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              Import Successful
            </h3>
            <p className="text-gray-500 mt-2">
              Your faculty data has been imported successfully.
            </p>
          </div>
        ) : importStatus === "processing" ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your file...</p>
          </div>
        ) : (
          <>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload Excel File
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Upload your Excel file containing students data. The file should
                include columns for name, class, address, email, and phone
                number.
              </p>
              <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
                <input
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">
                Template Format
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Required columns:</p>
                <ul className="text-sm text-gray-600 mt-2 list-disc list-inside">
                  <li>Name (Full name of faculty member)</li>
                  <li>Class (Must match existing class)</li>
                  <li>Address (Full address)</li>
                  <li>Email (Valid email address)</li>
                  <li>Phone (Valid phone number)</li>
                </ul>
              </div>
            </div>
          </>
        )}

        {!importStatus && (
          <div className="mt-6">
            <button
              onClick={() => window.open("/student.xlsx")}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Download sample template
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      color: "black",
      width: "350px",
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(0, 0, 0, 0.23)",
      },
    },
    "& .MuiInputLabel-outlined": {
      color: "rgba(0, 0, 0, 0.7)",
      "&.Mui-focused": {
        color: "black",
      },
    },
    "& .MuiFormHelperText-root": {
      color: "#d32f2f",
      marginLeft: "0",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <div className="text-base font-medium text-gray-700 mb-3">
          Total Students: {totalStudents}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {uniqueClasses.map((className) => (
            <div
              key={className}
              className="bg-white rounded-lg p-4 shadow-sm border border-[#b2b2b2]"
            >
              <h3 className="text-sm font-medium text-gray-800 bg-[#d4ecd4] w-fit px-2 py-1 rounded-full">
                {className}
              </h3>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {classStats[className]}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-t-2xl shadow-sm p-6 mb-6 bg-gradient-to-r from-[#1a4f8b] to-[#2168b7]">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="relative flex-grow md:max-w-xs">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 
                  bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
              <span className="text-sm text-gray-100">Filter by Class:</span>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-3 py-1.5 rounded-md focus:outline-none bg-white/10 text-gray-100 border border-white/20"
              >
                <option value="all">All Classes</option>
                {uniqueClasses.map((className) => (
                  <option
                    key={className}
                    value={className}
                    className="text-black"
                  >
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
              <span className="text-sm text-gray-100">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-md focus:outline-none bg-white/10 text-gray-100 border border-white/20"
              >
                <option value="name" className="text-black">
                  Name
                </option>
                <option value="className" className="text-black">
                  Class
                </option>
                <option value="address" className="text-black">
                  Address
                </option>
                <option value="mobile" className="text-black">
                  Mobile
                </option>
                <option value="email" className="text-black">
                  Email
                </option>
              </select>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors"
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="w-5 h-5 text-gray-100" />
                ) : (
                  <SortDesc className="w-5 h-5 text-gray-100" />
                )}
              </button>
            </div>
            <div className="flex items-center bg-white/10 rounded-lg backdrop-blur-sm p-1">
              <button
                onClick={() => setActiveView("grid")}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  activeView === "grid"
                    ? "bg-white text-blue-600"
                    : "text-gray-100 hover:bg-white/10"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setActiveView("list")}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  activeView === "list"
                    ? "bg-white text-blue-600"
                    : "text-gray-100 hover:bg-white/10"
                }`}
              >
                List
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors text-sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Excel
              </button>
              <Sheet open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <SheetTrigger asChild>
                  <button className="flex items-center px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors text-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Student
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[400px] overflow-y-auto p-0 border-0"
                >
                  <SheetHeader className="bg-black text-white w-full py-10">
                    <div className="px-5">
                      <h1 className="text-lg font-medium">Add Student</h1>
                      <p className="text-gray-400">
                        Enter student information details
                      </p>
                    </div>
                  </SheetHeader>
                  <form
                    onSubmit={handleAddStudent}
                    className="mt-6 space-y-4 px-4"
                  >
                    <div className="flex flex-col space-y-4 pt-5">
                      <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors((prev) => ({ ...prev, name: "" }));
                        }}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                        sx={textFieldStyles}
                      />
                      <TextField
                        label="Class"
                        variant="outlined"
                        value={className}
                        onChange={(e) => {
                          setClassName(e.target.value);
                          setErrors((prev) => ({ ...prev, className: "" }));
                        }}
                        error={!!errors.className}
                        helperText={errors.className}
                        required
                        sx={textFieldStyles}
                      />
                      <TextField
                        label="Section"
                        variant="outlined"
                        value={SectionName}
                        onChange={(e) => {
                          setSectionName(e.target.value);
                          setErrors((prev) => ({ ...prev, SectionName: "" }));
                        }}
                        error={!!errors.SectionName}
                        helperText={errors.SectionName}
                        required
                        sx={textFieldStyles}
                      />
                      <TextField
                        label="Date of Birth"
                        variant="outlined"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        type="date"
                        sx={textFieldStyles}
                      />
                      <TextField
                        label="Address"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        multiline
                        rows={2}
                        sx={textFieldStyles}
                      />
                      <TextField
                        label="Mobile"
                        variant="outlined"
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                          setErrors((prev) => ({ ...prev, mobile: "" }));
                        }}
                        error={!!errors.mobile}
                        helperText={errors.mobile}
                        required
                        sx={textFieldStyles}
                      />
                      <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                        sx={textFieldStyles}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        className="bg-black text-white mt-4 w-fit rounded-full"
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {activeView === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-500">{student.className}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <DropdownMenu
                    open={openDropdownId === student.id}
                    onOpenChange={(open) =>
                      setOpenDropdownId(open ? student.id : null)
                    }
                  >
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {/*
                      <DropdownMenuItem
                        onClick={() => handleEditStudent(student)}
                      >
                        Edit
                      </DropdownMenuItem>*/}
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(student.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Address:</span>
                  {student.address}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Mobile:</span>
                  {student.mobile}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Email:</span>
                  {student.email}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div className="font-medium text-gray-900">
                        {student.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {student.className}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{student.address}</td>
                  <td className="px-6 py-4 text-gray-900">{student.mobile}</td>
                  <td className="px-6 py-4 text-gray-900">{student.email}</td>
                  <td className="px-6 py-4">
                    <DropdownMenu
                      open={openDropdownId === student.id}
                      onOpenChange={(open) =>
                        setOpenDropdownId(open ? student.id : null)
                      }
                    >
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {/*<DropdownMenuItem
                          onClick={() => handleEditStudent(student)}
                        >
                          Edit
                        </DropdownMenuItem>*/}
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(student._id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Dialog */}
      {editStudent && (
        <Dialog open={!!editStudent} onOpenChange={() => setEditStudent(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Class"
                variant="outlined"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                fullWidth
              />
              <TextField
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
              />
              <TextField
                label="Mobile"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                fullWidth
              />
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setEditStudent(null)} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteStudentId && (
        <Dialog open={!!deleteStudentId} onOpenChange={cancelDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                {studentData.find((s) => s.id === deleteStudentId)?.name}? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outlined" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={confirmDelete}
                sx={{ backgroundColor: "#dc2626" }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {isImportModalOpen && <ImportModal />}
    </div>
  );
};

export default AdvancedStudentManagement;