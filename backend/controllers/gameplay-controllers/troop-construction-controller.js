const Armoury = require('../../models/game-models/armoury-models/armoury-model');
const ConstructionQueue = require('../../models/game-models/armoury-models/construction-queue-model');
const Troop = require('../../models/game-models/armoury-models/troops-abstract-model');
const checkAndDeductResourcesForTroops = require("../../helpers/troop-construction-related");


const queueTroopsForConstruction = async (req, res) => {
     try {
        const { troopType, quantityToAdd, armouryId } = req.body;

        // Fetch the armoury
        const armoury = await Armoury.findById(armouryId);
        if (!armoury) {
            return res.status(404).send('Armoury not found.');
        }

        // Fetch troop info
        const troop = await Troop.findById(troopType);
        if (!troop) {
            return res.status(400).send('Invalid troop type.');
        }

        // Check resources and other business logic...
        // Check for each resource in the construction costs using resourceCheck function
        const canConstruct = await checkAndDeductResourcesForTroops(stores, troopType, quantityToAdd);
        if (!canConstruct) {
            return res.status(400).send('Insufficient resources for troop construction.')
        }

        // Check for an existing job in the queue for this troopType
        let constructionJob = await ConstructionQueue.findOne({ 
            armoury: armouryId, 
            troopType: troopType 
        });

        if (constructionJob) {
            const constructionTimePerUnit = troop.constructionTime;
            constructionJob.constructionTime = constructionTimePerUnit
            // Update the quantity of the existing job
            constructionJob.quantity += quantityToAdd;
        } else {
            // Create a new job in the queue
            const constructionTimePerUnit = troop.constructionTime;
            const troopName = troop.name
            constructionJob = new ConstructionQueue({
                name:troopName,
                armoury: armouryId,
                troopType:troopType,
                quantity: quantityToAdd,
                constructionTime: constructionTimePerUnit,
                startTime: new Date() // Set the start time to the current time
                });
                }    // Save the construction job (new or updated)
                await constructionJob.save();

                res.status(201).json({ 
                message: 'Troop construction updated',
                totalQuantity: constructionJob.quantity,
                troopName: troop.name
            });

            } catch (error) {
                console.error('Error updating troop construction:', error);
                res.status(500).send('Error updating troop construction: ' + error.message);
            }
            };

module.exports = queueTroopsForConstruction
