import Loading from '../../components/students/Loading'
import { assets } from '../../assets/assets'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Dashboard = () => {
  const { backendUrl, isEducator, getToken } = useContext(AppContext)
  const [DashboardData, setDashboardData] = useState(null)

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/dashboard',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        setDashboardData(data.dashboardData)
      }

    } catch (error) {
      return toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses()
    }
  }, [isEducator])

  useWindowScrollToTop()
  return (
    <>
      { DashboardData ?
        <div className='min-h-screen flex flex-col items-start gap-8 w-full py-3 pr-2 sm:px-2 sm:pr-5'>
          <div className="flex flex-col sm:flex-row gap-3 md:items-center justify-start flex-wrap w-full">
            <div className="flex items-center gap-3 shadow-card border-1 border-blue-500 rounded-md w-70 md:w-62 m-auto" style={{ padding: '10px' }}>
              <img src={assets.patients_icon} alt="" />
              <div className="flex flex-col">
                <p className='text-2xl font-medium text-gray-600'>{DashboardData.enrolledStudentsData.length}</p>
                <p className='text-base text-gray-500'>enrolledStudentsData</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shadow-card border-1 border-blue-500 rounded-md w-70 md:w-62 m-auto" style={{ padding: '10px' }}>
              <img src={assets.appointments_icon} alt="" />
              <div className="flex flex-col">
                <p className='text-2xl font-medium text-gray-600'>{DashboardData.totalCourses}</p>
                <p className='text-base text-gray-500'>totalCourses</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shadow-card border-1 border-blue-500 rounded-md w-70 md:w-62 m-auto" style={{ padding: '10px' }}>
              <img src={assets.earning_icon} alt="" className='w-12' />
              <div className="flex flex-col">
                <p className='text-2xl font-medium text-gray-600'>$ {DashboardData.totalsEarnings}</p>
                <p className='text-base text-gray-500'>totalEarnings</p>
              </div>
            </div>
          </div>

          <div className='w-full'>
            <h2 className='text-lg font-medium mb-2'>Latest Enrolments</h2>
            {DashboardData.enrolledStudentsData.length > 0 ?
              <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border-1 border-gray-500/20">
                <table className='w-full overflow-hidden table-fixed md:table-auto' style={{ marginBottom: '35px' }}>
                  <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left ' style={{ padding: "10px" }}>
                    <tr>
                      <th style={{ padding: '10px' }} className=' font-semibold truncate text-center hidden sm:table-cell'>#</th>
                      <th style={{ padding: '10px' }} className=' font-semibold truncate'>Student Name</th>
                      <th style={{ padding: '10px 10px 10px 10px' }} className=' font-semibold truncate '>Course Title</th>
                    </tr>
                  </thead>
                  <tbody className='text-sm text-gray-500'>
                    {DashboardData.enrolledStudentsData.map((student, index) => {
                      return (
                        <tr key={index} className='border-b border-gray-500/20'>
                          <td className='text-center hidden sm:table-cell'>{index + 1}</td>
                          <td style={{ padding: '0 10px' }}>
                            <div className='flex gap-1 items-center justify-start space-x-3' style={{ paddingRight: '10px' }}>
                              <img src={student.student.imageUrl} alt="" className='w-9 h-9 rounded-full my-1' />
                              <p className='truncate'>{student.student.name}</p>
                            </div>
                          </td>
                          <td className='truncate'>{student.courseTitle}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div> : <div className='p-2 font-3xl text-[24px]'> No Courses Found</div>
            }
          </div> 
        </div> :
        <Loading />
      }
    </>
  )
}

export default Dashboard
