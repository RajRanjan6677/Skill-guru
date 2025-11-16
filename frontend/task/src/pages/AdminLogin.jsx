import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // Save token and role
      const userRole = data.role || "user";
      localStorage.setItem("token", data.token || "user-token");
      localStorage.setItem("userRole", userRole);

      setMessage("Login successful! Redirecting...");
      window.dispatchEvent(new Event("authChange"));

      setTimeout(() => {
        // Redirect based on role: admin -> admin dashboard, user -> regular dashboard
        if (userRole === "admin") {
          navigate("/admin/dashboard");
        } else {
          setMessage("Access denied. Admin access required.");
          setLoading(false);
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          return;
        }
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an admin account?{" "}
          <Link to="/admin/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-center mt-2 text-gray-600">
          Regular user?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

