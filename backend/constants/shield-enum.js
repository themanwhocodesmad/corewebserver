const  { MineTypes } = require("./mines-enum")

// Constants
const SHIELD_BASE_UPGRADE_DURATION = 40 // seconds

// Based on Mine Types
const ShieldUpgradeCosts = {
    metal: 140,
    crystal: 200,
    gas: 250,
    energy: 20
}

module.exports = {

    SHIELD_BASE_UPGRADE_DURATION, 
    ShieldUpgradeCosts
    
}
