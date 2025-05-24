import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import Router from './routes/productRoutes.js'

configDotenv()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/products', Router)
app.get('/', (req, res) => {
    res.send("API Online!")
})

const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB')
    const port = process.env.PORT
    app.listen(port, () => console.log(`Server running in http://localhost:${port}/`))
}).catch(err => {
    console.log(`Error Connecting MongoDB : ${err}`)
})