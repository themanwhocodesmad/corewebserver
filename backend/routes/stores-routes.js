const express = require('express')
const router = express.Router()
const {
    createAllStores, 
    getAllStores, 
    upgradeStore, 
    getStore} = require('../controllers/stores-controllers')

// POST route to create stores
router.post('/create', createAllStores)

// PUT route to upgrade a stores by ID
router.put('/upgrade/:id', upgradeStore)

// GET route to retrieve all stores
router.get('/all', getAllStores)

// GET route to retrieve a single store
router.get('/:id', getStore)

module.exports = router
