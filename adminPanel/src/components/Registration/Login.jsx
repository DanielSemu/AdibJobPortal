import { useState } from 'react';
import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../utils/toastUtils';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/logo47.png';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const { setUserProfile, setLoading } = useAuth();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true before API call
      const { username, password } = formData;
      const response = await login(username, password);

      if (response.status === 200) {
        // login function in auth.js already sets accessToken and fetches user profile
        const userData = JSON.parse(localStorage.getItem('userProfile')); // Get profile set by auth.js
        setUserProfile(userData); // Update AuthProvider state
        showSuccessToast('Login successful!');
        navigate('/'); // Navigate after state is updated
      } else {
        showErrorToast(response?.data?.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'An unexpected error occurred';
      showErrorToast(message);
    } finally {
      setLoading(false); // Always reset loading state
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Your Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#007dda]"
                  placeholder="test.user"
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