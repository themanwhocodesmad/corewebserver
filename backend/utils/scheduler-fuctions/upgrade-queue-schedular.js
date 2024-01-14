const Agenda = require('agenda');
const mongoConnectionString = process.env.MONGO_URI
const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define('process oldest building in queue', async job => {
    try {
        const oldestBuildingInQueue = await BuildingQueue.findOne({ status: 'queued' })
            .sort({ queuedAt: 1 })
            .populate('building');
        
        if (oldestBuildingInQueue) {
            const now = new Date();
            const timeElapsed = now.getTime() - oldestBuildingInQueue.upgradeStartTime.getTime();
            if (timeElapsed >= oldestBuildingInQueue.building.upgradeDuration) {
                // Perform the upgrade
                oldestBuildingInQueue.building.upgrade();
                await oldestBuildingInQueue.building.save();

                // Remove the building from the queue
                await BuildingQueue.findByIdAndRemove(oldestBuildingInQueue._id);
            }
        }
    } catch (error) {
        console.error('Error processing the oldest building in queue:', error);
// Handle error appropriately
}
});
    

(async function() {
    await agenda.start();
    await agenda.every('10 seconds', 'process building queue');
})();
