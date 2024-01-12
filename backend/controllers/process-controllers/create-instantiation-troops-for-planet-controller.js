const Troop = require('../../models/troop-models/troops-abstract-model')
const Bombs = require('../../models/troop-models/bombs-model') // Import the Bombs model
const { TROOPS_DATA, TROOP_COSTS, BOMB_BUILDING_DAMAGE } = require('../../constants/troop-constants/troops-enum')

/**
 * Creates a troop instance based on the given type.
 * 
 * @param {String} troopType - The type of the troop.

 * @param {mongoose.Types.ObjectId} armouryId - The armoury ID to associate with the troop.
 * @returns A promise that resolves to the created troop instance.
 */
const createTroop = async (troopType, armouryId) => {
    let newTroop
    const troopData = TROOPS_DATA[troopType] || {}
    const troopCosts = TROOP_COSTS[troopType] || {}

    if (troopType === 'Bombers') {
        // Special handling for Bombs
        newTroop = new Bombs({
            ...troopData,
            buildingDamage: BOMB_BUILDING_DAMAGE,
            costs: troopCosts,
            armoury: armouryId,
        })
    } else {
        // General handling for other troops
        newTroop = new Troop({
            ...troopData,
            costs: troopCosts,
            armoury: armouryId,
        })
    }
    await newTroop.save()
    return newTroop
}

module.exports = createTroop
