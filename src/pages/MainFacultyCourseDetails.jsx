import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DetalisCourse from "@/components/course/DetalisCourse";
import FacultySidebar from "@/components/FacultySidebar";

const MainFacultyCourseDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div className="flex">
        <FacultySidebar
          isSidebarOpen={isSidebarOpen}
          onToggle={handleSidebarToggle}
        />
        <main
          className={`transition-all duration-500 ${
            isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
          }`}
          style={{
            width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
          }}
        >
          <DetalisCourse />
        </main>
      </div>
    </div>
  );
};

export default MainFacultyCourseDetails;
