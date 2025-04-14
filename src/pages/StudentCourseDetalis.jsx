import { useState } from "react";
import StudentSidebar from "@/components/StudentSidebar";
import DetalisCourse from "@/components/course/DetalisCourse";

const StudentCourseDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div className="flex">
        <StudentSidebar isSidebarOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
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

export default StudentCourseDetails;
