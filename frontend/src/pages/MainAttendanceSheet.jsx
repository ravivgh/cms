import { useState } from "react";
import SessionRedirect from "@/scripts/checksession.mjs";
import FacultySidebar from "@/components/FacultySidebar";
import Attendance from "@/components/Attendance";
const MainAttendanceSheet = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex">
      <SessionRedirect />
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
        <div className="bg-[#f7f7f7] p-10">
          <div className="text-black text-2xl">
            <h1>Attendance Sheet</h1>
          </div>
          <hr
            className="mx-auto bg-[#0000003b] my-2 rounded-sm"
            style={{
              width: "100%",
              height: "1px",
              color: "white",
              borderWidth: 0,
              marginBottom: "50px",
              marginTop: "50px",
            }}
          />
          <Attendance />
        </div>
      </main>
    </div>
  );
};

export default MainAttendanceSheet;
