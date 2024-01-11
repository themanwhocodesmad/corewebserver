const  { MineTypes } = require("./mines-enum")

// Constants
const ARRAY_CAPACITY_MULTIPLIER = 10000
const ARRAY_BASE_UPGRADE_DURATION = 40 // seconds

// Based on Mine Types
const ArrayUpgradeCosts = {
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
};

module.exports = {
    ARRAY_CAPACITY_MULTIPLIER,
    ARRAY_BASE_UPGRADE_DURATION,
    ArrayUpgradeCosts,
    
}
