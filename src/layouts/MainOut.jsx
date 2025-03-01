import { Outlet } from "react-router-dom";
import ChatBox from "../components/ChatBox";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <main>
        <Outlet />
      </main>
      <ChatBox />
    </div>
  );
};

export default MainLayout;
