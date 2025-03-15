import React from 'react'
import logo from '../../assets/blue-logo.png'

const Footer = () => {
  return (
    <>

<footer className=" bg-white  shadow-lg border-2">
    <div className="w-full max-w-screen-xl mx-auto p-4 ">
        <div className="sm:flex  sm:items-center sm:justify-center">
            <a href="#" className="flex items-center sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src={logo} className="h-8" alt="Addis Bank Logo" />
                <span className="self-center text-primary text-3xl font-semibold whitespace-nowrap ">Addis Bank S.C</span>
            </a>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700" />
        <span className="block text-lg text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="https://addisbank.com/" className="hover:underline">Addis Bank s.c</a>. All Rights Reserved.</span>
    </div>
</footer>
    </>
  )
}

export default Footer