import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import ChatBox from "../components/chat/ChatBox";


function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
          <ChatBox />

      </div>

    </div>
  );
}

export default DashboardLayout;