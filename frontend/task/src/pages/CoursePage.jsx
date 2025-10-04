import React from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const CoursePage = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      author: "Sarah Chen",
      rating: 4.9,
      learners: 1247,
      duration: "12 hours",
      level: "Advanced",
      thumbnail: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800",
    },
    {
      id: 2,
      title: "Node.js Microservices",
      author: "David Rodriguez",
      rating: 4.8,
      learners: 892,
      duration: "10 hours",
      level: "Intermediate",
      thumbnail: "https://images.unsplash.com/photo-1590608897129-79da98d159a6?w=800",
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
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Courses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
