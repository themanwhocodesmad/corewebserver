
const {Fleet} = require('../../models/game-models/armoury-models/fleet-schema')
const Armoury = require('../../models/game-models/armoury-models/armoury-model')


const createFleet = async (req, res) => {
    const { stationedAt, name, troops } = req.body

    try {
        const newFleet = new Fleet({
            name: name,
            stationedAt: stationedAt,
            troops: troops || [], // Initialize with provided troops or as empty
        })

        await newFleet.save()

        res.status(201).json({ message: 'New fleet created successfully', fleet: newFleet })
    } catch (error) {
        res.status(500).json({ message: 'Error creating fleet', error: error.message })
    }
}

const editFleet = async (req, res) => {
    const { fleetId } = req.params
    const { troops } = req.body // Expecting an array of troops

    try {
        // Find the fleet to be updated
        const fleet = await Fleet.findById(fleetId)
        if (!fleet) {
            return res.status(404).json({ message: 'Fleet not found' })
        }

        // Update the troops in the fleet
        fleet.troops = troops

        await fleet.save()

        res.status(200).json({ message: 'Fleet updated successfully', fleet: fleet })
    } catch (error) {
        res.status(500).json({ message: 'Error updating fleet', error: error.message })
    }
}


const deleteFleet = async (req, res) => {
    const { fleetId } = req.params

    try {
        // Find the fleet to be deleted
        const fleet = await Fleet.findById(fleetId)
        if (!fleet) {
            return res.status(404).json({ message: 'Fleet not found' })
        }

        // Find the armoury associated with the planet where the fleet is stationed
        const armoury = await Armoury.findOne({ planet: fleet.stationedAt })
        if (!armoury) {
            return res.status(404).json({ message: 'Armoury not found for the given planet' })
        }

        // Transfer troops from fleet back to armoury
        for (const troop of fleet.troops) {
            const index = armoury.troops.findIndex(t => t.troopType.equals(troop.troopType))
            if (index !== -1) {
                // If troop type exists in the armoury, update the quantity
                armoury.troops[index].quantity += troop.quantity
            } else {
                // If troop type doesn't exist in the armoury, add it
                armoury.troops.push({ troopType: troop.troopType, troopName: troop.troopName, quantity: troop.quantity })
            }
        }

        await armoury.save()

        // Delete the fleet
        await Fleet.findByIdAndDelete(fleetId)

        res.status(200).json({ message: 'Fleet deleted successfully and troops returned to armoury' })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting fleet', error: error.message })
    }
}
module.exports = {
    createFleet,
    editFleet,
    deleteFleet
}

