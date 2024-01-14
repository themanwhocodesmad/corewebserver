const { STORE_TYPE_TO_COST_KEY } = require("../constants/stores-enum")
const BuildingQueue = require("../models/game-models/building-models/building-upgrade-queue")
const Planet = require("../models/game-models/building-models/planets-model")
const { Store } = require("../models/game-models/general-building-models/stores-model")


async function calculateUpgradeStartAndEndTimes(newBuildingDetails) {
    /**
     * Calculates the start and end times for a new building upgrade based on the queued and in-progress buildings.
     * @param newBuildingDetails - The details of the new building to be queued, including its upgradeDuration.
     * @returns {Promise<BuildingQueue>} - The new building queue item with calculated start and end times.
     */
    const queuedBuildings = await BuildingQueue.find({ 
        status: { $in: ['queued', 'in progress'] } 
    }).sort({ queuedAt: 1 })

    let totalDuration = 0
    queuedBuildings.forEach(building => {
        totalDuration += 1000*building.upgradeDuration // milliseconds to seconds
    })

    // Calculating start time for the new building upgrade
    const upgradeStartTime = new Date(Date.now() + totalDuration)

    // Calculating end time for the new building upgrade
    const upgradeEndTime = new Date(upgradeStartTime.getTime() + 1000*newBuildingDetails.upgradeDuration)

    // Creating new queue item with calculated start and end times
    const newQueueItem = new BuildingQueue({
        ...newBuildingDetails, // Spread operator to include all the other properties
        upgradeStartTime,
        upgradeEndTime
    })

    return newQueueItem
}

async function prepareBuildingForNextUpgrade(building) {
    /**
     * Function to update the building's upgradeDuration and upgradeCosts
     * for the next time the player wants to upgrade it
     * @param building : the building instance we are updating
     */ 

    try {
        building.upgradeDuration += building.upgradeDurationBase
        building.upgradeCosts = Object.keys(building.upgradeCosts).reduce((newCosts, key) => {
                    newCosts[key] = (building.upgradeCosts[key] || 0) + (building.upgradeCostsBase[key] || 0)
        return newCosts
    }, {})
    await building.save()
} catch (error) {
    console.error('Error preparing building for upgrade:', error)
    throw error 
    }
}

async function checkAndDeductResourcesForUpgrade(building) {
    /**
     * Function to check for and deduct resources for the upgrade.
     * Function takes a building, and determines the resources that must be deducted
     * from the planets Stores, if there are sufficient resources.
     * @returns @param sufficientResources boolean indicating there were enough resources.
     * @param building : the building instance are checking the resources in.
     */

    const planet = await Planet.findById(building.planet)
        if (!planet) {
            return res.status(404).send({ message: 'Planet not found' })
        }

        // Fetch all stores associated with the planet
        const stores = await Store.find({ planet: planet._id })

        if (stores.length !== 3) { // There are exactly 3 stores per planet
            return res.status(404).send({ message: 'Stores not found or incomplete on planet' })
        } 
 
        const upgradeCosts = building.upgradeCosts



    let sufficientResources = true

    // Map store types to their corresponding upgrade cost key
    const storeTypeToCostKey = STORE_TYPE_TO_COST_KEY

    const saveOperations = stores.map(async (store) => {
        const costKey = storeTypeToCostKey[store.storeType]
        if (costKey && store.storage >= upgradeCosts[costKey]) {
            // Deducting the cost from the store's storage
            store.storage -= upgradeCosts[costKey]
            try {
                await store.save()
            } catch (error) {
                sufficientResources = false
                console.error(`Failed to save ${store.storeType} store:`, error)
            }
        } else {
            sufficientResources = false
            console.log(`Insufficient storage in ${store.storeType} store to deduct costs.`)
        }
    })

    await Promise.all(saveOperations)

    return sufficientResources
}

module.exports = {
    prepareBuildingForNextUpgrade,
    checkAndDeductResourcesForUpgrade, 
    calculateUpgradeStartAndEndTimes}
