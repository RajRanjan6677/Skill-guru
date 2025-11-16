import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await fetch("http://localhost:3000/courses/mine", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        console.log("Fetched my courses:", data);

        if (Array.isArray(data)) {
          setMyCourses(data);
        } else if (Array.isArray(data.courses)) {
          setMyCourses(data.courses);
        } else {
          setMyCourses([]);
        }
      } catch (err) {
        console.error("❌ Error fetching my courses:", err);
        setError("Failed to load your courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-blue-600 font-semibold text-lg">
          Loading your courses...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-red-600 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">My Courses</h1>

      {myCourses.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-lg font-medium">You haven’t enrolled in any courses yet.</p>
          <button
            onClick={() => navigate("/courses")}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => (
            <div
              key={course._id}
              onClick={() => navigate(`/course/${course._id}`)}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={
                  course.image ||
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                }
                alt={course.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-bold text-blue-700">
                  {course.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  by {course.author || "Unknown"}
                </p>

                <div className="flex items-center justify-between text-gray-700 text-sm">
                  <span>⭐ {course.rating || "0.0"}</span>
                  <span>{course.learners || 0} learners</span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                  <span>{course.level || "Beginner"}</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {course.progress ? `${course.progress}%` : "In Progress"}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${course.progress || 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {course.progress || 0}% completed
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
