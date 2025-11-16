import React, { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    checkAuth();
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Remove token and role
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");

      // Update state
      setIsAuthenticated(false);

      // Notify app
      window.dispatchEvent(new Event("authChange"));

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if API call fails, clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      setIsAuthenticated(false);
      window.dispatchEvent(new Event("authChange"));
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16 flex items-center justify-between px-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-blue-600">SkillGuru</span>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-4">
        {/* Logout button - visible when authenticated */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
            title="Logout"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        )}

        {/* Sidebar toggle button for mobile */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
