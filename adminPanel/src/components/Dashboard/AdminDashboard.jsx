import { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { getUsers } from '../services/userServices';

// Register Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        console.log(response);
        
        setUsers(response.data.internal_users);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  // Calculate insights
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.is_active).length;
  const inactiveUsers = totalUsers - activeUsers;
  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});
  const departmentDistribution = users.reduce((acc, user) => {
    acc[user.department] = (acc[user.department] || 0) + 1;
    return acc;
  }, {});

  // Pie chart data for role distribution
  const roleChartData = {
    labels: ['Admin', 'HR Maker', 'HR Checker'],
    datasets: [
      {
        data: [
          roleDistribution.admin || 0,
          roleDistribution.hr_maker || 0,
          roleDistribution.hr_checker || 0,
        ],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
        hoverOffset: 20,
      },
    ],
  };

  // Bar chart data for department distribution
  const departmentChartData = {
    labels: Object.keys(departmentDistribution),
    datasets: [
      {
        label: 'Users per Department',
        data: Object.values(departmentDistribution),
        backgroundColor: '#3B82F6',
        borderColor: '#2563EB',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Insights Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Active Users</h2>
          <p className="text-3xl font-bold text-green-600">{activeUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Inactive Users</h2>
          <p className="text-3xl font-bold text-red-600">{inactiveUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Departments</h2>
          <p className="text-3xl font-bold text-purple-600">
            {[...new Set(users.map(user => user.department))].length}
          </p>
        </div>
      </div>

      {/* Graphical Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Role Distribution</h2>
          <div className="h-64">
            <Pie
              data={roleChartData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' },
                },
              }}
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Department Distribution</h2>
          <div className="h-64">
            <Bar
              data={departmentChartData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: { beginAtZero: true, ticks: { stepSize: 1 } },
                },
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-800 p-6">User List</h2>
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading users...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Full Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Username</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.full_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-blue-100 text-blue-800'
                            : user.role === 'hr_maker'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {user.role.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;