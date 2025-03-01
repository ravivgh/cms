import { useState } from "react";
import ScheduleCalStudent from "@/components/ScheduleCalStudent";
import ContextWrapper from "@/context/ContextWrapper";
import StudentSidebar from "@/components/StudentSidebar";
const MainStudentMaster = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="flex">
        <StudentSidebar
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
            <ScheduleCalStudent />
          </ContextWrapper>
        </main>
      </div>
    </>
  );
};

export default MainStudentMaster;
