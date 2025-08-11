import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import React from 'react'

const CourseCard = ({ course }) => {
  const navigate = useNavigate()
  return (
    <div className='border-1 border-gray-500/30 text-start cursor-pointer rounded-lg'
      style={{ paddingBottom: '5px' }}
      onClick={() => navigate('/course/' + course._id)}
    >
      <img src={course.courseThumbnail} style={{ borderRadius: "7px 7px 0 0" }} height={100} alt="" />
      <div className='flex flex-col gap-1' style={{ padding: "15px 10px" }}>
        <h3 className='font-bold text-gray-800'>{course.courseTitle}</h3>
        <p className='text-gray-500 font-semi-bold'>{course.educator.name}</p>
        <div className='flex items-center'>
          <p className='mr-[6px]'>{course.courseRatings[0].rating}</p>
          <div className='flex gap-.5 items-center m-0'>
            {[...Array(Math.floor(course.courseRatings[0].rating))].map((star, i) => <img key={i} src={assets.star} className='w-4 h-4' />)}
            {[...Array(Math.floor(5 - course.courseRatings[0].rating))].map((_, i) => (
              <img key={i} src={assets.star_blank} className='w-5 h-5' />
            ))}
          </div>
          <p></p>
        </div>
        <p className='font-bold'>${(course.coursePrice - (course.coursePrice / 100) * course.discount).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default CourseCard
