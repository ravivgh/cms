import React, { useState } from "react";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
const AdvancedFacultyManagement = () => {
  const [activeView, setActiveView] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [importStatus, setImportStatus] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [section, setSection] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [assignedClass, setAssignedClass] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");
  const [editFaculty, setEditFaculty] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [deleteFacultyId, setDeleteFacultyId] = useState(null);
  const [facultyData, setFacultyData] = useState([
    {
      id: "FT001",
      name: "Sarah Miller",
      department: "Computer Science",
      subject: "Operating Systems",
      email: "sarah.miller@university.edu",
      phone: "(555) 123-4567",
      status: "active",
      image: "https://avatars.githubusercontent.com/u/1?v=4",
    },
    {
      id: "FT002",
      name: "niraj",
      department: "Computer Science",
      subject: "Operating Systems",
      email: "sarah.miller@university.edu",
      phone: "(555) 123-4567",
      status: "active",
      image: "https://avatars.githubusercontent.com/u/1?v=4",
    },
    {
      id: "FT003",
      name: "Prof. James Wilson",
      department: "Data Science",
      subject: "Machine Learning",
      email: "j.wilson@university.edu",
      phone: "(555) 987-6543",
      status: "active",
      image: "https://avatars.githubusercontent.com/u/2?v=4",
    },
    {
      id: "FT004",
      name: "Dr. Emily Chen",
      department: "Information Technology",
      subject: "Database Systems",
      email: "e.chen@university.edu",
      phone: "(555) 234-5678",
      status: "on leave",
      image: "https://avatars.githubusercontent.com/u/3?v=4",
    },
  ]);
  const departments = [
    "Computer Science",
    "Data Science",
    "Information Technology",
    "Artificial Intelligence",
  ];
  const sections = {
    FY: ["FY-A", "FY-B", "FY-C", "FY-D", "FY-E"],
  };

  const statusOptions = ["active", "on leave", "retired"];
  const handleAddFaculty = (e) => {
    e.preventDefault();
    const newFaculty = {
      id: `FT${Math.floor(Math.random() * 1000)}`,
      name,
      department: "Computer Science", // You might want to add a department selector
      subject,
      email,
      phone: phoneNumber,
      status: status || "active",
      image: "/api/placeholder/40/40",
      section,
      assignedClass,
    };
    setFacultyData([...facultyData, newFaculty]);
    setIsAddModalOpen(false);
    // Reset form
    setName("");
    setEmail("");
    setSection("");
    setPhoneNumber("");
    setAssignedClass("");
    setSubject("");
    setStatus("");
  };
  const handleEditFaculty = (faculty) => {
    setEditFaculty(faculty);
    setName(faculty.name);
    setEmail(faculty.email);
    setSection(faculty.section || "");
    setPhoneNumber(faculty.phone);
    setAssignedClass(faculty.assignedClass || "");
    setSubject(faculty.subject);
    setStatus(faculty.status);
    setOpenDropdownId(null);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedFaculty = {
      ...editFaculty,
      name,
      email,
      section,
      phone: phoneNumber,
      assignedClass,
      subject,
      status,
    };
    setFacultyData(
      facultyData.map((faculty) =>
        faculty.id === updatedFaculty.id ? updatedFaculty : faculty
      )
    );
    setEditFaculty(null);
    setName("");
    setEmail("");
    setSection("");
    setPhoneNumber("");
    setAssignedClass("");
    setSubject("");
    setStatus("");
  };

  const handleDeleteClick = (id) => {
    setDeleteFacultyId(id);
    setOpenDropdownId(null);
  };

  const confirmDelete = () => {
    setFacultyData(
      facultyData.filter((faculty) => faculty.id !== deleteFacultyId)
    );
    setDeleteFacultyId(null);
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
        faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faculty.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const order = sortOrder === "asc" ? 1 : -1;
      return a[sortBy].localeCompare(b[sortBy]) * order;
    });
  // Function to handle Excel file import
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // In a real implementation, you would use a library like xlsx to parse Excel files
      // For this example, we'll simulate the import process
      setImportStatus("processing");

      setTimeout(() => {
        const sampleImportedData = [
          {
            id: `FT${Math.floor(Math.random() * 1000)}`,
            name: "Dr. Import Test",
            department: "Computer Science",
            subject: "Data Structures",
            email: "import.test@university.edu",
            phone: "(555) 999-8888",
            status: "active",
            image: "/api/placeholder/40/40",
          },
        ];

        setFacultyData((prev) => [...prev, ...sampleImportedData]);
        setImportStatus("success");

        // Reset after 2 seconds
        setTimeout(() => {
          setImportStatus(null);
          setIsImportModalOpen(false);
        }, 2000);
      }, 1500);
    }
  };

  // Import Modal Component
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
      {/* Header with Stats */}
      <div className="">
        <div className="mb-8 ">
          {/* <h1 className="text-3xl font-bold text-gray-900">Faculty Management</h1> */}

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
                  {facultyData.filter((f) => f.department === dept).length}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Control Panel */}
        <div className=" rounded-t-2xl shadow-sm p-4 mb-6 bg-[#b3206f]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg   focus:outline-none   bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-100">Filter:</span>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-3 py-2  rounded-lg focus:outline-none  bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="text-black">
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-100">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2  rounded-lg focus:outline-none bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all"
              >
                <option value="name" className="text-black">
                  Name
                </option>
                <option value="department" className="text-black">
                  Department
                </option>
                <option value="subject" className="text-black">
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

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all p-2 rounded-xl">
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
                      <TextField
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
                      <Select onValueChange={setSection} value={section}>
                        <SelectTrigger className="w-[350px] border border-black">
                          <SelectValue placeholder="Select a section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sections</SelectLabel>
                            {sections.FY.map((sec) => (
                              <SelectItem key={sec} value={sec}>
                                {sec}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <TextField
                        label="Assigned Class"
                        variant="outlined"
                        value={assignedClass}
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
                      <Select onValueChange={setStatus} value={status}>
                        <SelectTrigger className="w-[350px] border border-black">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            {statusOptions.map((sta) => (
                              <SelectItem key={sta} value={sta}>
                                {sta}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <TextField
                        label="Subject"
                        variant="outlined"
                        value={subject}
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

      {/* Faculty Display */}
      {activeView === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((faculty) => (
            <div
              key={faculty.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">
                      {faculty.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {faculty.department}
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
                    open={openDropdownId === faculty.id}
                    onOpenChange={(open) =>
                      setOpenDropdownId(open ? faculty.id : null)
                    }
                  >
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => handleEditFaculty(faculty)}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(faculty.id)}
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
                  {faculty.subject}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Email:</span>
                  {faculty.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Phone:</span>
                  {faculty.phone}
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
                  Department
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
                <tr key={faculty.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={faculty.image}
                        alt={faculty.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {faculty.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {faculty.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {faculty.department}
                  </td>
                  <td className="px-6 py-4 text-gray-900">{faculty.subject}</td>
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
                      open={openDropdownId === faculty.id}
                      onOpenChange={(open) =>
                        setOpenDropdownId(open ? faculty.id : null)
                      }
                    >
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleEditFaculty(faculty)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(faculty.id)}
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
      {editFaculty && (
        <Dialog open={!!editFaculty} onOpenChange={() => setEditFaculty(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Faculty</DialogTitle>
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
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <Select onValueChange={setSection} value={section}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sections</SelectLabel>
                    {sections.FY.map((sec) => (
                      <SelectItem key={sec} value={sec}>
                        {sec}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <TextField
                label="Phone number"
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
              />
              <TextField
                label="Assigned Class"
                variant="outlined"
                value={assignedClass}
                onChange={(e) => setAssignedClass(e.target.value)}
                fullWidth
              />
              <TextField
                label="Subject"
                variant="outlined"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                fullWidth
              />
              <Select onValueChange={setStatus} value={status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {statusOptions.map((sta) => (
                      <SelectItem key={sta} value={sta}>
                        {sta}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setEditFaculty(null)} variant="outlined">
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
      {deleteFacultyId && (
        <Dialog open={!!deleteFacultyId} onOpenChange={cancelDelete}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete{" "}
                {facultyData.find((f) => f.id === deleteFacultyId)?.name}? This
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

export default AdvancedFacultyManagement;
