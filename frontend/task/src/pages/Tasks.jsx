import React, { useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Complete React Project", completed: false },
    { id: 2, text: "Read JavaScript Guide", completed: true },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = { id: Date.now(), text: newTask, completed: false };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Tasks</h1>

      {/* Add Task */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.length === 0 && (
          <p className="text-gray-500">No tasks available. Add some!</p>
        )}
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="w-5 h-5 accent-blue-600"
              />
              <span
                className={`text-gray-800 ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.text}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
