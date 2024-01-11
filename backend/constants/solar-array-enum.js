const  { MineTypes } = require("./mines-enum")

// Constants
const ARRAY_CAPACITY_MULTIPLIER = 10000
const ARRAY_BASE_UPGRADE_DURATION = 40 // seconds

// Based on Mine Types
const SolarArrayUpgradeCosts =  {
        metal: 140,
        crystal: 200,
        gas: 250,
        energy: 20
    }


module.exports = {
    ARRAY_CAPACITY_MULTIPLIER,
    ARRAY_BASE_UPGRADE_DURATION,
    SolarArrayUpgradeCosts,
    
}
