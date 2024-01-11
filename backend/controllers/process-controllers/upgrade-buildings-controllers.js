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
        //console.log('Stores found:', stores);
        if (stores.length !== 3) { // Assuming there are exactly 3 stores per planet
            return res.status(404).send({ message: 'Stores not found or incomplete on planet' })
        }

        const upgradeCosts = building.upgradeCosts
        let sufficientResources = true
        
        // Check for each resource in the upgrade costs
        for (const [resource, cost] of Object.entries(upgradeCosts)) {
            console.log(resource, 'being checked now. Has a cost of', cost);
            const resourceStore = stores.find(store => store.storeType.toLowerCase() === resource.toLowerCase())
            console.log('Stores comparing is:', resourceStore);
            if (!resourceStore || resourceStore.capacity < cost) {
                sufficientResources = false
                break
            }
        }

        if (!sufficientResources) {
            return res.status(400).send({ message: 'Insufficient resources for upgrade' })
        }

        // Deduct resources from stores
        for (const [resource, cost] of Object.entries(upgradeCosts)) {
            const resourceStore = stores.find(store => store.storeType.toLowerCase() === resource.toLowerCase())
            resourceStore.capacity -= cost
            await resourceStore.save()
        }

        // Update the building within the transaction
        building.upgradeDuration += building.upgradeDurationBase
        building.upgradeStartTime = new Date(Date.now())
        building.upgradeCosts += building.upgradeCostsBase

        // save session, atomic transaction can be rolled back
        await building.save({session})
        

        // Schedule the upgrade with Agenda
        const upgradeCompletionTime = new Date(Date.now() + building.upgradeDuration)
        await upgradeAgenda.schedule(upgradeCompletionTime, 'completeBuildingUpgrade', { id: building._id })

        // Commit the transaction
        await session.commitTransaction()

        // Add a mongo db transaction which will increase the upgradeduration by base upgrade duration, the upgradeCosts by baseupgradeCosts.
        // This must be rolled back if the upgradeAgenda gets interrupted, e.i, player chooses to cancel the upgrade.


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
            const elapsedTime = Date.now() - building.upgradeStartTime.getTime()  // Calculate elapsed milliseconds
            const percentElapsed = elapsedTime / building.upgradeDuration          // Calculate percentage of upgrade time elapsed
  
            for (const [key, value] of Object.entries(building.upgradeCostsBase)) {
            const costToReturn = value * percentElapsed                      // Calculate cost to return based on percentage
            building.upgradeCosts[key] -= costToReturn                        // Subtract the calculated cost from upgradeCosts
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


module.exports = {upgradeBuilding, cancelBuildingUpgrade}

