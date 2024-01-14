const CommStation = require('../../models/game-models/armoury-models/building-models/general-building-models/comm-station-model')
const mongoose = require('mongoose')
const { COMM_STATION_BASE_UPGRADE_DURATION, CommStationUpgradeCosts } = require('../../constants/comm-station-enum')

// Controller function to create a Comm Station
const createCommStation = async (req, res) => {
    try {
        const newCommStation = new CommStation({
            name: "Comm Station",
            upgradeDurationBase: COMM_STATION_BASE_UPGRADE_DURATION,
            upgradeDuration: COMM_STATION_BASE_UPGRADE_DURATION,
            upgradeCosts: CommStationUpgradeCosts
        })

        await newCommStation.save()
        res.status(201).send({ message: "Comm Station created successfully", commStation: newCommStation })
    } catch (error) {
        res.status(500).send({ message: "Error creating Comm Station", error: error.message })
    }
}

// Controller function to get a single Comm Station
const getCommStation = async (req, res) => {
    try {
        const { id } = req.params
        const commStation = await CommStation.findById(id)
        if (!commStation) {
            return res.status(404).send({ message: "Comm Station not found" })
        }

        res.status(200).json(commStation)
    } catch (error) {
        res.status(500).send({ message: "Error retrieving Comm Station", error: error.message })
    }
}

// Controller function to upgrade a Comm Station
const upgradeCommStation = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'Comm Station not found' })
        }

        const commStation = await CommStation.findById(id)
        if (!commStation) {
            return res.status(404).json({ msg: 'Comm Station not found' })
        }

        // Increment the level of the commStation
        commStation.level += 1

        await commStation.save()
        res.status(200).json({ msg: 'Comm Station upgraded successfully', commStation: commStation })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createCommStation,
    getCommStation,
    upgradeCommStation,
}
