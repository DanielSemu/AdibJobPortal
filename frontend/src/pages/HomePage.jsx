import Hero1 from '../components/Hero/Hero1'
import JobCategories from '../components/JobCategories/JobCategories'
import Jobs from '../components/Jobs/Jobs'
import Contact from '../components/contact/Contact'

const HomePage = () => {
  return (
    <div>
        <Hero1/>
      {/* <Hero/> */}
      {/* <JobFilter/> */}
      <Jobs/>
      <JobCategories/>
      <Contact/>
    </div>
  )
}

export default HomePage