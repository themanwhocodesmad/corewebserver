const express = require('express')
const router = express.Router()
const { upgradeBuilding, cancelBuildingUpgrade } = require('../../controllers/process-controllers/upgrade-buildings-controllers')

// PUT route for upgrading a building
router.post('/upgrade/:id', upgradeBuilding)

// Route to cancel a building upgrade
router.post('/cancel-upgrade/:id', cancelBuildingUpgrade)

module.exports = router
