// createTroop.js
const Troop = require('../../models/troop-models/troops-abstract-model')
const Bombs = require('../../models/troop-models/bombs-model') // Import the Bombs model
const { TROOPS_DATA, BOMB_BUILDING_DAMAGE } = require('../../constants/troop-constants/troops-enum')

/**
 * Creates a troop instance based on the given properties.
 * 
 * @param {String} troopType - The type of the troop.
 * @param {Object} properties - The properties of the troop.
 * @param {mongoose.Types.ObjectId} planetId - The planet ID to associate with the troop.
 * @returns A promise that resolves to the created troop instance.
 */

const createTroop = async (troopType, planetId) => {
    let newTroop
    const troopData = TROOPS_DATA[troopType] || {}

    if (troopType === 'Bombers') {
        // Special handling for Bombs
        newTroop = new Bombs({
            ...troopData,
            buildingDamage: BOMB_BUILDING_DAMAGE,
            planet: planetId
        })
    } else {
        // General handling for other troops
        newTroop = new Troop({
            ...troopData,
            planet: planetId
        })
    }
    await newTroop.save()
    return newTroop
}

module.exports = createTroop
