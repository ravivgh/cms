import React, { useState } from "react";
import StudentListFaculty from "@/components/StudentListFaculty";
import FacultySidebar from "@/components/FacultySidebar";
const MainStdList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
          className={`p-4 transition-all duration-500 ${
            isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
          }`}
          style={{
            width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
          }}
        >
          <StudentListFaculty />
        </main>
      </div>
    </>
  );
};

export default MainStdList;
