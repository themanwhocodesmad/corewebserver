const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')

// Mine Schema extending Building Schema
const commStationSchema = new Schema({
    messages: { type: Number, default: 0 },
})

// Adding Mine as a discriminator of Building
const CommStation = Building.discriminator('Comm Station', commStationSchema)

module.exports = CommStation
