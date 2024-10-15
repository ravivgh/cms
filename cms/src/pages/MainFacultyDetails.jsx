import FacultyNotEdit from "@/components/FacultyNotEdit";
import StudentSidebar from "@/components/StudentSidebar";
import SessionRedirect from "@/scripts/checksession.mjs";
import { useState } from "react";

const MainFacultyDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
    <SessionRedirect/>
      <div className="flex"></div>
      <StudentSidebar
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
        <div className="bg-[#f7f7f7] p-5 rounded-lg">
          <h1 className="text-black py-10 text-2xl">Faculty Details</h1>
          <hr
            className="mx-auto bg-[#0000003b] my-2 rounded-sm"
            style={{
              width: "100%",
              height: "1px",
              color: "white",
              borderWidth: 0,
            }}
          ></hr>{" "}
          {/* <Facultys /> */}
          <FacultyNotEdit />
        </div>
      </main>
    </>
  );
};

export default MainFacultyDetails;
