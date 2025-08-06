import { assets, dummyCourses } from '../../assets/assets'
import React, { useState } from 'react'
import SearchBar from './SearchBar'
import { useNavigate, useParams } from 'react-router-dom'

const Hero = () => {
  const data = []
  const { input } = useParams()
  const navigate = useNavigate()
  const [filterCourse, setFilterCourse] = useState(dummyCourses)
  const searchCourse = () => {
    let filter = dummyCourses.filter((course) => course.courseTitle.toLowerCase().includes(input.toLowerCase()))
    setFilterCourse(filter)
  }
  return (
    <div style={{padding:'60px 0',marginBottom:"10px"}} className='hero flex flex-col items-center justify-center bg-gradient-to-b from-cyan-100/70'>
      <div>
        <div className='flex flex-col items-center justify-center w-full ' style={{marginBottom:'30px'}}>
          <div className='container text-center'>
            <h1 className='relative text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-6xl font-bold text-gray-800  '>
              Empower your future with the courses designed to
              <span className='text-blue-500'> fit your choice.</span>
              <img src={assets.sketch} className='hidden md:block absolute right-0 -bottom-7' />
            </h1>
          </div>

          <p className='md:block hidden text-gray-500 text-center text-lg' style={{ width: "75%" }}>We bring together world-class instructars, interactive content, and a supportive community to help you achieve your professional goals.</p>
          <p className='block md:hidden text-center text-gray-500 ' style={{ width: "80%" }}>We bring together world-class instructars to help you achieve your professional goals.</p>
        </div>
        <SearchBar data={data} margin={'auto'} functionSearch={searchCourse}  />
      </div>
    </div>
  )
}

export default Hero