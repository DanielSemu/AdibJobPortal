import React from 'react'
import {AiFillSketchSquare,AiOutlinePieChart } from 'react-icons/ai' 
import { MdOutlineMenuBook } from "react-icons/md";
import { FaChalkboardUser ,FaLaptopCode} from "react-icons/fa6";

const iconMap = {
  AiFillSketchSquare: AiFillSketchSquare,
  MdOutlineMenuBook: MdOutlineMenuBook,
  AiOutlinePieChart: AiOutlinePieChart,
  FaChalkboardUser: FaChalkboardUser,
  FaLaptopCode: FaLaptopCode,
};

const JobCategories = () => {
  const data=[
    {
      categoryName:"Business  Development",
      iconName:"AiFillSketchSquare",
      job:70
    },
    {
      categoryName:"Marketing & Communication",
      iconName:"MdOutlineMenuBook",
      job:30
    },
    {
      categoryName:"Project Management",
      iconName:"AiOutlinePieChart",
      job:14
    },
    {
      categoryName:"Customer Service",
      iconName:"FaChalkboardUser",
      job:63
    },
    {
      categoryName:"Information Technology",
      iconName:"FaLaptopCode",
      job:22
    },
  ]

  return (
    <div id='categories' className="main-container">
      <div className="grid grid-cols-1 pb-8 text-center">
        <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
          Popular Categories
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto">
          Search all the open positions on the web. Get your own personalized
          salary estimate. Read reviews on over 30000+ companies worldwide.
        </p>
      </div>
      <div className="grid mx-10 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
        {
          data.map((item,index)=>{
            const IconComponent = iconMap[item.iconName];
            return (
              <div key={index} className="group px-3 py-10 rounded-md shadow dark:shadow-gray-700 hover:shadow-emerald-600/10 dark:hover:shadow-emerald-600/10 text-center bg-white  hover:bg-emerald-600/5 dark:hover:bg-emerald-600/5 transition duration-500">
          <div className="size-16 bg-emerald-600/5 group-hover:bg-[#007dda] text-[#007dda] group-hover:text-white rounded-md text-2xl flex align-middle justify-center items-center shadow-sm dark:shadow-gray-700 transition duration-500 mx-auto">
          <IconComponent size={40}/>
          </div>
          <div className="content mt-6">
            <a
              className="title text-lg font-semibold hover:text-[#007dda]"
              href="/"
            >
              {item.categoryName}
            </a>
            <p className="text-slate-400 mt-3">{item.job} Jobs</p>
          </div>
        </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default JobCategories


