// TODO WORK IN PROGRESS DO NOT JUDGE 
require('dotenv').config()
const Agenda = require('agenda')
const { addNewGalaxy, syncMapWithPlanets } = require('../../controllers/map-controllers')
const Building = require('../../models/buildings-abstract-model') 

const mongoConnectionString = process.env.MONGO_URI
const upgradeAgenda = new Agenda({ db: { address: mongoConnectionString } })

upgradeAgenda.define('complete upgrade', async (job, done) => {
    const { buildingId } = job.attrs.data

    try {
        const building = await Building.findById(buildingId)
        if (!building) {
            throw new Error('Building not found')
        }

        // Logic to complete the upgrade I believe everything is tied to level, but special properties might need if statements
        building.level += 1
        

        await building.save()
        done()
    } catch (error) {
        console.error('Error in completing upgrade:', error)
        done(error)
    }
})


(async () => {
    await upgradeAgenda.start();
})()

module.exports = upgradeAgenda
