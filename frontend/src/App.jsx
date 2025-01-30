import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import JobFilter from './components/JobFilter/JobFilter'
import Jobs from './components/Jobs/Jobs'
import JobCategories from './components/JobCategories/JobCategories'
import Footer from './components/footer/Footer'
import Contact from './components/contact/Contact'
import Hero1 from './components/Hero/Hero1'

const App = () => {
  return (
    <>
      <Navbar/>
      <Hero1/>
      {/* <Hero/> */}
      {/* <JobFilter/> */}
      <Jobs/>
      <JobCategories/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default App