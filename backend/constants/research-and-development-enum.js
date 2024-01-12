const  { MineTypes } = require("./mines-enum")

// Constants
const RESEARCH_AND_DEVELOPMENT_BASE_UPGRADE_DURATION = 40 // seconds
const IMPULSE_BOOST_BASE_UPGRADE_DURATION = 40 // seconds
const CONSTRUCTION_BOOST_BASE_UPGRADE_DURATION = 40 // seconds
const ALIEN_TECHNOLOGY_BASE_UPGRADE_DURATION = 40 // seconds

// Based on Mine Types
const ResearchAndDevelopmentUpgradeCosts = {
    metal: 140,
    crystal: 200,
    gas: 250,
    energy: 20
}

const ImpulseBoostUpgradeCosts = {
        metal: 100,
        crystal: 150,
        gas: 200,
        energy: 10

}

const ConstructionBoostUpgradeCosts = {
    metal: 100,
    crystal: 150,
    gas: 200,
    energy: 10

}

const AlienTechnologypgradeCosts = {
    metal: 1000,
    crystal: 1500,
    gas: 2000,
    energy: 100

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