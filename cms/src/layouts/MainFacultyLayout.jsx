import React from "react";
import FacultySidebar from "../components/FacultySidebar";
import { Outlet } from "react-router-dom";

const MainFacultyLayout = () => {
  return (
    <>
      <FacultySidebar />
      <Outlet />
    </>
  );
};

export default MainFacultyLayout;
