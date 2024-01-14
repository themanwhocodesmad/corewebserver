const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Troop = require('./troops-abstract-model') // Import the generic Troop model

// Bomber Troop Schema
const bombersSchema = new mongoose.Schema({
    // Additional properties specific to Bomber Troops
    buildingDamage: { type: Number, required: true },
})

// Method for bomb explosion
bombersSchema.methods.explode = function() {
    //
}

// Inherit from Troop
const Bombers = Troop.discriminator('Bombers', bombersSchema)

module.exports = Bombers