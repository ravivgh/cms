import StudentDashboard from "@/components/StudentDashboard";
import StudentSidebar from "@/components/StudentSidebar";
import { useState } from "react";
import SessionRedirect from "@/scripts/checksession.mjs";
const MainStudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex">
      <SessionRedirect/>
      <StudentSidebar
        isSidebarOpen={isSidebarOpen}
        onToggle={handleSidebarToggle}
      />
      <main
        className={`p-4 transition-all duration-500 ${
          isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
        }`}
        style={{
          width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
        }}
      >
        {" "}
        <StudentDashboard />
      </main>
    </div>
  );
};

export default MainStudentDashboard;
