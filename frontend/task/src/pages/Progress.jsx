// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// const API_URL = "http://localhost:3000/progress";

// const Progress = () => {
//   const [progress, setProgress] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     activeCourses: "",
//     hoursLearned: "",
//     completedLessons: "",
//     skillsGained: "",
//   });

//   // 🟢 Fetch progress
//   const fetchProgress = async () => {
//     try {
//       const res = await fetch(`${API_URL}/read`, { credentials: "include" });
//       const data = await res.json();
//       setProgress(data);
//       setFormData({
//         activeCourses: data.activeCourses || "",
//         hoursLearned: data.hoursLearned || "",
//         completedLessons: data.completedLessons || "",
//         skillsGained: data.skillsGained || "",
//       });
//     } catch (err) {
//       console.error("Error fetching progress:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🟡 Update progress
//   const updateProgress = async () => {
//     try {
//       const res = await fetch(`${API_URL}/update`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       setProgress(data.progress);
//       setShowModal(false);
//     } catch (err) {
//       console.error("Error updating progress:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProgress();
//   }, []);

//   if (loading) return <p className="p-8">Loading progress...</p>;

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

//   const learningData = progress?.learningData || [];
//   const skillData = progress?.skillData || [];
//   const activeDays = progress?.activeDays || [];

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">My Progress</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           ✏️ Edit Progress
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <StatCard title="Active Courses" value={progress?.activeCourses || 0} />
//         <StatCard title="Hours Learned" value={`${progress?.hoursLearned || 0}h`} />
//         <StatCard title="Completed Lessons" value={progress?.completedLessons || 0} />
//         <StatCard title="Skills Gained" value={progress?.skillsGained || 0} />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-10">
//         <ChartCard title="Learning Hours This Week">
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={learningData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="hours" stroke="#8884d8" />
//             </LineChart>
//           </ResponsiveContainer>
//         </ChartCard>

        
//       </div>

//       {/* Active Days */}
//       <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Days</h2>
//         <div className="flex gap-3 flex-wrap">
//           {activeDays.map((day) => (
//             <div
//               key={day.day}
//               className={`px-4 py-2 rounded-lg text-white font-semibold ${
//                 day.active ? "bg-blue-600" : "bg-gray-300 text-gray-700"
//               }`}
//             >
//               {day.day}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 🟣 Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Update Progress</h2>
//             {["activeCourses", "hoursLearned", "completedLessons", "skillsGained"].map((key) => (
//               <input
//                 key={key}
//                 type="number"
//                 placeholder={key}
//                 value={formData[key]}
//                 onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
//                 className="w-full border p-2 mb-3 rounded-lg"
//               />
//             ))}
//             <div className="flex justify-end gap-3">
//               <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-gray-200">
//                 Cancel
//               </button>
//               <button onClick={updateProgress} className="px-4 py-2 rounded-lg bg-blue-600 text-white">
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const StatCard = ({ title, value }) => (
//   <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
//     <h2 className="text-3xl font-bold text-blue-600">{value}</h2>
//     <p className="text-gray-600">{title}</p>
//   </div>
// );

// const ChartCard = ({ title, children }) => (
//   <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
//     <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
//     {children}
//   </div>
// );

// export default Progress;
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
} from "recharts";

const API_URL = "http://localhost:3000/progress";

const Progress = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    activeCourses: 0,
    hoursLearned: 0,
    completedLessons: 0,
    skillsGained: 0,
    learningData: [],
    skillData: [],
    activeDays: [],
  });

  // 🔹 Fetch progress
  const fetchProgress = async () => {
    try {
      const res = await fetch(`${API_URL}/read`, {
        credentials: "include",
      });
      const data = await res.json();
      setProgress(data);
      setFormData({
        activeCourses: data.activeCourses || 0,
        hoursLearned: data.hoursLearned || 0,
        completedLessons: data.completedLessons || 0,
        skillsGained: data.skillsGained || 0,
        learningData: data.learningData || [],
        skillData: data.skillData || [],
        activeDays: data.activeDays || [],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update progress
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
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">My Progress</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Edit Progress
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Active Courses" value={progress.activeCourses} />
        <StatCard title="Hours Learned" value={`${progress.hoursLearned}h`} />
        <StatCard title="Lessons Completed" value={progress.completedLessons} />
        <StatCard title="Skills Gained" value={progress.skillsGained} />
      </div>

      {/* Learning Chart */}
      <ChartCard title="Weekly Learning Hours">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={progress.learningData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="hours" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Active Days */}
      <div className="bg-white p-5 rounded-xl mt-10 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Active Days</h2>
        <div className="flex flex-wrap gap-3">
          {progress.activeDays.map((d, index) => (
            <span
              key={index}
              className={`px-4 py-2 rounded-lg font-semibold ${
                d.active
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {d.day}
            </span>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[420px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Update Progress</h2>

            {/* Basic Fields */}
            {[
              "activeCourses",
              "hoursLearned",
              "completedLessons",
              "skillsGained",
            ].map((key) => (
              <div key={key} className="mb-3">
                <label className="text-sm text-gray-600 capitalize block mb-1">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="number"
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: Number(e.target.value) })
                  }
                  placeholder={key.replace(/([A-Z])/g, ' $1')}
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}

            {/* Learning Data */}
            <Section title="Learning Data (Weekly Hours)">
              {formData.learningData.map((item, i) => (
                <Row key={i}>
                  <FieldWrapper label="Day">
                    <Input
                      value={item.day}
                      placeholder="e.g., Mon"
                      onChange={(v) => {
                        const arr = [...formData.learningData];
                        arr[i].day = v;
                        setFormData({ ...formData, learningData: arr });
                      }}
                    />
                  </FieldWrapper>
                  <FieldWrapper label="Hours">
                    <Input
                      type="number"
                      value={item.hours}
                      placeholder="e.g., 2.5"
                      // FIX APPLIED HERE: Handle empty string conversion to 0 explicitly
                      onChange={(v) => {
                        const arr = [...formData.learningData];
                        
                        let newValue;
                        if (v === "") {
                          // Treat empty input as 0
                          newValue = 0; 
                        } else {
                          // Use parseFloat to allow decimals (like 2.5)
                          newValue = parseFloat(v);
                          // Ensure newValue is 0 if it results in NaN (non-numeric input)
                          if (isNaN(newValue)) newValue = 0; 
                        }

                        arr[i].hours = newValue;
                        setFormData({ ...formData, learningData: arr });
                      }}
                    />
                  </FieldWrapper>
                </Row>
              ))}
              <AddButton
                onClick={() =>
                  setFormData({
                    ...formData,
                    learningData: [...formData.learningData, { day: "", hours: 0 }],
                  })
                }
              />
            </Section>

            {/* Skill Data */}
            

            {/* Active Days */}
            <Section title="Active Days">
              {formData.activeDays.map((item, i) => (
                <Row key={i}>
                  <FieldWrapper label="Day of Week">
                    <Input
                      value={item.day}
                      placeholder="e.g., Monday"
                      onChange={(v) => {
                        const arr = [...formData.activeDays];
                        arr[i].day = v;
                        setFormData({ ...formData, activeDays: arr });
                      }}
                    />
                  </FieldWrapper>
                  <div className="flex flex-col items-center justify-center p-2 pt-5">
                    <label className="text-sm text-gray-600 block mb-1">Active?</label>
                    <input
                      type="checkbox"
                      checked={item.active}
                      onChange={(e) => {
                        const arr = [...formData.activeDays];
                        arr[i].active = e.target.checked;
                        setFormData({ ...formData, activeDays: arr });
                      }}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    />
                  </div>
                </Row>
              ))}
              <AddButton
                onClick={() =>
                  setFormData({
                    ...formData,
                    activeDays: [...formData.activeDays, { day: "", active: false }],
                  })
                }
              />
            </Section>

            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={updateProgress}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- Reusable Components (No Changes Needed Here) ---------- */

const StatCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm text-center">
    <h2 className="text-3xl font-bold text-blue-600">{value}</h2>
    <p className="text-gray-600">{title}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-6 border-t pt-4">
    <h3 className="font-semibold text-lg mb-3 text-gray-800">{title}</h3>
    {children}
  </div>
);

const FieldWrapper = ({ label, children }) => (
  <div className="w-1/2">
    <label className="text-sm text-gray-600 block mb-1">{label}</label>
    {children}
  </div>
);

const Row = ({ children }) => (
  <div className="flex gap-4 mb-3 items-start">{children}</div>
);

const Input = ({ value, onChange, ...props }) => (
  <input
    {...props}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border p-2 rounded w-full focus:ring-blue-500 focus:border-blue-500"
  />
);

const AddButton = ({ onClick }) => (
  <button onClick={onClick} className="text-blue-600 text-sm mt-1 flex items-center hover:text-blue-700">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
    Add Item
  </button>
);

export default Progress;