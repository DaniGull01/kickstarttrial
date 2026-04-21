import React, { useState } from "react";
import Sidebar from "../sidebar";
import HeaderComponent from "../header";

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gray-100">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT (IMPORTANT FIX HERE) */}
      <div className="lg:ml-72 flex flex-col min-h-screen">

        <HeaderComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-6">
          {children}
        </main>

        <footer className="bg-white text-gray-500 text-sm text-center py-3">
          {currentYear} © LOGICA
        </footer>

      </div>
    </div>
  );
};

export default DefaultLayout;