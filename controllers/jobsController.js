const geoCoder = require('../utils/geocoder')
const Job = require('../models/jobs')

// Get all jobs => /api/v1/jobs
exports.getJobs = async (req, res, next) => {
  const jobs = await Job.find()

  res.status(200).json({
    success: true,
    results: jobs.length,
    data: jobs,
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

// Update a Job => /api/v1/job/:id
exports.updateJob = async (req, res, next) => {
  let job = await Job.findById(req.params.id)

  if(!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found'
    })
  }

  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    message: 'Job is updated',
    data: job,
  })
}

// Search jobs with radius => /api/v1/jobs/:zipcode/:distance
exports.getJobsInRadius = async (req, res, next) => {
  const { zipcode, distance } = req.params

  // Getting latitude & longitude from geocoder with zipcode
  const loc = await geoCoder.geocode(zipcode)
  const latitude = loc[0].latitude
  const longitude = loc[0].longitude

  const radius = distance / 3963 // radius of Earth in miles

  const jobs = await Job.find({
    location: {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], radius]
      }
    }
  })

  res.status(200).json({
    success: true,
    results: jobs.length,
    data: jobs,
  })
}