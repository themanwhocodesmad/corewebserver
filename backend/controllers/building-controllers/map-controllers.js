const Planet = require('../../models/planets-model')
const Map = require('../../models/map-model')
const { MapStatusEnum, numberOfGalaxies } = require('../../constants/map-enum')


// Function to initializa the Map model
const initializeMap = async (numberOfGalaxies) => {
    try {
        for (let galaxy = 1; galaxy <= numberOfGalaxies; galaxy++) {
            let mapEntries = []
            for (let planetNumber = 1; planetNumber <= 10; planetNumber++) {
                mapEntries.push({ galaxy, planetNumber, status: MapStatusEnum.AVAILABLE })
            }
            await Map.insertMany(mapEntries)
        }
        console.log(`Map initialized with ${numberOfGalaxies} galaxies.`)
    } catch (error) {
        console.error('Error initializing map:', error)
    }
}

// Function to add a new galaxy. To be used in the period function.
const addNewGalaxy = async () => {
    try {
        // Get last galaxy and add new 1
        const lastMapEntry = await Map.findOne().sort({ galaxy: -1 })
        const newGalaxyNumber = lastMapEntry ? lastMapEntry.galaxy + 1 : 1
        
        for (let planetNumber = 1; planetNumber <= 10; planetNumber++) {
            const newPlanet = new Map({
                galaxy: newGalaxyNumber,
                planetNumber,
                status: MapStatusEnum.AVAILABLE
            })
            newPlanet.generateCoordinates()
            await newPlanet.save()
        }
        console.log(`Added new galaxy: ${newGalaxyNumber}`)
    } catch (error) {
        console.error('Error adding new galaxy:', error)
        throw error
    }
}

// Function to sync the map model with the existing player owned planets (active/abandoned). 
// To be used in the period function as well.
const syncMapWithPlanets = async () => {
    try {
        // Get all planets
        const planets = await Planet.find({})

        for (const planet of planets) {
            // Find the corresponding map entry
            const mapEntry = await Map.findOne({ 
                galaxy: planet.galaxy, 
                planetNumber: planet.planetNumber 
            })

            if (mapEntry) {
                // Update/Replace the map entry with information from the planet
                mapEntry.planetId = planet._id // Link to the planet's ID
                mapEntry.status = planet.occupied ? MapStatusEnum.OCCUPIED : MapStatusEnum.ABANDONED
                
                // This might be redundant
                mapEntry.coordinates = planet.coordinates

                await mapEntry.save()
            } else {
                // Handle case where no corresponding map entry is found
                // TODO: Implement logic if needed
            }
        }
    } catch (error) {
        console.error('Error syncing map with planets:', error)
        // Additional error handling logic can be added here if necessary
    }
}


module.exports = { initializeMap, addNewGalaxy, syncMapWithPlanets }
