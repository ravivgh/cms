import ChatBox from "@/components/ChatBox";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <ChatBox />
    </>
  );
};

export default MainLayout;
