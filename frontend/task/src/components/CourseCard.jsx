import { Link } from "react-router-dom";

const CourseCard = ({ id, title, author, rating, learners, level, progress, image }) => {
  const badgeColor =
    level === "Advanced"
      ? "bg-red-500"
      : level === "Intermediate"
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <Link
      to={`/course/${id}`}
      className="bg-white border border-gray-200 hover:shadow-lg transition rounded-lg p-4 flex items-center gap-4"
    >
      <img
        src={image}
        alt={title}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-800 font-semibold">{title}</h3>
          <span className={`text-xs text-white px-2 py-1 rounded ${badgeColor}`}>
            {level}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          by {author} · ⭐ {rating} ({learners})
        </p>
        <div className="w-full bg-gray-200 h-2 rounded mt-2">
          <div
            className="bg-blue-600 h-2 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
