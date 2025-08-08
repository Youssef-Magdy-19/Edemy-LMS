import express from "express"
import cors from "cors"
import "dotenv/config.js"
import connectDB from "./configs/mongodb.js"
import clerkWebhooks from "./controllers/webhooks.js"
import bodyParser from "body-parser"
import educatorRouter from "./routes/educatorRoutes.js"
import { clerkMiddleware } from "@clerk/express"

// Initialize Express
const app = express()
await connectDB()

// Middlewars
app.use(cors())
app.use(clerkMiddleware())

// Routes
app.get('/' , (req , res) => res.send('API Working'))
app.post('/clerk', bodyParser.raw({ type: 'application/json' }), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT , ()=> console.log(`the server side running on port : ${PORT}`))