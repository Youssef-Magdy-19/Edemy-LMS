import humanizeDuration from "humanize-duration"

export const calcCourse = (course) => {
    let timeCourse = 0
    if (Array.isArray(course.courseContent)) {
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                chapter.chapterContent.forEach(lec => {
                    timeCourse += lec.lectureDuration || 0;
                });
            }
        });
    }
    return humanizeDuration(timeCourse * 60 * 1000, { units: ['h', 'm'] })
}
export const calcChapter = (chapter) => {
    let time = 0
    chapter.chapterContent.map((lec) => { time += lec.lectureDuration })
    return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] })
    // return time
}
export const calcNoOfLecturesCourse = (course) => {
    let totalLecs = 0
    course.courseContent.forEach((chapter) => {
        if (Array.isArray(chapter.chapterContent)) {
            totalLecs += chapter.chapterContent.length
        }
    })
    return totalLecs
}