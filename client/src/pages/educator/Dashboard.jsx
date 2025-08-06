import Loading from '../../components/students/Loading'
import { assets, dummyDashboardData, dummyStudentEnrolled } from '../../assets/assets'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

  const [DashboardData, setDashboardData] = useState(null)

  const fetchCourseData = async () => {
    setDashboardData(dummyDashboardData)
  }

  useEffect(() => { fetchCourseData() }, [])
  useWindowScrollToTop()
  return DashboardData ? (
    <div className='min-h-screen flex flex-col items-start gap-8' style={{ padding: '20px 7px' }}>
      <div className="flex flex-col sm:flex-row gap-3 md:items-center justify-start flex-wrap">
        <div className="flex items-center gap-3 shadow-card border-1 border-blue-500 rounded-md w-62" style={{ padding: '10px' }}>
          <img src={assets.patients_icon} alt="" />
          <div className="flex flex-col">
            <p className='text-2xl font-medium text-gray-600'>{dummyDashboardData.enrolledStudentsData.length}</p>
            <p className='text-base text-gray-500'>enrolledStudentsData</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shadow-card border-1 border-blue-500 rounded-md w-62" style={{ padding: '10px' }}>
          <img src={assets.appointments_icon} alt="" />
          <div className="flex flex-col">
            <p className='text-2xl font-medium text-gray-600'>{dummyDashboardData.totalCourses}</p>
            <p className='text-base text-gray-500'>totalCourses</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shadow-card border-1 border-blue-500 rounded-md w-62" style={{ padding: '10px' }}>
          <img src={assets.earning_icon} alt="" className='w-12' />
          <div className="flex flex-col">
            <p className='text-2xl font-medium text-gray-600'>$ {dummyDashboardData.totalEarnings}</p>
            <p className='text-base text-gray-500'>totalEarnings</p>
          </div>
        </div>
      </div>

      <div className='w-full '>
        <h2 className='text-lg font-medium' style={{ paddingBottom: '15px' }}>Latest Enrolments</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border-1 border-gray-500/20">
          <table className='w-[280px] sm:w-full overflow-hidden table-fixed md:table-auto' style={{ marginBottom: '35px' }}>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left ' style={{ padding: "10px" }}>
              <tr>
                <th style={{ padding: '10px' }} className=' font-semibold truncate text-center hidden sm:table-cell'>#</th>
                <th style={{ padding: '10px' }} className=' font-semibold truncate'>Student Name</th>
                <th style={{ padding: '10px 10px 10px 10px' }} className=' font-semibold truncate '>Course Title</th>
              </tr>
            </thead>
            <tbody className='text-sm text-gray-500'>
              {dummyStudentEnrolled.map((student, index) => {
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
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default Dashboard
