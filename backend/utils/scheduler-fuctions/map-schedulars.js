require('dotenv').config()
const Agenda = require('agenda')
const { addNewGalaxy, syncMapWithPlanets } = require('../../controllers/map-controllers')

const mongoConnectionString = process.env.MONGO_URI;
const mapAgenda = new Agenda({ db: { address: mongoConnectionString } });


// Map agenda function to passively and periodically increase the map every 12 hours

mapAgenda.define('add new galaxy', async job => {
    try {
        await addNewGalaxy();
    } catch (error) {
        console.error('Error in Agenda job ("add new galaxy"):', error);
    }
});
// Map agenda function to passively and periodically sync the map every 1 hour
// TODO might need to be more frequest
mapAgenda.define('sync map with planets', async job => {
    try {
        await syncMapWithPlanets();
    } catch (error) {
        console.error('Error in Agenda job ("sync map with planets"):', error);
    }
});
// TODO: Error here must check later
(async function() {
    await mapAgenda.start();
    await mapAgenda.every('12 hours', 'add new galaxy');
    await mapAgenda.every('1 hour', 'sync map with planets');
})()

module.exports = mapAgenda
