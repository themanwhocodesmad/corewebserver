const express = require('express')
const router = express.Router()
const {
    createCommStation,
    getCommStation,
    upgradeCommStation
} = require('../controllers/comm-station-controllers')

// Route to create a new Comm Station
router.post('/', createCommStation)

// Route to get a specific Comm Station by ID
router.get('/:id', getCommStation)

// Route to upgrade a specific Comm Station by ID
router.put('/upgrade/:id', upgradeCommStation)

module.exports = router
