import { useState } from "react";

import FacultySidebar from "@/components/FacultySidebar";
import FacultyCourse from "@/components/FacultyCourse";

const MainCourseFaculty = () => {
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
          className={`p-4 transition-all duration-500 ${
            isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
          }`}
          style={{
            width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
          }}
        >
          <FacultyCourse />
        </main>
      </div>
    </div>
  );
};

export default MainCourseFaculty;
