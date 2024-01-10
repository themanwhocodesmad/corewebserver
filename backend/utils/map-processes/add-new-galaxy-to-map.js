// agendaSetup.js
const Agenda = require('agenda');
const addNewGalaxy = require('./controllers/addGalaxyController');

const mongoConnectionString = 'mongodb://127.0.0.1/agenda'; // Your MongoDB connection string

const agenda = new Agenda({ db: { address: mongoConnectionString } });

agenda.define('add new galaxy', async job => {
    try {
        await addNewGalaxy();
    } catch (error) {
        console.error('Agenda job failed:', error);
    }
});

(async function() {
    await agenda.start();
    await agenda.every('12 hours', 'add new galaxy');
})();
