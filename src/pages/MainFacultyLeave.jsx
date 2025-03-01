import { useState } from "react";
import FacultySidebar from "@/components/FacultySidebar";
import LeaveFaculty from "../components/Leave";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Avatar } from "@mui/material";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MdCheckCircle, MdCancel, MdPending } from "react-icons/md";
import { Search } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";

const MainFacultyLeave = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreatingLeave, setIsCreatingLeave] = useState(false);
  const [studentLeaveRequests, setStudentLeaveRequests] = useState([
    {
      id: 1,
      name: "Meet Patel",
      role: "Student",
      department: "Information Technology",
      reason: "Family Emergency",
      startDate: "2024-03-22",
      endDate: "2024-03-24",
      status: "pending",
      avatar: "https://avatars.githubusercontent.com/u/2?v=4",
    },
    {
      id: 2,
      name: "John Doe",
      role: "Student",
      department: "Computer Science",
      reason: "Medical Leave",
      startDate: "2024-03-25",
      endDate: "2024-03-28",
      status: "approved",
      avatar: "https://avatars.githubusercontent.com/u/3?v=4",
    },
    {
      id: 2,
      name: "John Doe",
      role: "Student",
      department: "Computer Science",
      reason: "Medical Leave",
      startDate: "2024-03-25",
      endDate: "2024-03-28",
      status: "approved",
      avatar: "https://avatars.githubusercontent.com/u/4?v=4",
    },
    {
      id: 2,
      name: "John Doe",
      role: "Student",
      department: "Computer Science",
      reason: "Medical Leave",
      startDate: "2024-03-25",
      endDate: "2024-03-28",
      status: "approved",
      avatar: "https://avatars.githubusercontent.com/u/5?v=4",
    },
  ]);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleStatusChange = (id, newStatus) => {
    setStudentLeaveRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <MdCheckCircle className="w-5 h-5" />;
      case "rejected":
        return <MdCancel className="w-5 h-5" />;
      default:
        return <MdPending className="w-5 h-5" />;
    }
  };

  const filteredRequests = studentLeaveRequests.filter((request) => {
    const matchesSearch = request.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesStatus =
      filters.status === "all" || request.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex">
        <FacultySidebar
          isSidebarOpen={isSidebarOpen}
          onToggle={handleSidebarToggle}
        />
        <main
          className={`transition-all duration-500 ${
            isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
          }`}
          style={{
            width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
          }}
        >
          <div className="bg-[#1d1e22] h-auto  ">
            <div className="flex justify-between items-center py-10 px-5">
              <h1 className="text-white text-2xl font-medium">
                Leave Management
              </h1>
              {!isCreatingLeave ? (
                <Button
                  onClick={() => setIsCreatingLeave(true)}
                  className="bg-[#17784d] hover:bg-[#17784d]"
                >
                  Apply for Leave
                </Button>
              ) : (
                <Button
                  onClick={() => setIsCreatingLeave(false)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FaArrowLeftLong />
                  Back to Leave List
                </Button>
              )}
            </div>
            <hr
              className="mx-auto bg-[#0000003b] my-2 rounded-sm"
              style={{
                width: "100%",
                height: "1px",
                color: "white",
                borderWidth: 0,
              }}
            />

            {isCreatingLeave ? (
              <LeaveFaculty />
            ) : (
              <div>
                <div className="rounded-2xl shadow-sm p-6 mb-6 bg-[#2b2d31] mx-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="relative flex-grow md:flex-grow-0">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search student leaves..."
                        value={filters.search}
                        onChange={(e) =>
                          handleFilterChange("search", e.target.value)
                        }
                        className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg focus:outline-none bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all"
                      />
                    </div>

                    <select
                      value={filters.status}
                      onChange={(e) =>
                        handleFilterChange("status", e.target.value)
                      }
                      className="px-3 py-2 rounded-lg focus:outline-none bg-black text-white placeholder-gray-300 backdrop-blur-sm transition-all"
                    >
                      <option value="all" className="text-white">
                        All Status
                      </option>
                      <option value="pending" className="text-white">
                        Pending
                      </option>
                      <option value="approved" className="text-white">
                        Approved
                      </option>
                      <option value="rejected" className="text-white">
                        Rejected
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 bg-white p-5">
                  {filteredRequests.map((request) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="overflow-hidden  transition-all bg-[#f2f2f2]">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar
                              src={request.avatar}
                              className="w-12 h-12"
                              sx={{ bgcolor: "#0056d2" }}
                            ></Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h3 className="text-lg font-semibold">
                                    {request.name}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {request.department}
                                  </p>
                                </div>
                                <div
                                  className={`flex border border-[#939393] rounded-full px-3 py-2 items-center gap-1 ${getStatusColor(
                                    request.status
                                  )}`}
                                >
                                  {getStatusIcon(request.status)}
                                  <span className="text-sm capitalize">
                                    {request.status}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <Label className="text-gray-600">
                                    Reason
                                  </Label>
                                  <p className="text-gray-900">
                                    {request.reason}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-gray-600">
                                    Duration
                                  </Label>
                                  <p className="text-gray-900">
                                    {request.startDate} to {request.endDate}
                                  </p>
                                </div>
                              </div>

                              {request.status === "pending" && (
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="outline"
                                    className="border-red-500 text-red-500 hover:bg-red-50"
                                    onClick={() =>
                                      handleStatusChange(request.id, "rejected")
                                    }
                                  >
                                    Reject
                                  </Button>
                                  <Button
                                    className="bg-[#226cbe] text-white hover:bg-[#226cbe] rounded-full"
                                    onClick={() =>
                                      handleStatusChange(request.id, "approved")
                                    }
                                  >
                                    Approve
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default MainFacultyLeave;
