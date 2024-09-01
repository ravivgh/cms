import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Sidebar from "../components/Sidebar";

const MainDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
        <Dashboard isSidebarOpen={isSidebarOpen} />
      </div>
    </>
  );
};

export default MainDashboard;
