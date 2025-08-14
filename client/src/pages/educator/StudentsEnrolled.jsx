import Loading from '../../components/students/Loading'
import { dummyCourses, dummyStudentEnrolled } from '../../assets/assets'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const StudentsEnrolled = () => {
  const { backendUrl, isEducator, getToken } = useContext(AppContext)
  const [StudentsEnrolled, setStudentsEnrolled] = useState(null)

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/enrolled-students',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      data.success && setStudentsEnrolled(data.enrolledStudents.reverse())

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents()
    }
  }, [])
  useWindowScrollToTop()
  return StudentsEnrolled ? (
    <div className='w-full py-3 pr-2 sm:px-2 sm:pr-5 '>
      <h2 className='text-lg font-medium mb-2'>Latest Enrolments</h2>
      {StudentsEnrolled.length > 0 ?
        <div className="flex flex-col items-center max-w-4xl w-[100%] overflow-hidden rounded-md bg-white border-1 border-gray-500/20">
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
                    <td className='text-center hidden sm:table-cell my-[5px]'>{index + 1}</td>
                    <td style={{ padding: '0 10px' }}>
                      <div className='flex gap-1 items-center justify-start space-x-3' style={{ paddingRight: '10px' }}>
                        <img src={student.student.imageUrl} alt="" className='w-9 h-9 rounded-full my-[5px]' />
                        <p className='truncate'>{student.student.name}</p>
                      </div>
                    </td>
                    <td className='truncate' style={{margin:'0 10px'}}>{student.courseTitle}</td>
                    <td className='truncate hidden sm:table-cell'>{new Date(student.purchaseDate).toLocaleDateString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div> :
        <div className='p-2 font-3xl text-[24px]'> No Students Found </div>
      }
    </div>
  ) : <Loading />
}

export default StudentsEnrolled
