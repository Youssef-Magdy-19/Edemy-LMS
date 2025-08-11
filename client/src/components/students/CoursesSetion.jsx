import React, { useContext, useEffect } from 'react'
import CourseCard from './CourseCard'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

const CoursesSetion = () => {
  const { allCourses, fetchAllCourses } = useContext(AppContext)
 // استدعي الدورات مرة واحدة عند فتح الصفحة
  useEffect(() => {
    fetchAllCourses()
  }, [])
  return (
    <div className='Courses text-center' style={{padding:"4rem 2rem" , width: "80%" , margin:'auto'}}>
      <h2 className='font-medium text-gray-800 text-3xl text-center'>Learn from the best</h2>
      <p className='text-gray-500 text-sm md:text-base  text-center' style={{marginTop:'20px'}}>Discover our top-rated courses across various categories, From coding and design to <br/> business and wellness, Our courses are crafted to deliver results.</p>
      <div className="slice-courses grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" style={{margin:"35px 0"}}>
        {allCourses.slice(0,4).map((course) => {
          return (
            <CourseCard course={course} />
          )
        })}
      </div>
      <Link className='bg-white rounded text-gray-500 border-1 border-gray-500/30' onClick={()=> scrollTo(0,0)} style={{padding:"5px 15px"}} to='/course-list'>Show all courses</Link>
    </div>
  )
}

export default CoursesSetion
