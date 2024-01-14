require('dotenv').config();
const Agenda = require('agenda');
const Building = require('../../models/game-models/building-models/buildings-abstract-model');


const mongoConnectionString = process.env.MONGO_URI;
const upgradeAgenda = new Agenda({ db: { address: mongoConnectionString } });

// Define the 'completeBuildingUpgrade' job
upgradeAgenda.define('completeBuildingUpgrade', async (job, done) => {
  try {
    const { id } = job.attrs.data;
    const building = await Building.findById(id);
    if (!building) {
      throw new Error('Building not found');
    }

    // Perform the upgrade
    building.upgrade();

    await building.save();
    done();
  } catch (error) {
    console.error('Error in completing building upgrade:', error);
    done(error);
  }
});


(async () => {
  await upgradeAgenda.start();
})();

module.exports = upgradeAgenda;
