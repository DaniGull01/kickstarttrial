import React from "react";
import { NavLink } from "react-router-dom";
import * as Svgs from "@/assets/svgs";

const navLinks = [
  { to: "/admin-dashboard", icon: <Svgs.dashboardIcon />, label: "Bachicecha " },
  { to: "/admin-dashboard", icon: <Svgs.PropertyIcon />, label: "Simulatore" },
  { to: "/admin-dashboard", icon: <Svgs.setPrice />, label: "Simulazioni archiviate" },
  { to: "/admin-dashboard", icon: <Svgs.HelpIcon />, label: "Quadernino degli errori" },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-[#1554C0] text-white flex flex-col justify-between px-4 py-6 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div>
          <div className="flex items-center gap-3 px-2 mb-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              🦉
            </div>
            <h1 className="text-2xl font-bold">Logica</h1>
          </div>

          <div className="mb-6">
            <div className="bg-[#0E2A47] rounded-xl py-3 text-center font-semibold">
              Dashboard
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium transition
                  ${isActive ? "bg-[#0E2A47]" : "hover:bg-[#0E2A47]/70"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        <button className="bg-white text-red-500 rounded-full py-3 font-semibold mt-6">
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;