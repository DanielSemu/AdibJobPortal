import { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.get(`http://192.168.6.63:2000/api/Ldap/users/by-username/${searchQuery}`);
      const data = response.data;

      if (data && data.username) {
        setUserData({
          employeeId: data.username,
          department: data.department || 'Not provided', // Fallback for missing department
          fullName: data.displayName
        });
      } else {
        setError('User not found');
        setUserData(null);
      }
    } catch (err) {
      setError('Error searching for user');
      console.error(err);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!userData || !selectedRole) {
      setError('Please complete all fields');
      return;
    }

    try {
      const response = await fetch('http://192.168.6.63:200/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: userData.employeeId,
          department: userData.department,
          fullName: userData.fullName,
          role: selectedRole
        })
      });

      if (response.ok) {
        setSuccess('User created successfully');
        setUserData(null);
        setSearchQuery('');
        setSelectedRole('');
      } else {
        setError('Failed to create user');
      }
    } catch (err) {
      setError('Error creating user');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create User</h2>

      {/* Search Form */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search user..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* User Information and Role Selection */}
      {userData && (
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              value={userData.employeeId}
              readOnly
              className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={userData.fullName}
              readOnly
              className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={userData.department}
              readOnly
              className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="hr_maker">HR Maker</option>
              <option value="hr_checker">HR Checker</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Create User
          </button>
        </form>
      )}

      {/* Error and Success Messages */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}
    </div>
  );
};

export default CreateUser;