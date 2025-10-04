import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Skills = () => {
  // Example skill data
  const skills = [
    { name: "React", level: 85 },
    { name: "Node.js", level: 70 },
    { name: "JavaScript", level: 90 },
    { name: "CSS", level: 75 },
    { name: "TypeScript", level: 60 },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Skills</h1>

      {/* Skill Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {skills.map((skill) => (
          <div key={skill.name} className="bg-white p-4 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{skill.name}</h2>
            <div className="w-full bg-gray-200 h-4 rounded-full">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{skill.level}% proficiency</p>
          </div>
        ))}
      </div>

      {/* Skills Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skill Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skills}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="level" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Skills;
