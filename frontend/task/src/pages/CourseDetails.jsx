import { useParams, Link } from "react-router-dom";

const CourseDetails = () => {
  const { id } = useParams();

  return (
    <div className="ml-60 min-h-screen bg-gray-50 p-8">
      <Link
        to="/"
        className="text-blue-600 hover:underline mb-4 inline-block font-medium"
      >
        ← Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Course #{id}
      </h1>
      <p className="text-gray-600 max-w-2xl">
        Detailed description of the course goes here. Include lessons, instructor info,
        and progress tracking.
      </p>

      <div className="mt-6 bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Course Lessons</h2>
        <ul className="space-y-2 text-gray-700">
          <li>✅ Introduction and Setup</li>
          <li>✅ Component Design Patterns</li>
          <li>🔲 Render Props and HOC</li>
          <li>🔲 Custom Hooks Deep Dive</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;
