"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Content from "../../components/Content";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Navbar */}
      <Navbar />

      <div className="flex gap-[1%] md:gap-[5%] pt-16 h-full">
        {/* Sidebar */}
        <div className="">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            handleToggleSidebar={handleToggleSidebar}
          />
        </div>

        {/* Main Content */}
        <div className="w-[100%] md:w-[75%] ">
          <Content isSidebarOpen={isSidebarOpen} />
        </div>
      </div>
    </div>
  );
}
