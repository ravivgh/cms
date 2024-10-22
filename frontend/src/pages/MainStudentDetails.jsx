import FacultySidebar from "@/components/FacultySidebar";
import Students from "@/components/Students";
import SessionRedirect from "@/scripts/checksession.mjs";
import { useState, useEffect } from "react";

const MainStudentDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

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
        <Students loading={loading} setLoading={setLoading} /> 
      </main>
    </div>
  );
};

export default MainStudentDetails;
