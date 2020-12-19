const Job = require('../models/jobs')

// Get all jobs => /api/v1/jobs
exports.getJobs = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'This route will display all jobs.'
  })
}

// Create a new Job => /api/v1/job/new
exports.newJob = async (req, res, next) => {
  const job = await Job.create(req.body)
  
  res.status(200).json({
    success: true,
    message: 'Job Created',
    data: job,
  })
}