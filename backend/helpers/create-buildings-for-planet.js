const mongoose = require('mongoose')
const { Mine } = require('../models/game-models/general-building-models/mines-model')
const { Store } = require('../models/game-models/general-building-models/stores-model')
const { MineTypes, MinesUpgradeCosts, MINES_BASE_UPGRADE_DURATION } = require('../constants/mines-enum')
const { StoresUpgradeCosts, STORE_BASE_UPGRADE_DURATION } = require('../constants/stores-enum')
const SolarArray = require('../models/game-models/general-building-models/solar-array-model')
const { SOLAR_ARRAY_BASE_UPGRADE_DURATION, SolarArraysUpgradeCosts } = require('../constants/solar-array-enum') 
const CommStation = require('../models/game-models/general-building-models/comm-station-model')
const { COMM_STATION_BASE_UPGRADE_DURATION, CommStationUpgradeCosts } = require('../constants/comm-station-enum')
const TradeDepot = require('../models/game-models/general-building-models/trade-depot-model')
const { TRADE_PORT_BASE_UPGRADE_DURATION, TradeDepotUpgradeCosts } = require('../constants/trade-depot-enum')
const Shield = require('../models/game-models/general-building-models/shield-model')
const { SHIELD_BASE_UPGRADE_DURATION, ShieldUpgradeCosts } = require('../constants/shield-enum')
const { FORGE_BASE_UPGRADE_DURATION, ForgeUpgradeCosts } = require('../constants/forge-enum')
const { RESEARCH_AND_DEVELOPMENT_BASE_UPGRADE_DURATION, ResearchAndDevelopmentUpgradeCosts } = require('../constants/research-and-development-enum')
const ResearchAndDevelopment = require('../models/game-models/general-building-models/research-and-development-models')
const Forge = require('../models/game-models/general-building-models/forge-model')
const Armoury = require('../models/game-models/armoury-models/armoury-model')
const { TROOPS_DATA } = require('../constants/troop-constants/troops-enum')
const {createTroop} = require('../helpers/instantiate-troops-for-planet')


// Bulk Function to initiating a planet with all buildings - current Mines and Stores
const initializePlanet = async (planetId) => {
    try{

        // Resource buildings mines and stores
        const resourceBuildings = await createResourceBuildings(Mine, MineTypes, MINES_BASE_UPGRADE_DURATION, MinesUpgradeCosts, planetId, 'mine')
        const storeBuildings = await createResourceBuildings(Store, MineTypes, STORE_BASE_UPGRADE_DURATION, StoresUpgradeCosts, planetId, 'store')
        const facilityBuildings = [
        // Facility buildings : solar array, comm station etc
        createFacilityBuilding(planetId, SolarArray, SOLAR_ARRAY_BASE_UPGRADE_DURATION, SolarArraysUpgradeCosts, "Solar Array"),
        createFacilityBuilding(planetId, CommStation, COMM_STATION_BASE_UPGRADE_DURATION, CommStationUpgradeCosts, "Comm Station"),
        createFacilityBuilding(planetId, TradeDepot, TRADE_PORT_BASE_UPGRADE_DURATION, TradeDepotUpgradeCosts, "Trade Depot"),
        createFacilityBuilding(planetId, Shield, SHIELD_BASE_UPGRADE_DURATION, ShieldUpgradeCosts, "Shield"),
        createFacilityBuilding(planetId, ResearchAndDevelopment, RESEARCH_AND_DEVELOPMENT_BASE_UPGRADE_DURATION, ResearchAndDevelopmentUpgradeCosts, "Research and Development"),
        createFacilityBuilding(planetId, Forge, FORGE_BASE_UPGRADE_DURATION, ForgeUpgradeCosts, "Forge")     ]

        // Create Armoury for the planet
        const newArmoury = new Armoury({ planet: planetId })
        await newArmoury.save()

        const troopCreationPromises = Object.keys(TROOPS_DATA).map(troopType => {
            // Pass the ID of the newly created Armoury, not the planet
            return createTroop(troopType, newArmoury._id);
        });
        
        const createdTroops = await Promise.all(troopCreationPromises);
        newArmoury.troops.push(...createdTroops);
        await newArmoury.save()
        

        await Promise.all([...resourceBuildings, ...storeBuildings, ...facilityBuildings])
} catch (error) {
    console.error('Error creating buildings for planet:', error)
}
}

const createResourceBuildings = async (Model, TypesEnum, baseUpgradeDuration, upgradeCostsEnum, planetId, buildingPrefix) => {
    return Promise.all(Object.values(TypesEnum).map(async type => {
        try {
            const newBuilding = new Model({
                [`${buildingPrefix}Type`]: type,
                name: `${type} ${buildingPrefix}`,
                planet: planetId,
                upgradeDurationBase: baseUpgradeDuration,
                upgradeDuration: baseUpgradeDuration,
                upgradeCosts: upgradeCostsEnum[type], 
                upgradeCostsBase:upgradeCostsEnum[type],
            })

            return await newBuilding.save()
        } catch (error) {
            console.error(`Error creating ${buildingPrefix}:`, error)
            throw error // Re-throw the error to be handled by the caller
        }
    }))
}

const createFacilityBuilding = async (planetId, Model, baseUpgradeDuration, upgradeCosts, buildingName) => {
    try {
        const newBuilding = new Model({
            name: buildingName,
            planet: planetId,
            upgradeDurationBase: baseUpgradeDuration,
            upgradeDuration: baseUpgradeDuration,
            upgradeCosts: upgradeCosts,
            upgradeCostsBase:upgradeCosts,
        })

        return await newBuilding.save()
    } catch (error) {
        console.error(`Error creating ${buildingName}:`, error)
        throw error // Re-throw the error to be handled by the caller
    }
}

module.exports = initializePlanet
