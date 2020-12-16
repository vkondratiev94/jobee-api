const express = require('express')
const dotenv = require('dotenv')

const app = express()

// Setting up config.env file variables
dotenv.config({ path: './config/config.env' })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`)
})