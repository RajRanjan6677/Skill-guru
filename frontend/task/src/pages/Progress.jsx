import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Progress = () => {
  // Sample data
  const learningData = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 3 },
    { day: "Wed", hours: 1 },
    { day: "Thu", hours: 4 },
    { day: "Fri", hours: 2 },
    { day: "Sat", hours: 3 },
    { day: "Sun", hours: 0 },
  ];

  const skillData = [
    { name: "React", value: 40 },
    { name: "Node.js", value: 30 },
    { name: "JavaScript", value: 20 },
    { name: "CSS", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const activeDays = [
    { day: "Mon", active: true },
    { day: "Tue", active: true },
    { day: "Wed", active: false },
    { day: "Thu", active: true },
    { day: "Fri", active: true },
    { day: "Sat", active: false },
    { day: "Sun", active: false },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Progress</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-blue-600">5</h2>
          <p className="text-gray-600">Active Courses</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-blue-600">12h</h2>
          <p className="text-gray-600">Hours Learned</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-blue-600">23</h2>
          <p className="text-gray-600">Completed Lessons</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-blue-600">8</h2>
          <p className="text-gray-600">Skills Gained</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Learning Hours Line Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Learning Hours This Week
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={learningData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="hours" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Pie Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Skills Progress
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={skillData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {skillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Days */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Days</h2>
        <div className="flex gap-3">
          {activeDays.map((day) => (
            <div
              key={day.day}
              className={`px-4 py-2 rounded-lg text-white font-semibold ${
                day.active ? "bg-blue-600" : "bg-gray-300 text-gray-700"
              }`}
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;
