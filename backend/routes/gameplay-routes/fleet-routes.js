const express = require('express')
const router = express.Router()
const {createFleet, editFleet, deleteFleet} = require('../../controllers/gameplay-controllers/fleet-management-controller')


// Route to create a new fleet
router.post('/', createFleet)

// Route to edit an existing fleet
// Expecting fleetId as a URL parameter
router.put('/:fleetId', editFleet)

// Route to delete a fleet
// Expecting fleetId as a URL parameter
router.delete('/:fleetId', deleteFleet)

module.exports = router