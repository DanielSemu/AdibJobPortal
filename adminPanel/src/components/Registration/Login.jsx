import  { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { setAccessToken } from "../../api/tokenStorage";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo47.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setLoading,setUserProfile } = useAuth();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e, type) => {
    e.preventDefault(); // Prevent page reload
    try {
      const { email, password } = formData;
      const response = await login(email, password);
      if (response.status === 200 || response.statusText === "Ok") {
        setAccessToken(response.data.access);
        setLoading(true)
        showSuccessToast("Login successfully");
        setUserProfile(email);
        navigate("/");
      } else if (
        response.status === 401 ||
        response.statusText === "Unauthorized"
      ) {
        showErrorToast(response.data.detail);
      } else {
        showErrorToast("Unexpected Error Occurred!");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "An unexpected error occurred";
      showErrorToast(message); // Fallback error notification
    }
  };
  return (
    <section className="bg-gray-50 min-h-screen flex items-center">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left side */}
        <div className="bg-[#007dda] text-white flex flex-col justify-center items-center p-10 md:w-1/2 w-full min-h-[50vh] md:min-h-screen">
          <img src={logo} alt="Addis Bank Logo" className="mb-8 w-32 md:w-40" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-center">
            Welcome to Addis Bank
          </h1>
          <h2 className="text-4xl font-semibold mb-4 text-center">
            Job Portal Management System
          </h2>
          <p className="text-md md:text-lg leading-relaxed opacity-90 text-center">
            Welcome to the Addis Bank Job Portal Management Panel. This internal
            system is designed to help administrators efficiently manage job
            postings, review applications, and streamline the recruitment
            process. Empowering our HR team to find the best talent for Addis
            Bank.
          </p>
        </div>

        {/* Right side */}
        <div className="flex justify-center items-center md:w-1/2 w-full p-8">
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Sign in to your account
            </h1>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007dda]"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007dda]"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-[#007dda] hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-[#007dda] hover:bg-[#005fa3] text-white font-semibold rounded-lg p-3 transition-colors"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
