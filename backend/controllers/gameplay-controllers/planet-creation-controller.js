const Planet = require('../../models/game-models/building-models/planets-model')
const initializePlanet = require('../../helpers/create-buildings-for-planet')
const { generateInitialPlanetRandomName } = require('../../helpers/initial-naming-functions')


const createInitialPlanet = async (req, res) => {
    try {
        let success = false
        let attemptCount = 0
        let newPlanet

        // Need to add error check if two players try to create their initial planets at the same time. Maybe this is not a big worry but IAM WORRIED LoL

        while (!success && attemptCount < 5) { 
            // Limit the number of attempts to avoid infinite loops
            
            // Find the maximum galaxy number in the map
            const lastPlanet = await Planet.findOne().sort({ galaxy: -1 })
            let newGalaxyNumber = lastPlanet ? lastPlanet.galaxy + 1 : 1

            newPlanet = new Planet({
                galaxy: newGalaxyNumber,
                planetNumber: 1,
                name: generateInitialPlanetRandomName(), // Generate a random name for the planet
                occupied: true
            })

            newPlanet.generateCoordinates()

            try {
                await newPlanet.save()
                success = true // Planet saved successfully, exit the loop
            } catch (error) {
                if (error.code === 11000) { // Duplicate key error
                    attemptCount++
                    // Log the error and retry with a new galaxy number
                } else {
                    // If the error is not related to duplicate keys, throw it
                    throw error
                }
            }
        }

        if (success) {
            try {
                await initializePlanet(newPlanet._id)
                res.status(201).json({ message: "New planet and its buildings created successfully", planet: newPlanet })
            } catch (buildingError) {
                // Handle building creation error
                res.status(500).json({ message: "Planet created, but error occurred while creating buildings", error: buildingError.message })
            }
        } else {
            res.status(500).json({ message: "Failed to create a new planet after multiple attempts" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating new planet", error: error.message })
    }
}


const createAdditionalPlanet = async (req, res) => {
    const { galaxy, planetNumber } = req.body
    try {

    // Create a new Planet instance
    let newPlanet = new Planet({
        galaxy: galaxy,
        planetNumber: planetNumber,
        name: generateInitialPlanetRandomName(),
        occupied: true
    })

    // Generate coordinates for the new planet
    newPlanet.generateCoordinates()

    // Save the new planet
    await newPlanet.save()

    // Call the createInitialPlanet function (assuming it's adjusted to handle a planet object)
    await initializePlanet(newPlanet._id)

    res.status(201).json({ message: "New planet created and initialized successfully", planet: newPlanet })
} catch (error) {
    res.status(500).json({ message: "Error creating new planet", error: error.message })
}
}

module.exports = {
    createInitialPlanet, createAdditionalPlanet}
