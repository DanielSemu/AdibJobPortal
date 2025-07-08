import { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import { FiEye, FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import {
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory
} from "../services/jobsService";
import useAuth from "../../hooks/useAuth";
import ConfirmModal from "../ui/ConfirmModal";

// Same options as your Django model
const ICON_OPTIONS = [
  "AiFillSketchSquare",
  "MdOutlineMenuBook",
  "AiOutlinePieChart",
  "FaChalkboardUser",
  "FaLaptopCode",
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalType, setModalType] = useState(""); // "edit", "detail", "add"
  const [editedName, setEditedName] = useState("");
  const [editedIcon, setEditedIcon] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newIcon, setNewIcon] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { userProfile } = useAuth();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response);
  };

  const handleEdit = (row) => {
    setSelectedCategory(row);
    setEditedName(row.name);
    setEditedIcon(row.iconName || "");
    setModalType("edit");
  };
  const handleDelete = (row) => {
    setSelectedCategory(row);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = async () => {
    if (selectedCategory) {
      await deleteCategory(selectedCategory.id);
      fetchCategories();
    }
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDetailView = (row) => {
    setSelectedCategory(row);
    setModalType("detail");
  };

  const handleAddNew = () => {
    setNewCategoryName("");
    setNewIcon("");
    setModalType("add");
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setModalType("");
    setEditedName("");
    setEditedIcon("");
    setNewCategoryName("");
    setNewIcon("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updated = {
      ...selectedCategory,
      name: editedName,
      iconName: editedIcon,
    };
    await updateCategory(selectedCategory.id, updated);
    closeModal();
    fetchCategories();
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await createCategory({ name: newCategoryName, iconName: newIcon });
    closeModal();
    fetchCategories();
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Icon", accessor: "iconName" },
    {
      header: "Actions",
      accessor: "actions",
      cell: (row) => (
        <div className="flex gap-3">
          <button onClick={() => handleDetailView(row)} className="btn text-blue-600">
            <FiEye />
          </button>
          {userProfile.role === "hr_maker" && (
            <button onClick={() => handleEdit(row)} className="btn text-yellow-600">
              <FiEdit />
            </button>
          )}
          {userProfile.role === "hr_maker" && (
            <button onClick={() => handleDelete(row)} className="btn text-red-600">
              <FiTrash2 />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="py-6 bg-white shadow-lg rounded-lg mt-10">
      {userProfile.role === "hr_maker" && (
        <div className="flex justify-between items-center">
          <button
            onClick={handleAddNew}
            className="btn bg-primary text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FiPlus /> Add Category
          </button>
        </div>
      )}

      <ReusableTable
        columns={columns}
        records={categories}
        title={"Categories"}
      />

      {(selectedCategory || modalType === "add") && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 text-xl"
            >
              ✕
            </button>

            {modalType === "detail" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Category Details</h2>
                <p>
                  <strong>Name:</strong> {selectedCategory.name}
                </p>
                <p>
                  <strong>Icon Name:</strong> {selectedCategory.iconName}
                </p>
              </div>
            )}

            {modalType === "edit" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Edit Category</h2>
                <form onSubmit={handleEditSubmit}>
                  <label className="block mb-2">
                    Name:
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                      required
                    />
                  </label>
                  <label className="block mb-2">
                    Icon:
                    <select
                      value={editedIcon}
                      onChange={(e) => setEditedIcon(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="">-- Select Icon --</option>
                      {ICON_OPTIONS.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      className="btn bg-primary px-4 py-2 rounded text-white"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}

            {modalType === "add" && (
              <div>
                <h2 className="text-xl font-bold mb-4">Add New Category</h2>
                <form onSubmit={handleAddSubmit}>
                  <label className="block mb-2">
                    Name:
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                      required
                    />
                  </label>
                  <label className="block mb-2">
                    Icon:
                    <select
                      value={newIcon}
                      onChange={(e) => setNewIcon(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="">-- Select Icon --</option>
                      {ICON_OPTIONS.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      className="btn bg-primary px-4 py-2 rounded text-white"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            )}
            <ConfirmModal
              isOpen={isDeleteModalOpen}
              message={`Are you sure you want to delete a Category "${selectedCategory?.name}"?`}
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
