const mongoose = require('mongoose')
const { Mine } = require('../../models/mines-model')
const { Store } = require('../../models/stores-model')
const { MineTypes, MinesUpgradeCosts, MINES_BASE_UPGRADE_DURATION } = require('../../constants/mines-enum')
const { StoresUpgradeCosts, STORE_BASE_UPGRADE_DURATION } = require('../../constants/stores-enum')
const SolarArray = require('../../models/solar-array-model')
const { SOLAR_ARRAY_BASE_UPGRADE_DURATION, SolarArraysUpgradeCosts } = require('../../constants/solar-array-enum') // Import constants for SolarArray
const CommStation = require('../../models/comm-station-model')
const { COMM_STATION_BASE_UPGRADE_DURATION, CommStationUpgradeCosts } = require('../../constants/comm-station-enum')
const TradeDepot = require('../../models/trade-depot-model')
const { TRADE_PORT_BASE_UPGRADE_DURATION, TradeDepotUpgradeCosts } = require('../../constants/trade-depot-enum')
const Shield = require('../../models/shield-model')
const { SHIELD_BASE_UPGRADE_DURATION, ShieldUpgradeCosts } = require('../../constants/shield-enum')


// Bulk Function to initiating a planet with all buildings - current Mines and Stores
const createBuildingsForPlanet = async (planetId) => {
    const buildingPromises = [
        ...createBuildingPromises(Mine, MineTypes, MINES_BASE_UPGRADE_DURATION, MinesUpgradeCosts, planetId, 'mine'),
        ...createBuildingPromises(Store, MineTypes, STORE_BASE_UPGRADE_DURATION, StoresUpgradeCosts, planetId, 'store'),
        createSolarArray(planetId),
        createCommStation(planetId),
        createTradeDepot(planetId),
        createShield(planetId),    
        ]

    await Promise.all(buildingPromises)
}

const createBuildingPromises = (Model, TypesEnum, baseUpgradeDuration, upgradeCostsEnum, planetId, buildingPrefix) => {
    return Object.values(TypesEnum).map(type => {
        const newBuilding = new Model({
            [`${buildingPrefix}Type`]: type,
            name: `${type} ${buildingPrefix}`,
            planet: planetId,
            upgradeDurationBase: baseUpgradeDuration,
            upgradeDuration: baseUpgradeDuration,
            upgradeCosts: upgradeCostsEnum[type]
        })

        return newBuilding.save()
    })
}


const createSolarArray = (planetId) => {
    const newSolarArray = new SolarArray({
        name: "Solar Array",
        planet: planetId, // Set the planet ID
        upgradeDurationBase: SOLAR_ARRAY_BASE_UPGRADE_DURATION,
        upgradeDuration: SOLAR_ARRAY_BASE_UPGRADE_DURATION,
        upgradeCosts: SolarArraysUpgradeCosts
    })

    return newSolarArray.save()
}

const createCommStation = (planetId) => {
    const newCommStation = new CommStation({
        name: "Comm Station",
        planet: planetId, // Set the planet ID
        upgradeDurationBase: COMM_STATION_BASE_UPGRADE_DURATION,
        upgradeDuration: COMM_STATION_BASE_UPGRADE_DURATION,
        upgradeCosts: CommStationUpgradeCosts
    })

    return newCommStation.save()
}

const createTradeDepot = (planetId) => {
    const newTradeDepot = new TradeDepot({
        name: "Trade Depot",
        planet: planetId, // Set the planet ID
        upgradeDurationBase: TRADE_PORT_BASE_UPGRADE_DURATION,
        upgradeDuration: TRADE_PORT_BASE_UPGRADE_DURATION,
        upgradeCosts: TradeDepotUpgradeCosts
    })

    return newTradeDepot.save()
}

const createShield = (planetId) => {
    const newShield = new Shield({
        name: "Shield",
        planet: planetId, // Set the planet ID
        upgradeDurationBase: SHIELD_BASE_UPGRADE_DURATION,
        upgradeDuration: SHIELD_BASE_UPGRADE_DURATION,
        upgradeCosts: ShieldUpgradeCosts
    })

    return newShield.save()
}

module.exports = createBuildingsForPlanet
