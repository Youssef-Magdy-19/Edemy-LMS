import Loading from '../../components/students/Loading'
import { assets, dummyCourses } from '../../assets/assets'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import { calcChapter, calcCourse, calcNoOfLecturesCourse } from '../../components/students/calc'
import Rating from '../../components/students/Rating'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Player = () => {
    // لازم يكون نفس الاسم الفي الراوتر غير كده هيطلعلك غير معرف
    const { courseId } = useParams()
    // console.log(courseId)
    const [courseFilter, setCourseFilter] = useState(null)
    const [openSection, setOpenSection] = useState({})
    const [Watch, setWatch] = useState(null)
    const [progressData, setProgressData] = useState(null)
    const [initialRating, setInitialRating] = useState(0)

    const { enrolledCourses, backendUrl, getToken, userData, fetchUserEnrolledCourses } = useContext(AppContext)


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
    
    const fetchCourseData = async () => {
        enrolledCourses.map((course) => {
            if (course._id === courseId) {
                setCourseFilter(course)
                course.courseRatings.map((item) => {
                    if (item.userId === userData.clerkUserId) {
                        setInitialRating(item.rating)
                    }
                })
            }
        })
    }

    useEffect(() => {
        if (enrolledCourses.length > 0) {
            fetchCourseData()
        }
    }, [enrolledCourses])

    const markLectureAsCompleted = async (lectureId) => {
        try {
            const token = await getToken()
            const { data } = await axios.post(backendUrl + '/api/user/update-course-progress',
                { courseId, lectureId },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                toast.success(data.message)
                getCoursesProgress()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getCoursesProgress = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.post(backendUrl + '/api/user/get-course-progress',
                { courseId },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                setProgressData(data.progressData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleRate = async (rating) => {
        try {
            const token = await getToken()
            const { data } = await axios.post(backendUrl + '/api/user/add-rating',
                { courseId, rating },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                toast.success(data.message)
                fetchUserEnrolledCourses()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)

        }
    }


    const handleSection = (index) => {
        setOpenSection((prev) => (
            {
                ...prev,
                [index]: !prev[index]
            }
        ))
    }

    useEffect(() => {
        getCoursesProgress()
    }, [])

    useWindowScrollToTop()
    return courseFilter ? (
        <div className='bg-white' style={{ padding: '45px 10px' }}>
            <div className='container'>
                <div className='flex flex-col-reverse lg:flex-row gap-17 lg:justify-between lg:items-start mt-[20px]'>
                    {/* left div */}
                    <div className='mt-[10px]'>
                        <h2 className='font-semibold text-xl' style={{ marginBottom: '15px', marginTop: '-50px' }}>Course Structure</h2>
                        <div className='course-details max-w-lg x-10 text-gray-500 w-full m-0'>
                            <div className='text-gray-800'>

                                <div className='flex flex-col gap-4'>
                                    {courseFilter.courseContent.map((chapter, ind) => {
                                        return (
                                            <div key={ind} className='border-1 border-gray-300 bg-white select-none' style={{ borderRadius: '5px', marginBottom: '0px' }}>
                                                <div className='flex justify-between gap-5  cursor-pointer' onClick={() => handleSection(ind)} style={{ padding: '5px 10px' }}>
                                                    <div className='flex gap-2 items-center'>
                                                        <img src={assets.down_arrow_icon} className={`transform transition-transform ${openSection[ind] ? 'rotate-180' : ''}`} alt="" />
                                                        <h4 className='font-medium text-sm md:text-base'>{chapter.chapterTitle}</h4>
                                                    </div>
                                                    <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calcChapter(chapter)}</p>
                                                </div>
                                                <div className={`overflow-hidden transition-all duration-300 ${openSection[ind] ? 'max-h-96' : 'max-h-0'}`}>
                                                    <ul className='border-t border-gray-300 bg-white text-gray-600 list-disc ' style={{ borderRadius: '0 0 5px 5px' }}>
                                                        {chapter.chapterContent.map((lec, index) => (
                                                            <li key={index} className='flex gap-3 justify-between ' style={{ padding: '5px 10px' }}>
                                                                <div className='flex gap-2 text-gray-800 text-xs md:text-base items-center'>
                                                                    <img src={progressData && progressData.lectureCompleted.includes(lec.lectureId) ? assets.blue_tick_icon : assets.play_icon} alt="" className='h-4 w-4' />
                                                                    <p>{lec.lectureTitle}</p>
                                                                </div>
                                                                <div className='flex gap-3 items-center'>
                                                                    {<p className='text-blue-500 cursor-pointer' onClick={() => {
                                                                        setWatch({
                                                                            lectureId: lec.lectureId,
                                                                            videoId: lec.lectureUrl.split('/').pop(),
                                                                            lecTitle: lec.lectureTitle,
                                                                            numberChapter: ind + 1,
                                                                            numberLecture: index + 1
                                                                        }),
                                                                            scrollTo(0, 0)
                                                                    }}>Watch</p>}
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
                                <div className='flex items-center gap-2' style={{ padding: '12px 0 ', marginTop: '25px' }}>
                                    <h1 className='text-xl font-bold'>Rate This Course:</h1>
                                    <Rating initialRating={initialRating} onRate={handleRate} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* right div */}
                    <div className='bg-white shadow-[0px_4px_15px_2px] shadow-black/5  z-10 rounded-t md:rounded-none overflow-hidden min-w-[300px] sm:min-w-[400px]'>
                        {/* فكره لما ادوس علي مراجعه يجيب فيديو مكان صوره الكورس حلوه و مهمه */}
                        {Watch ?
                            <div>
                                <YouTube videoId={Watch.videoId} iframeClassName='w-full aspect-video h-65' />
                                <div className="flex justify-between items-center">
                                    <p>{Watch.numberChapter}.{Watch.numberLecture} {Watch.lecTitle}</p>
                                    <button
                                        onClick={() => markLectureAsCompleted(Watch.lectureId)}
                                        className='text-blue-600 cursor-pointer'
                                    >
                                        {progressData && progressData.lectureCompleted.includes(Watch.lectureId) ? 'Completed' : 'Mark Complete'}
                                    </button>
                                </div>
                            </div>
                            : <img src={courseFilter.courseThumbnail} className='h-65' style={{ width: '100%' }} alt="Course Thumbnail" />
                        }

                    </div>
                </div>
            </div>
        </div>
    ) : <Loading />
}

export default Player
