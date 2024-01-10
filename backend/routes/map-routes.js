const express = require('express')
const router = express.Router()
const {
    initializeMap, 
    addNewGalaxy, 
    syncMapWithPlanets, 
    } = require('../controllers/map-controllers')

// POST route initiliaze the map model
router.post('/initialize', initializeMap)

// POST route to add a new galaxy
router.post('/add-galaxy', addNewGalaxy)

// POST route to make sure map is synced with all existing planets
router.post('/sync', syncMapWithPlanets)


module.exports = router
