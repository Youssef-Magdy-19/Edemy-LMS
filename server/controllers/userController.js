import User from "../models/User.js"
import Stripe from "stripe";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";
import { CourseProgress } from "../models/CourseProgress.js";

// Get User Data
export const getUserData = async (req, res) => {
    try {
        const clerkUserId = req.auth.userId
        const user = await User.findOne({ clerkUserId })

        if (!user) {
            return res.status(400).json({ success: false, message: 'User Not Found' })
        }

        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// Users Enrolled Courses With Lecture Links
export const userEnrolledCourses = async (req, res) => {
    try {
        const clerkUserId = req.auth.userId
        const user = await User.findOne({ clerkUserId })

        res.status(200).json({ success: true, enrolledCourses: user.enrolledCourses })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// Purchase Course
export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const { origin } = req.headers
        const clerkUserId = req.auth.userId
        const userData = await User.findOne({ clerkUserId })
        const courseData = await Course.findById(courseId)

        if (!userData || !courseData) {
            return res.status(400).json({ success: false, message: 'Data Not Found' })
        }

        const purchaseData = {
            courseId: courseData._id,
            userId: userData._id,
            amount: (courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)
        }

        const newPurchase = await Purchase.create(purchaseData)

        // Stripe Dateway INitialize
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
        const currency = process.env.CURRENCY.toLowerCase()

        // Creating line items to for stripe
        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: courseData.courseTitle
                },
                unit_amount: Math.floor(newPurchase.amount) * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items: line_items,
            mode: 'payment',
            metadata: {
                purchaseId: newPurchase._id.toString()
            }
        })

        res.status(200).json({ success: true, session_url: session.url })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// Update User Course Progress
export const updateUserCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId, lectureId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId })

        if (progressData) {
            if (progressData.lectureCompleted.includes(lectureId)) {
                return res.status(200).json({ success: true, message: 'Lecture Already Completed' })
            }
            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
        } else {
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted: [lectureId]
            })
        }

        res.status(200).json({ success: true, message: 'Progress Updated' })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// get User Course Progress
export const getCourseProgress = async (req, res) => {
    try {
        const userId = req.auth.userId
        const { courseId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId })

        if (!progressData) {
            res.status(400).json({ success: false, message: 'Course Progress Not Found' })
        }

        res.status(200).json({ success: true, progressData })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// Add User Ratings Course
export const addUserRatingCourse = async (req, res) => {
    const userId = req.auth.userId
    const { courseId, rating } = req.body

    if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ success: false, message: 'InVaild Details' })
    }
    try {
        const courseData = await Course.findById(courseId)
        if(!courseData){
            return res.status(404).json({success: false, message: 'Course Not Found'})
        }

        const user = await User.findById(userId)
        if(!user || user.enrolledCourses.includes(courseId)){
            return res.status(400).json({success: false, message: 'User has not puchased this course'})
        }

        const existingRatingIndex = courseData.courseRatings.findIndex(r => r.userId === userId)
        if(existingRatingIndex > -1){
            courseData.courseRatings[existingRatingIndex].rating = rating
        } else {
            courseData.courseRatings.push({userId, rating})
        }
        await courseData.save()

        res.status(200).json({success: true, message: 'Rating added'})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}