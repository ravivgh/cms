import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Avatar } from "@mui/material";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MdCheckCircle, MdCancel, MdPending } from "react-icons/md";
import { Search } from "lucide-react";

const StudentLeaveList = () => {
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
      avatar: "MP",
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
      avatar: "JD",
    },
  ]);

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
  });

  // ... rest of the existing state management and handlers ...

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="rounded-2xl shadow-sm p-6 mb-6 bg-[#b3206f]">
        {/* ... existing search and filter UI ... */}
      </div>

      {/* Leave Requests List */}
      <div className="grid gap-4">
        {/* ... existing leave request cards ... */}
      </div>
    </div>
  );
};

export default StudentLeaveList;
