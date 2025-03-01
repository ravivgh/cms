import AllLeaveList from "@/components/AllLeaveList";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
const MainAllLeaveList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
      <main
        className={` transition-all duration-500 ${
          isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
        }`}
        style={{
          width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
        }}
      >
        <div>
          <AllLeaveList />
        </div>
      </main>
    </>
  );
};

export default MainAllLeaveList;
