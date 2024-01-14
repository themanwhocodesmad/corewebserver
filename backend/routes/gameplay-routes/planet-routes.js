const express = require('express')
const router = express.Router()
const { createAdditionalPlanet, createInitialPlanet } = require("../../controllers/gameplay-controllers/planet-creation-controller")

// POST route to create initial planets
router.post('/initial', createInitialPlanet)

// POST route for adding a new planet
router.post('/additional', createAdditionalPlanet)

// DELETE route to delete a planet
//router.post('/delete/:id', deletePlanet)
  
module.exports = router