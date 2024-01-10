const mongoose = require('mongoose');
const { Mine } = require('../../models/mines-model');
const { Store } = require('../../models/stores-model');
const { MineTypes, MinesUpgradeCosts, MINES_BASE_UPGRADE_DURATION } = require('../../constants/mines-enum');
const { StoresUpgradeCosts, STORE_BASE_UPGRADE_DURATION } = require('../../constants/stores-enum');

// Bulk Function to initiating a planet with all buildings - current Mines and Stores
const createBuildingsForPlanet = async (planetId) => {
    const buildingPromises = [
        ...createBuildingPromises(Mine, MineTypes, MINES_BASE_UPGRADE_DURATION, MinesUpgradeCosts, planetId, 'mine'),
        ...createBuildingPromises(Store, MineTypes, STORE_BASE_UPGRADE_DURATION, StoresUpgradeCosts, planetId, 'store')
    ];

    await Promise.all(buildingPromises);
};

const createBuildingPromises = (Model, TypesEnum, baseUpgradeDuration, upgradeCostsEnum, planetId, buildingPrefix) => {
    return Object.values(TypesEnum).map(type => {
        const newBuilding = new Model({
            [`${buildingPrefix}Type`]: type,
            name: `${type} ${buildingPrefix}`,
            planet: planetId,
            upgradeDurationBase: baseUpgradeDuration,
            upgradeDuration: baseUpgradeDuration,
            upgradeCosts: upgradeCostsEnum[type]
        });

        return newBuilding.save();
    });
};

module.exports = createBuildingsForPlanet;
