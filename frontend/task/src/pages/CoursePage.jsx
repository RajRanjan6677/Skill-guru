
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CoursePage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [enrolling, setEnrolling] = useState({});

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:3000/courses", {
          method: "GET",
          credentials: "include", // if auth uses cookies
        });

        const data = await res.json();
        console.log("Fetched courses:", data);

        // Handle different response formats
        if (Array.isArray(data)) {
          setCourses(data);
        } else if (Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const res = await fetch("http://localhost:3000/enrollments", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          const enrolledIds = new Set(data.map((course) => course._id));
          setEnrolledCourses(enrolledIds);
        }
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
      }
    };

    fetchCourses();
    fetchEnrolledCourses();
  }, []);

  const handleEnroll = async (e, courseId) => {
    e.stopPropagation(); // Prevent navigation when clicking enroll button
    setEnrolling({ ...enrolling, [courseId]: true });

    try {
      const res = await fetch(`http://localhost:3000/enrollments/${courseId}`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setEnrolledCourses(new Set([...enrolledCourses, courseId]));
        // Update course learners count
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course._id === courseId
              ? { ...course, learners: (course.learners || 0) + 1 }
              : course
          )
        );
      }
    } catch (err) {
      console.error("Error enrolling:", err);
    } finally {
      setEnrolling({ ...enrolling, [courseId]: false });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-blue-600 font-semibold text-lg">
          Loading courses...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-red-600 font-semibold text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className=" p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">All Courses</h1>
      </div>

      {courses.length === 0 ? (
        <p className="text-gray-600">No courses available. Try adding one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
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
                    {course.progress ? `${course.progress}%` : "New"}
                  </span>
                </div>

                {/* Enroll Button */}
                <div className="mt-3">
                  {enrolledCourses.has(course._id) ? (
                    <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-semibold text-center">
                      ✓ Enrolled
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleEnroll(e, course._id)}
                      disabled={enrolling[course._id]}
                      className="w-full bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition text-sm font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {enrolling[course._id] ? "Enrolling..." : "Enroll"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursePage;
