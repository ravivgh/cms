import { useState } from "react";
import Report from "@/components/report/Report";
import Sidebar from "../components/Sidebar";
import CollegeMaster from "@/components/CollegeMaster";
import ScheduleCal from "@/components/ScheduleCal";
import ContextWrapper from "@/context/ContextWrapper";
const MainMaster = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} onToggle={handleSidebarToggle} />
        <main
          className={` transition-all duration-500 ${
            isSidebarOpen ? "ml-[12.5rem]" : "ml-[5rem]"
          }`}
          style={{
            width: isSidebarOpen ? "calc(100% - 12.5rem)" : "calc(100% - 5rem)",
          }}
        >
          <ContextWrapper>
            {" "}
            <ScheduleCal />
          </ContextWrapper>
          {/* <CollegeMaster /> */}
        </main>
      </div>
    </>
  );
};

export default MainMaster;
