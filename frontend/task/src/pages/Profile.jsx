import React, { useEffect, useState } from "react";
import { Mail, User, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/profile", {
          method: "GET",
          credentials: "include", // ✅ important if you're using cookies for auth
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        
        setUser(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/enrollments/user/courses",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setEnrolledCourses(data);
        }
      } catch (error) {
        console.error("Error loading enrolled courses:", error);
      }
    };

    fetchProfile();
    fetchEnrolledCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">User not found or unauthorized.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          <User className="inline-block w-6 h-6 text-blue-600 mr-2" />
          My Profile
        </h1>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-blue-600" />
            <span className="text-gray-800 font-medium">{user.username}</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="text-gray-800">{user.email}</span>
          </div>

          {/* Enrolled Courses Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                Enrolled Courses
              </h2>
            </div>

            {enrolledCourses.length === 0 ? (
              <p className="text-gray-500 text-sm italic">
                No courses enrolled yet. Browse courses to get started!
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {enrolledCourses.map((course) => (
                  <span
                    key={course._id}
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition inline-flex items-center gap-1"
                  >
                    <BookOpen className="w-3 h-3" />
                    {course.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
