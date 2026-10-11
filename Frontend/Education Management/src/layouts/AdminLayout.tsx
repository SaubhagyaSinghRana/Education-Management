import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/layout/Sidebar";
import ChatBox from "@/components/chat/ChatBox";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <Outlet />
                  <ChatBox />

      </div>
    </div>
  );
}

export default AdminLayout;