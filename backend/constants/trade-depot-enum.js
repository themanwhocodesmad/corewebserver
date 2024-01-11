const  { MineTypes } = require("./mines-enum")

// Constants
const TRADE_PORT_BASE_UPGRADE_DURATION = 40 // seconds

// Based on Mine Types
const TradeDepotUpgradeCosts = {
    metal: 140,
    crystal: 200,
    gas: 250,
    energy: 20
}

module.exports = {

    TRADE_PORT_BASE_UPGRADE_DURATION, 
    TradeDepotUpgradeCosts
    
}
