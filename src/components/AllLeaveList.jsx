import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Avatar } from "@mui/material";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MdCheckCircle, MdCancel, MdPending } from "react-icons/md";
import { Search } from "lucide-react";

const AllLeaveList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    role: "all",
  });

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://localhost:5472/services/getleaverequest",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              college_id: localStorage.getItem("college_id"),
              status: filters.status === "all" ? null : filters.status,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch leave requests");
        }

        const data = await response.json();
        if (data && data.data) {
          setLeaveRequests(data.data);
        } else {
          setLeaveRequests([]);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching leave requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, [filters.status]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5472/services/updateleaverequest/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update leave status");
      }

      setLeaveRequests((prev) =>
        prev.map((request) =>
          request.lid === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("Error updating leave status:", err);
    }
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

  const getStatusCount = (status) => {
    return leaveRequests.filter((request) => request.status === status).length;
  };

  const filteredRequests = leaveRequests.filter((request) => {
    const searchStr = filters.search.toLowerCase();

    const matchesSearch =
      (request.Student_Name &&
        request.Student_Name.toLowerCase().includes(searchStr)) ||
      (request.Staff_Name &&
        request.Staff_Name.toLowerCase().includes(searchStr)) ||
      (request.sid && String(request.sid).toLowerCase().includes(searchStr));

    const matchesStatus =
      filters.status === "all" || request.status === filters.status;
    const matchesRole = filters.role === "all" || request.type === filters.role;

    return matchesSearch && matchesStatus && matchesRole;
  });

  if (loading && leaveRequests.length === 0) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className=" mx-auto p-6 bg-[#1d1e22]">
      <h1 className="text-white text-2xl font-medium my-10 mx-5">
        Leave Management
      </h1>
      <div className="rounded-2xl shadow-sm p-6 mb-6 bg-[#2b2d31] mx-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search leave requests..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg focus:outline-none bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all"
            />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="px-3 py-2 rounded-lg focus:outline-none bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all"
            >
              <option value="all" className="text-black">
                All Status
              </option>
              <option value="pending" className="text-black">
                Pending
              </option>
              <option value="approved" className="text-black">
                Approved
              </option>
              <option value="rejected" className="text-black">
                Rejected
              </option>
            </select>

            <select
              value={filters.role}
              onChange={(e) => handleFilterChange("role", e.target.value)}
              className="px-3 py-2 rounded-lg focus:outline-none bg-white/10 text-white placeholder-gray-300 backdrop-blur-sm transition-all"
            >
              <option value="all" className="text-black">
                All Roles
              </option>
              <option value="Faculty" className="text-black">
                Faculty
              </option>
              <option value="Student" className="text-black">
                Student
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br bg-[#2b2d31] border border-gray-600 ">
          <CardContent className="p-4">
            <div className="flex justify-between items-center ">
              <div className="space-y-3">
                <p className="text-sm text-gray-200">Total Requests</p>
                <p className="text-2xl font-bold text-white">
                  {leaveRequests.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#2b2d31] border border-gray-600">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="space-y-3">
                <p className="text-sm text-gray-200">Pending</p>
                <p className="text-2xl font-bold text-white">
                  {getStatusCount("pending")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#2b[#2b2d31] border border-gray-600">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="space-y-3">
                <p className="text-sm text-gray-200">Approved</p>
                <p className="text-2xl font-bold text-white">
                  {getStatusCount("approved")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#2b2d31] border border-gray-600">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="space-y-3">
                <p className="text-sm text-gray-200">Rejected</p>
                <p className="text-2xl font-bold text-white">
                  {getStatusCount("rejected")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 bg-white p-5">
        {filteredRequests.length === 0 ? (
          <Card className="p-8 text-center bg-[#f2f2f2]">
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <MdPending className="w-12 h-12" />
              <p className="text-lg font-medium">No leave requests found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          </Card>
        ) : (
          filteredRequests.map((request) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden transition-all bg-[#f2f2f2]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={request.avatar}
                      className="w-12 h-12"
                      sx={{
                        bgcolor:
                          request.type === "Faculty" ? "#b3206f" : "#0056d2",
                      }}
                    ></Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {request.Student_Name ||
                              request.Staff_Name ||
                              request.sid}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {request.type} •{" "}
                            {request.Class && request.Section
                              ? request.Class + " " + request.Section
                              : ""}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-1  border border-[#939393] rounded-full px-3 py-2 ${getStatusColor(
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
                          <Label className="text-gray-600">Reason</Label>
                          <p className="text-gray-900">{request.reason}</p>
                        </div>
                        <div>
                          <Label className="text-gray-600">Duration</Label>
                          <p className="text-gray-900">
                            {new Date(request.from_date).toLocaleDateString()}{" "}
                            to{" "}
                            {new Date(request.to_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {request.status === "pending" && (
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-50"
                            onClick={() =>
                              handleStatusChange(request.lid, "rejected")
                            }
                          >
                            Reject
                          </Button>
                          <Button
                            className="bg-[#226cbe] text-white hover:bg-[#226cbe] rounded-full"
                            onClick={() =>
                              handleStatusChange(request.lid, "approved")
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
          ))
        )}
      </div>
    </div>
  );
};

export default AllLeaveList;