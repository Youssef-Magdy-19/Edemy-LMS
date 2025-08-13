import express from 'express'
import { addUserRatingCourse, getCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourses } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/data' , getUserData)
userRouter.get('/enrolled-courses', userEnrolledCourses)

userRouter.post('/get-course-progress', getCourseProgress)
userRouter.post('/purchase', purchaseCourse)
userRouter.post('/update-course-progress', updateUserCourseProgress)
userRouter.post('/add-rating', addUserRatingCourse)

export default userRouter