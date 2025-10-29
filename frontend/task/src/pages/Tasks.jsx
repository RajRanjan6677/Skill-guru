import React, { useState, useEffect } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3000/task";

  // ✅ Fetch tasks
  // ✅ Fetch tasks
const fetchTasks = async () => {
  setLoading(true);
  setError("");
  try {
    const res = await fetch(`${API_URL}/read`, {
      method: "GET",
      credentials: "include", // 🔥 send cookies (important)
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    //console.log("Fetched data:", data);

    if (res.ok) {
      // Backend sends an array directly
      setTasks(Array.isArray(data) ? data : []);
    } else {
      setError(data.message || "Failed to load tasks");
      setTasks([]);
    }
  } catch (err) {
    console.error("Error fetching tasks:", err);
    setError("Error fetching tasks");
  } finally {
    setLoading(false);
  }
};



  // ✅ Add task
  const addTask = async () => {
    if (!newTask.trim() || !description.trim()) return;
    try {
      const res = await fetch(`${API_URL}/create`, {
        method: "POST",
        credentials: "include", // ✅ include cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask, description }),
      });

      const data = await res.json();
      if (res.ok) {
        setNewTask("");
        setDescription("");
        fetchTasks(); // reload list
      } else {
        setError(data.message || "Failed to add task");
      }
    } catch (err) {
      console.error(err);
      setError("Error adding task");
    }
  };

  // ✅ Toggle task completion
  const toggleComplete = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/update/${id}`, {
        method: "PUT",
        credentials: "include", // ✅ include cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: !currentStatus }),
      });

      if (res.ok) fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
        credentials: "include", // ✅ include cookies
      });
      if (res.ok) fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Tasks</h1>

      {/* Add Task */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Task title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found. Add one!</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.status}
                  onChange={() => toggleComplete(task._id, task.status)}
                  className="w-5 h-5 accent-blue-600"
                />
                <div>
                  <p
                    className={`font-medium ${
                      task.status ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
