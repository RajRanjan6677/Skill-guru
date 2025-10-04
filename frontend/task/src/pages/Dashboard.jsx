import CourseCard from "../components/CourseCard";

const Dashboard = () => {
  const courses = [
    {
      id: 1,
      title: "Advanced React Patterns",
      author: "Sarah Chen",
      rating: 4.9,
      learners: 1247,
      level: "Advanced",
      progress: 85,
      image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=200",
    },
    {
      id: 2,
      title: "Node.js Microservices",
      author: "David Rodriguez",
      rating: 4.8,
      learners: 892,
      level: "Intermediate",
      progress: 64,
      image: "https://images.unsplash.com/photo-1590608897129-79da98d159a6?w=200",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        {[
          { label: "Active Courses", value: 5, change: "+2 this month" },
          { label: "Hours Learned", value: 87.5, change: "+12.3 this week" },
          { label: "Completed", value: 23, change: "+4 this week" },
          { label: "Skills Gained", value: 12, change: "+3 this month" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm"
          >
            <h2 className="text-3xl font-bold text-blue-600">{stat.value}</h2>
            <p className="text-gray-600">{stat.label}</p>
            <p className="text-sm text-green-600 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Continue Learning */}
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Continue Learning</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
