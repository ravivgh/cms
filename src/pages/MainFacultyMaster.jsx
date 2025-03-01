import { useState } from "react";
import ScheduleCalFaculty from "@/components/ScheduleCalFaculty";
import ContextWrapper from "@/context/ContextWrapper";
import FacultySidebar from "@/components/FacultySidebar";
const MainFacultyMaster = () => {
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
          className={` transition-all duration-500 ${
            isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
          }`}
          style={{
            width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
          }}
        >
          <ContextWrapper>
            {" "}
            <ScheduleCalFaculty />
          </ContextWrapper>
        </main>
      </div>
    </>
  );
};

export default MainFacultyMaster;
