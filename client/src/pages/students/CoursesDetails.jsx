import Loading from '../../components/students/Loading'
import { assets, dummyCourses } from '../../assets/assets'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import { calcChapter, calcCourse, calcNoOfLecturesCourse } from '../../components/students/calc'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'

const CoursesDetails = () => {
  const { id } = useParams()
  const [courseFilter , setCourseFilter] = useState(null)
  const [openSection, setOpenSection] = useState({})
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)

  // ده مخزن بتاع فيديو المراجعه بعمله مخزن فاضي عشان لما اعمل اختبار لو فيه قيمه
  const [perview, setPerview] = useState(null)

  const fetchCourseData = async ()=>{
    const findCourse = dummyCourses.find((course) => course._id === id)
    setCourseFilter(findCourse)
  }

  useEffect(()=> {fetchCourseData()} , [dummyCourses])

  const handleSection = (index) => {
    setOpenSection((prev) => (
      {
        ...prev,
        [index]: !prev[index]
      }
    ))
  }
  useWindowScrollToTop()

  return courseFilter ? (
    <div className='-z-1 bg-gradient-to-b from-cyan-100/70' style={{ padding: '45px 10px' }}>
      <div className='container flex flex-col-reverse md:flex-row gap-10 md:justify-between md:items-start'>
        {/* left div */}
        <div className='course-details max-w-lg x-10 text-gray-500' style={{ width: '50%', margin: '0' }}>
          <h2 className='font-semibold text-gray-800 text-xl md:text-3xl'>{courseFilter.courseTitle}</h2>
          <p className='text-small md:text-base'
            dangerouslySetInnerHTML={{ __html: courseFilter.courseDescription.slice(0, 200) }}
            style={{ paddingTop: '10px' }}
          ></p>
          <div className="flex items-center gap-2">
            <p>{courseFilter.rating}</p>
            <div className='flex'>
              {[...Array(courseFilter.rating)].map((_, i) => <img key={i} src={assets.star} className='h-3.5 w-3.5' />)}
              {[...Array(5 - courseFilter.rating)].map((_, i) => <img key={i} src={assets.star_blank} className='h-3.5 w-3.5' />)}
            </div>
            <p className='text-blue-500'>({courseFilter.courseRatings.length} {courseFilter.courseRatings.length > 1 ? 'ratings' : 'rating'})</p>
            <p>{courseFilter.enrolledStudents.length} {courseFilter.enrolledStudents.length > 1 ? 'students' : 'student'}</p>
          </div>
          <p>Course by <span style={{ marginLeft: '5px' }} className='text-blue-500 underline'> GreatStack</span></p>

          <div className='text-gray-800' style={{ margin: '25px 0' }}>
            <h2 className='font-semibold text-xl' style={{ marginBottom: '15px' }}>Course Structure</h2>
            <div className='flex flex-col gap-4'>
              {courseFilter.courseContent.map((chapter, index) => {
                return (
                  <div key={index} className='border-1 border-gray-300 bg-white select-none' style={{ borderRadius: '5px', marginBottom: '0px' }}>
                    <div className='flex justify-between gap-5  cursor-pointer' onClick={() => handleSection(index)} style={{ padding: '5px 10px' }}>
                      <div className='flex gap-2 items-center'>
                        <img src={assets.down_arrow_icon} className={`transform transition-transform ${openSection[index] ? 'rotate-180' : ''}`} alt="" />
                        <h4 className='font-medium text-sm md:text-base'>{chapter.chapterTitle}</h4>
                      </div>
                      <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calcChapter(chapter)}</p>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className='border-t border-gray-300 bg-white text-gray-600 list-disc ' style={{ borderRadius: '0 0 5px 5px' }}>
                        {chapter.chapterContent.map((lec, index) => (
                          <li key={index} className='flex gap-3 justify-between ' style={{ padding: '5px 10px' }}>
                            <div className='flex gap-2 text-gray-800 text-xs md:text-base items-center'>
                              <img src={assets.play_icon} alt="" className='h-4 w-4' />
                              <p>{lec.lectureTitle}</p>
                            </div>
                            <div className='flex gap-3 items-center'>
                              {lec.isPreviewFree && <p className='text-blue-500 cursor-pointer' onClick={() => {
                                setPerview({
                                  videoId : lec.lectureUrl.split('/').pop() 
                                }),
                                scrollTo(0,0)
                              }}>Perview</p>}
                              <p>{humanizeDuration(lec.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h2 className='text-gray-800 text-lg md:text-xl' style={{ marginBottom: '5px' }}>Course Description</h2>
            <p className='text-gray-800 font-semibold text-xl md:text-2xl' style={{ marginBottom: '10px' }}>{courseFilter.courseTitle}</p>
            <p className='rich-text' dangerouslySetInnerHTML={{ __html: courseFilter.courseDescription }}></p>
          </div>
        </div>

        {/* right div */}
        <div className='bg-white shadow-[0px_4px_15px_2px] shadow-black/5  z-10 rounded-t md:rounded-none overflow-hidden min-w-[300px] sm:min-w-[400px]'>
          {/* فكره لما ادوس علي مراجعه يجيب فيديو مكان صوره الكورس حلوه و مهمه */}
          {perview ?
            <YouTube videoId={perview.videoId} iframeClassName='w-full aspect-video h-60' />
            : <img src={courseFilter.courseThumbnail} className='h-60' style={{ width: '100%' }} alt="Course Thumbnail" />
          }
          <div style={{ padding: '15px' }}>
            <div className='flex'>
              <img src={assets.time_left_clock_icon} className='w-3.5' alt="time left clock icon" />
              <p className='text-red-500' style={{ marginLeft: '5px' }}><span className='font-medium'>5 days</span> left at this price!</p>
            </div>
            <div className='flex gap-3 items-center' style={{ margin: '5px 0' }}>
              {/* لازم tofixed عشان تقدر تظهر رقمين من الكسر علي حسب ما انت عايز من الارقام العشريه تظهر  */}
              <h3 className='font-semibold text-2xl md:text-4xl text-gray-800'>$ {(courseFilter.coursePrice - (courseFilter.coursePrice / 100) * courseFilter.discount).toFixed(2)}</h3>
              <p className='md:text-lg text-gray-500 line-through'>$ {courseFilter.coursePrice}</p>
              <p className='md:text-lg text-gray-500'>{courseFilter.discount}% off</p>
            </div>
            <div className="flex gap-4 items-center text-sm md:text-default text-gray-500" >
              <div className="flex gap-1 items-center">
                <img src={assets.star} alt="star" />
                <p>{courseFilter.rating}</p>
              </div>
              <div className='bg-gray-500/40 h-4 w-px' style={{ width: '1px', margin: '0 5px' }}></div>
              <div className="flex gap-1 items-center">
                <img src={assets.time_clock_icon} alt="time clock icon" />
                <p>
                  {
                    calcCourse(courseFilter)
                  }
                </p>
              </div>
              <div className='bg-gray-500/40 h-4 w-px' style={{ width: '1px', margin: '0 5px' }}></div>
              <div className="flex gap-1 items-center">
                <img src={assets.lesson_icon} alt="Lesson icon" />
                <p>{calcNoOfLecturesCourse(courseFilter)} Lessons</p>
              </div>
            </div>

            <button className='bg-blue-600 text-white rounded font-medium cursor-pointer'
              style={{ width: '100%', padding: '6.5px 0', margin: '12.5px 0' }}
            >
              {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
            </button>
            <div className='rich-text'>
              <h3 className='font-semibold text-lg md:text-xl text-gray-800' style={{ marginBottom: '10px' }}>What's in the course?</h3>
              <ul className=' text-sm md:text-default text-gray-500'>
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default CoursesDetails
