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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import * as XLSX from "xlsx";
import axios from "axios";

const AdvancedFacultyManagement = () => {
  const [activeView, setActiveView] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Staff_name");
  const [importStatus, setImportStatus] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [Staff_name, setStaffName] = useState("");
  const [email, setEmail] = useState("");
  const [Section, setSection] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Assigned_Class, setAssignedClass] = useState("");
  const [Subject, setSubject] = useState("");
  const [status, setStatus] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [deleteFacultyId, setDeleteFacultyId] = useState(null);
  const [facultyData, setFacultyData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  const sections = {
    FY: ["FY-A", "FY-B", "FY-C", "FY-D", "FY-E"],
  };
  const statusOptions = ["active", "on leave", "retired"];

  const fetchFacultyData = async () => {
    try {
      const response = await axios.post("http://localhost:5472/services/retrievestaffs");
      setFacultyData(response.data);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.post("http://localhost:5472/services/getsubjects");
      const subjects = response.data.subject;

      if (subjects && subjects.length > 0) {
        const uniqueSubjects = [...new Set([...departments, ...subjects])];
        setDepartments(uniqueSubjects);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        let jsonData = XLSX.utils.sheet_to_json(worksheet);
        let header = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (!header || header.length === 0) {
          setError("The Excel file is empty or improperly formatted.");
          return;
        }

        const firstRow = header[0];
        const requiredHeaders = [
          "_id",
          "Staff_name",
          "Mob",
          "Staff_Email",
          "Assigned_Class",
          "Section",
          "Subject",
        ];

        const isValidFormat = requiredHeaders.every((header) =>
          firstRow.includes(header)
        );

        if (isValidFormat) {
          jsonData = jsonData.map((student) => ({
            ...student,
            college_id: parseInt(localStorage.getItem("college_id")),
          }));

          insertstudents(jsonData);
        } else {
          setError("Excel file should be in the correct format.");
        }
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        setError("Invalid Excel file. Please upload a valid file.");
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      setImportError("Failed to read the file. Please try again.");
    };

    reader.readAsArrayBuffer(file);
  };

  const insertstudents = async (studentdata) => {
    try {
      let addstudent = await axios.post(
        "http://localhost:5472/services/addstaffimport",
        { studentdata, collecname: "Staff_Master" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (addstudent.status === 201) {
        setImportStatus("Success");
        setFacultyData((prev) => [...prev, ...studentdata]);
        setImportStatus("success");
        setTimeout(() => {
          setImportStatus(null);
          setIsImportModalOpen(false);
          setError(null);
          setImportDuplicateErrors([]);
        }, 2000);
      } else if (addstudent.status === 409) {
        setImportStatus("error");
        setImportDuplicateErrors(addstudent.data.errors);
      } else {
        setImportStatus("error");
        setImportError("Failed to add Staff.");
      }
    } catch (err) {
      console.error("Error during staff import:", err);
      setImportStatus("error");
      setImportError("An error occurred during staff import.");
    }
  };

  const fetchSubjectsByStaffId = async (staffId) => {
    try {
      const response = await axios.post("http://localhost:5472/services/getsubjectsbystaffid", {
        staff_id: staffId,
      });
      const staffSubjects = response.data.subjects;
      if (staffSubjects && staffSubjects.length > 0) {
        setDepartments((prevDepartments) => [...prevDepartments, ...staffSubjects]);
      }
    } catch (error) {
      console.error("Error fetching subjects by staff ID:", error);
    }
  };

  useEffect(() => {
    fetchFacultyData();
    fetchSubjects();
  }, []);

  const handleAddFaculty = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const duplicateCheckResponse = await axios.post("http://localhost:5472/services/getsubjectsbystaffid", {
        phone: phoneNumber,
        email: email,
      });

      if (duplicateCheckResponse.status === 409) {
        setError("Phone number or email already exists for another staff member.");
        alert("Phone number or email already exists for another staff member.");
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError("Phone number or email already exists for another staff member.");
        alert("Phone number or email already exists for another staff member.");
        return;
      }
      console.error("Error checking for duplicates:", error);
    }

    const newFaculty = {
      _id: Math.floor(Math.random() * 1000),
      Staff_name,
      Assigned_Class,
      Section,
      Subject,
      email,
      phone: phoneNumber,
      status: status || "active",
      image: "/api/placeholder/40/40",
    };

    try {
      const response = await axios.post("http://localhost:5472/services/addstaff", {
        staffdata: [newFaculty],
        collecname: "Staff_Master",
      });

      if (response.status === 200) {
        setFacultyData([...facultyData, newFaculty]);
        setIsAddModalOpen(false);
        setStaffName("");
        setEmail("");
        setSection("");
        setPhoneNumber("");
        setAssignedClass("");
        setSubject("");
        setStatus("");
      }
    } catch (error) {
      console.error("Error adding faculty:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteFacultyId(id);
    setOpenDropdownId(null);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.post("http://localhost:5472/services/deletestaff", {
        id: deleteFacultyId,
      });

      if (response.status === 200) {
        setFacultyData(facultyData.filter((faculty) => faculty._id !== deleteFacultyId));
        setDeleteFacultyId(null);
      }
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const cancelDelete = () => {
    setDeleteFacultyId(null);
  };

  const filteredData = facultyData
    .filter((faculty) => {
      if (activeFilter === "all") return true;
      return faculty.department === activeFilter;
    })
    .filter(
      (faculty) =>
        faculty.Staff_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.Assigned_Class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.Subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      return a[sortBy].localeCompare(b[sortBy]) * order;
    });

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
                Upload your Excel file containing faculty data. The file should
                include columns for name, department, subject, email, and phone
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
                  <li>Department (Must match existing departments)</li>
                  <li>Subject (Teaching subject)</li>
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="">
        <div className="mb-8 ">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <div
                key={dept}
                className="bg-white rounded-lg p-4 shadow-sm border border-[#b2b2b2]"
              >
                <h3 className="text-sm font-medium text-gray-800 bg-[#d4ecd4] w-fit px-2 py-1 rounded-full">
                  {dept}
                </h3>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {facultyData.filter((f) => f.Subject === dept).length}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className=" rounded-t-2xl shadow-sm p-4 mb-6 bg-[#b3206f]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg  focus:outline-none  bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-100">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2  rounded-lg focus:outline-none bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all"
              >
                <option value="Staff_name" className="text-black">
                  Name
                </option>
                <option value="Assigned_Class" className="text-black">
                  Class
                </option>
                <option value="Subject" className="text-black">
                  Subject
                </option>
              </select>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="p-2 bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all rounded-lg"
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="w-4 h-4" />
                ) : (
                  <SortDesc className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center space-x-2 bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all p-2rounded-xl">
              <button
                onClick={() => setActiveView("grid")}
                className={`px-3 text-sm py-1 rounded-lg ${
                  activeView === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-200"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setActiveView("list")}
                className={`px-3 py-1 text-sm rounded-lg ${
                  activeView === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-200"
                }`}
              >
                List
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="flex items-center px-4 py-2 bg-[#116752] text-white rounded-lg  transition-colors text-sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Excel
              </button>
              <Sheet open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <SheetTrigger asChild>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center px-4 py-2 bg-black text-white rounded-lg  transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Faculty
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[400px] overflow-y-auto p-0 border-0"
                >
                  <SheetHeader className="bg-black text-white w-full py-10">
                    <div className="px-5">
                      <h1 className="text-lg font-medium">Add Faculty</h1>
                      <p className="text-gray-400">
                        Enter validate faculty information details
                      </p>
                    </div>
                  </SheetHeader>
                  <form
                    onSubmit={handleAddFaculty}
                    className="mt-6 space-y-4 px-4"
                  >
                    <div className="flex flex-col space-y-4 pt-5">
                      {error && (
                        <div className="text-red-500 text-sm mb-4">{error}</div>
                      )}
                      <TextField
                        label="Name"
                        variant="outlined"
                        value={Staff_name}
                        onChange={(e) => setStaffName(e.target.value)}
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
                        label="Assigned Class"
                        variant="outlined"
                        value={Assigned_Class}
                        onChange={(e) => setAssignedClass(e.target.value)}
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
                        label="Section"
                        variant="outlined"
                        value={Section}
                        onChange={(e) => setSection(e.target.value)}
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
                        label="Subject"
                        variant="outlined"
                        value={Subject}
                        onChange={(e) => setSubject(e.target.value)}
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
          {filteredData.map((faculty) => (
            <div
              key={faculty._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img
                    src={faculty.image}
                    alt={faculty.Staff_name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">
                      {faculty.Staff_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {faculty.Assigned_Class} - {faculty.Section}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      faculty.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {faculty.status}
                  </span>
                  <DropdownMenu
                    open={openDropdownId === faculty._id}
                    onOpenChange={(open) =>
                      setOpenDropdownId(open ? faculty._id : null)
                    }
                  >
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(faculty._id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Subject:</span>
                  {faculty.Subject}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Email:</span>
                  {faculty.Staff_Email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Phone:</span>
                  {faculty.Mob}
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
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((faculty) => (
                <tr key={faculty._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={faculty.image}
                        alt={faculty.Staff_name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {faculty.Staff_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {faculty.Staff_Email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {faculty.Assigned_Class}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{faculty.Section}</td>
                  <td className="px-6 py-4 text-gray-900">{faculty.Subject}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        faculty.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {faculty.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu
                      open={openDropdownId === faculty._id}
                      onOpenChange={(open) =>
                        setOpenDropdownId(open ? faculty._id : null)
                      }
                    >
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(faculty._id)}
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

      {deleteFacultyId && (
        <Dialog open={!!deleteFacultyId} onOpenChange={cancelDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                {facultyData.find((f) => f._id === deleteFacultyId)?.Staff_name}?
                This action cannot be undone.
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

export default AdvancedFacultyManagement;