import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeCourses: 0,
    hoursLearned: 0,
    completedLessons: 0,
    skillsGained: 0,
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // ✅ Fetch Progress Data
        const progressRes = await fetch("http://localhost:3000/progress/read", {
          credentials: "include",
        });
        const progressData = await progressRes.json();

        // ✅ Fetch Courses Data
        // const courseRes = await fetch("http://localhost:3000/course", {
        //   method: "GET",
        //   credentials: "include",
        // });
        const courseRes = await fetch("http://localhost:3000/courses", {
          method: "GET",
          credentials: "include", // if auth uses cookies
        });
        const courseData = await courseRes.json();

        setStats({
          activeCourses: progressData.activeCourses || 0,
          hoursLearned: progressData.hoursLearned || 0,
          completedLessons: progressData.completedLessons || 0,
          skillsGained: progressData.skillsGained || 0,
        });

        setCourses(Array.isArray(courseData) ? courseData : courseData.courses || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-blue-600">{stats.activeCourses}</h2>
          <p className="text-gray-600">Active Courses</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-blue-600">{stats.hoursLearned}h</h2>
          <p className="text-gray-600">Hours Learned</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-blue-600">{stats.completedLessons}</h2>
          <p className="text-gray-600">Completed Lessons</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-blue-600">{stats.skillsGained}</h2>
          <p className="text-gray-600">Skills Gained</p>
        </div>
      </div>

      {/* Courses Section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Continue Learning</h2>
      {courses.length > 0 ? (
        <div className="space-y-4">
          {courses.map((course) => (
            <CourseCard
              key={course._id || course.id}
              id={course._id || course.id}
              title={course.title}
              author={course.author || "Unknown"}
              rating={course.rating || 0}
              learners={course.learners || 0}
              level={course.level || "Beginner"}
              progress={course.progress || 0}
              image={course.image || "https://via.placeholder.com/150"}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No courses available yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
