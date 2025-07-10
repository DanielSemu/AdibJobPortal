import { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
// import ConfirmModal from "../ui/ConfirmModal";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEdit, FiPlus } from "react-icons/fi";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const jod = ["dsfds"]
    setUsers(jod)
  },[])
  const handleEdit = (row) => {
    navigate(`/edit/${row.id}`);
  };

  const handleDetailView = (row) => {
    navigate(`/detail/${row.id}`);
  };

  const columns = [
    { header: "Employee ID", accessor: "vacancy_number" },
    { header: "Full Name", accessor: "title" },
    { header: "Role", accessor: "location" },
    { header: "Status", accessor: "job_type" },
    { header: "Last Login", accessor: "post_date" },
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

