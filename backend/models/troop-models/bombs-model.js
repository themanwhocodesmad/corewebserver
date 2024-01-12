const Troop = require('./troops-abstract-model') // Import the generic Troop model

// Bomb Troop Schema
const bombsSchema = new mongoose.Schema({
    // Additional properties specific to Bomb Troops
    buildingDamage: { type: Number, required: true },
})

// Method for bomb explosion
bombsSchema.methods.explode = function() {
    //
}

// Inherit from Troop
const Bombs = Troop.discriminator('Bombs', bombsSchema)

module.exports = Bombs