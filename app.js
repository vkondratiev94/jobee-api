const express = require('express')
const app = express()

// Setup body parser
app.use(express.json())

// Setting up config.env file variables
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

// Handling uncaught exception
process.on('uncaughtException', err => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to uncaught exception`)
  process.exit(1)
})

// Connecting to database
const connectDatabase = require('./config/db')
connectDatabase()

// Importing all routes
const jobs = require('./routes/jobs')
const auth = require('./routes/auth')

app.use('/api/v1', jobs)
app.use('/api/v1', auth)

// Handle unhandled errors
const ErrorHandler = require('./utils/errorHandler')
app.all('*', (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} route not found`, 404))
})

// Middleware to handle errors
const errorMiddleware = require('./middlewares/errors')
app.use(errorMiddleware)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`)
})

// Handling unhandled promise rejection
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to unhandled promise rejection`)
  server.close(() => process.exit(1))
})