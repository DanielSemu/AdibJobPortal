import { useEffect, useState } from "react";
import Modal from "./Modal";
import { FiEye, FiEdit, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getUsers, updateUser } from "../services/userServices";
import ReusableTable from "../ui/ReausableTable";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ department: '', is_active: true, role: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data.internal_users);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleViewDetails = (row) => {
    setSelectedUser(row);
    setIsViewModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedUser(row);
    setEditForm({
      department: row.department || '',
      is_active: row.is_active,
      role: row.role || ''
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!editForm.role) {
      setError('Role is required');
      return;
    }

    try {
      const payload = {
        username: selectedUser.username,
        department: editForm.department || undefined,
        is_active: editForm.is_active,
        role: editForm.role
      };
      await updateUser(payload);
      setSuccess('User updated successfully');
      setIsEditModalOpen(false);
      fetchUsers(); // Refresh user list
    } catch (err) {
      setError(err || 'Failed to update user');
      console.error(err);
    }
  };

  const columns = [
    { header: "Full Name", accessor: "full_name" },
    { header: "Username", accessor: "username" },
    { header: "Department", accessor: "department" },
    { header: "Role", accessor: "role" },
    {
      header: "Status",
      accessor: "is_active",
      cell: (row) => (
        <div
          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            row.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {row.is_active ? 'Active' : 'Inactive'}
        </div>
      )
    },
    {
      header: "Last Login",
      accessor: "last_login",
      cell: (row) => (
        <div>
          {row.last_login ? new Date(row.last_login).toLocaleString() : 'Never'}
        </div>
      )
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleViewDetails(row)}
            className="text-blue-500 hover:text-blue-700"
          >
            <FiEye size={20} />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="text-yellow-500 hover:text-yellow-700"
          >
            <FiEdit size={20} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-between items-center px-6">
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <Link
          to="/users/add"
          className="btn bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
        >
          <FiPlus /> Register User
        </Link>
      </div>

      <ReusableTable columns={columns} records={users}  />

      {/* View Details Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="User Details"
      >
        {selectedUser && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
                {selectedUser.full_name}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
                {selectedUser.username}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
                {selectedUser.department || 'Not provided'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
                {selectedUser.role}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
                {selectedUser.is_active ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Login</label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
                {selectedUser.last_login ? new Date(selectedUser.last_login).toLocaleString() : 'Never'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
                {selectedUser.email || 'Not provided'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
                {selectedUser.phone_number || 'Not provided'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Birthdate</label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
                {selectedUser.birthdate || 'Not provided'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
                {selectedUser.gender || 'Not provided'}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <p className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100">
              {selectedUser?.username}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <input
              type="text"
              value={editForm.department}
              onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={editForm.is_active}
              onChange={(e) => setEditForm({ ...editForm, is_active: e.target.value === 'true' })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role *</label>
            <select
              value={editForm.role}
              onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="hr_maker">HR Maker</option>
              <option value="hr_checker">HR Checker</option>
            </select>
          </div>
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UsersList;