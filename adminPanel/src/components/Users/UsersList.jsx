import { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
// import ConfirmModal from "../ui/ConfirmModal";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEdit, FiPlus } from "react-icons/fi";
import { getUsers } from "../services/userServices";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const response = await getUsers();
    setUsers(response.data.internal_users);
  }
  useEffect(() => {
    fetchUser()
  }, [])
  const handleEdit = (row) => {
    navigate(`/edit/${row.id}`);
  };

  const handleDetailView = (row) => {
    navigate(`/detail/${row.id}`);
  };

  const columns = [
    { header: "Full Name", accessor: "full_name" },
    { header: "Deparment", accessor: "department" },
    { header: "Role", accessor: "role" },
    {
      header: "Status", accessor: "status",
      cell: (row) => (
        <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${row.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {row.is_active ? 'Active' : 'Inactive'}
        </div>
      )
    },
    {
      header: "Last Login", accessor: "last_login",
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
          <button onClick={() => handleDetailView(row)} className="btn">
            <FiEye />
          </button>

          <button onClick={() => handleEdit(row)} className="btn">
            <FiEdit />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className=" mx-auto py-6 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-between items-center">
        <Link
          to={"/users/add"}
          className="btn bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FiPlus /> Register User
        </Link>
      </div>
      <ReusableTable columns={columns} records={users} title="Users" />
    </div>
  )
}

export default UsersList

