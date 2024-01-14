const { TROOPS_DATA } = require("../../../constants/troop-constants/troops-enum");
const checkAndDeductResourcesForTroops = require("../../../helpers/troop-construction-related");
const Planet = require("../../../models/planets-model");
const { Store } = require("../../../models/stores-model");
const Armoury = require("../../../models/troop-models/armoury-model");
const Troop = require("../../../models/troop-models/troops-abstract-model");
const { updateTroopNamesInArmoury } = require("../create-instantiation-troops-for-planet-controller");


const constructTroop = async (req, res) => {
    try {

        const { troopType, quantityToAdd, armouryId } = req.body;

        // Fetch the armoury
        const armoury = await Armoury.findById(armouryId);
        if (!armoury) {
            return res.status(404).send('Armoury not found.');
        }

        // Fetch troop name for comparison
        const troop = await Troop.findById(troopType);
        if (!troop) {
            return res.status(400).send('Invalid troop type.');
        }
        console.log('Troop to add:', troop.name);

        // Locate planet's stores
        const planet = await Planet.findById(armoury.planet)
        if (!planet) {
            return res.status(404).send({ message: 'Planet not found' })
        }
        const stores = await Store.find({ planet: planet._id })
        //console.log('Stores found:', stores)
        if (stores.length !== 3) { // Assuming there are exactly 3 stores per planet
            return res.status(404).send({ message: 'Stores not found or incomplete on planet' })
        }
        
        // Check for each resource in the construction costs using resourceCheck function
        const canConstruct = await checkAndDeductResourcesForTroops(stores, troopType, quantityToAdd);
        if (!canConstruct) {
            return res.status(400).send('Insufficient resources for troop construction.')
        }

        // Continue to Update troop quantity in the armoury
        const existingTroopIndex = armoury.troops.findIndex(t => t._id.toString() === troopType)
        if (existingTroopIndex >= 0) {
            // Update quantity of existing troop type
            armoury.troops[existingTroopIndex].quantity += quantityToAdd;
        } else {
            // Add new troop type with initial quantity
            armoury.troops.push({ _id: troopType, quantity: quantityToAdd });
        }

        // Save updates to the armoury
        await armoury.save();

        res.status(201).json({ 
    message: 'Troops successfully constructed',
    quantityAdded: quantityToAdd,
    troopName: troop.name
});

    } catch (error) {
        console.error('Error constructing troops:', error);
        res.status(500).send('Error constructing troops: ' + error.message);
    }
};

module.exports = constructTroop;

