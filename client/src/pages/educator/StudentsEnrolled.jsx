import Loading from '../../components/students/Loading'
import { dummyCourses, dummyStudentEnrolled } from '../../assets/assets'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'
import React, { useEffect, useState } from 'react'

const StudentsEnrolled = () => {
    const [StudentsEnrolled, setStudentsEnrolled] = useState(null)
  
    const fetchCourseData = async ()=>{
      setStudentsEnrolled(dummyStudentEnrolled)
    }
  
    useEffect(()=> {fetchCourseData()} , [])
  useWindowScrollToTop()
  return StudentsEnrolled ? (
    <div className='w-full '>
      <h2 className='text-lg font-medium' style={{ paddingBottom: '15px' }}>Latest Enrolments</h2>
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border-1 border-gray-500/20">
        <table className='w-[280px] sm:w-full overflow-hidden table-fixed md:table-auto' style={{ marginBottom: '35px' }}>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left ' style={{ padding: "10px" }}>
            <tr>
              <th style={{ padding: '10px' }} className=' font-semibold truncate text-center hidden sm:table-cell'>#</th>
              <th style={{ padding: '10px' }} className=' font-semibold truncate'>Student Name</th>
              <th style={{ padding: '10px 10px 10px 10px' }} className=' font-semibold truncate '>Course Title</th>
              <th style={{ padding: '10px 10px 10px 0' }} className=' font-semibold truncate hidden sm:table-cell'>Date</th>
            </tr>
          </thead>
          <tbody className='text-sm text-gray-500'>
            {StudentsEnrolled.map((student, index) => {
              return (
                <tr key={index} className='border-b border-gray-500/20'>
                  <td className='text-center hidden sm:table-cell'>{index + 1}</td>
                  <td style={{ padding: '0 10px' }}>
                    <div className='flex gap-1 items-center justify-start space-x-3' style={{ paddingRight: '10px' }}>
                      <img src={student.student.imageUrl} alt="" className='w-9 h-9 rounded-full' />
                      <p className='truncate'>{student.student.name}</p>
                    </div>
                  </td>
                  <td className='truncate'>{student.courseTitle}</td>
                  <td className='truncate hidden sm:table-cell'>{new Date(student.purchaseDate).toLocaleDateString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading/>
}

export default StudentsEnrolled
