import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import CourseDetails from "./pages/CourseDetails";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyCourses from "./pages/MyCourses";
import Progress from "./pages/Progress";
import Tasks from "./pages/Tasks";
import Skills from "./pages/Skills";
import AIChat from "./pages/AiChat";
import Profile from "./pages/Profile";
import Logout from "./components/Logout";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      {/* Navbar */}
      <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex pt-16">
        {/* Sidebar — always visible */}
        <div
          className={`fixed top-16 left-0 h-full w-60 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <Sidebar />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main content */}
        <div
          className={`flex-1 transition-all duration-300 px-6 ${
            sidebarOpen ? "ml-0 md:ml-60" : "ml-0 md:ml-60"
          }`}
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <PrivateRoute>
                  <CoursePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/course/:id"
              element={
                <PrivateRoute>
                  <CourseDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-courses"
              element={
                <PrivateRoute>
                  <MyCourses />
                </PrivateRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <PrivateRoute>
                  <Progress />
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />
            <Route
              path="/skills"
              element={
                <PrivateRoute>
                  <Skills />
                </PrivateRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <AIChat />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <div className="p-6">Settings</div>
                </PrivateRoute>
              }
            />
            <Route
  path="/logout"
  element={
    <PrivateRoute>
      <Logout />
    </PrivateRoute>
  }
/>

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";

// import Dashboard from "./pages/Dashboard";
// import CoursePage from "./pages/CoursePage";
// import CourseDetails from "./pages/CourseDetails";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import MyCourses from "./pages/MyCourses";
// import Progress from "./pages/Progress";
// import Tasks from "./pages/Tasks";
// import Skills from "./pages/Skills";
// import AIChat from "./pages/AiChat";
// import Profile from "./pages/Profile";

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <Router>
//       {/* Navbar */}
//       <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

//       <div className="flex pt-16">
//         {/* Sidebar */}
//         <div
//           className={`fixed top-16 left-0 h-full w-60 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
//         >
//           <Sidebar />
//         </div>

//         {/* Overlay for mobile */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
//             onClick={toggleSidebar}
//           ></div>
//         )}

//         {/* Main content */}
//         <div
//           className={`flex-1 transition-all duration-300 px-6 ${
//             sidebarOpen ? "ml-0 md:ml-60" : "ml-0 md:ml-60"
//           }`}
//         >
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/courses" element={<CoursePage />} />
//             <Route path="/course/:id" element={<CourseDetails />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/my-courses" element={<MyCourses />} />
//             <Route path="/progress" element={<Progress />} />
//             <Route path="/tasks" element={<Tasks />} />
//             <Route path="/skills" element={<Skills />} />
//             <Route path="/chat" element={<AIChat />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/settings" element={<div className="p-6">Settings</div>} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
