import { calcCourse, calcNoOfLecturesCourse } from '../../components/students/calc'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Line } from 'rc-progress'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyEnrollments = () => {
  const { enrolledCourses, userData, backendUrl, getToken, fetchUserEnrolledCourses } = useContext(AppContext)
  const navigate = useNavigate()
  const [ProgressArray, setProgressArray] = useState([])

  console.log(enrolledCourses)

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

  const getProgressData = async () => {
    try {
      const token = await getToken();
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          console.log(enrolledCourses)
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );


          let totalLectures = calcNoOfLecturesCourse(course);
          let lectureCompleted = data?.progressData?.lectureCompleted || []; // ← دايمًا array

          return { totalLectures, lectureCompleted };
        })


      );

      setProgressArray(tempProgressArray);
      console.log(tempProgressArray)
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses()
    }
  }, [userData])
  console.log(enrolledCourses.length, enrolledCourses)
  useEffect(() => {
    if (enrolledCourses.length > 0) {
      console.log('okkkkkkkk');
      getProgressData();
    }
  }, [enrolledCourses]);

  console.log(ProgressArray)

  useWindowScrollToTop()
  return (
    <div className='container'>
      <h1 className='font-semibold text-2xl' style={{ margin: '75px 0 15px 0' }}>My Enrollments Page</h1>
      <table className='w-full overflow-hidden table-fixed md:table-auto border-1 border-gray-300' style={{ marginBottom: '35px', }}>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left ' style={{ padding: "10px" }}>
          <tr>
            <th style={{ padding: '10px' }} className='col-course font-semibold truncate'>Course</th>
            <th style={{ padding: '10px' }} className=' font-semibold truncate max-sm:hidden'>Duration</th>
            <th style={{ padding: '10px' }} className=' font-semibold truncate max-sm:hidden'>Completed</th>
            <th style={{ padding: '10px' }} className=' font-semibold truncate'>Status</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {enrolledCourses && enrolledCourses.length > 0 ?
            enrolledCourses.map((course, index) => {
              return (
                <tr key={index} className='border-b border-gray-500/20'>
                  <td className='flex gap-1 sm:gap-2 items-center space-x-3'>
                    <img src={course.courseThumbnail} className='w-24 md:w-33' style={{ padding: '5px 10px' }} alt="" />
                    <div>
                      <p className='max-sm:text-sm mb-1'>{course.courseTitle}</p>
                      {/* <Line strokeWidth={2} percent={(ProgressArray[index].lectureCompleted.length / ProgressArray[index].totalLectures) * 100} className='rounded-full bg-gray-300 w-full progress' /> */}
                      <Line
                        strokeWidth={2}
                        percent={((ProgressArray[index]?.lectureCompleted?.length || 0) / (ProgressArray[index]?.totalLectures || 1)) * 100}
                      />
                    </div>
                  </td>

                  <td className='max-sm:hidden'>{calcCourse(course)}</td>

                  {/* <td className='max-sm:hidden'>{ProgressArray[index].lectureCompleted.length} / {ProgressArray[index].totalLectures} Lectures</td> */}
                  <td className='max-sm:hidden'>
                    {(ProgressArray[index]?.lectureCompleted?.length || 0)} / {(ProgressArray[index]?.totalLectures || 0)} Lectures
                  </td>

                  <td>
                    <button className='text-[11px] sm:text-sm bg-blue-600 rounded text-white cursor-pointer w-18 sm:w-25'
                      style={{ padding: '7.5px 10px', }}
                      onClick={() => navigate('/player/' + course._id)}
                    >
                      {((ProgressArray[index]?.lectureCompleted?.length || 0) / (ProgressArray[index]?.totalLectures || 1)) === 1 ? 'Completed' : 'on Going'}
                    </button>
                  </td>
                </tr>
              )
            }) : null}
        </tbody>
      </table>
    </div>
  )
}

export default MyEnrollments
