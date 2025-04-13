import React, { useEffect, useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import { FiEye, FiEdit,FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getCategories } from '../services/jobsService';


const Categories = () => {
    const [categories,setCategories]=useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchCategories =async()=>{
            const response=await getCategories()
            setCategories(response)
        }
        fetchCategories()
    },[])
    const handleEdit = (row) => {
        navigate(`edit/${row.id}`);
      };
      const handleDetailView = (row) => {
        navigate(`detail/${row.id}`);
      };


      
        const columns = [
          { header: "name", accessor: "name" },
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
    <div>
      <ReusableTable
        columns={columns}
        records={categories}
        addAddress={"/categories/add"}
        title={"Categories"}
      />
    </div>
  )
}

export default Categories