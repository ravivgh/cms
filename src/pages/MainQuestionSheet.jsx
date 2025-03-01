import React, { useState } from "react";
import QuestionSheet from "@/components/QuestionSheet";
import StudentSidebar from "@/components/StudentSidebar";
const MainQuestionSheet = () => {
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
        <div>
          <QuestionSheet />
        </div>
      </main>
    </>
  );
};

export default MainQuestionSheet;
