import Navbar from './components/students/Navbar'
import Loading from './components/students/Loading'
import AddCourse from './pages/educator/AddCourse'
import Dashboard from './pages/educator/Dashboard'
import Educator from './pages/educator/Educator'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import CoursesDetails from './pages/students/CoursesDetails'
import CoursesList from './pages/students/CoursesList'
import Home from './pages/students/Home'
import MyEnrollments from './pages/students/MyEnrollments'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/students/Footer'
import EduNavbar from './components/educator/EduNavbar'
import Player from './pages/students/Player'
import EduFooter from './components/educator/EduFooter'
import Sidebar from './components/educator/Sidebar'
import 'quill/dist/quill.snow.css'
import { ToastContainer } from 'react-toastify'

const App = () => {
  // مهمه جدا عشان اقدر احط كل هيدر في مكانه الصح 
  const CheckEducator = location.pathname.includes('/educator')
  return (
    <div style={{marginTop: CheckEducator ? '60px' : '60px'}}>
      <ToastContainer />
      {CheckEducator ? <EduNavbar /> : <Navbar />}
      {/* {CheckEducator ? <Sidebar /> : null} */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/course/:id' element={<CoursesDetails/>} />
        <Route path='/course-list' element={<CoursesList/>} />
        <Route path='/course-list/:input' element={<CoursesList/>} />
        <Route path='/my-enrollments' element={<MyEnrollments/>} />
        <Route path='/player/:id' element={<Player/>} />
        <Route path='/loading/:path' element={<Loading/>} />
        <Route path='/educator' element={<Educator/>}>
          <Route path='/educator' element={<Dashboard/>} />
          <Route path='add-course' element={<AddCourse/>} />
          <Route path='my-course' element={<MyCourses/>} />
          <Route path='student-enrolled' element={<StudentsEnrolled/>} />
        </Route>
      </Routes>
      {CheckEducator ? <EduFooter /> : <Footer />}
    </div>
  )
}

export default App

