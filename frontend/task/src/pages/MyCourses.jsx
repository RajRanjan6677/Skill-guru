import React from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const MyCourses = () => {
  const navigate = useNavigate();

  // Example of user's enrolled courses
  const myCourses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      author: "Sarah Chen",
      rating: 4.9,
      learners: 1247,
      duration: "12 hours",
      level: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800",
      progress: 85, // user's progress %
    },
    {
      id: 3,
      title: "JavaScript Mastery",
      author: "Emma Wilson",
      rating: 4.7,
      learners: 1543,
      duration: "15 hours",
      level: "Beginner",
      thumbnail: "https://images.unsplash.com/photo-1605902711622-cfb43c4431f0?w=800",
      progress: 45,
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`)}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-blue-700">{course.title}</h2>
              <p className="text-gray-600 text-sm mb-2">by {course.author}</p>
              <div className="flex items-center justify-between text-gray-700 text-sm">
                <span>⭐ {course.rating}</span>
                <span>{course.learners} learners</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>{course.duration}</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {course.level}
                </span>
              </div>
              {/* Progress bar */}
              <div className="mt-3 bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{course.progress}% completed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
