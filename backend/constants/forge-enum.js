const  { MineTypes } = require("./mines-enum")

// Constants
const FORGE_BASE_UPGRADE_DURATION = 40 // seconds

// Based on Mine Types
const ForgeUpgradeCosts = {
    metal: 140,
    crystal: 200,
    gas: 250,
    energy: 20
}

module.exports = {

    FORGE_BASE_UPGRADE_DURATION, 
    ForgeUpgradeCosts
    
}
