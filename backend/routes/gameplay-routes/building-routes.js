const express = require('express')
const { queueBuildingsForUpgrade, cancelBuildingUpgrade } = require('../../controllers/gameplay-controllers/building-upgrade-queue-controller')
const router = express.Router()

// POST route for upgrading a building
router.post('/upgrade/:id', queueBuildingsForUpgrade)

// Route to cancel a building upgrade (WIP)
router.post('/cancel-upgrade/:id', cancelBuildingUpgrade)

module.exports = router