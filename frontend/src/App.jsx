import Navbar from './components/Navbar/Navbar'
import Footer from './components/footer/Footer'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Registration/Login'
import HomePage from './pages/HomePage'
import Register from './components/Registration/Register'
import JobDetail from './components/JobDetail/JobDetail'
import ScrollToTop from './services/ScrollToTop'
import ApplyJob from './components/ApplyJob/ApplyJob'
import JobCategoryDetail from './components/JobCategoryDetail/JobCategoryDetail'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserApplications from './components/Registration/UserApplications'
import TermsConditions from './components/ApplyJob/TermsConditions'
import ForgetPassword from './components/Registration/ForgetPassword'

const App = () => {
  return (
    <>
     <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar/>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forget_password' element={<ForgetPassword/>}/>
        <Route path='/applications' element={<UserApplications/>}/>
        <Route path='/terms_conditions' element={<TermsConditions/>}/>
        <Route path='/detail/:id' element={<JobDetail/>}/>
        <Route path='/apply/:id' element={<ApplyJob/>}/>
        <Route path='/category/:id' element={<JobCategoryDetail/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App