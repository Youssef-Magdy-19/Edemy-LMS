import { useContext, useEffect, useState } from 'react'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../../components/students/Loading'

const MyCourses = () => {
  const { backendUrl, isEducator, getToken } = useContext(AppContext)
  const [courses, setCourses] = useState(null)

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        console.log('Interceptor error data:', error.response.data);
        console.log('Interceptor error status:', error.response.status);
      } else {
        console.log('Interceptor error message:', error.message);
      }
      return Promise.reject(error);
    }
  )


  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/courses',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        setCourses(data.courses)
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
  return courses ? (
    <div className='w-full py-3 sm:px-2 pr-2 sm:pr-5'>
      <h1 className='text-lg font-medium mb-2'>My Courses</h1>
      {courses.length > 0 ?
        <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border-1 border-gray-500/20 '>
          <table className='md:table-auto table-fixed w-[300px] md:w-full overflow-hidden'>
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
              <tr>
                <th style={{ padding: '10px' }} className=' font-semibold truncate'>All Courses</th>
                <th style={{ padding: '10px 20px 10px 10px', margin: '0 10px' }} className=' font-semibold truncate'>Earnings</th>
                <th style={{ padding: '10px 20px 10px 10px', margin: '0 10px' }} className=' font-semibold truncate'>Students</th>
                <th style={{ padding: '10px 20px 10px 10px', margin: '0 10px' }} className=' font-semibold truncate'>Published On</th>
              </tr>
            </thead>
            <tbody className='text-gray-500 text-sm'>
              {courses.map((course) => {
                return (
                  <tr key={course._id} className='border-b border-gray-500/20'>
                    <td className='flex gap-1 sm:gap-2 items-center truncate'>
                      <img src={course.courseThumbnail} className='w-24 md:w-33 h-[70px]' style={{ padding: '5px 10px' }} alt="" />
                      <div>
                        <p className='truncate hidden  md:block'>{course.courseTitle}</p>
                      </div>
                    </td>

                    <td className='text-center' style={{ paddingRight: '20px' }}>$ {Math.floor((course.coursePrice - (course.coursePrice * course.discount) / 100) * course.enrolledStudents.length)}</td>
                    <td className='text-center' style={{ paddingRight: '20px' }}>{course.enrolledStudents.length}</td>
                    <td className='text-center' style={{ paddingRight: '20px' }}>{new Date(course.createdAt).toLocaleDateString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div> :
        <div className='p-2 font-3xl text-[24px]'> No Courses Found </div>
      }
    </div>
  ) : <Loading />
}

export default MyCourses
