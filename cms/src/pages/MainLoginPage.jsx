import LoginPage from "@/components/LoginPage";
import React from "react";
import SessionRedirect from "@/scripts/checksession.mjs";

const MainLoginPage = () => {
  return (
    <>
    <SessionRedirect/>
      <LoginPage />
    </>
  );
};

export default MainLoginPage;
