import { createSlice } from '@reduxjs/toolkit'
import uniqid from 'uniqid'

const initialState = {
    courseTitle: '',
    CoursePrice: 0,
    isPublished: true,
    courseThumbnail: null,
    courseDescripition: '',
    courseDiscount: 0,
    chapters: [],
    currentChapterId: '',
    lectureDetails: {
        lectureTitle: '',
        lectureDuration: '',
        lectureUrl: '',
        isPreviewFree: false
    },
    showPop: false
}

const ReducerLecture = createSlice({
    name: 'course',
    initialState,
    reducers: {
        updateCourseField: (state, action) => {
            const { field, value } = action.payload
            state[field] = value
        },

        updateCourse: (state, action) => {
            return { ...state, ...action.payload }
        },

        updateLectureDetails: (state, action) => {
            const { field, value } = action.payload
            if (field === 'isPreviewFree') {
                state.lectureDetails[field] = !state.lectureDetails[field]
            } else {
                state.lectureDetails[field] = value
            }
        },

        setChapters: (state, action) => {
            state.chapters = action.payload
        },

        setCurrentChapterId: (state, action) => {
            state.currentChapterId = action.payload
        },

        setShowPop: (state, action) => {
            state.showPop = action.payload
        },

        // ✅ إضافة شابتر جديد
        addChapter: (state) => {
            const title = prompt('Enter Chapter Name:')
            if (!title) return
            const newChapter = {
                chapterId: uniqid(),
                chapterTitle: title,
                collapsed: false,
                chapterContent: [],
                chapterOrder:
                    state.chapters.length > 0
                        ? state.chapters[state.chapters.length - 1].chapterOrder + 1
                        : 1
            }
            state.chapters.push(newChapter)
        },

        // ✅ حذف شابتر
        removeChapter: (state, action) => {
            const chapterId = action.payload
            state.chapters = state.chapters.filter(ch => ch.chapterId !== chapterId)
        },

        // ✅ فتح/غلق الشابتر
        toggleChapter: (state, action) => {
            const chapterId = action.payload
            state.chapters = state.chapters.map(ch =>
                ch.chapterId === chapterId
                    ? { ...ch, collapsed: !ch.collapsed }
                    : ch
            )
        },

        // ✅ فتح popup لإضافة محاضرة
        addLecture: (state, action) => {
            const chapterId = action.payload
            state.currentChapterId = chapterId
            state.showPop = true
        },

        // ✅ حذف محاضرة من شابتر
        removeLecture: (state, action) => {
            const { chapterId, lecIndex } = action.payload
            const chapter = state.chapters.find(ch => ch.chapterId === chapterId)
            if (chapter) {
                chapter.chapterContent.splice(lecIndex, 1)
            }
        },

        // ✅ إضافة محاضرة للشابتر المحدد
        addLectureToChapter: (state) => {
            const chapterIndex = state.chapters.findIndex(
                (ch) => ch.chapterId === state.currentChapterId
            )

            if (chapterIndex !== -1) {
                const newLecture = { ...state.lectureDetails }
                state.chapters[chapterIndex].chapterContent.push(newLecture)

                // تصفير البيانات بعد الإضافة
                state.lectureDetails = {
                    lectureTitle: '',
                    lectureDuration: '',
                    lectureUrl: '',
                    isPreviewFree: false
                }

                state.showPop = false
            }
        },

        resetCourse: () => initialState,
    }
})

export const {
    updateCourseField,
    updateCourse,
    setCurrentChapterId,
    addLecture,
    removeLecture,
    setChapters,
    setShowPop,
    addLectureToChapter,
    updateLectureDetails,
    addChapter,
    removeChapter,
    toggleChapter,
    resetCourse
} = ReducerLecture.actions

export default ReducerLecture.reducer