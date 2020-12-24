const express = require('express')
const app = express()

// Setup body parser
app.use(express.json())

// Setting up config.env file variables
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

// Connecting to database
const connectDatabase = require('./config/db')
connectDatabase()

// Importing all routes
const jobs = require('./routes/jobs')

app.use('/api/v1', jobs)

// Middleware to handle errors
const errorMiddleware = require('./middlewares/errors')
app.use(errorMiddleware)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`)
})