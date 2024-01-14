const express = require('express')
const router = express.Router()
const { upgradeBuilding, cancelBuildingUpgrade } = require('../../controllers/process-controllers/upgrade-buildings-controllers')
const { createInitialPlanet } = require('../../controllers/planets-controllers')
const constructTroop = require('../../controllers/process-controllers/armoury-controllers/troop-construction-controller')
const queueTroopsForConstruction = require('../../controllers/process-controllers/armoury-controllers/troop-construction-controller')
const { queueBuildingsForUpgrade } = require('../../controllers/process-controllers/queue-buildings-for-upgrade-controller')

// POST route to create initial planets
router.post('/create', createInitialPlanet)

// PUT route for upgrading a building
router.post('/upgrade/:id', queueBuildingsForUpgrade)

// Route to cancel a building upgrade
router.post('/cancel-upgrade/:id', cancelBuildingUpgrade)

// Route to construct troops
router.post('/construct', queueTroopsForConstruction)  

/**{
    "troopType": "someTroopTypeId",
    "quantityToAdd": 10,
    "armouryId": "someArmouryId"
}
 */
  
module.exports = router
