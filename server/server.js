import express from "express"
import cors from "cors"
import "dotenv/config.js"
import connectDB from "./configs/mongodb.js"
import clerkWebhooks from "./controllers/webhooks.js"

// Initialize Express
const app = express()
await connectDB()

// Middlewars
app.use(express.json())
app.use(cors())

// Routes
app.get('/' , (req , res) => res.send('API Working'))
app.post('/clerk-test', (req, res) => {
  console.log('Webhook test route hit');
  console.log('Body:', req.body);
  res.status(200).json({});
});

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT , ()=> console.log(`the server side running on port : ${PORT}`))