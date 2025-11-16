import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:3000/courses/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error("❌ Error fetching course:", err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    const checkEnrollment = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/enrollments/check/${id}`,
          {
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setIsEnrolled(data.enrolled);
        }
      } catch (err) {
        console.error("Error checking enrollment:", err);
      }
    };

    fetchCourse();
    checkEnrollment();
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    setEnrollMessage("");
    try {
      const res = await fetch(`http://localhost:3000/enrollments/${id}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setIsEnrolled(true);
        setEnrollMessage("✅ Successfully enrolled in course!");
        // Update course learners count
        if (course) {
          setCourse({ ...course, learners: (course.learners || 0) + 1 });
        }
      } else {
        setEnrollMessage(data.message || "Failed to enroll");
      }
    } catch (err) {
      console.error("Error enrolling:", err);
      setEnrollMessage("Failed to enroll. Please try again.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-blue-600 font-semibold text-lg">
          Loading course details...
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

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-700 font-medium">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link
        to="/courses"
        className="text-blue-600 hover:underline mb-4 inline-block font-medium"
      >
        ← Back to All Courses
      </Link>

      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        {/* Course Info */}
        <div className="flex flex-col lg:flex-row gap-6">
          <img
            src={
              course.image ||
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
            }
            alt={course.title}
            className="w-full lg:w-1/3 rounded-lg object-cover"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {course.title}
            </h1>
            <p className="text-gray-600 mb-3">
              by <span className="font-semibold">{course.author}</span>
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span>⭐ {course.rating || "0.0"}</span>
              <span>{course.learners || 0} learners</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {course.level}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              {course.description}
            </p>

            {/* Enroll Button */}
            <div className="mt-4">
              {isEnrolled ? (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold inline-block">
                  ✓ Enrolled
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {enrolling ? "Enrolling..." : "Enroll in Course"}
                </button>
              )}
              {enrollMessage && (
                <p
                  className={`mt-2 text-sm ${
                    enrollMessage.includes("✅")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {enrollMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Course Lessons
          </h2>

          {course.lessons && course.lessons.length > 0 ? (
            <ul className="space-y-4">
              {course.lessons.map((lesson, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🎬</span>
                    <div>
                      <p className="text-gray-800 font-medium">{lesson.title}</p>
                      {lesson.duration && (
                        <p className="text-sm text-gray-500">
                          Duration: {lesson.duration}
                        </p>
                      )}
                    </div>
                  </div>
                  {lesson.videoUrl ? (
                    <a
                      href={lesson.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      ▶ Watch
                    </a>
                  ) : (
                    <span className="text-gray-400 italic text-sm">
                      No video available
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">
              No lessons added for this course yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
