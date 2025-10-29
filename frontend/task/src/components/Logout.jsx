import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call backend logout API
        await fetch("http://localhost:3000/auth/logout", {
          method: "POST",
          credentials: "include", // in case you're using cookies
        });

        // Remove token from localStorage
        localStorage.removeItem("token");

        // Notify the rest of the app about auth change
        window.dispatchEvent(new Event("authChange"));

        // Redirect to login page
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center text-gray-700">
        <h2 className="text-xl font-semibold mb-2">Logging you out...</h2>
        <p className="text-sm text-gray-500">Please wait a moment.</p>
      </div>
    </div>
  );
};

export default Logout;
