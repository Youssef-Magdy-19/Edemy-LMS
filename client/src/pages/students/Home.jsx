import React from 'react'
import Navbar from '../../components/students/Navbar'
import Hero from '../../components/students/Hero'
import Footer from '../../components/students/Footer'
import SearchBar from '../../components/students/SearchBar'
import Companies from '../../components/students/Companies'
import CoursesSetion from '../../components/students/CoursesSetion'
import { dummyCourses } from '../../assets/assets'
import TestimonialsSecton from '../../components/students/TestimonialsSecton'
import CallToAction from '../../components/students/CallToAction'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'

const Home = () => {
  useWindowScrollToTop()
  return (
    <div className='Home'>

      <Hero />
      <Companies />
      <CoursesSetion data={dummyCourses} />
      <TestimonialsSecton />
      <CallToAction />
    </div>
  )
}

export default Home
