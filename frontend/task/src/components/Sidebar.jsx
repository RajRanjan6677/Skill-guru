import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  BarChart,
  ListChecks,
  Brain,
  MessageCircle,
  User,
  Settings,
  PlayCircle,
} from "lucide-react";

const Sidebar = () => {
  const links = [
    { to: "/", label: "Dashboard", icon: <Home size={18} /> },
    { to: "/courses", label: "All Courses", icon: <BookOpen size={18} /> },
    { to: "/my-courses", label: "My Courses", icon: <PlayCircle size={18} /> },
    { to: "/progress", label: "Progress", icon: <BarChart size={18} /> },
    { to: "/tasks", label: "Tasks", icon: <ListChecks size={18} /> },
    { to: "/skills", label: "Skills", icon: <Brain size={18} /> },
    { to: "/chat", label: "AI Chat", icon: <MessageCircle size={18} /> },
    { to: "/profile", label: "Profile", icon: <User size={18} /> },
    { to: "/signup", label: "Signup", icon: <User size={18} /> },
    { to: "/login", label: "Login", icon: <User size={18} /> },
  ];

  return (
    <div className="h-screen w-60 bg-white border-r border-gray-200 flex flex-col justify-between fixed">
      <div>
        
        <nav className="mt-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm transition-colors rounded-md mx-2 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-5 border-t border-gray-100">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600"
        >
          <Settings size={18} /> Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
