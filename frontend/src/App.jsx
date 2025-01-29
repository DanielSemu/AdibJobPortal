import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import JobFilter from './components/JobFilter/JobFilter'
import Jobs from './components/Jobs/Jobs'
import JobCategories from './components/JobCategories/JobCategories'

const App = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <JobFilter/>
      <Jobs/>
      <JobCategories/>
    </>
  )
}

export default App