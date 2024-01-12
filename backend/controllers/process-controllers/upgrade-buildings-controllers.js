const mongoose = require('mongoose')
const Building = require('../../models/buildings-abstract-model')
const Planet = require('../../models/planets-model')
const {Store} = require('../../models/stores-model')
const upgradeAgenda = require('../../utils/scheduler-fuctions/upgrade-schedular')

const upgradeBuilding = async (req, res) => {
    const session = await mongoose.startSession() // Start a session
    session.startTransaction() // Start the transaction
    try {
        const { id } = req.params
        const building = await Building.findById(id)
        if (!building) {
            return res.status(404).send({ message: 'Building not found' })
        }

        const planet = await Planet.findById(building.planet)
        if (!planet) {
            return res.status(404).send({ message: 'Planet not found' })
        }

        // Fetch all stores associated with the planet
        const stores = await Store.find({ planet: planet._id })
        //console.log('Stores found:', stores)
        if (stores.length !== 3) { // Assuming there are exactly 3 stores per planet
            return res.status(404).send({ message: 'Stores not found or incomplete on planet' })
        }

        const upgradeCosts = building.upgradeCosts
        
        // Check for each resource in the upgrade costs using resourceCheck function
        const allResourcesSufficient = await checkAndDeductResources(stores, upgradeCosts)

        if (!allResourcesSufficient) {
            return res.status(400).send({ message: 'Insufficient resources for upgrade' })
        }

        // Update the building within the transaction
        building.upgradeDuration += building.upgradeDurationBase
        building.upgradeStartTime = new Date(Date.now())
        building.upgradeCosts = Object.keys(building.upgradeCosts).reduce((newCosts, key) => {
            newCosts[key] = (building.upgradeCosts[key] || 0) + (building.upgradeCostsBase[key] || 0);
            return newCosts;
        }, {})

        // save session, atomic transaction can be rolled back
        await building.save({session})
        

        // Schedule the upgrade with Agenda
        const upgradeCompletionTime = new Date(Date.now() + building.upgradeDuration)
        await upgradeAgenda.schedule(upgradeCompletionTime, 'completeBuildingUpgrade', { id: building._id })

        // Commit the transaction
        await session.commitTransaction()


        res.status(200).send({ message: 'Building upgraded successfully', building })
    } catch (error) {
        // Rollback the transaction on error
        await session.abortTransaction()
        console.error(error)
        res.status(500).send({ message: 'Error upgrading building', error: error.message })
    } finally {
        session.endSession() // End the session
    }
}

const cancelBuildingUpgrade = async (req, res) => {
    const { id } = req.params

    try {
        const building = await Building.findById(id)
        if (!building) {
            return res.status(404).send({ message: 'Building not found' })
        }

        // Cancel the Agenda job
        await upgradeAgenda.cancel({ 'data.id': id })

        // Revert upgrade costs, considering time elapsed
        if (building.upgradeCostsBase && building.upgradeStartTime) {
            const elapsedTime = Date.now() - building.upgradeStartTime.getTime(); // Calculate elapsed milliseconds
            const percentElapsed = elapsedTime / building.upgradeDuration;        // Calculate percentage of upgrade time elapsed
        
            for (const [key, baseValue] of Object.entries(building.upgradeCostsBase)) {
                const totalCost = building.upgradeCosts[key] || 0;                // Total cost for this key
                const lastUpgradeCost = totalCost - baseValue;                    // Cost used in the last upgrade
                const costToReturn = lastUpgradeCost * percentElapsed;            // Calculate cost to return based on percentage
        
                // Update the upgrade costs, ensuring it doesn't drop below the base value
                building.upgradeCosts[key] = Math.max(baseValue, totalCost - costToReturn);
            }
        }
        

        // Revert the building's upgradeDuration and upgradeCosts
        building.upgradeDuration -= building.upgradeDurationBase
        building.upgradeStartTime = null

        await building.save()

        res.status(200).send({ message: 'Building upgrade cancelled successfully', building })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Error canceling building upgrade', error: error.message })
    }
}


async function checkAndDeductResources(stores, upgradeCosts) {
    let sufficientResources = true

    // Map store types to their corresponding upgrade cost key
    const storeTypeToCostKey = {
        'Gas': 'gas',
        'Crystal': 'crystal',
        'Metal': 'metal'
   }

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

module.exports = {upgradeBuilding, cancelBuildingUpgrade}

