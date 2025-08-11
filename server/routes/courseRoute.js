import express from 'express'
import { getAllCourses, getCourseId, getCoursesByIds } from '../controllers/courseController.js'

const courseRouter = express.Router()

courseRouter.get('/all', getAllCourses)
courseRouter.get('/:id', getCourseId)
courseRouter.post('/get-courses-by-ids', getCoursesByIds)

export default courseRouter