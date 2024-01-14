const Agenda = require('agenda');
const ConstructionQueue = require('../models/game-models/armoury-models/construction-queue-model');
const Armoury = require('../models/game-models/armoury-models/armoury-model'); 


const mongoConnectionString = process.env.MONGO_URI;
const constructionQueueAgenda = new Agenda({ db: { address: mongoConnectionString } });


async function startAgenda() {

    try {
        constructionQueueAgenda.define('process construction queue', async job => {
            const now = new Date();
            const constructionJobs = await ConstructionQueue.find({ 
                quantity: { $gt: 0 }, 
                startTime: { $ne: null } 
            });

            for (const constructionJob of constructionJobs) {
                const timeElapsed = now - constructionJob.startTime; // This is in milliseconds
                const timeElapsedInSeconds = timeElapsed / 1000; // Convert milliseconds to seconds

            if (timeElapsedInSeconds >= constructionJob.constructionTime) {
                    // Decrement quantity
                    constructionJob.quantity -= 1;

                    if (constructionJob.quantity >= 0) {
                        // Update Armoury
                        await updateArmoury(constructionJob.armoury, constructionJob.troopType);


                        // Reset startTime for the next unit
                        constructionJob.startTime = new Date();
                        await constructionJob.save();
                    } else {
                        // Quantity is zero, remove the job from the queue
                        await ConstructionQueue.findByIdAndRemove(constructionJob._id);
                    }
                }
            }
        });
            
        await constructionQueueAgenda.start();
        await constructionQueueAgenda.every('10 seconds', 'process construction queue');

} catch(error){
    console.error('Error starting Agenda:', error);
}
}



const updateArmoury = async (armouryId, troopType) => {
    try {
        // Fetch the armoury
        const armoury = await Armoury.findById(armouryId);
        if (!armoury) {
            throw new Error('Armoury not found');
        }

        
        // Find the troop in the armoury
        const existingTroop = armoury.troops.find(t => t._id.toString() === troopType.toString());
        // Log the existing troop found (or null if not found)
        console.log('Troop created:', existingTroop);

        if (existingTroop) {
            // Update quantity of existing troop type
            existingTroop.quantity += 1;
        } else {
            // Add new troop type with initial quantity
            armoury.troops.push({ _id: troopType, quantity: 1 });
        }

        // Save updates to the armoury
        await armoury.save();
    } catch (error) {
        console.error('Error updating armoury:', error);
        throw error; // Rethrow the error for further handling if necessary
    }
};



// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing ConstructionQueueAgenda');
    await constructionQueueAgenda.stop();
});

module.exports = startAgenda;