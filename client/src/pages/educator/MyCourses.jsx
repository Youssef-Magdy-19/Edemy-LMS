import { dummyCourses } from '../../assets/assets'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'
import React from 'react'

const MyCourses = () => {
  useWindowScrollToTop()
  return (
    <div className='w-full'>
      <h1 className='text-lg font-medium'>My Courses</h1>
      <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border-1 border-gray-500/20'>
        <table className='md:table-auto table-fixed w-[300px] overflow-hidden'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
            <tr>
              <th style={{ padding: '10px' }} className=' font-semibold truncate'>All Courses</th>
              <th style={{ padding: '10px 20px 10px 10px' ,margin:'0 10px'}} className=' font-semibold truncate'>Earnings</th>
              <th style={{ padding: '10px 20px 10px 10px' ,margin:'0 10px'}} className=' font-semibold truncate'>Students</th>
              <th style={{ padding: '10px 20px 10px 10px' ,margin:'0 10px'}} className=' font-semibold truncate'>Published On</th>
            </tr>
          </thead>
          <tbody className='text-gray-500 text-sm'>
            {dummyCourses.map((course) => {
              return (
                <tr key={course._id} className='border-b border-gray-500/20'>
                  <td className='flex gap-1 sm:gap-2 items-center space-x-3 truncate'>
                    <img src={course.courseThumbnail} className='w-24 md:w-33' style={{ padding: '5px 10px' }} alt="" />
                    <div>
                      <p className='truncate hidden  md:block'>{course.courseTitle}</p>
                    </div>
                  </td>

                  <td className='text-center' style={{paddingRight:'20px'}}>$ {Math.floor((course.coursePrice - (course.coursePrice * course.discount) / 100) * course.enrolledStudents.length)}</td>
                  <td className='text-center' style={{paddingRight:'20px'}}>{course.enrolledStudents.length}</td>
                  <td className='text-center' style={{paddingRight:'20px'}}>{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyCourses
