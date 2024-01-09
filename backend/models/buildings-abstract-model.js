const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Abstract buildingSchema
const buildingSchema = new Schema({
    name: { type: String },
    type: { type: String }, 
    level: { type: Number, default: 0, min: 0, max: 20},
    health: { type: Number, default: 0 },
    upgradeDuration: { type: Number, default: 0 },
    upgradeDurationBase: { type: Number, default: 0 }, 
    upgradeStartTime: { type: Number, default: 0 },
    taskId: { type: Number, default: 0 },
    upgradeCosts: {
        metal: { type: Number, default: 120 },
        crystal: { type: Number, default: 120 },
        gas: { type: Number, default: 120 },
        energy: { type: Number, default: 5 },
    },
})


// Method to calculate next upgrade duration
buildingSchema.methods.calculateUpgradeDuration = function() {
    // Arithmetic sum formula: n * (n + 1) / 2
    // Using the building-specific base value for calculation
    return this.upgradeDurationBase * (this.level * (this.level + 1) / 2)
}

// Create a base model
module.exports = mongoose.model('Building', buildingSchema)
