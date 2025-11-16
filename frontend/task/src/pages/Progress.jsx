import React, { useEffect, useState } from "react";
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

const API_URL = "http://localhost:3000/progress";

const Progress = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    activeCourses: "",
    hoursLearned: "",
    completedLessons: "",
    skillsGained: "",
  });

  // 🟢 Fetch progress
  const fetchProgress = async () => {
    try {
      const res = await fetch(`${API_URL}/read`, { credentials: "include" });
      const data = await res.json();
      setProgress(data);
      setFormData({
        activeCourses: data.activeCourses || "",
        hoursLearned: data.hoursLearned || "",
        completedLessons: data.completedLessons || "",
        skillsGained: data.skillsGained || "",
      });
    } catch (err) {
      console.error("Error fetching progress:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🟡 Update progress
  const updateProgress = async () => {
    try {
      const res = await fetch(`${API_URL}/update`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setProgress(data.progress);
      setShowModal(false);
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  if (loading) return <p className="p-8">Loading progress...</p>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const learningData = progress?.learningData || [];
  const skillData = progress?.skillData || [];
  const activeDays = progress?.activeDays || [];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Progress</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ✏️ Edit Progress
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Active Courses" value={progress?.activeCourses || 0} />
        <StatCard title="Hours Learned" value={`${progress?.hoursLearned || 0}h`} />
        <StatCard title="Completed Lessons" value={progress?.completedLessons || 0} />
        <StatCard title="Skills Gained" value={progress?.skillsGained || 0} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-10">
        <ChartCard title="Learning Hours This Week">
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
        </ChartCard>

        
      </div>

      {/* Active Days */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Days</h2>
        <div className="flex gap-3 flex-wrap">
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

      {/* 🟣 Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Progress</h2>
            {["activeCourses", "hoursLearned", "completedLessons", "skillsGained"].map((key) => (
              <input
                key={key}
                type="number"
                placeholder={key}
                value={formData[key]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                className="w-full border p-2 mb-3 rounded-lg"
              />
            ))}
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-gray-200">
                Cancel
              </button>
              <button onClick={updateProgress} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
    <h2 className="text-3xl font-bold text-blue-600">{value}</h2>
    <p className="text-gray-600">{title}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

export default Progress;
