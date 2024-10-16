import { useState } from "react";
import CalendarMaster from "@/components/CalendarMaster";
import Sidebar from "../components/Sidebar";
import SessionRedirect from "@/scripts/checksession.mjs";

const MainMaster = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="flex">
        <SessionRedirect/>
        <Sidebar isSidebarOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
        <main
          className={`p-4 transition-all duration-500 ${
            isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
          }`}
          style={{
            width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
          }}
        >
          <CalendarMaster />
        </main>
      </div>
    </>
  );
};

export default MainMaster;
