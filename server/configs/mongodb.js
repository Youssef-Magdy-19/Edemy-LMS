import mongoose from "mongoose"

// connect to the MongoDB database
const connectDB = async () =>{
    mongoose.connection.on('connected' , ()=> console.log("Database Conneceted"))
    await mongoose.connect(`${process.env.MONGODB_URI}`)
}

export default connectDB