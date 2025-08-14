import { clerkClient } from '@clerk/express'
import Course from '../models/Course.js'
import User from '../models/User.js'
import { v2 as cloudinary } from "cloudinary"
import { Purchase } from '../models/Purchase.js'

// update role to educator
export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator',
            }
        })

        res.json({ success: true, message: 'you can publish a course now' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Add New Course
export const addCourse = async (req, res) => {
    try {
        const { courseData } = req.body
        const imageFile = req.file
        const dbUser = await User.findOne({ clerkUserId: req.auth.userId })

        if (!imageFile) {
            return res.json({ success: false, message: 'Thumbnail Not Attached' })
        }

        const parsedCourseData = await JSON.parse(courseData)
        if (parsedCourseData.enrolledStudents && parsedCourseData.enrolledStudents.length > 0) {
            const studentsObjectIds = await Promise.all(
                parsedCourseData.enrolledStudents.map(async (clerkId) => {
                    const student = await User.findOne({ clerkUserId: clerkId });
                    return student ? student._id : null;
                })
            );
            parsedCourseData.enrolledStudents = studentsObjectIds.filter(id => id !== null);
        } else {
            parsedCourseData.enrolledStudents = [];
        }

        parsedCourseData.educator = dbUser._id
        const newCourse = await Course.create(parsedCourseData)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()

        res.json({ success: true, message: 'Course Added' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get Educator Courses 
export const getEducatorCourses = async (req, res) => {
    try {
        const dbUser = await User.findOne({ clerkUserId: req.auth.userId });
        if (!dbUser) {
            return res.status(404).json({ success: false, message: 'Educator not found' });
        }
        // 2. هات كل الكورسات الخاصة بيه
        const courses = await Course.find({ educator: dbUser._id }); // استخدم ObjectId مش الـ Clerk ID


        res.status(200).json({ success: true, courses })
    } catch (error) {
        res.status(500).json({ success: true, message: error.message })
    }
}

// Get Educator Dashboard Data ( Total Earning, Enrolled Students, No. of Courses )

export const educatorDashhboard = async (req, res) => {
    try {
        const dbUser = await User.findOne({ clerkUserId: req.auth.userId });
        if (!dbUser) {
            return res.status(404).json({ success: false, message: 'Educator not found' });
        }

        // 2. هات كل الكورسات الخاصة بيه
        const courses = await Course.find({ educator: dbUser._id }); // استخدم ObjectId مش الـ Clerk ID

        // Calculate Total Courses
        const totalCourses = courses.length

        const courseIds = courses.map(course => course._id)

        // Calculate total earnings from purchases
        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        })

        const totalsEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0)

        // Collect unique enrolled student IDs with their course titles
        const enrolledStudentsData = []
        for (const course of courses) {
            const students = await User.find({
                _id: { $in: course.enrolledStudents }
            }, 'name imageUrl')

            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                })
            })
        }

        res.status(200).json({
            success: true, dashboardData: {
                totalsEarnings, totalCourses, enrolledStudentsData
            }
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// Get Enrolled Students Data with Purchase Data
export const getEnrolledStudentData = async (req, res) => {
    try {
        const dbUser = await User.findOne({ clerkUserId: req.auth.userId });
        if (!dbUser) {
            return res.status(404).json({ success: false, message: 'Educator not found' });
        }

        // 2. هات كل الكورسات الخاصة بيه
        const courses = await Course.find({ educator: dbUser._id }); // استخدم ObjectId مش الـ Clerk ID


        const courseIds = courses.map(course => course._id)

        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')

        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt
        }))

        res.status(200).json({ success: true, enrolledStudents })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}