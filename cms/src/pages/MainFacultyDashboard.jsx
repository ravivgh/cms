import FacultyDashboard from "@/components/FacultyDashboard";
import FacultySidebar from "@/components/FacultySidebar";
import SessionRedirect from "@/scripts/checksession.mjs";
import { useState } from "react";

const MainFacultyDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex">
      <SessionRedirect/>
      <FacultySidebar
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
        <FacultyDashboard />
      </main>
    </div>
  );
};

export default MainFacultyDashboard;
