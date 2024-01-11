const express = require('express')
const router = express.Router()
const {getSolarArray, createSolarArray, upgradeSolarArray  } = require('../controllers/solar-array-controllers') 

// POST route to create solar array
router.post('/create', createSolarArray)

// PUT route to upgrade a solar array by ID
router.put('/upgrade/:id', upgradeSolarArray)

// GET route to retrieve a single mine
router.get('/:id', getSolarArray)

module.exports = router
