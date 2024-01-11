const  { MineTypes } = require("./mines-enum")

// Constants
const RESEARCH_AND_DEVELOPMENT_BASE_UPGRADE_DURATION = 40 // seconds
const IMPULSE_BOOST_BASE_UPGRADE_DURATION = 40 // seconds
const CONSTRUCTION_BOOST_BASE_UPGRADE_DURATION = 40 // seconds
const ALIEN_TECHNOLOGY_BASE_UPGRADE_DURATION = 40 // seconds

// Based on Mine Types
const ResearchAndDevelopmentUpgradeCosts = {
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

const ImpulseBoostUpgradeCosts = {
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

const ConstructionBoostUpgradeCosts = {
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

const AlienTechnologypgradeCosts = {
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

    RESEARCH_AND_DEVELOPMENT_BASE_UPGRADE_DURATION,
    IMPULSE_BOOST_BASE_UPGRADE_DURATION, 
    CONSTRUCTION_BOOST_BASE_UPGRADE_DURATION, 
    ALIEN_TECHNOLOGY_BASE_UPGRADE_DURATION, 
    ResearchAndDevelopmentUpgradeCosts,
    ImpulseBoostUpgradeCosts,
    ConstructionBoostUpgradeCosts,
    AlienTechnologypgradeCosts,
    
}