const Agenda = require('agenda');
const BuildingQueue = require('../models/game-models/building-models/building-upgrade-queue');
const Building = require('../models/game-models/building-models/buildings-abstract-model');

const mongoConnectionString = process.env.MONGO_URI;
const buildingQueueAgenda = new Agenda({ db: { address: mongoConnectionString } });

async function startAgenda() {
    try {
        buildingQueueAgenda.define('process building queue', async job => {
            try {
                const oldestBuildingInQueue = await BuildingQueue.findOne({ status: 'queued' })
                    .sort({ queuedAt: 1 })
                    .populate('building');

                if (oldestBuildingInQueue && new Date() >= oldestBuildingInQueue.upgradeEndTime) {
                    const building = await Building.findById(oldestBuildingInQueue.building._id);
                    if (building) {
                        try {
                            building.upgrade();
                            await building.save();
                        } catch (upgradeError) {
                            console.error('Error during building upgrade:', upgradeError);
                            return;
                        }

                        const deleteResult = await BuildingQueue.deleteOne({ _id: oldestBuildingInQueue._id });
                        if (deleteResult.deletedCount === 1) {
                            console.log('Upgraded and removed building from queue:', building);
                        } else {
                            console.warn('Failed to remove building from queue:', oldestBuildingInQueue._id);
                        }
                    }
                }
            } catch (error) {
                console.error('Error processing the oldest building in queue:', error);
            }
        });

        await buildingQueueAgenda.start();
        await buildingQueueAgenda.every('10 seconds', 'process building queue');
   

    } catch (error) {
        console.error('Error starting Agenda:', error);
    }
}

process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing ConstructionQueueAgenda');
    await buildingQueueAgenda.stop();
});

module.exports = startAgenda;
