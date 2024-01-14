const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('../building-models/buildings-abstract-model')

// Mine Schema extending Building Schema
const commStationSchema = new Schema({
    messages: { type: Number, default: 0 },
    activateComms: { type: Boolean, default: false },
})

// Override the upgrade function
commStationSchema.methods.upgrade = function() {
    Building.prototype.upgrade.call(this)
    this.activateComms = true
  }


// Adding Mine as a discriminator of Building
const CommStation = Building.discriminator('Comm Station', commStationSchema)

module.exports = CommStation
