import { useState } from "react";
import SessionRedirect from "@/scripts/checksession.mjs";
import Dashboard from "@/components/Dashboard";
import Sidebar from "../components/Sidebar";
const MainDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
    <SessionRedirect/>
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
        <Dashboard isSidebarOpen={isSidebarOpen} />
      </div>
    </>
  );
};

export default MainDashboard;
