const express = require('express')
const queueTroopsForConstruction = require('../../controllers/gameplay-controllers/troop-construction-controller')
const router = express.Router()

// POST route to construct troops
router.post('/construct', queueTroopsForConstruction)  

/**{
    "troopType": "someTroopTypeId",
    "quantityToAdd": 10,
    "armouryId": "someArmouryId"
}
 */
  
module.exports = router
