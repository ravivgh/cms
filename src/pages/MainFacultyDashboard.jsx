import FaceScan from "@/components/FaceScan";
import FacultyDashboard from "@/components/FacultyDashboard";
import FacultySidebar from "@/components/FacultySidebar";
import MeetSche from "@/components/MeetSche";
import StudentDashboard from "@/components/StudentDashboard";
import { useState } from "react";

const MainFacultyDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex">
      <FacultySidebar
        isSidebarOpen={isSidebarOpen}
        onToggle={handleSidebarToggle}
      />
      <main
        className={` transition-all duration-500 ${
          isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
        }`}
        style={{
          width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
        }}
      >
        <FacultyDashboard />

        {/* <FaceScan /> */}
      </main>
    </div>
  );
};

export default MainFacultyDashboard;
