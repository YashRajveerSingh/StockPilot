import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-16 md:ml-64 min-h-screen bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;