const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')

// Mine Schema extending Building Schema
const solarArraySchema = new Schema({
    generated_resources: { type: Number, default: 0 },
})

// Adding Mine as a discriminator of Building
const SolarArray = Building.discriminator('Solar array', solarArraySchema)

module.exports = SolarArray
