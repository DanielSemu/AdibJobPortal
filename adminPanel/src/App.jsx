import React from "react";
import Sidebar from "./components/Navigation/Sidebar";
import Navbar from "./components/Navigation/Navbar";
import { Routes, Route } from "react-router-dom";
import Jobs from "./components/Jobs/Jobs";

const App = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="main-container border-2 p-4 sm:ml-64 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
         <Routes>
            <Route path="/jobs" element={<Jobs/>}/>
         </Routes>
      </div>
    </>
  );
};

export default App;
App;
