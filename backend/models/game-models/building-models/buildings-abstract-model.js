const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Abstract buildingSchema
const buildingSchema = new Schema({
    planet: { 
        type: Schema.Types.ObjectId, 
        ref: 'Planet',
        required: true // A building can not exist without a planet.
    },
    name: { type: String },
    level: { type: Number, default: 0, min: 0, max: 20 },
    population: { type: Number, default: 0 },
    health: { type: Number, default: 0 },
    upgradeDuration: { type: Number, default: 0 },
    upgradeDurationBase: { type: Number, default: 0 },
    upgradeStartTime: {
        type: Date, 
        default: null, 
      },
    taskId: { type: Number, default: null },
    upgradeCosts: {
        metal: { type: Number, default: 120 },
        crystal: { type: Number, default: 120 },
        gas: { type: Number, default: 120 },
        energy: { type: Number, default: 5 },
    },
    upgradeCostsBase: {
        metal: { type: Number, default: 120 },
        crystal: { type: Number, default: 120 },
        gas: { type: Number, default: 120 },
        energy: { type: Number, default: 5 },
    },
}, { discriminatorKey: 'type' }) // Using 'type' as the discriminator key, this is what describes each "Type" of building you make
                                // E.g Trade Port, Mine, Store, Shipyard etc


// Method to calculate next upgrade duration
// TODO Check if possible to define methods in another way
buildingSchema.methods.calculateUpgradeDuration = function() {
    // Arithmetic sum formula: n * (n + 1) / 2
    return this.upgradeDurationBase * (this.level * (this.level + 1) / 2)
}

// Method to calculate next upgrade duration
// TODO Check if possible to define methods in another way
buildingSchema.methods.calculateBuildingPopulation = function() {
    // Arithmetic sum formula: n * (n + 1) / 2
    return (this.level * (this.level + 1) / 2)
}

// Base upgrade method
buildingSchema.methods.upgrade = function() {
    // common upgrade logic
    this.level++
    this.population = this.calculateBuildingPopulation()
    this.taskId = null
  }

// Create a base model
const Building = mongoose.model('Building', buildingSchema)
module.exports = Building
