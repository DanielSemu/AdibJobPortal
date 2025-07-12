import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
      <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-[#007dda] hover:bg-[#005fa3] text-white font-semibold rounded-lg px-4 py-2 transition-colors"
      >
        <FaHome className="text-lg" />
        Back to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
