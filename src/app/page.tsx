"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Content from "../../components/Content";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="h-screen bg-neutral-900 text-white">
      {/* Navbar */}
      <Navbar />

      <div className="flex gap-20 pt-16 h-full">
        {/* Sidebar */}
        <div className="">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            handleToggleSidebar={handleToggleSidebar}
          />
        </div>

        {/* Main Content */}
        <Content isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
}
