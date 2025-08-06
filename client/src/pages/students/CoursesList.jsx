import SearchBar from '../../components/students/SearchBar'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCourses } from '../../assets/assets'
import CourseCard from '../../components/students/CourseCard'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'

const CoursesList = () => {
  const { input } = useParams()
  const navigate = useNavigate()
  const [filterCourse, setFilterCourse] = useState((JSON.parse(localStorage.getItem('filterCourse')) && JSON.parse(localStorage.getItem('filterCourse')).length > 0 ) ? JSON.parse(localStorage.getItem('filterCourse')) : dummyCourses)
  const searchCourse = (input) => {
    let filter = dummyCourses.filter((course) => course.courseTitle.toLowerCase().includes(input.toLowerCase()))
     setFilterCourse(filter)
    localStorage.setItem('filterCourse' , JSON.stringify(filterCourse) )
  }
  useEffect(()=>{localStorage.setItem('filterCourse' , JSON.stringify(filterCourse) ) } , [filterCourse])
  useWindowScrollToTop()
  return (
    <div style={{ width: '80%', margin: 'auto', padding: '30px 0' }}>
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-end" style={{ marginBottom: '60px' }}>
        <div>
          <h2 className='text-3xl font-semibold text-gray-800'>Course List</h2>
          <div className="flex">
            <Link to='/' className='text-blue-500'>Home</Link>
            <p className='text-gray-500'> / Course List</p>
          </div>
        </div>
        <SearchBar data={''} margin={'none'} functionSearch={searchCourse} />
      </div>
      {
        input &&
        <div className='inline-flex items-center justify-between gap-4 border-1 text-gray-600 border-gray-500/30' style={{ padding: '2.5px 15px' }}>
          <p>{input}</p>
          <img src={assets.cross_icon} alt=""
            className='cursor-pointer'
            onClick={() => {
              navigate('/course-list')
              setFilterCourse(dummyCourses)
            }}
          />
        </div>
      }

      {filterCourse.length > 0 ?
        <div className="list-courses grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4 gap-4" style={{ margin: '30px 0' }}>
          {filterCourse.map((course, index) => {
            return (
              <CourseCard key={index} course={course} />
            )
          })}
        </div>
        : <p className='text-center text-3xl font-semibold' style={{ width: "100%" }}>This Course Not Found.</p>
      }
    </div>

  )
}

export default CoursesList
