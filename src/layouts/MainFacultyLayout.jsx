import React from "react";
import FacultySidebar from "../components/FacultySidebar";
import { Outlet } from "react-router-dom";
import ChatBox from "@/components/ChatBox";
const MainFacultyLayout = () => {
  return (
    <>
      <FacultySidebar />
      <Outlet />
      <ChatBox />
    </>
  );
};

export default MainFacultyLayout;
