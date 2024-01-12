// Constants IN UPPER CASE because
const MINES_BASE_UPGRADE_DURATION = 20 // seconds

const MineTypes = {
    METAL: 'Metal',
    GAS: 'Gas',
    CRYSTAL: 'Crystal'
};

const MinesUpgradeCosts = {
    [MineTypes.METAL]: {
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
    MINES_BASE_UPGRADE_DURATION,
    MineTypes,
    MinesUpgradeCosts
};
