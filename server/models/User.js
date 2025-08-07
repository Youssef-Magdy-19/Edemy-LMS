import mongoose, { mongo } from "mongoose";

const userShecma = new mongoose.Schema({
    _id : {type : String , require : true , trim : true} ,
    name : {type : String , require : true , trim : true} , 
    email : {type : String , require : true , trim : true , unique : true} ,
    imageUrl : {type : String , require : true , trim : true}, 
    enrolledCourses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Course'
        }
    ],
} , {timestamps : true})

const User = mongoose.model('User' , userShecma)

export default User