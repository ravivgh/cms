import React, { useState } from "react";
import CodeEditor from "../components/course/CodeEditor";
import StudentSidebar from "@/components/StudentSidebar";
const MainCodeEditor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
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
        <CodeEditor />
      </main>
    </>
  );
};

export default MainCodeEditor;
