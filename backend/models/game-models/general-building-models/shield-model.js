const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('../building-models/buildings-abstract-model')
const { PROTECTION_INCREASE } = require('../../../constants/shield-enum')

// Mine Schema extending Building Schema
const shieldSchema = new Schema({
    protection: { type: Number, default: 0 },
})


// Override the upgrade function
shieldSchema.methods.upgrade = function() {
    Building.prototype.upgrade.call(this)
    this.protection += PROTECTION_INCREASE  
  }
// Adding Mine as a discriminator of Building
const Shield = Building.discriminator('Shield', shieldSchema)

module.exports = Shield
