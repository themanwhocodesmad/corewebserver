const { Mine } = require('../../models/mines-model')
const mongoose = require('mongoose')
const { MineTypes, MinesUpgradeCosts, MINES_BASE_UPGRADE_DURATION } = require('../../constants/mines-enum')


// Controller function to CREATE all types of mines (POST)
const createAllMines = async (req, res) => {
    try {
         // Iterate over each type in the mineType enum
        const minePromises = Object.values(MineTypes).map(type => {
            const newMine = new Mine({
                mineType: type,
                name: `${type} mine`,

                //! ALWAYS INITIATE THESE VALUES
                upgradeDurationBase: MINES_BASE_UPGRADE_DURATION,
                upgradeDuration: MINES_BASE_UPGRADE_DURATION,
                upgradeCosts: MinesUpgradeCosts[type]
            })

            return newMine.save()
        })

        // Wait for all mines to get created
        await Promise.all(minePromises)

        res.status(201).send({ message: "All mines created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Error creating mines", error: error.message })
    }
}


// Controller function to upgrade a mine (PUT)
const upgradeMine = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: 'Mine not found' })
        }

        const mine = await Mine.findById(id)
        if (!mine) {
            return res.status(404).json({ msg: 'Mine not found' })
        }

        // Increment the level of the mine
        mine.level += 1

        // Update other properties
        mine.populations = (mine.level * (mine.level + 1)) / 2 // Arithmetic sum of the current level
        mine.productionRate = 5 * mine.level
        mine.health = 100 * mine.level

        // Calculate and update upgrade duration
        mine.upgradeDuration = mine.calculateUpgradeDuration()

        // Update upgradeCosts
        // Assuming mine.upgradeCosts is an object
        mine.upgradeCosts.metal += mine.level * 120
        mine.upgradeCosts.crystal += mine.level * 100
        mine.upgradeCosts.gas += mine.level * 80
        mine.upgradeCosts.energy += mine.level * 50


        await mine.save()

        res.status(200).json({ msg: 'Mine upgraded successfully', mine: mine })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Controller function to get all mines
const getAllMines = async (req, res) => {
    try {
        const mines = await Mine.find({})
        // Check if any mines were found
        if (!mines || mines.length === 0) {
            return res.status(404).json({ msg: 'No mines found' })``
        }

        // Respond with the list of mines
        res.status(200).json(mines)
    } catch (error) {
        // Handle any errors that occur during the database query
        res.status(500).json({ error: error.message })
    }
}

// Controller function to get a single mine
const getMine = async (req, res) => {
    try {
        const { id } = req.params

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid mine ID' })
        }

        // Retrieve the mine from the database
        const mine = await Mine.findById(id)

        // Check if the mine was found
        if (!mine) {
            return res.status(404).json({ msg: 'Mine not found' })
        }

        // Respond with the mine data
        res.status(200).json(mine)
    } catch (error) {
        // Handle any errors that occur during the database query
        res.status(500).json({ error: error.message })
    }
}



module.exports = {
    getAllMines,
    upgradeMine,
    createAllMines,
    getMine,
}

