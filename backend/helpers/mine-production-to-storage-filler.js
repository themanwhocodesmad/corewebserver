const { MINES_PRODUCTION_RATE_TIME_MULTIPLIER } = require("../constants/mines-enum");
const { Mine } = require("../models/game-models/general-building-models/mines-model");
const Planet = require("../models/game-models/building-models/planets-model");
const { Store } = require("../models/game-models/general-building-models/stores-model")

async function productionRateStoreFiller() {
    try {
        // Fetch all mines
        const mines = await Mine.find({});

        for (const mine of mines) {
            // Fetch the planet for the current mine
            const planet = await Planet.findById(mine.planet);
            if (!planet) {
                console.log(`Planet not found for mine: ${mine._id}`);
                continue; // Skip to the next mine if the planet is not found
            }

            // Fetch all stores associated with this planet
            const stores = await Store.find({ planet: planet._id });

            // Find the specific store that matches the mine type
            const store = stores.find(s => s.storeType === mine.mineType);

            if (store) {
                // Calculate the new storage amount
                let newStorage = store.storage + MINES_PRODUCTION_RATE_TIME_MULTIPLIER * mine.productionRate;

                // Ensure the storage does not exceed the capacity
                store.storage = Math.min(newStorage, store.capacity);

                await store.save(); // Save the updated store storage
            }
        }
    } catch (error) {
        console.error('Error in productionRateStoreFiller:', error);
    }
}



module.exports = {productionRateStoreFiller}