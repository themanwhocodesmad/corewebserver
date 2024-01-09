const express = require('express')
const router = express.Router()
const {
    createAllMines, 
    getAllMines, 
    upgradeMine, 
    getMine} = require('../controllers/mines-controllers')

// POST route to create mines
router.post('/create', createAllMines)

// PUT route to upgrade a mine by ID
router.put('/upgrade/:id', upgradeMine)

// GET route to retrieve all mines
router.get('/all', getAllMines)

// GET route to retrieve a single mine
router.get('/:id', getMine)

module.exports = router
