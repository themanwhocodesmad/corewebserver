const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Building = require('../building-models/buildings-abstract-model')
const { GENERATED_RESOURCES } = require('../../../constants/solar-array-enum')

// Mine Schema extending Building Schema
const solarArraySchema = new Schema({
    generated_resources: { type: Number, default: 0 },
})


// Override the upgrade function
solarArraySchema.methods.upgrade = function() {
    Building.prototype.upgrade.call(this)
    this.generated_resources += GENERATED_RESOURCES
  }

// Adding Mine as a discriminator of Building
const SolarArray = Building.discriminator('Solar array', solarArraySchema)



module.exports = SolarArray
