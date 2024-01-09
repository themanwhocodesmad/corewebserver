const MineTypes = {
    OXYGEN: 'oxygen',
    GAS: 'gas',
    CRYSTAL: 'crystal'
};

const UpgradeCosts = {
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
    MineTypes,
    UpgradeCosts
};
