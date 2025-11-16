import { useState } from "react";
import axios from "axios";

const AddCourse = () => {
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

  // Handle main course form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle lesson field changes
  const handleLessonChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLessons = [...lessons];
    updatedLessons[index][name] = value;
    setLessons(updatedLessons);
  };

  // Add a new lesson field
  const addLessonField = () => {
    setLessons([...lessons, { title: "", duration: "", videoUrl: "" }]);
  };

  // Remove a lesson field
  const removeLessonField = (index) => {
    const updatedLessons = lessons.filter((_, i) => i !== index);
    setLessons(updatedLessons);
  };

  // Submit the course
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/courses",
        { ...formData, lessons },
        { withCredentials: true }
      );

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
    } catch (err) {
      setMessage("❌ Failed to add course. Check console for details.");
      console.error(err);
    }
  };

  return (
    <div className="ml-60 min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">
        Add New Course
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl bg-white shadow-md rounded-xl p-6 border border-gray-200"
      >
        {/* ---------- COURSE FIELDS ---------- */}
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
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
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
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
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
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
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
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
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
              className="w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* ---------- LESSONS SECTION ---------- */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">
            Course Lessons
          </h2>

          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 mb-3 bg-gray-50"
            >
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  name="title"
                  value={lesson.title}
                  onChange={(e) => handleLessonChange(index, e)}
                  placeholder="Lesson Title"
                  className="border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="duration"
                  value={lesson.duration}
                  onChange={(e) => handleLessonChange(index, e)}
                  placeholder="Duration (e.g., 10:35)"
                  className="border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="videoUrl"
                  value={lesson.videoUrl}
                  onChange={(e) => handleLessonChange(index, e)}
                  placeholder="YouTube Link"
                  className="border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {lessons.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLessonField(index)}
                  className="text-red-600 text-sm mt-2 hover:underline"
                >
                  Remove Lesson
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addLessonField}
            className="mt-2 bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition"
          >
            + Add Lesson
          </button>
        </div>

        {/* ---------- SUBMIT BUTTON ---------- */}
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
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

export default AddCourse;
