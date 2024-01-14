require('dotenv').config();
const Agenda = require('agenda');
const { productionRateStoreFiller } = require("../helpers/mine-production-to-storage-filler");
const { MINES_PRODUCTION_RATE_TIME_MULTIPLIER } = require("../constants/mines-enum");

const mongoConnectionString = process.env.MONGO_URI;
const productionRateAgenda = new Agenda({ db: { address: mongoConnectionString } });

async function startAgenda() {
    try {
        productionRateAgenda.define('fill store capacities', async job => {
            await productionRateStoreFiller();
        });

        let periodic = MINES_PRODUCTION_RATE_TIME_MULTIPLIER.toString() + ' seconds'; // Ensure it's a string

        await productionRateAgenda.start();
        await productionRateAgenda.every(periodic, 'fill store capacities');
    } catch (error) {
        console.error('Error starting Agenda:', error);
    }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing Agenda');
    await productionRateAgenda.stop();
});

module.exports = startAgenda;
