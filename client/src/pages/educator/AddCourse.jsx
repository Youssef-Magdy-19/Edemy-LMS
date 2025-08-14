import useWindowScrollToTop from '../../hooks/useWindowScrollToTop'
import React, { useContext, useEffect, useRef } from 'react'
import Quill from 'quill'
import { assets } from '../../assets/assets'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateCourseField,
  updateLectureDetails,
  setShowPop,
  addLecture,
  addLectureToChapter,
  removeLecture,
  addChapter,
  removeChapter,
  toggleChapter,
  resetCourse
} from '../../Redux/Reducer/reducerLecture'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddCourse = () => {

  const { backendUrl, getToken, fetchAllCourses } = useContext(AppContext)

  // @ts-ignore
  const newCourse = useSelector(state => state.ReducerLecture)
  const dispatch = useDispatch()
  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const handleReset = () => {
    dispatch(resetCourse())
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
      quillRef.current.on('text-change', () => {
        dispatch(updateCourseField({ field: 'courseDescripition', value: quillRef.current.root.innerHTML }))
      })
    }
  }, [dispatch])

  useWindowScrollToTop()

  const handleInput = (e) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value
    dispatch(updateCourseField({ field: e.target.name, value }))
  }

  const handleInputLec = (e) => {
    const { name, type, value, checked } = e.target
    const inputValue = type === 'checkbox' ? checked : value
    dispatch(updateLectureDetails({ field: name, value: inputValue }))
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (!newCourse.courseThumbnail) {
        toast.error('Thumbnail Not Selected')
      }
      const courseData = {
        courseTitle: newCourse.courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(newCourse.CoursePrice), // الحرف الكبير
        discount: Number(newCourse.courseDiscount), // الاسم الصحيح
        courseContent: newCourse.chapters, // التصحيح الإملائي
      }
      
      const formData = new FormData()
      formData.append('courseData', JSON.stringify(courseData))
      formData.append('image', newCourse.courseThumbnail)

      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/educator/add-course',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchAllCourses()
        handleReset()
        quillRef.current.root.innerHTML = ''
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex flex-col gap-6 h-screen bg-white overflow-scroll'>
      <form
        onSubmit={handleSubmit}
        className='w-full md:w-[70%] flex flex-col gap-4 text-gray-500 p-4'
      >

        {/* Course Title */}
        <div className='flex flex-col gap-1'>
          <label>Course Title</label>
          <input autoComplete='off'
            type="text"
            name='courseTitle'
            value={newCourse.courseTitle}
            onChange={handleInput}
            className='outline-none rounded border border-gray-400 p-2'
            style={{ padding: '8px 10px' }}
            required
            placeholder='Title'
          />
        </div>

        {/* Course Description */}
        <div className='flex flex-col gap-1'>
          <label>Course Description</label>
          <div ref={editorRef} className='bg-white min-h-[150px] border border-gray-400 rounded p-2'></div>
        </div>

        {/* Course Price and Thumbnail */}
        <div className='flex flex-wrap gap-3 items-end justify-between'>
          <div className='flex flex-col gap-1'>
            <label>Course Price</label>
            <input autoComplete='off'
              type="number"
              name='CoursePrice'
              value={newCourse.CoursePrice}
              onChange={handleInput}
              className='outline-none rounded border border-gray-400 w-28 p-2'
              style={{ padding: '8px 10px' }}
              min={0}
              required
            />
          </div>
          <div className='flex flex-col md:flex-row items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor="image" className='cursor-pointer'>
              <img src={assets.file_upload_icon} alt="" className='bg-blue-500 rounded p-2' />
              <input autoComplete='off'
                type="file"
                id="image"
                hidden
                accept='image/*'
                name='courseThumbnail'
                style={{ padding: '10px' }}
                onChange={handleInput}
              />
            </label>
            {newCourse.courseThumbnail && (
              <img src={URL.createObjectURL(newCourse.courseThumbnail)} alt="" className='max-h-10' />
            )}
          </div>
        </div>

        {/* Course Discount */}
        <div className='flex flex-col gap-1'>
          <label>Course Discount</label>
          <input autoComplete='off'
            type="number"
            name='courseDiscount'
            value={newCourse.courseDiscount}
            onChange={handleInput}
            className='outline-none rounded border border-gray-400 w-28 p-2'
            style={{ padding: '8px 10px' }}
            min={0}
            max={100}
          />
        </div>

        {/* Chapters and Lectures */}
        {newCourse.chapters.map((chapter, index) => (
          <div key={chapter.chapterId} className='border rounded-lg bg-white'>
            <div className={`flex justify-between items-center ${!chapter.collapsed && 'border-b'} px-2 py-1`} style={{ padding: '4px 12px' }}>
              <div className="flex items-center gap-2" >
                <img
                  src={assets.dropdown_icon}
                  width={14}
                  alt=""
                  className={`cursor-pointer transition-transform ${chapter.collapsed ? '-rotate-90' : ''}`}
                  onClick={() => dispatch(toggleChapter(chapter.chapterId))}
                />
                <span className='font-semibold'>{index + 1}. {chapter.ChapterTitle}</span>
              </div>
              <p className='text-gray-600'>{chapter.chapterContent.length} Lectures</p>
              <img
                src={assets.cross_icon}
                className='cursor-pointer'
                onClick={() => dispatch(removeChapter(chapter.chapterId))}
                alt=""
              />
            </div>
            {!chapter.collapsed && (
              <div style={{ padding: '12px' }}>
                {chapter.chapterContent.map((lec, lecIndex) => (
                  <div key={lecIndex} className='flex justify-between items-center mb-2' style={{ marginBottom: '8px' }}>
                    <span>
                      {lecIndex + 1}. {lec.lectureTitle} - {lec.lectureDuration} mins -
                      <a href={lec.lectureUrl} target='_blank' rel='noreferrer' className='text-blue-500'> Link</a> -
                      {lec.isPreviewFree ? 'Free Preview' : 'Paid'}
                    </span>
                    <img
                      src={assets.cross_icon}
                      className='cursor-pointer'
                      onClick={() => dispatch(removeLecture({ chapterId: chapter.chapterId, lecIndex }))}
                      alt=""
                    />
                  </div>
                ))}
                <div
                  className='inline-flex bg-gray-100 rounded cursor-pointer items-center justify-center px-3 py-2 mt-2'
                  style={{ padding: '7px', marginTop: '8px' }}
                  onClick={() => {
                    dispatch(addLecture(chapter.chapterId))
                    dispatch(updateCourseField({ field: 'currentChapterId', value: chapter.chapterId }))
                  }}
                >
                  + Add Lecture
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Chapter */}
        <div style={{ padding: '5px 0' }}
          className='w-full bg-blue-100 rounded cursor-pointer flex items-center justify-center'
          onClick={() => dispatch(addChapter())}
        >
          + Add Chapter
        </div>

        {/* Popup: Add Lecture */}
        {newCourse.showPop && (
          <div className='fixed inset-0 flex items-center justify-center bg-opacity-40 z-50' style={{ backgroundColor: 'rgba(180,180,180,.6)' }}>
            <div className="relative bg-white rounded w-full max-w-80  text-gray-700" style={{ padding: '12px' }}>
              <h2 className='text-lg font-semibold ' style={{ marginBottom: '10px' }}>Add Lecture</h2>
              <div style={{ marginBottom: '8px' }}>
                <label>Lecture Title</label>
                <input autoComplete='off'
                  type="text"
                  name='lectureTitle'
                  value={newCourse.lectureDetails.lectureTitle}
                  onChange={handleInputLec}
                  required
                  style={{ padding: '5px 10px' }}
                  className='block w-full rounded border p-2'
                />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label>Duration (minutes)</label>
                <input autoComplete='off'
                  type="number"
                  name='lectureDuration'
                  value={newCourse.lectureDetails.lectureDuration}
                  onChange={handleInputLec}
                  required
                  style={{ padding: '5px 10px' }}
                  className='block w-full rounded border p-2'
                />
              </div>
              <div style={{ marginBottom: '8px' }}>
                <label>Lecture URL</label>
                <input autoComplete='off'
                  type="text"
                  name='lectureUrl'
                  required
                  value={newCourse.lectureDetails.lectureUrl}
                  onChange={handleInputLec}
                  style={{ padding: '5px 10px' }}
                  className='block w-full rounded border p-2'
                />
              </div>
              <div className='flex gap-2 items-center mb-3' style={{ marginBottom: '12px' }}>
                <label>Is Preview Free?</label>
                <input autoComplete='off'
                  type="checkbox"
                  name='isPreviewFree'
                  checked={newCourse.lectureDetails.isPreviewFree}
                  onChange={handleInputLec}
                  required
                  style={{ marginTop: '4px' }}
                  className='scale-125'
                />
              </div>
              <button
                type='button'
                style={{ padding: '7px 0' }}
                className='w-full rounded bg-blue-500 text-white py-2'
                onClick={() => dispatch(addLectureToChapter())}
              >
                Add
              </button>
              <img
                src={assets.cross_icon}
                className='absolute top-4 right-4 w-4 cursor-pointer'
                onClick={() => dispatch(setShowPop(false))}
                alt=""
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          style={{ padding: '7px 25px' }}
          className='bg-black text-white rounded cursor-pointer px-4 py-2 mt-4 w-max'
        >
          Add
        </button>
      </form>
    </div>
  )
}

export default AddCourse