// TODO WORK IN PROGRESS DO NOT JUDGE 
const UpgradeQueue = require('../../models/process-models/upgrade-queue-model')
const Building = require('../../models/buildings-abstract-model')
const upgradeAgenda = require('../../utils/scheduler-fuctions/upgrade-schedular')


// Generic upgrade function to be used for all 
const initiateUpgrade = async (req, res) => {
    const { buildingId, planetId } = req.params // Fetch building ID and planet ID from request

    try {
        const building = await Building.findById(buildingId)
        if (!building) {
            return res.status(404).json({ message: 'Building not found' })
        }

        // Logic to calculate upgrade duration and other details
        const upgradeDuration = building.calculateUpgradeDuration()
        const upgradeEndTime = new Date(Date.now() + upgradeDuration)

        // Schedule an Agenda job for upgrade completion
        const upgradeJob = await upgradeAgenda.schedule(upgradeEndTime, 'complete upgrade', { buildingId })

        // Create an entry in the UpgradeQueue
        const upgradeQueueEntry = new UpgradeQueue({
            planetId,
            buildingId,
            taskId: upgradeJob.attrs._id,
            upgradeEndTime
        })

        await upgradeQueueEntry.save()
        res.status(200).json({ message: 'Upgrade initiated', building, upgradeQueueEntry })
    } catch (error) {
        res.status(500).json({ message: 'Error initiating upgrade', error: error.message })
    }
}

// Upgrade Cancellation Function
const cancelUpgrade = async (req, res) => {
    const { queueEntryId } = req.params // Or however you get the UpgradeQueue entry ID

    try {
        const queueEntry = await UpgradeQueue.findById(queueEntryId)
        if (!queueEntry) {
            return res.status(404).json({ message: 'Upgrade entry not found' })
        }

        // Cancel the Agenda job
        await agenda.cancel({ _id: queueEntry.taskId })

        // Remove the entry from the queue
        await UpgradeQueue.findByIdAndRemove(queueEntryId)

        res.status(200).json({ message: 'Upgrade cancelled' })
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling upgrade', error: error.message })
    }
}

