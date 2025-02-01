import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import JobFilter from './components/JobFilter/JobFilter'
import Jobs from './components/Jobs/Jobs'
import JobCategories from './components/JobCategories/JobCategories'
import Footer from './components/footer/Footer'
import Contact from './components/contact/Contact'
import Hero1 from './components/Hero/Hero1'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Registration/Login'
import HomePage from './pages/HomePage'
import Register from './components/Registration/Register'
import JobDetail from './components/JobDetail/JobDetail'
import ScrollToTop from './services/ScrollToTop'
import ApplyJob from './components/ApplyJob/ApplyJob'

const App = () => {
  return (
    <>
      <Navbar/>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/detail/:id' element={<JobDetail/>}/>
        <Route path='/apply/:id' element={<ApplyJob/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App