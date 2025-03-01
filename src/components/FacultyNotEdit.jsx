import React, { useState } from "react";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";

const FacultyNotEdit = () => {
  const [activeView, setActiveView] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg   focus:outline-none bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-100">Filter:</span>
              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-3 py-2  rounded-lg focus:outline-none bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FacultyNotEdit;
