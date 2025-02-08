import React, { useState } from "react";
import ReusableTable from "../ui/ReausableTable";
import { FiEye, FiEdit } from "react-icons/fi";


const Jobs = () => {

    const handleEditSupplier=()=>{

    }
    const handleDetailStore=()=>{

    }

    const data = [
        { id: 1, jobTitle: "Software Engineer", company: "Google", salary: 120000 },
        { id: 2, jobTitle: "Data Scientist", company: "Meta", salary: 135000 },
        { id: 3, jobTitle: "Product Manager", company: "Amazon", salary: 125000 },
        { id: 4, jobTitle: "UI/UX Designer", company: "Apple", salary: 110000 },
      ];
    const columns = [
        { header: "Order", accessor: "id" },
        { header: "job Title", accessor: "jobTitle" },
        { header: "Company", accessor: "company" },
        { header: "Salary", accessor: "salary" },
       
        {
          header: "Actions",
          accessor: "actions",
          cell: (row) => (
            <div className="flex gap-2">
              <button onClick={() => handleDetailStore(row)} className="btn">
                <FiEye />
              </button>
              <button onClick={() => handleEditSupplier(row)} className="btn">
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
        records={data}
        addAddress={""}
        title={""}
      />
    </div>
  );
};

export default Jobs;

