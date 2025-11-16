// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import {
//   Home,
//   BookOpen,
//   BarChart,
//   ListChecks,
//   Brain,
//   MessageCircle,
//   User,
//   Settings,
//   PlayCircle,
//   LogOut,
// } from "lucide-react";
// import { useState, useEffect } from "react";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     !!localStorage.getItem("token")
//   );

//   // ✅ Re-check token on route change (updates sidebar instantly)
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, [location.pathname]);

//   const handleLogout = async () => {
//     try {
//       // Call backend logout API
//       await fetch("http://localhost:3000/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       // Remove token from localStorage
//       localStorage.removeItem("token");

//       // Update state
//       setIsAuthenticated(false);

//       // Redirect to login
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   // Authenticated user links
//   const authLinks = [
//     { to: "/", label: "Dashboard", icon: <Home size={18} /> },
//     { to: "/courses", label: "All Courses", icon: <BookOpen size={18} /> },
//     { to: "/my-courses", label: "My Courses", icon: <PlayCircle size={18} /> },
//     { to: "/progress", label: "Progress", icon: <BarChart size={18} /> },
//     { to: "/tasks", label: "Tasks", icon: <ListChecks size={18} /> },
//     { to: "/skills", label: "Skills", icon: <Brain size={18} /> },
//     { to: "/chat", label: "AI Chat", icon: <MessageCircle size={18} /> },
//     { to: "/profile", label: "Profile", icon: <User size={18} /> },
//   ];

//   // Guest user links
//   const guestLinks = [
//     { to: "/signup", label: "Signup", icon: <User size={18} /> },
//     { to: "/login", label: "Login", icon: <User size={18} /> },
//   ];

//   const linksToShow = isAuthenticated ? authLinks : guestLinks;

//   return (
//     <div className="h-screen w-60 bg-white border-r border-gray-200 flex flex-col justify-between fixed">
//       {/* Top Section */}
//       <div>
//         <nav className="mt-4">
//           {linksToShow.map((link) => (
//             <NavLink
//               key={link.to}
//               to={link.to}
//               end
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-5 py-3 text-sm transition-colors rounded-md mx-2 ${
//                   isActive
//                     ? "bg-blue-100 text-blue-600 font-semibold"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`
//               }
//             >
//               {link.icon}
//               {link.label}
//             </NavLink>
//           ))}
//         </nav>
//       </div>

//       {/* Bottom Section */}
//       {isAuthenticated && (
//         <div className="p-5 border-t border-gray-100">
//           <div className="flex flex-col gap-3">
//             <NavLink
//               to="/settings"
//               className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600"
//             >
//               <Settings size={18} /> Settings
//             </NavLink>

//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-3 text-sm text-gray-600 hover:text-red-600 transition-colors"
//             >
//               <LogOut size={18} /> Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

import { NavLink, useNavigate } from "react-router-dom";
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
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // ✅ Listen for login/logout changes globally
  // useEffect(() => {
  //   const handleAuthChange = () => {
  //     const token = localStorage.getItem("token");
  //     setIsAuthenticated(!!token);
  //   };

  //   window.addEventListener("authChange", handleAuthChange);
  //   return () => window.removeEventListener("authChange", handleAuthChange);
  // }, []);
useEffect(() => {
  // Check auth immediately when Sidebar mounts
  const token = localStorage.getItem("token");
  setIsAuthenticated(!!token);

  const handleAuthChange = () => {
    const newToken = localStorage.getItem("token");
    setIsAuthenticated(!!newToken);
  };

  // Listen for global auth changes
  window.addEventListener("authChange", handleAuthChange);

  // 🔁 Also check whenever user navigates between pages
  const observer = new MutationObserver(() => {
    const newToken = localStorage.getItem("token");
    setIsAuthenticated(!!newToken);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  return () => {
    window.removeEventListener("authChange", handleAuthChange);
    observer.disconnect();
  };
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
      setUserRole(null);

      // 🔔 Notify app
      window.dispatchEvent(new Event("authChange"));

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if API call fails, clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      setIsAuthenticated(false);
      setUserRole(null);
      window.dispatchEvent(new Event("authChange"));
      navigate("/login");
    }
  };

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUserRole(null);
          return;
        }

        const response = await fetch("http://localhost:3000/auth/profile", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role || localStorage.getItem("userRole"));
        } else {
          setUserRole(localStorage.getItem("userRole"));
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        setUserRole(localStorage.getItem("userRole"));
      }
    };

    checkUserRole();

    // Also listen for auth changes to update role
    const handleAuthChange = () => {
      checkUserRole();
    };
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const authLinks = [
    { to: "/", label: "Dashboard", icon: <Home size={18} /> },
    { to: "/courses", label: "All Courses", icon: <BookOpen size={18} /> },
    { to: "/progress", label: "Progress", icon: <BarChart size={18} /> },
    { to: "/tasks", label: "Tasks", icon: <ListChecks size={18} /> },
    { to: "/chat", label: "AI Chat", icon: <MessageCircle size={18} /> },
    { to: "/profile", label: "Profile", icon: <User size={18} /> },
  ];

  // Admin-only links
  const adminLinks = [
    { to: "/admin/dashboard", label: "Admin Dashboard", icon: <Home size={18} /> },
  ];


  // All signup/login links (always visible)
  const authActionLinks = [
    { to: "/signup", label: "User Signup", icon: <User size={18} /> },
    { to: "/login", label: "User Login", icon: <User size={18} /> },
    { to: "/admin/signup", label: "Admin Signup", icon: <User size={18} /> },
    { to: "/admin/login", label: "Admin Login", icon: <User size={18} /> },
  ];

  const linksToShow = isAuthenticated ? authLinks : [];
  const showAdminLinks = isAuthenticated && userRole === "admin";

  return (
    <div className="h-screen w-60 bg-white border-r border-gray-200 flex flex-col justify-between fixed">
      <div>
        <nav className="mt-4">
          {/* Authenticated user links */}
          {linksToShow.map((link) => (
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
          
          {/* Admin-only links (when authenticated as admin) */}
          {showAdminLinks && (
            <>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="px-5 py-2 text-xs font-semibold text-purple-600 uppercase">
                Admin
              </div>
              {adminLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-5 py-3 text-sm transition-colors rounded-md mx-2 ${
                      isActive
                        ? "bg-purple-100 text-purple-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              ))}
            </>
          )}

          {/* All signup/login links (always visible) */}
          <div className="border-t border-gray-200 my-2"></div>
          <div className="px-5 py-2 text-xs font-semibold text-gray-500 uppercase">
            Authentication
          </div>
          {authActionLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 text-sm transition-colors rounded-md mx-2 ${
                  isActive
                    ? link.to.includes("admin")
                      ? "bg-purple-100 text-purple-600 font-semibold"
                      : "bg-blue-100 text-blue-600 font-semibold"
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

      {/* ✅ Logout & Settings visible only when logged in */}
      {isAuthenticated && (
        <div className="p-5 border-t border-gray-100">
          <div className="flex flex-col gap-3">
            <NavLink
              to="/settings"
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-blue-600"
            >
              <Settings size={18} /> Settings
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
