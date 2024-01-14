const mongoose = require('mongoose')
const upgradeAgenda = require('../../utils/scheduler-fuctions/upgrade-schedular')
const {prepareBuildingForNextUpgrade, checkAndDeductResourcesForUpgrade, calculateUpgradeStartAndEndTimes} = require('../../helpers/building-upgrades-related')
const Building = require('../../models/game-models/building-models/buildings-abstract-model')

const queueBuildingsForUpgrade = async (req, res) => {
    try {
        const { id } = req.params
        const building = await Building.findById(id)
        if (!building) {
            return res.status(404).send({ message: 'Building not found' })
        }

        // Check for all resources and then subtract them if there are sufficient
        const allResourcesSufficient = await checkAndDeductResourcesForUpgrade(building)
        if (!allResourcesSufficient) {
            return res.status(400).send({ message: 'Insufficient resources for upgrade' })
        }

        // Calculate target level for the upgrade
        const targetLevel = building.level + 1
        if (targetLevel > 20) {
            return res.status(400).send({ message: 'Building has reached maximum level' })
        }

        // Prepare building details for the queue
        const newBuildingDetails = {
            name:building.name, 
            planet: building.planet,
            building: building._id,
            queuedAt: new Date(), // Automatically set to now
            status: 'queued',
            upgradeDuration: building.upgradeDuration,
            targetLevel: targetLevel  
        }

        // Add building to upgrade queue with calculated start and end times
        const newQueueItem = await calculateUpgradeStartAndEndTimes(newBuildingDetails)
        
        await newQueueItem.save()
        console.log('created queue item', newQueueItem)
    
        // Update the building properties in preparation for the new upgrade
        await prepareBuildingForNextUpgrade(building)
    
        res.status(200).send({ message: 'Building upgraded successfully', building })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Error upgrading building', error: error.message })
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
            const elapsedTime = Date.now() - building.upgradeStartTime.getTime() // Calculate elapsed milliseconds
            const percentElapsed = elapsedTime / building.upgradeDuration        // Calculate percentage of upgrade time elapsed
        
            for (const [key, baseValue] of Object.entries(building.upgradeCostsBase)) {
                const totalCost = building.upgradeCosts[key] || 0                // Total cost for this key
                const lastUpgradeCost = totalCost - baseValue                    // Cost used in the last upgrade
                const costToReturn = lastUpgradeCost * percentElapsed            // Calculate cost to return based on percentage
        
                // Update the upgrade costs, ensuring it doesn't drop below the base value
                building.upgradeCosts[key] = Math.max(baseValue, totalCost - costToReturn)
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



module.exports = {queueBuildingsForUpgrade, cancelBuildingUpgrade}

