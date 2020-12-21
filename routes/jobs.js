const express = require('express')

const router = express.Router()

// Importing jobs controller methods
const { getJobs, getJob, newJob, updateJob, deleteJob, getJobsInRadius } = require('../controllers/jobsController') 

router.route('/jobs').get(getJobs)
router.route('/job/new').post(newJob)
router.route('/job/:id')
  .put(updateJob)
  .delete(deleteJob)
router.route('/job/:id/:slug').get(getJob)
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius)

module.exports = router