import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
const MainStudentLayout = () => {
  return (
    <>
      <StudentSidebar />
      <Outlet />
    </>
  );
};

export default MainStudentLayout;
