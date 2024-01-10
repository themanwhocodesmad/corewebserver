const express = require('express')
const router = express.Router()
const {
    createInitialPlanet} = require('../controllers/planets-controllers')

// POST route to create mines
router.post('/create', createInitialPlanet)

module.exports = router
