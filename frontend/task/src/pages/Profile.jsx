import React from "react";
import { Link } from "react-router-dom";
import { User, BookOpen, Brain, Settings, Mail, Calendar } from "lucide-react";

const Profile = () => {
  const user = {
    name: "Raj Ranjan Singh",
    email: "raj@example.com",
    joinDate: "Jan 15, 2024",
    avatar: "https://images.unsplash.com/photo-1603415526960-fb2e5cda06a8?w=200",
    stats: {
      courses: 5,
      skills: 8,
      completedLessons: 23,
    },
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 rounded-full object-cover"
        />

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-600" />
            {user.name}
          </h1>
          <p className="text-gray-600 flex items-center gap-2 mb-1">
            <Mail className="w-4 h-4 text-gray-500" />
            {user.email}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            Joined on {user.joinDate}
          </p>

          {/* Stats */}
          <div className="mt-6 flex gap-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-blue-600">{user.stats.courses}</h2>
              <p className="text-gray-600 flex items-center gap-1">
                <BookOpen className="w-4 h-4" /> Courses
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-blue-600">{user.stats.skills}</h2>
              <p className="text-gray-600 flex items-center gap-1">
                <Brain className="w-4 h-4" /> Skills
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-blue-600">{user.stats.completedLessons}</h2>
              <p className="text-gray-600">Lessons Completed</p>
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/skills"
              className="bg-blue-100 text-blue-700 px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-200 transition"
            >
              <Brain className="w-4 h-4" /> My Skills
            </Link>
            <Link
              to="/my-courses"
              className="bg-blue-100 text-blue-700 px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-200 transition"
            >
              <BookOpen className="w-4 h-4" /> My Courses
            </Link>
            <Link
              to="/settings"
              className="bg-blue-100 text-blue-700 px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-200 transition"
            >
              <Settings className="w-4 h-4" /> Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
