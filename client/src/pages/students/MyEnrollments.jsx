import { calcCourse, calcNoOfLecturesCourse } from '../../components/students/calc'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Line } from 'rc-progress'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'
import { AppContext } from '../../context/AppContext'

const MyEnrollments = () => {
  const { enrolledCourses, fetchUserEnrolledCourses } = useContext(AppContext)
  // fetchUserEnrolledCourses()
  console.log(enrolledCourses)
  const navigate = useNavigate()
  const [ProgressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 4, totalLectures: 10 },
  ])
  useWindowScrollToTop()
  return (
    <div className='container'>
      <h1 className='font-semibold text-2xl' style={{ margin: '75px 0 15px 0' }}>My Enrollments Page</h1>
      <table className='w-full overflow-hidden table-fixed md:table-auto border-1 border-gray-300' style={{marginBottom:'35px' , }}>
        <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left ' style={{ padding: "10px" }}>
          <tr>
            <th style={{padding:'10px' }} className='col-course font-semibold truncate'>Course</th>
            <th style={{padding:'10px'}} className=' font-semibold truncate max-sm:hidden'>Duration</th>
            <th style={{padding:'10px'}} className=' font-semibold truncate max-sm:hidden'>Completed</th>
            <th style={{padding:'10px'}} className=' font-semibold truncate'>Status</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          { enrolledCourses && enrolledCourses.length > 0 ?
          enrolledCourses.map((course, index) => {
            return (
              <tr key={index} className='border-b border-gray-500/20'>
                <td className='flex gap-1 sm:gap-2 items-center space-x-3'>
                  <img src={course.courseThumbnail} className='w-24 md:w-33' style={{padding:'5px 10px'}} alt="" />
                  <div>
                    <p className='max-sm:text-sm mb-1'>{course.courseTitle}</p>
                    {/* <progress value={(ProgressArray[index].lectureCompleted / ProgressArray[index].totalLectures) * 100} max="100" className='rounded'></progress> */}
                    <Line strokeWidth={2} percent={(ProgressArray[index].lectureCompleted / ProgressArray[index].totalLectures) * 100} className='rounded-full bg-gray-300 w-full progress' />
                  </div>
                </td>

                <td className='max-sm:hidden'>{calcCourse(course)}</td>

                <td className='max-sm:hidden'>{ProgressArray[index].lectureCompleted} / {ProgressArray[index].totalLectures} Lectures</td>

                <td className='text-right' style={{paddingRight:'10px'}}>
                  <button className='text-[11px] sm:text-sm bg-blue-600 rounded text-white cursor-pointer w-18 sm:w-25'
                    style={{ padding: '7.5px 10px' ,}}
                    onClick={() =>navigate('/player/' + course._id)}
                  >
                    {(ProgressArray[index].lectureCompleted / ProgressArray[index].totalLectures) == 1 ? 'Completed' : 'on Going'}
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
