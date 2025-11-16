import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("courses"); // 'courses' or 'add'
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:3000/courses", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

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

    fetchCourses();
  }, []);

  const handleCourseAdded = () => {
    // Refresh courses list after adding a new course
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:3000/courses", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setCourses(data);
        } else if (Array.isArray(data.courses)) {
          setCourses(data.courses);
        }
        setActiveTab("courses"); // Switch to courses tab after adding
      } catch (err) {
        console.error("Error refreshing courses:", err);
      }
    };

    fetchCourses();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">Admin Dashboard</h1>
        
        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === "courses"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            All Courses
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 font-semibold transition ${
              activeTab === "add"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            Add Course
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "courses" && (
        <div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-purple-600 font-semibold text-lg">
                Loading courses...
              </p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-600 font-semibold text-lg">{error}</p>
            </div>
          ) : courses.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No courses available. Add your first course!
            </p>
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
                    <h2 className="text-lg font-bold text-purple-700">
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
                      <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        {course.progress ? `${course.progress}%` : "New"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "add" && (
        <div>
          <AddCourseWrapper onCourseAdded={handleCourseAdded} />
        </div>
      )}
    </div>
  );
};

// Wrapper component to handle course addition callback
const AddCourseWrapper = ({ onCourseAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    level: "Beginner",
    rating: "",
    learners: "",
    progress: "",
    image: "",
  });

  const [lessons, setLessons] = useState([
    { title: "", duration: "", videoUrl: "" },
  ]);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLessonChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLessons = [...lessons];
    updatedLessons[index][name] = value;
    setLessons(updatedLessons);
  };

  const addLessonField = () => {
    setLessons([...lessons, { title: "", duration: "", videoUrl: "" }]);
  };

  const removeLessonField = (index) => {
    const updatedLessons = lessons.filter((_, i) => i !== index);
    setLessons(updatedLessons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, lessons }),
        credentials: "include",
      });

      if (res.ok) {
        setMessage("✅ Course added successfully!");
        setFormData({
          title: "",
          author: "",
          description: "",
          level: "Beginner",
          rating: "",
          learners: "",
          progress: "",
          image: "",
        });
        setLessons([{ title: "", duration: "", videoUrl: "" }]);
        onCourseAdded(); // Notify parent to refresh courses
      } else {
        const data = await res.json();
        setMessage(`❌ ${data.message || "Failed to add course"}`);
      }
    } catch (err) {
      setMessage("❌ Failed to add course. Check console for details.");
      console.error(err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl bg-white shadow-md rounded-xl p-6 border border-gray-200"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Level
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">
            Course Lessons
          </h2>

          {lessons.map((lesson, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={lesson.title}
                    onChange={(e) => handleLessonChange(index, e)}
                    className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
                    placeholder="Lesson title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={lesson.duration}
                    onChange={(e) => handleLessonChange(index, e)}
                    className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
                    placeholder="e.g., 10:30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Video URL
                  </label>
                  <input
                    type="text"
                    name="videoUrl"
                    value={lesson.videoUrl}
                    onChange={(e) => handleLessonChange(index, e)}
                    className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
                    placeholder="Video URL"
                  />
                </div>
              </div>

              {lessons.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLessonField(index)}
                  className="mt-2 text-red-600 hover:text-red-800 text-sm"
                >
                  Remove Lesson
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addLessonField}
            className="mt-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
          >
            + Add Lesson
          </button>
        </div>

        <button
          type="submit"
          className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Add Course
        </button>

        {message && (
          <p className="mt-4 text-sm font-medium text-green-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default AdminDashboard;

