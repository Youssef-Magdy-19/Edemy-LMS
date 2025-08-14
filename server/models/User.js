import mongoose from "mongoose";

const userShecma = new mongoose.Schema({
    clerkUserId : {type : String , required : true , trim : true} ,
    name : {type : String , required : true , trim : true} , 
    email : {type : String , required : true , trim : true} ,
    imageUrl : {type : String , required : true , trim : true}, 
    enrolledCourses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Course'
        }
    ],
} , {timestamps : true})

const User = mongoose.model('User' , userShecma)

export default User