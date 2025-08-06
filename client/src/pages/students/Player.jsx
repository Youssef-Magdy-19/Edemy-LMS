import Loading from '../../components/students/Loading'
import { assets, dummyCourses } from '../../assets/assets'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import { calcChapter, calcCourse, calcNoOfLecturesCourse } from '../../components/students/calc'
import Rating from '../../components/students/Rating'
import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'

const Player = () => {
    const { id } = useParams()
    const [courseFilter, setCourseFilter] = useState(null)
    const [openSection, setOpenSection] = useState({})
    const [Watch, setWatch] = useState(null)

    const fetchCourseData = async () => {
        const findCourse = dummyCourses.find((course) => course._id === id)
        setCourseFilter(findCourse)
    }

    useEffect(() => { fetchCourseData() }, [dummyCourses])

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
        <div className='bg-white' style={{ padding: '45px 10px' }}>
            <div className='container'>
                <div className='flex flex-col-reverse md:flex-row gap-17 md:justify-between md:items-start' style={{ marginTop: '20px' }}>
                    {/* left div */}
                    <div style={{ marginTop: '10px' }}>
                        <h2 className='font-semibold text-xl' style={{ marginBottom: '15px', marginTop: '-50px' }}>Course Structure</h2>
                        <div className='course-details max-w-lg x-10 text-gray-500 w-full' style={{ margin: '0' }}>
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
                                                                    <img src={assets.play_icon} alt="" className='h-4 w-4' />
                                                                    <p>{lec.lectureTitle}</p>
                                                                </div>
                                                                <div className='flex gap-3 items-center'>
                                                                    {<p className='text-blue-500 cursor-pointer' onClick={() => {
                                                                        setWatch({
                                                                            videoId: lec.lectureUrl.split('/').pop() ,
                                                                            lecTitle : lec.lectureTitle , 
                                                                            numberChapter : ind+1 ,
                                                                            numberLectcure : index+1
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
                                <div className='flex items-center gap-2' style={{padding:'12px 0 ' , marginTop:'25px'}}>
                                    <h1 className='text-xl font-bold'>Rate This Course:</h1>
                                    <Rating initialRating={0} onRate={undefined} />
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
                                    <p>{Watch.numberChapter}.{Watch.numberLectcure} {Watch.lecTitle}</p>
                                    <button className='text-blue-600 cursor-pointer'>{false ? 'Completed' : 'Mark Complete'}</button>
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
