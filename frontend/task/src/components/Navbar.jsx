import React from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-blue-600">SkillGuru</span>
      </div>

      {/* Sidebar toggle button for mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Optional right-side items */}
      <div className="hidden md:flex items-center gap-4">
        {/* Add avatar, notifications etc. here */}
      </div>
    </nav>
  );
};

export default Navbar;
