const  { MineTypes } = require("./mines-enum")

// Constants
const TRADE_PORT_BASE_UPGRADE_DURATION = 40 // seconds

// Based on Mine Types
const TradeDepotUpgradeCosts = {
    [MineTypes.OXYGEN]: {
        metal: 100,
        crystal: 150,
        gas: 200,
        energy: 10
    },
    [MineTypes.GAS]: {
        metal: 120,
        crystal: 180,
        gas: 220,
        energy: 15
    },
    [MineTypes.CRYSTAL]: {
        metal: 140,
        crystal: 200,
        gas: 250,
        energy: 20
    }
}

module.exports = {

    TRADE_PORT_BASE_UPGRADE_DURATION, 
    TradeDepotUpgradeCosts
    
}
