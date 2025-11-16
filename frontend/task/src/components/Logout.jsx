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

        // Remove token and role from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");

        // Notify the rest of the app about auth change
        window.dispatchEvent(new Event("authChange"));

        // Redirect to login page
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } catch (error) {
        console.error("Logout failed:", error);
        // Even if API call fails, clear local storage and redirect
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        window.dispatchEvent(new Event("authChange"));
        navigate("/login");
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center text-gray-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Logging you out...</h2>
        <p className="text-sm text-gray-500">Please wait a moment.</p>
      </div>
    </div>
  );
};

export default Logout;
