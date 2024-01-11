const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('./buildings-abstract-model')

// Mine Schema extending Building Schema
const shieldSchema = new Schema({
    protection: { type: Number, default: 0 },
})

shieldSchema.methods.calculateProtection = function() {
    return this.level * 100
}

// Adding Mine as a discriminator of Building
const Shield = Building.discriminator('Shield', shieldSchema)

module.exports = Shield
